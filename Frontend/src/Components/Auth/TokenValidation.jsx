import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import BaseUrl from "../../util/BaseUrl";

const useTokenValidation = () => {
    const navigate = useNavigate();
    const [expenses, setExpenses] = useState([]);

    useEffect(() => {
        const validateTokenAndFetchData = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    navigate("/");
                    return;
                }

                const validateResponse = await axios.post(
                    `${BaseUrl}/user/validate-token`,
                    {},
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "application/json",
                        },
                    }
                );

                if (!validateResponse.data) {
                    throw new Error("Invalid Token");
                }

                const username = jwtDecode(token).sub;

                const userResponse = await axios.get(`${BaseUrl}/user/${username}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                });

                const userId = userResponse.data;

                const expenseResponse = await axios.get(`${BaseUrl}/expenses/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                    params: {
                        offset: 0,
                        pageSize: 5,
                        field: "date",
                    },
                });

                setExpenses(expenseResponse.data?.content || []);
            } catch (error) {
                localStorage.removeItem("token");
                navigate("/");
            }
        };

        validateTokenAndFetchData();
    }, [navigate]);

    return expenses;
};

export default useTokenValidation;

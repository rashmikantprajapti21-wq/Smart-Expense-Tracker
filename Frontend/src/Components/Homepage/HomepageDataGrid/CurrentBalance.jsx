import { useEffect, useState } from "react";
import axios from "axios";
import BaseUrl from "../../../util/BaseUrl";
import { jwtDecode } from "jwt-decode";
import {Typography} from "@mui/material";

const CurrentBalance = () => {
    const [currentBalance, setCurrentBalance] = useState(0);

    useEffect(() => {
        const handleCurrentBalance = async () => {
            try {
                const token = localStorage.getItem("token");
                const username = jwtDecode(token).sub;
                const userIdResponse = await axios.get(`${BaseUrl}/user/${username}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                const userId = userIdResponse.data;

                const response = await axios.get(`${BaseUrl}/report/balance`, {
                    params: { userId },
                    headers: { Authorization: `Bearer ${token}` }
                });
                setCurrentBalance(response.data);
            } catch (error) {
                console.error("Error fetching current balance:", error);
            }
        };

        handleCurrentBalance();
    }, []);

    return (
        <Typography sx={{fontFamily: "'Archivo Black', sans-serif", color:"white", fontSize:20 }}>
            ₹ {currentBalance}
        </Typography>
    );
};

export default CurrentBalance;
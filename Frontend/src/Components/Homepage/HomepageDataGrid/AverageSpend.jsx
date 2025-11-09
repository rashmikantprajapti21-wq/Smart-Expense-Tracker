import { useEffect, useState } from "react";
import axios from "axios";
import BaseUrl from "../../../util/BaseUrl";
import { jwtDecode } from "jwt-decode";
import { Typography } from "@mui/material";

const AverageSpend = () => {
    const [averageSpend, setAverageSpend] = useState(0);

    useEffect(() => {
        const handleAverageSpend = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) return; // Prevents errors if token is missing

                const username = jwtDecode(token).sub;
                const userIdResponse = await axios.get(`${BaseUrl}/user/${username}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                const userId = userIdResponse.data;

                const response = await axios.get(`${BaseUrl}/report/daily`, {
                    params: { userId },
                    headers: { Authorization: `Bearer ${token}` }
                });

                // Filter only debited transactions
                const debitedTransactions = response.data.filter(transaction => transaction[2] === "debited");

                // Sum the debited amounts
                const totalDebited = debitedTransactions.reduce((sum, transaction) => sum + transaction[0], 0);

                // Calculate the average (avoid division by zero)
                const average = debitedTransactions.length > 0 ? totalDebited / debitedTransactions.length : 0;

                setAverageSpend(average);
            } catch (error) {
                console.error("Error fetching average spend:", error);
            }
        };

        handleAverageSpend();
    }, []);

    return (
        <Typography sx={{ fontFamily: "'Archivo Black', sans-serif", color: "white", fontSize: 20 }}>
            ₹ {averageSpend.toFixed(2)}
        </Typography>
    );
};

export default AverageSpend;
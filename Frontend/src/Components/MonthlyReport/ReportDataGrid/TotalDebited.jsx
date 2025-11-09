import { jwtDecode } from "jwt-decode";
import axios from "axios";
import BaseUrl from "../../../util/BaseUrl";
import { useEffect, useState } from "react";
import { Typography } from "@mui/material";

const TotalDebited = () => {
    const [totalDebited, setTotalDebited] = useState(0);

    useEffect(() => {
        const fetchDebited = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) return; // Prevents errors if token is missing

                const username = jwtDecode(token).sub;
                const userIdResponse = await axios.get(`${BaseUrl}/user/${username}`);
                const userId = userIdResponse.data;

                const response = await axios.get(`${BaseUrl}/report/debit/${userId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                setTotalDebited(response.data);
            } catch (error) {
                console.error("Error fetching total debited amount:", error);
            }
        };

        fetchDebited();
    }, []); // Run only once on mount

    return (
        <Typography sx={{ fontFamily: "'Archivo Black', sans-serif", color: "white", fontSize: 20 }}>
            ₹ {totalDebited}
        </Typography>
    );
};

export default TotalDebited;

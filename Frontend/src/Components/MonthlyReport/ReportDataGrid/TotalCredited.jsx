import { jwtDecode } from "jwt-decode";
import axios from "axios";
import BaseUrl from "../../../util/BaseUrl";
import { useEffect, useState } from "react";
import { Typography } from "@mui/material";

const TotalCredited = () => {
    const [totalCredited, setTotalCredited] = useState(0);

    useEffect(() => {
        const fetchCredited = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) return; // Prevents decoding if no token is found

                const username = jwtDecode(token).sub;
                const userIdResponse = await axios.get(`${BaseUrl}/user/${username}`);
                const userId = userIdResponse.data;

                const response = await axios.get(`${BaseUrl}/report/credit/${userId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                setTotalCredited(response.data);
            } catch (error) {
                console.error("Error fetching total credited amount:", error);
            }
        };

        fetchCredited();
    }, []);

    return (
        <Typography sx={{ fontFamily: "'Archivo Black', sans-serif", color: "white", fontSize: 20 }}>
            ₹ {totalCredited}
        </Typography>
    );
};

export default TotalCredited;

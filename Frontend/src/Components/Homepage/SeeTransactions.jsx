import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import BaseUrl from "../../util/BaseUrl";
import ExpenseTable from "./ExpenseTable";
import { Button, Box, Stack } from "@mui/material";

const SeeTransactions = () => {
    const [transactions, setTransactions] = useState([]);
    const [offset, setOffset] = useState(0);
    const [pageSize] = useState(10);
    const [userId, setUserId] = useState(null);
    const [totalPages, setTotalPages] = useState(0);

    // Fetch User ID
    useEffect(() => {
        const fetchUserId = async () => {
            try {
                const token = localStorage.getItem("token");
                const username = jwtDecode(token).sub;
                const userIdResponse = await axios.get(`${BaseUrl}/user/${username}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setUserId(userIdResponse.data);
                setOffset(0);
            } catch (error) {
                console.error("Error fetching user ID:", error);
            }
        };
        fetchUserId();
    }, []);

    // Fetch Transactions whenever offset or userId changes
    useEffect(() => {
        if (userId !== null) {
            const fetchTransactions = async () => {
                try {
                    const token = localStorage.getItem("token");
                    const response = await axios.get(`${BaseUrl}/expenses/${userId}`, {
                        params: { offset, pageSize, field: "date" },
                        headers: { Authorization: `Bearer ${token}` }
                    });

                    console.log("Fetched Transactions:", response.data.content);
                    setTransactions(response.data.content);
                    setTotalPages(response.data.totalPages); // Ensure backend returns total pages
                } catch (error) {
                    console.error("Error fetching transactions:", error);
                }
            };
            fetchTransactions();
        }
    }, [userId, offset]);

    // Pagination Handlers
    const handleNextPage = () => {
            setOffset(prevOffset => prevOffset + 1);
    };

    const handlePrevPage = () => {
            setOffset(prevOffset => prevOffset - 1);
    };

    return (
        <Box>
            <ExpenseTable expenses={transactions} />
            <Stack direction="row" spacing={2} justifyContent="flex-end" sx={{ mt: 2, mr: 3 }}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handlePrevPage}
                    disabled={offset === 0}
                >
                    ←
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNextPage}
                    disabled={transactions.length < pageSize}
                >
                    →
                </Button>
            </Stack>
        </Box>
    );
};

export default SeeTransactions;

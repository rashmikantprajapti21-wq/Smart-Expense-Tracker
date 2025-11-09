import { useState, useEffect } from "react";
import { Box, Button, Modal, TextField, Typography, Autocomplete, ThemeProvider } from "@mui/material";
import axios from "axios";
import BaseUrl from "../../util/BaseUrl";
import { jwtDecode } from "jwt-decode";
import darkTheme from "../../util/darkTheme";

const AddExpense = ({ open, setOpen}) => {
    const [expenseData, setExpenseData] = useState({
        amount: "",
        spentWhere: "",
        category: "",
        description: "",
    });

    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [confirmModal, setConfirmModal] = useState(false);
    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchUserAndCategories = async () => {
            try {
                const username = jwtDecode(token).sub;
                const userIdResponse = await axios.get(`${BaseUrl}/user/${username}`);
                const userId = userIdResponse.data;
                console.log(userId);
                const response = await axios.get(`${BaseUrl}/category`, {
                    params:{userId},
                    headers: { Authorization: `Bearer ${token}` },
                });

                if (response.data && Array.isArray(response.data)) {
                    setCategories(response.data.map(cat => cat.title));
                    console.log("Fetched categories:", response.data.map(cat => cat.title));
                }
            } catch (error) {
                console.error("Error fetching categories or user ID", error);
            } finally {
                setLoading(false);
            }
        };
        fetchUserAndCategories();
    }, []);

    const handleSubmitClick = () => {
        setConfirmModal(true);
    };

    const handleRefresh = () => {
        window.location.reload();
    };
    const handleConfirmExpense = async (selectedType) => {
        try {
            const username = jwtDecode(token).sub;
            const userIdResponse = await axios.get(`${BaseUrl}/user/${username}`);
            const userId = userIdResponse.data;
            // If the category does not exist, create it
            if (!categories.includes(expenseData.category)) {
                await axios.post(
                    `${BaseUrl}/category`,
                    { title: expenseData.category, user: { id: userId } },
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                setCategories(prev => [...prev, expenseData.category]);
            }

            // Submit expense with user ID and category association
            await axios.post(
                `${BaseUrl}/expenses`,
                {
                    amount: expenseData.amount,
                    spentWhere: expenseData.spentWhere,
                    type: selectedType,
                    category: { title: expenseData.category, user: { id: userId } },
                    user: { id: userId },
                    description: expenseData.description,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            setExpenseData({ amount: "", spentWhere: "", category: "", description: "" });
            setConfirmModal(false);
            setOpen(false);

        } catch (error) {
            console.error("Error adding expense", error);
        }
        handleRefresh();
    };

    return (
        <ThemeProvider theme={darkTheme}>
            <Modal open={open} onClose={() => setOpen(false)}>
                <Box
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: 420,
                        bgcolor: "background.default",
                        color: "text.primary",
                        boxShadow: 3,
                        p: 4,
                        borderRadius: 3,
                    }}
                >
                    <Typography variant="h5" fontWeight="bold" textAlign="center" gutterBottom>
                        Add New Expense
                    </Typography>

                    <TextField
                        label="Amount"
                        fullWidth
                        margin="dense"
                        variant="outlined"
                        type="number"
                        value={expenseData.amount}
                        onChange={(e) => setExpenseData({ ...expenseData, amount: e.target.value })}
                        sx={{ mt:2 }}
                    />
                    <TextField
                        label="Spent or Got from Where"
                        fullWidth
                        margin="dense"
                        variant="outlined"
                        value={expenseData.spentWhere}
                        onChange={(e) => setExpenseData({ ...expenseData, spentWhere: e.target.value })}
                        sx={{ mt:2 }}
                    />

                    <Autocomplete
                        freeSolo
                        options={categories}
                        loading={loading}
                        value={expenseData.category || ""}
                        onInputChange={(event, newValue) => {
                            console.log("Typed category:", newValue);
                            setExpenseData((prev) => ({ ...prev, category: newValue }));
                        }}
                        onChange={(event, newValue) => {
                            console.log("Selected category:", newValue);
                            setExpenseData((prev) => ({ ...prev, category: newValue || "" }));
                        }}
                        getOptionLabel={(option) => option || ""}
                        renderInput={(params) => (
                            <TextField {...params} label="Category" variant="outlined" sx={{ mt:2 }} />
                        )}
                    />

                    <TextField
                        label="Description"
                        fullWidth
                        margin="dense"
                        variant="outlined"
                        multiline
                        rows={3}
                        value={expenseData.description}
                        onChange={(e) => setExpenseData({ ...expenseData, description: e.target.value })}
                        sx={{ mt:2 }}
                    />

                    <Box display="flex" justifyContent="space-between" mt={3}>
                        <Button
                            variant="contained"
                            sx={{ flex: 1, borderRadius: 2, mr: 1.5, backgroundColor: "#3675ff" }}
                            onClick={handleSubmitClick}
                        >
                            Next
                        </Button>
                        <Button
                            variant="outlined"
                            color="error"
                            sx={{ flex: 1, borderRadius: 2 }}
                            onClick={() => setOpen(false)}
                        >
                            Cancel
                        </Button>
                    </Box>
                </Box>
            </Modal>

            <Modal open={confirmModal} onClose={() => setConfirmModal(false)}>
                <Box
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: 350,
                        bgcolor: "background.default",
                        color: "text.primary",
                        boxShadow: 3,
                        p: 4,
                        borderRadius: 3,
                        textAlign: "center",
                    }}
                >
                    <Typography variant="h6" gutterBottom>
                        Is this expense Debited or Credited?
                    </Typography>

                    <Box display="flex" justifyContent="space-between" mt={2}>
                        <Button
                            variant="contained"
                            onClick={() => handleConfirmExpense("debited")}
                            sx={{ backgroundColor: "#ec2d2d", borderRadius: 3 }}
                        >
                            Debited
                        </Button>
                        <Button
                            variant="contained"
                            onClick={() => handleConfirmExpense("credited")}
                            sx={{ backgroundColor: "#00b34f", borderRadius: 3 }}
                        >
                            Credited
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </ThemeProvider>
    );
};

export default AddExpense;

import { useEffect, useState } from "react";
import {
    Box, Card, Typography, TextField, Button, Switch,
    List, ListItem, ListItemText, IconButton, CircularProgress, Modal
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import BaseUrl from "../util/BaseUrl";
import { jwtDecode } from "jwt-decode";
import DashboardLayout from "../common/DashboardLayout";

const Settings = () => {
    const token = localStorage.getItem("token");
    const username = jwtDecode(token).sub;
    const [userData, setUserData] = useState({ name: "", email: "" });
    const [darkMode, setDarkMode] = useState(false);
    const [expenses, setExpenses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchUserDataAndExpenses = async () => {
            try {
                const response = await axios.get(`${BaseUrl}/user/${username}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const user = response.data;
                setUserData({ name: user.name, email: user.email });

                const expensesResponse = await axios.get(`${BaseUrl}/expenses/${user.id}`, {
                    params: { userId: user.id },
                    headers: { Authorization: `Bearer ${token}` },
                });
                setExpenses(expensesResponse.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserDataAndExpenses();
    }, [token, username]);

    const handleDeleteExpense = async (expenseId) => {
        try {
            await axios.delete(`${BaseUrl}/expenses/${expenseId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setExpenses(expenses.filter((expense) => expense.id !== expenseId));
        } catch (error) {
            console.error("Error deleting expense:", error);
        }
    };

    const handleProfileUpdate = async () => {
        try {
            await axios.put(`${BaseUrl}/user/${username}`, userData, {
                headers: { Authorization: `Bearer ${token}` },
            });
            alert("Profile updated successfully!");
        } catch (error) {
            console.error("Error updating profile:", error);
        }
    };

    return (
        <DashboardLayout>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 4, padding: 3, alignItems: "center" }}>
                {/* Profile Settings */}
                <Card sx={{ width: "90%", maxWidth: 600, padding: 3, borderRadius: 3, backgroundColor: "#424141", color: "white" }}>
                    <Typography variant="h5" sx={{ mb: 2 }}>Profile Settings</Typography>
                    <TextField
                        fullWidth
                        label="Name"
                        value={userData.name}
                        onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        fullWidth
                        label="Email"
                        value={userData.email}
                        onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                        sx={{ mb: 2 }}
                    />
                    <Button variant="contained" onClick={handleProfileUpdate}>Update Profile</Button>
                </Card>

                {/* Theme Preferences */}
                <Card sx={{ width: "90%", maxWidth: 600, padding: 3, borderRadius: 3, backgroundColor: "#424141", color: "white" }}>
                    <Typography variant="h5" sx={{ mb: 2 }}>Theme Preferences</Typography>
                    <Typography>Dark Mode</Typography>
                    <Switch checked={darkMode} onChange={() => setDarkMode(!darkMode)} />
                </Card>

                {/* Delete Expenses Button */}
                <Button variant="contained" color="error" onClick={() => setIsModalOpen(true)}>
                    Delete Expenses
                </Button>

                {/* Delete Expenses Modal */}
                <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
                    <Box sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: "90%",
                        maxWidth: 400,
                        bgcolor: "#424141",
                        color: "white",
                        boxShadow: 24,
                        p: 4,
                        borderRadius: 2
                    }}>
                        <Typography variant="h5" sx={{ mb: 2 }}>Delete Expenses</Typography>
                        {loading ? (
                            <CircularProgress color="primary" />
                        ) : (
                            <List>
                                {expenses.length === 0 ? (
                                    <Typography>No expenses found</Typography>
                                ) : (
                                    expenses.map((expense) => (
                                        <ListItem key={expense.id} sx={{ display: "flex", justifyContent: "space-between" }}>
                                            <ListItemText primary={`${expense.category}: ₹${expense.amount}`} secondary={new Date(expense.date).toLocaleDateString()} />
                                            <IconButton onClick={() => handleDeleteExpense(expense.id)} color="error">
                                                <DeleteIcon />
                                            </IconButton>
                                        </ListItem>
                                    ))
                                )}
                            </List>
                        )}
                        <Button fullWidth sx={{ mt: 2 }} variant="contained" onClick={() => setIsModalOpen(false)}>
                            Close
                        </Button>
                    </Box>
                </Modal>
            </Box>
        </DashboardLayout>
    );
};

export default Settings;

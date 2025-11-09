import React from "react";
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Chip} from "@mui/material";

const ExpenseTable = ({ expenses }) => {
    return (
        <>
            <Typography sx={{ ml: 3, mt: 2, fontSize: 24, fontWeight: "bold", color: "#ffffff" }}>
                Recent Expenses
            </Typography>
            <TableContainer component={Paper} sx={{ backgroundColor: "#2e2e2e", borderRadius: 2, overflow: "hidden", mt: 2 }}>
                <Table>
                    <TableHead>
                        <TableRow sx={{ backgroundColor: "rgba(255,145,0,0.94)" }}>
                            {['Date', 'Amount (₹)', 'Category', 'Where', 'Description', 'Time'].map((header) => (
                                <TableCell key={header} sx={{ color: "black", fontSize: 18, fontWeight: "bold" }}>
                                    {header}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {expenses.length > 0 ? (
                            expenses.map((expense, index) => (
                                <TableRow
                                    key={index}
                                    sx={{
                                        backgroundColor: index % 2 === 0 ? "#3a3a3a" : "#2e2e2e",
                                        '&:hover': { backgroundColor: "#505050" }
                                    }}
                                >
                                    <TableCell sx={{ color: "white" }}>
                                        {new Date(expense.date).toLocaleDateString('en-Gb')}
                                    </TableCell>
                                    <TableCell>
                                        <Chip
                                            label={`₹${expense.amount}`}
                                            sx={{
                                                backgroundColor: expense.type === "debited" ? "#ff5d5d" : "#4caf50",
                                                color: "white", fontWeight: "bold"
                                            }}
                                        />
                                    </TableCell>
                                    <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                                        {expense.category.title}
                                    </TableCell>
                                    <TableCell sx={{ color: "white" }}>
                                        {expense.spentWhere}
                                    </TableCell>
                                    <TableCell sx={{ color: "white" }}>
                                        {expense.description}
                                    </TableCell>
                                    <TableCell sx={{ color: "white" }}>
                                        {new Date(expense.date).toLocaleTimeString()}
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={5} sx={{ color: "white", textAlign: "center", fontStyle: "italic" }}>
                                    No expenses found.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
};

export default ExpenseTable;
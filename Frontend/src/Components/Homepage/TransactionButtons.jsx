import { Box, Button } from "@mui/material";

const TransactionButtons = ({ showAllTransactions, setShowAllTransactions, setShowAddExpenseModal }) => {
    return (
        <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
            <Button
                variant="contained"
                onClick={() => setShowAllTransactions((prev) => !prev)}
                sx={{ mt: 3, mr: 15, ml: 15, borderRadius: 2 }}
            >
                {showAllTransactions ? "Show Recent Expenses" : "See All Transactions"}
            </Button>
            <Button
                variant="contained"
                onClick={() => setShowAddExpenseModal(true)}
                sx={{ mt: 3, mr: 15, borderRadius: 2 }}
            >
                Add Expense
            </Button>
        </Box>
    );
};

export default TransactionButtons;

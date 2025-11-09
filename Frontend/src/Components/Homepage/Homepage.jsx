import React, { useState } from "react";
import DashboardLayout from "../../common/DashboardLayout";
import AddExpense from "./AddExpense";
import useTokenValidation from "../Auth/TokenValidation";
import HomepageContent from "./HomepageContent";
import TransactionButtons from "./TransactionButtons";

const Homepage = () => {
    const [showAllTransactions, setShowAllTransactions] = useState(false);
    const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
    const expenses = useTokenValidation();

    return (
        <DashboardLayout>
            <HomepageContent showAllTransactions={showAllTransactions} expenses={expenses} />
            <TransactionButtons
                showAllTransactions={showAllTransactions}
                setShowAllTransactions={setShowAllTransactions}
                setShowAddExpenseModal={setShowAddExpenseModal}
            />
            <AddExpense open={showAddExpenseModal} setOpen={setShowAddExpenseModal} />
        </DashboardLayout>
    );
};

export default Homepage;

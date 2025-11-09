import Heading from "../../common/Heading";
import UserBalanceAvgSpendGrid from "./HomepageDataGrid/UserBalanceAvgSpendGrid";
import ExpenseTable from "./ExpenseTable";
import SeeTransactions from "./SeeTransactions";
import MonthlyReport from "../MonthlyReport/MonthlyReport";

const HomepageContent = ({ showAllTransactions, expenses, showMonthlyAnalysis }) => {
    if(showAllTransactions)
        return <SeeTransactions />
    if(showMonthlyAnalysis)
        return <MonthlyReport/>
    return (
        <>
            <Heading />
            <UserBalanceAvgSpendGrid />
            <ExpenseTable expenses={expenses} />
        </>
    );
};

export default HomepageContent;

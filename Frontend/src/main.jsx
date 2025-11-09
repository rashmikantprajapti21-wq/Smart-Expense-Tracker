import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Components/Auth/Login";
import Homepage from "./Components/Homepage/Homepage";
import SignUp from "./Components/Auth/SignUp";
import SeeTransactions from "./Components/Homepage/SeeTransactions";
import MonthlyReport from "./Components/MonthlyReport/MonthlyReport";
import Settings from "./Settings/Settings";

const Scripts = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login/>}/>
                <Route path="/homepage" element={<Homepage/>}/>
                <Route path="/sign-up" element={<SignUp/>}/>
                <Route path="/transactions" element={<SeeTransactions/>}/>
                <Route path="/monthly-analysis" element={<MonthlyReport/>}/>
                <Route path="/settings" element={<Settings />}/>
            </Routes>
        </Router>
    );
};

const rootElement = ReactDOM.createRoot(document.getElementById("root"));
rootElement.render(<Scripts />);

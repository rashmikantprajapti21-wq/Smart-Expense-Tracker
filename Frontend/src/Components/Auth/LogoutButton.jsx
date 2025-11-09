import React from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

    return (
        <Button variant="contained" sx={{ mt: 3, backgroundColor: "#d32f2f", width:"100%", borderRadius:3 }} onClick={handleLogout}>
            Logout
        </Button>
    );
};

export default LogoutButton;

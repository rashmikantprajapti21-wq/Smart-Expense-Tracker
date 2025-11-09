import React from "react";
import { Box, Card } from "@mui/material";
import SideBar from "./SideBar";

const DashboardLayout = ({ children }) => {
    return (
        <Box
            sx={{
                display: "flex",
                height: "100vh",
                width: "100vw",
                backgroundColor: "black",
            }}
        >
            {/* Sidebar on the extreme left */}
            <SideBar />
            {/* Main Content Area */}
            <Box
                sx={{
                    flexGrow: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: 3,
                }}
            >
                <Card
                    raised
                    elevation={10}
                    variant="outlined"
                    sx={{
                        backgroundColor: "#1e1e1e",
                        color: "white",
                        width: "97%",
                        height: "100%",
                        borderRadius: 5,
                        padding: 3,
                        overflowY: "auto", // Enables vertical scrolling
                        // maxHeight: "85vh", // Prevents excessive height
                    }}
                >
                    {children}
                </Card>
            </Box>
        </Box>
    );
};

export default DashboardLayout;
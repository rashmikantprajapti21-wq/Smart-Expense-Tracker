import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { Typography } from "@mui/material";
import { motion } from "framer-motion";
import "@fontsource/archivo-black"; // Defaults to weight 400

const Heading = () => {
    const [username, setUsername] = useState("");

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            try {
                const decoded = jwtDecode(token);
                setUsername(decoded.sub);
            } catch (error) {
                console.error("Invalid token:", error);
            }
        }
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0, y: -30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut", type: "spring", stiffness: 120 }}
            style={{
                textAlign: "center",
                marginTop: "30px",
            }}
        >
            <Typography
                variant="h3"
                component="h1"
                sx={{
                    fontFamily: "'Archivo Black', sans-serif",
                    backgroundImage: "linear-gradient(90deg, #4facfe, #00f2fe)",
                    // backgroundColor:"white",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    display: "inline-block",
                    padding: "12px",
                    letterSpacing: "2px",
                    fontWeight: "bold",
                    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
                }}
            >
                Welcome back, {username}
            </Typography>

        </motion.div>
    );
};

export default Heading;

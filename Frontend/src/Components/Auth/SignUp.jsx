import { Box, Button, Card, Container, TextField, ThemeProvider, Typography, LinearProgress } from "@mui/material";
import Logo from "../../util/Logo.png";
import darkTheme from "../../util/darkTheme";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import BaseUrl from "../../util/BaseUrl";

const SignUp = () => {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [salary, setSalary] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [usernameError, setUsernameError] = useState(false); // New state

    const handleSignUp = async () => {
        setLoading(true);
        setUsernameError(false); // Reset error state

        try {
            const signUpResponse = await axios.post(`${BaseUrl}/user/sign-up`, {
                name,
                username,
                email,
                password,
                salary
            });

            if (signUpResponse.status === 201) {
                navigate("/");
            }
        } catch (err) {
            const errorMessage = err.response?.data?.message || "An error occurred. Please try again.";
            setError(errorMessage);

            // Check if the error is due to username unavailability
            if (errorMessage.toLowerCase().includes("username")) {
                setUsernameError(true);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <ThemeProvider theme={darkTheme}>
            <Container>
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexDirection: "column",
                        minHeight: "100vh",
                    }}
                >
                    <Card
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexDirection: "column",
                            p: 5,
                            width: "50vw",
                            maxWidth: "50vw",
                            borderRadius: 7,
                            backgroundColor: "black",
                            position: "relative"
                        }}
                    >
                        {loading && <LinearProgress sx={{ position: "absolute", top: 0, left: 0, width: "100%", borderRadius: "7px 7px 0 0" }} />}

                        <Box sx={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", filter: loading ? "blur(3px)" : "none", pointerEvents: loading ? "none" : "auto", transition: "filter 0.3s ease-in-out" }}>
                            <Box sx={{ display: "flex", alignItems: "center", alignSelf: "flex-start", mb: 3 }}>
                                <img src={Logo} alt="Logo" style={{ width: 90, height: 80, marginRight: 8 }} />
                                <Typography variant="h3" sx={{ mt: 2 }}>
                                    Make an account and Spend Smart
                                </Typography>
                            </Box>
                            <TextField
                                variant="outlined"
                                required
                                autoComplete="off"
                                id="name"
                                name="name"
                                label="Name"
                                autoFocus
                                fullWidth
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                sx={{ mt: 3 }}
                            />
                            <TextField
                                variant="outlined"
                                required
                                autoComplete="username"
                                id="username"
                                name="username"
                                label="Username"
                                fullWidth
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                error={usernameError} // Turns red if true
                                sx={{ mt: 3 }}
                            />
                            <TextField
                                variant="outlined"
                                required
                                autoComplete="off"
                                id="email"
                                name="email"
                                label="Email"
                                fullWidth
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                sx={{ mb: 3, mt: 3 }}
                            />
                            <TextField
                                variant="outlined"
                                required
                                autoComplete="off"
                                id="password"
                                name="password"
                                label="Password"
                                type="password"
                                fullWidth
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                sx={{ mb: 3 }}
                            />
                            <TextField
                                variant="outlined"
                                required
                                autoComplete="off"
                                id="salary"
                                name="salary"
                                label="Salary or Pocket Money"
                                type="number"
                                fullWidth
                                value={salary}
                                onChange={(e) => setSalary(e.target.value)}
                                sx={{ mb: 3 }}
                            />
                            {error && !usernameError && <Typography color="error">{error}</Typography>}
                            <Button
                                variant="contained"
                                sx={{
                                    backgroundColor: "#0187e6",
                                    maxWidth: "70%",
                                    width: "40vh",
                                    borderRadius: 3,
                                    color: "white",
                                }}
                                onClick={handleSignUp}
                                disabled={loading}
                            >
                                {loading ? "Creating Account..." : "Sign Up"}
                            </Button>
                            <Typography variant="body2" sx={{ mt: 2 }}>
                                Already have an account?{" "}
                                <Link to="/" style={{ color: "#0187e6" }}>Log In</Link>
                            </Typography>
                        </Box>
                    </Card>
                </Box>
            </Container>
        </ThemeProvider>
    );
};

export default SignUp;

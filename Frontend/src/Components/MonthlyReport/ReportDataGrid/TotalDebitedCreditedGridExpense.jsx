import Grid from "@mui/material/Grid";
import { Card, CardContent, Typography } from "@mui/material";
import React from "react";
import TotalDebited from "./TotalDebited";
import TotalCredited from "./TotalCredited";
import MostExpensivePurchase from "./MostExpensivePurchase";

const TotalDebitedCreditedExpensiveGrid = () => {
    return (
        <Grid container spacing={3} sx={{ marginBottom: 2, justifyContent: "center" }}>
            <Grid item xs={12} sm={4} sx={{ display: "flex", justifyContent: "center" }}>
                <Card
                    sx={{
                        borderRadius: 4,
                        background: "rgba(255, 255, 255, 0.1)",
                        backdropFilter: "blur(8px)",
                        width: "100%",
                        maxWidth: 350,
                        padding: 3,
                        textAlign: "center",
                        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
                        transition: "transform 0.2s ease-in-out",
                        "&:hover": { transform: "scale(1.05)", boxShadow: "0px 6px 20px rgba(0, 0, 0, 0.3)" }
                    }}
                >
                    <CardContent>
                        <Typography variant="h6" sx={{ color: "#00dc6e", fontWeight: "bold" }}>
                            Total Credited this Month
                        </Typography>
                        <Typography variant="h3" sx={{ color: "white", fontWeight: "bold", mt: 1 }}>
                            <TotalCredited />
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>

            <Grid item xs={12} sm={4} sx={{ display: "flex", justifyContent: "center" }}>
                <Card
                    sx={{
                        borderRadius: 4,
                        background: "rgba(255, 255, 255, 0.1)",
                        backdropFilter: "blur(8px)",
                        width: "100%",
                        maxWidth: 350,
                        padding: 2,
                        textAlign: "center",
                        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
                        transition: "transform 0.2s ease-in-out",
                        "&:hover": { transform: "scale(1.05)", boxShadow: "0px 6px 20px rgba(0, 0, 0, 0.3)" }
                    }}
                >
                    <CardContent>
                        <Typography variant="h6" sx={{ color: "#ff5d5d", fontWeight: "bold", fontSize: 21 }}>
                            Total Debited this Month
                        </Typography>
                        <Typography variant="h3" sx={{ color: "white", fontWeight: "bold", mt: 1 }}>
                            <TotalDebited />
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>

            <Grid item xs={12} sm={4} sx={{ display: "flex", justifyContent: "center" }}>
                <Card
                    sx={{
                        borderRadius: 4,
                        background: "rgba(255, 255, 255, 0.1)",
                        backdropFilter: "blur(8px)",
                        width: "100%",
                        maxWidth: 350,
                        padding: 2,
                        textAlign: "center",
                        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
                        transition: "transform 0.2s ease-in-out",
                        "&:hover": { transform: "scale(1.05)", boxShadow: "0px 6px 20px rgba(0, 0, 0, 0.3)" }
                    }}
                >
                    <CardContent>
                        <Typography variant="h6" sx={{ color: "#406ae8", fontWeight: "bold", fontSize: 21 }}>
                            Most Expensive Purchase this Month
                        </Typography>
                        <Typography variant="h3" sx={{ color: "white", fontWeight: "bold", mt: 1 }}>
                            <MostExpensivePurchase />
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
}

export default TotalDebitedCreditedExpensiveGrid;
import { Grid, Card, CardContent, Typography } from "@mui/material";
import CurrentBalance from "./CurrentBalance";
import AverageSpend from "./AverageSpend";
import React from "react";

const UserBalanceAvgSpendGrid = () => {
  return (
    <Grid
      container
      spacing={3}
      sx={{ marginBottom: 2, justifyContent: "center" }}
    >
      {/* Current Balance Card */}
      <Grid
        item
        xs={12}
        sm={6}
        sx={{ display: "flex", justifyContent: "center" }}
      >
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
            "&:hover": {
              transform: "scale(1.05)",
              boxShadow: "0px 6px 20px rgba(0, 0, 0, 0.3)",
            },
          }}
        >
          <CardContent>
            <Typography
              variant="h6"
              sx={{ color: "#ffc107", fontWeight: "bold" }}
            >
              Current Balance
            </Typography>
            <Typography
              variant="h3"
              sx={{ color: "white", fontWeight: "bold", mt: 1 }}
            >
              <CurrentBalance />
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      {/* Average Spend Card */}
      <Grid
        item
        xs={12}
        sm={6}
        sx={{ display: "flex", justifyContent: "center" }}
      >
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
            "&:hover": {
              transform: "scale(1.05)",
              boxShadow: "0px 6px 20px rgba(0, 0, 0, 0.3)",
            },
          }}
        >
          <CardContent>
            <Typography
              variant="h6"
              sx={{ color: "#ff5d5d", fontWeight: "bold", fontSize: 21 }}
            >
              Average Spend this Month is
            </Typography>
            <Typography
              variant="h3"
              sx={{ color: "white", fontWeight: "bold", mt: 1 }}
            >
              <AverageSpend />
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default UserBalanceAvgSpendGrid;

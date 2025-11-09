import { Bar, Line } from "react-chartjs-2";
import { useEffect, useState } from "react";
import axios from "axios";
import BaseUrl from "../../util/BaseUrl";
import {jwtDecode} from "jwt-decode";
import { Box, Card, CircularProgress, Typography, Button, ButtonGroup } from "@mui/material";
import {Chart as ChartJS, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend, PointElement, LineElement} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import DashboardLayout from "../../common/DashboardLayout";
import TotalDebitedCreditedGrid from "./ReportDataGrid/TotalDebitedCreditedGridExpense";

// Register Chart.js components
ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend, PointElement, LineElement);
ChartJS.register(ChartDataLabels);

const MonthlyReport = () => {
    const [categoryWiseSpend, setCategoryWiseSpend] = useState([]);
    const [dailySpend, setDailySpend] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedType, setSelectedType] = useState("debited");
    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const username = jwtDecode(token).sub;
                const userIdResponse = await axios.get(`${BaseUrl}/user/${username}`);
                const userId = userIdResponse.data;
                localStorage.setItem("userId", userId);

                const categoryResponse = await axios.get(`${BaseUrl}/report/category`, {
                    params: { userId },
                    headers: { Authorization: `Bearer ${token}` },
                });
                setCategoryWiseSpend(categoryResponse.data);

                const dailyResponse = await axios.get(`${BaseUrl}/report/daily`, {
                    params: { userId },
                    headers: { Authorization: `Bearer ${token}` },
                });
                setDailySpend(dailyResponse.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [token]);

    // Extract category labels, values, and types
    const labels = categoryWiseSpend.map((item) => item[0]); // Category names
    const dataValues = categoryWiseSpend.map((item) => item[1]); // Amount spent
    const types = categoryWiseSpend.map((item) => item[2]); // debited/credited

    // Assign colors based on type
    const backgroundColors = types.map(type => (type === "debited" ? "rgba(255, 99, 132, 0.6)" : "rgba(75, 192, 75, 0.6)"));

    const categoryChartData = {
        labels: labels,
        datasets: [
            {
                label: "Amount",
                data: dataValues,
                backgroundColor: backgroundColors,
                borderColor: "rgba(0, 0, 0, 0.8)",
                borderWidth: 1,
            },
        ],
    };

    const categoryChartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        layout: {
            padding: {
                top: 35, // <-- Adds top padding
            },
        },
        plugins: {
            legend: { display: false },
            tooltip: { enabled: true },
            datalabels: {
                anchor: "end",
                align: "top",
                formatter: (value) => `₹${value}`,
                font: { weight: "bold", size: 14 },
                color: "#ffffff",
            },
        },
        scales: {
            x: {
                ticks: { color: "#ffffff" },
                grid: { color: "rgba(255, 255, 255, 0.1)" },
            },
            y: { display: false },
        },
    };

    // Extract daily spend data based on selected type
    const dailyFiltered = dailySpend.filter(item => item[2] === selectedType);
    const dailyLabels = dailyFiltered.map((item) => {
        const date = new Date(item[1]);
        return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    });

    const dailyValues = dailyFiltered.map((item) => item[0]);

    const dailyChartData = {
        labels: dailyLabels,
        datasets: [
            {
                label: `${selectedType.charAt(0).toUpperCase() + selectedType.slice(1)} Spending`,
                data: dailyValues,
                borderColor: selectedType === "debited" ? "rgba(255, 99, 132, 1)" : "rgba(75, 192, 75, 1)",
                backgroundColor: selectedType === "debited" ? "rgba(255, 99, 132, 0.5)" : "rgba(75, 192, 75, 0.5)",
                borderWidth: 2,
                pointBackgroundColor: "#ffffff",
                pointBorderColor: "#ffffff",
                pointRadius: 5,
            },
        ],
    };

    const dailyChartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        layout: {
            padding: {
                top: 30, // Adds padding to prevent labels from going out
            },
        },
        plugins: {
            legend: { display: false },
            tooltip: { enabled: true },
            datalabels: {
                align: "top",
                formatter: (value) => `₹${value}`,
                font: { weight: "bold", size: 14 },
                color: "#ffffff",
                clip: false, // Prevents labels from being cut off
            },
        },
        scales: {
            x: {
                ticks: { color: "#ffffff" },
                grid: { color: "rgba(255, 255, 255, 0.1)" },
            },
            y: { display: false },
        },
    };

    return (
        <DashboardLayout>
            <TotalDebitedCreditedGrid/>
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4, padding: 3 }}>
                <Card sx={{ width: "90%", maxWidth: 900, padding: 3, borderRadius: 3, backgroundColor: "#424141", boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)", color: "white" }}>
                    <Typography variant="h5" sx={{ mb: 2, textAlign: "center" }}>Category-wise Monthly Expense Report</Typography>
                    {loading ? <CircularProgress color="primary" /> : <Box sx={{ height: 350 }}><Bar data={categoryChartData} options={categoryChartOptions} /></Box>}
                </Card>
                <Card sx={{ width: "90%", maxWidth: 900, padding: 3, borderRadius: 3, backgroundColor: "#424141", boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)", color: "white" }}>
                    <Typography variant="h5" sx={{ mb: 2, textAlign: "center" }}>Daily Spending Trend</Typography>
                    <ButtonGroup>
                        <Button sx={{ mb: 2 }} onClick={() => setSelectedType("debited")} variant={selectedType === "debited" ? "contained" : "outlined"}>Debited</Button>
                        <Button sx={{ mb: 2 }} onClick={() => setSelectedType("credited")} variant={selectedType === "credited" ? "contained" : "outlined"}>Credited</Button>
                    </ButtonGroup>
                    {loading ? <CircularProgress color="primary" /> : <Box sx={{ height: 350 }}><Line data={dailyChartData} options={dailyChartOptions} /></Box>}
                </Card>
            </Box>
        </DashboardLayout>
    );
};

export default MonthlyReport;
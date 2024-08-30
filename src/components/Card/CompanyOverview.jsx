import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { useDispatch, useSelector } from "react-redux";
import { fetchDataChart } from "../../redux/slices/dashboardSlice";
import {
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Card,
  Box,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";

// Register the necessary components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const CompanyOverview = () => {
  const dispatch = useDispatch();
  const { dataChart, loading, error } = useSelector((state) => state.dashboard);

  const [dateRange, setDateRange] = useState("today");

  const handleDateRangeChange = (event) => {
    setDateRange(event.target.value);
  };

  useEffect(() => {
    let startDate = dayjs().format("YYYY-MM-DD");
    let endDate = dayjs().format("YYYY-MM-DD");

    if (dateRange === "this_week") {
      startDate = dayjs().subtract(7, "day").format("YYYY-MM-DD");
    } else if (dateRange === "this_month") {
      startDate = dayjs().subtract(30, "day").format("YYYY-MM-DD");
    }

    dispatch(fetchDataChart({ startDate, endDate }));
  }, [dispatch, dateRange]);

  console.log("dataChart:", dataChart);

  const chartData = {
    labels: Array.isArray(dataChart)
      ? dataChart.map((item) => item.company_name)
      : [],
    datasets: [
      {
        label: "Percentage",
        data: Array.isArray(dataChart)
          ? dataChart.map((item) => item.percentage)
          : [],
        backgroundColor: [
          "#FFC107",
          "#2196F3",
          "#F44336",
          "#4CAF50",
          "#8BC34A",
        ],
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <Card sx={{ padding: 2 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h6">Company Overview</Typography>
        <FormControl variant="outlined" sx={{ minWidth: 150 }}>
          <InputLabel>Date Range</InputLabel>
          <Select
            value={dateRange}
            onChange={handleDateRangeChange}
            label="Date Range"
          >
            <MenuItem value="today">Today</MenuItem>
            <MenuItem value="this_week">This Week</MenuItem>
            <MenuItem value="this_month">This Month</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Bar data={chartData} options={options} />
    </Card>
  );
};

export default CompanyOverview;

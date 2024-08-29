import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  scales,
} from "chart.js";
import { useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { useDispatch, useSelector } from "react-redux";
import { fetchDataChart } from "../../redux/slices/dashboardSlice";

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

  useEffect(() => {
    dispatch(fetchDataChart());
  }, [dispatch]);

  console.log("dataChart:", dataChart);

  const chartData = {
    labels: Array.isArray(dataChart) ? dataChart.map((item) => item.company_name) : [],
    datasets: [
      {
        label: "Percentage",
        data: Array.isArray(dataChart) ? dataChart.map((item) => item.percentage) : [],
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


  // const data = {
  //   labels: [
  //     "Arutalalab",
  //     "Padepokan79",
  //     "Gudang Garam",
  //     "Telkom Indonesia",
  //     "Unilever Indonesia",
  //   ],
  //   datasets: [
  //     {
  //       label: "Percentage",
  //       data: [87, 95, 80, 100, 100],
  //       backgroundColor: [
  //         "#FFC107",
  //         "#2196F3",
  //         "#F44336",
  //         "#4CAF50",
  //         "#8BC34A",
  //       ],
  //     },
  //   ],
  // };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return <Bar data={chartData} options={options} />;
};

export default CompanyOverview;

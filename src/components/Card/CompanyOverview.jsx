import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

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
  const data = {
    labels: [
      "Arutalalab",
      "Padepokan79",
      "Gudang Garam",
      "Telkom Indonesia",
      "Unilever Indonesia",
    ],
    datasets: [
      {
        label: "Percentage",
        data: [87, 95, 80, 100, 100],
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

  return <Bar data={data} options={options} />;
};

export default CompanyOverview;

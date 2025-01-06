import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
  ChartData,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

const options1: ChartOptions<"line"> = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Inspection per Day",
    },
  },
};

const labels1: string[] = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
];

const data1: ChartData<"line"> = {
  labels: labels1,
  datasets: [
    {
      label: "Dataset 1",
      data: [120, 150, 100, 180, 220, 160, 200],
      borderColor: "rgb(99,102,241)",
      backgroundColor: "rgba(99, 102, 241, 0.5)",
    },
  ],
};

const options2: ChartOptions<"line"> = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Chats per Day",
    },
  },
};

const labels2: string[] = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
];

const data2: ChartData<"line"> = {
  labels: labels2,
  datasets: [
    {
      label: "Dataset 1",
      data: [80, 100, 90, 140, 130, 110, 150],
      borderColor: "rgb(99,102,241)",
      backgroundColor: "rgba(99, 102, 241, 0.5)",
    },
  ],
};

const options3: ChartOptions<"line"> = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Average Completion Time",
    },
  },
};

const labels3: string[] = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
];

const data3: ChartData<"line"> = {
  labels: labels3,
  datasets: [
    {
      label: "Dataset 1",
      data: [200, 180, 190, 220, 240, 210, 230],
      borderColor: "rgb(99,102,241)",
      backgroundColor: "rgba(99, 102, 241, 0.5)",
    },
  ],
};

export default function DashboardMetrics(): JSX.Element {
  return (
    <div className="flex flex-wrap -mx-2">
      <div className="w-1/3 px-2 mb-4">
        <div className="p-2 border rounded-lg shadow-md border-slate-100">
          <Line options={options1} data={data1} />
        </div>
      </div>
      <div className="w-1/3 px-2 mb-4">
        <div className="p-2 border rounded-lg shadow-md border-slate-100">
          <Line options={options2} data={data2} />
        </div>
      </div>
      <div className="w-1/3 px-2 mb-4">
        <div className="p-2 border rounded-lg shadow-md border-slate-100">
          <Line options={options3} data={data3} />
        </div>
      </div>
    </div>
  );
}

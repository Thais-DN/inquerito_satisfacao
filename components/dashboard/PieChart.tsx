// components/PieChart.tsx
import React from 'react';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartOptions,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);


interface PieChartProps {
  data: { label: string; value: number }[];
  title: string;
}

const PieChart: React.FC<PieChartProps> = ({ data, title }) => {
  const labels = data.map(item => item.label);
  const values = data.map(item => item.value);

  const pieChartData = {
    labels: labels,
    datasets: [
      {
        data: values,
        backgroundColor: ['#1E90FF', '#ADD8E6', '#FF6384', '#36A2EB', '#FFCE56', '#8A2BE2', '#A52A2A'],
        hoverBackgroundColor: ['#4682B4', '#B0E0E6', '#FF6384', '#36A2EB', '#FFCE56', '#7B68EE', '#B22222'],
        borderColor: ['#104E8B', '#87CEFA', '#FF6384', '#36A2EB', '#FFCE56', '#6A5ACD', '#8B0000'],
        borderWidth: 2,
      },
    ],
  };

  const pieChartOptions: ChartOptions<'pie'> = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      title: {
        display: true,
        text: title,
      },
    },
  };

  return <Pie data={pieChartData} options={pieChartOptions} />;
};

export default PieChart;

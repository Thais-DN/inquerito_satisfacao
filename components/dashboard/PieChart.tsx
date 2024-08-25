// components/PieChart.tsx
import React from 'react';
import { Pie } from 'react-chartjs-2';
import { ChartOptions } from 'chart.js';

interface PieChartProps {
  data: { label: string; value: number }[];
  title: string;
}

const PieChart: React.FC<PieChartProps> = ({ data, title }) => {
  const pieChartData = {
    labels: ["sim", "não"],
    datasets: [
      {
        data: [data.map(item => item.value)],
        backgroundColor: ['#1E90FF', '#ADD8E6', '#FF6384', '#36A2EB', '#FFCE56'],
        hoverBackgroundColor: ['#4682B4', '#B0E0E6', '#FF6384', '#36A2EB', '#FFCE56'],
        borderColor: ['#104E8B', '#87CEFA', '#FF6384', '#36A2EB', '#FFCE56'],
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

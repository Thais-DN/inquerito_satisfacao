import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from 'chart.js';

// Registrar as escalas e outros componentes do Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface BarChartProps {
  data: number[];
}

const BarChart: React.FC<BarChartProps> = ({ data }) => {
  const barChartData = {
    labels: ['Administrativo', 'Médicos', 'Geral'],
    datasets: [
      {
        data,
        backgroundColor: ['#AFEEEE', '#E6E6FA', '#F5DEB3'],
        borderColor: ['#5FAF9E', '#B6B6DA', '#D3AE73'],
        borderWidth: 1,
      },
    ],
  };

  const barChartOptions: ChartOptions<'bar'> = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
        position: 'top',
      },
      title: {
        display: true,
        text: 'Satisfação por pergunta',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 5, // Range from 1 to 5
        ticks: {
          stepSize: 1,
        },
      },
    },
  };

  return <Bar data={barChartData} options={barChartOptions} />;
};

export default BarChart;

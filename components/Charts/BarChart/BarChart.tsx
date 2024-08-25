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
        label: 'Satisfação do Usuário',
        data,
        backgroundColor: ['#363b56', '#4e8baa', '#0fa5ab'],
        borderWidth: 1,
      },
    ],
  };

  const barChartOptions: ChartOptions<'bar'> = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      title: {
        display: true,
        text: 'Média de Satisfação por Pergunta',
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

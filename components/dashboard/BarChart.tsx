// components/BarChart.tsx
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { ChartOptions } from 'chart.js';

interface BarChartProps {
  data: number[];
}

const BarChart: React.FC<BarChartProps> = ({ data }) => {
  const barChartData = {
    labels: ['Pergunta 01', 'Pergunta 02', 'Pergunta 03', 'Pergunta 04', 'Pergunta 05'],
    datasets: [
      {
        label: 'Satisfação do Usuário',
        data,
        backgroundColor: ['#363b56', '#4e8baa', '#0fa5ab', '#c8a2c8', '#d3aef4'],
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

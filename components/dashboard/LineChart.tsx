// components/dashboard/LineChart.tsx
import React from 'react';
import { Line } from 'react-chartjs-2';
import { ChartOptions } from 'chart.js';

interface LineChartProps {
  data: number[];
}

const LineChart: React.FC<LineChartProps> = ({ data }) => {
  const lineChartData = {
    labels: ['0%', '25%', '50%', '75%', '100%'],
    datasets: [
      {
        label: 'Número de Pessoas',
        data,
        fill: false,
        borderColor: '#6A0DAD',
        backgroundColor: '#6A0DAD',
        tension: 0.1,
        pointBackgroundColor: '#6A0DAD',
        pointBorderColor: '#fff',
      },
    ],
  };

  const lineChartOptions: ChartOptions<'line'> = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      title: {
        display: true,
        text: 'Distribuição de Probabilidade de Escolha',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1, // Incremento de 1 para mostrar cada pessoa
        },
      },
      x: {
        title: {
          display: true,
          text: 'Porcentagem de Escolha',
        },
      },
    },
  };

  return <Line data={lineChartData} options={lineChartOptions} />;
};

export default LineChart;

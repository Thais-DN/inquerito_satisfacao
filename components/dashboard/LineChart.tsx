// components/LineChart.tsx
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
        label: 'Probabilidade de Escolha',
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
        max: 100, // Percentual de 0 a 100
        ticks: {
          stepSize: 25,
        },
      },
    },
  };

  return <Line data={lineChartData} options={lineChartOptions} />;
};

export default LineChart;

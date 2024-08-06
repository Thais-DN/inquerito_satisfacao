// components/PieChart.tsx
import React from 'react';
import { Pie } from 'react-chartjs-2';
import { ChartOptions } from 'chart.js';

interface PieChartProps {
  yesPercentage: number;
  noPercentage: number;
}

const PieChart: React.FC<PieChartProps> = ({ yesPercentage, noPercentage }) => {
  const pieChartData = {
    labels: ['Sim', 'Não'],
    datasets: [
      {
        data: [yesPercentage, noPercentage],
        backgroundColor: ['#4e8baa', '#d3aef4'],
        hoverBackgroundColor: ['#4e8baa', '#d3aef4'],
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
        text: 'Distribuição de Respostas Sim/Não para a Pergunta 6',
      },
    },
  };

  return <Pie data={pieChartData} options={pieChartOptions} />;
};

export default PieChart;

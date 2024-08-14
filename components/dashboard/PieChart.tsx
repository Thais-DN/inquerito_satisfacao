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
        backgroundColor: ['#1E90FF', '#ADD8E6'], // Azul mais escuro e azul claro
        hoverBackgroundColor: ['#4682B4', '#B0E0E6'], // Azul com um tom metálico e azul pálido
        borderColor: ['#104E8B', '#87CEFA'], // Bordas com azul ainda mais escuro e azul claro brilhante
        borderWidth: 5, // Define a largura da borda para 2px
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

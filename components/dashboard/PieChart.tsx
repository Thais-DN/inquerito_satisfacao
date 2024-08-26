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
        backgroundColor: [
          '#FFB6C1', // LightPink - Facebook
          '#FFDAB9', // PeachPuff - Instagram
          '#E6E6FA', // Lavender - LinkedIn
          '#FFDEAD', // NavajoWhite - Google
          '#D8BFD8', // PaleGreen - Site Oficial
          '#AFEEEE', // PaleTurquoise - Panfleto
          '#FFE4E1', // MistyRose - Indicação de amigo ou familiar
          '#F5DEB3', // Wheat - Através de empresa parceira
          '#98FB98', // Thistle - Outros
        ],
        hoverBackgroundColor: [
          '#FFA07A', // LightSalmon - Facebook
          '#FFCBA4', // Deep Peach - Instagram
          '#D8BFD8', // Thistle - LinkedIn
          '#FFEC8B', // Light Goldenrod - Google
          '#E0B0FF', // LightGreen - Site Oficial
          '#B0E0E6', // PowderBlue - Panfleto
          '#FFDAB9', // PeachPuff - Indicação de amigo ou familiar
          '#FFE4B5', // Moccasin - Através de empresa parceira
          '#90EE90', // Mauve - Outros
        ],
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

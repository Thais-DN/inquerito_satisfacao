// pages/index.tsx
"use client";

import React, { useEffect, useState } from 'react';
import { supabase } from '@/service/dbconnection';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import BarChart from '@/components/dashboard/BarChart';
import PieChart from '@/components/dashboard/PieChart';

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);

interface SurveyData {
  id: number;
  email: string;
  pergunta_01: string;
  pergunta_02: string;
  pergunta_03: string;
  pergunta_04: string;
  pergunta_05: string;
  pergunta_06: string;
}

const Dashboard: React.FC = () => {
  const [surveyData, setSurveyData] = useState<SurveyData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      const { data, error } = await supabase.from('tabela_inquerito').select('id, email, pergunta_01, pergunta_02, pergunta_03, pergunta_04, pergunta_05, pergunta_06');

      if (error) {
        console.error('Erro ao buscar dados:', error);
      } else {
        setSurveyData(data || []);
      }
      setLoading(false);
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  // Calculate total responses and averages
  const totalResponses = surveyData.length;
  const averageScores = calculateAverageScores(surveyData);
  const overallAverage = calculateOverallAverage(averageScores);

  // Calculate Yes/No percentages for question 6
  const { yesPercentage, noPercentage } = calculateYesNoPercentages(surveyData);

  return (
    <div className="bg-gradient-to-br h-screen from-blue-200 to-purple-300 font-signika">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold ml-2 mb-8">Resultados - 2024</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Card for Total Number of Responses */}
          <div className="card flex flex-col items-center justify-center bg-white bg-opacity-20 rounded-lg p-4 shadow-lg text-center">
            <p className="font-semibold">Número de clientes</p>
            <p className="text-2xl font-bold">{totalResponses}</p>
          </div>

          {/* Card for Overall Average Score */}
          <div className="card flex flex-col items-center justify-center bg-white bg-opacity-20 rounded-lg p-4 shadow-lg text-center">
            <p className="font-semibold">Média geral</p>
            <p className="text-2xl font-bold">{overallAverage.toFixed(2)}</p>
          </div>
        </div>

        <div className="mt-8 h-96 flex justify-around bg-white bg-opacity-20 p-6 rounded-lg shadow-lg">
          <BarChart data={averageScores} />
          <PieChart yesPercentage={yesPercentage} noPercentage={noPercentage} />
        </div>
      </div>
    </div>
  );
};

// Utility functions
const calculateAverageScores = (data: SurveyData[]) => {
  const sums = Array(5).fill(0);
  data.forEach((entry) => {
    sums[0] += parseFloat(entry.pergunta_01 || '0');
    sums[1] += parseFloat(entry.pergunta_02 || '0');
    sums[2] += parseFloat(entry.pergunta_03 || '0');
    sums[3] += parseFloat(entry.pergunta_04 || '0');
    sums[4] += parseFloat(entry.pergunta_05 || '0');
  });
  return sums.map((sum) => sum / data.length); // Average from 1 to 5
};

const calculateOverallAverage = (averageScores: number[]) => {
  const total = averageScores.reduce((acc, score) => acc + score, 0);
  return total / averageScores.length;
};

const calculateYesNoPercentages = (data: SurveyData[]) => {
  const counts = { yes: 0, no: 0 };
  data.forEach((entry) => {
    if (entry.pergunta_06 === '1') {
      counts.yes += 1;
    } else if (entry.pergunta_06 === '2') {
      counts.no += 1;
    }
  });

  const total = counts.yes + counts.no;
  const yesPercentage = (counts.yes / total) * 100;
  const noPercentage = (counts.no / total) * 100;

  return { yesPercentage, noPercentage };
};

export default Dashboard;

"use client"
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/service/dbconnection';
import PieChart from '@/components/dashboard/PieChart';
import LineChart from '@/components/dashboard/LineChart';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { format } from 'date-fns'; // Para formatar as datas
import GaugeChartCustom from '@/components/Charts/GaugeChart';
import Navbar from '@/components/DashNav/Navbar';
import Card from '@/components/Charts/Card';
import BarChart from '@/components/Charts/BarChart/BarChart';
import Question from '@/components/Charts/BarChart/Question';
import FloatingMenu from '@/components/dashboard/FloatingMenu';

const DashQuestions = [
  {question: "Você esta satisfeito com a qualidade do atendimento prestado pela vitale e seu colaboradores", color: "#363b56"},
  {question: "Você esta satisfeito com a qualidade do atendimento prestado pela vitale e seu colaboradores", color: "#4e8baa"},
  {question: "Você esta satisfeito com a qualidade do atendimento prestado pela vitale e seu colaboradores", color: "#0fa5ab"},
  {question: "Você esta satisfeito com a qualidade do atendimento prestado pela vitale e seu colaboradores", color: "#c8a2c8"},
  {question: "Você esta satisfeito com a qualidade do atendimento prestado pela vitale e seu colaboradores", color: "#d3aef4"},
]

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, LineElement, PointElement, Title, Tooltip, Legend);

interface SurveyData {
  id: number;
  email: string;
  pergunta_01: string;
  pergunta_02: string;
  pergunta_03: string;
  pergunta_04: string;
  pergunta_05: string;
  pergunta_06: string;
  pergunta_07: string; // Field for question 7
}

const calculatePromotersAndDetractors = (data: SurveyData[]) => {
  let promoters = 0;
  let detractors = 0;

  data.forEach((entry) => {
    const value = parseInt(entry.pergunta_07 || '0', 10);
    if (value >= 50) {
      promoters += 1;
    } else if (value <= 25) {
      detractors += 1;
    }
  });

  return { promoters, detractors };
};

const Dashboard: React.FC = () => {
  const [surveyData, setSurveyData] = useState<SurveyData[]>([]);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const checkAuthAndLoadData = async () => {
      // Verifica se o usuário está autenticado
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        // Se não estiver autenticado, redireciona para a página de login
        router.push('/admin');
      } else {
        setEmail(session.user.email || null);
        // Define o email do usuário logado

        // Carrega os dados do dashboard se autenticado
        const { data, error } = await supabase
          .from('tabela_inquerito')
          .select('id, email, pergunta_01, pergunta_02, pergunta_03, pergunta_04, pergunta_05, pergunta_06, pergunta_07');

        if (error) {
          console.error('Erro ao buscar dados:', error);
        } else {
          setSurveyData(data || []);
        }
        setLoading(false);
      }
    };

    checkAuthAndLoadData();
  }, [router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  // Calcula o período de um ano a partir da data atual
  const endDate = new Date();
  const startDate = new Date();
  startDate.setFullYear(endDate.getFullYear() - 1);
  const formattedStartDate = format(startDate, 'dd/MM/yyyy');
  const formattedEndDate = format(endDate, 'dd/MM/yyyy');

  // Calculate total responses and averages
  const totalResponses = surveyData.length;
  const averageScores = calculateAverageScores(surveyData);
  const overallAverage = calculateOverallAverage(averageScores);

  // Normaliza a média geral para o gráfico de gauge
  const normalizedValue = (overallAverage - 1) / 4;
  const displayValue = Math.round(normalizedValue * 100);

  const { promoters, detractors } = calculatePromotersAndDetractors(surveyData);

  // Calcula a porcentagem de promotores e detratores
  const promotersPercentage = ((promoters / totalResponses) * 100).toFixed(0);
  const detractorsPercentage = ((detractors / totalResponses) * 100).toFixed(0);

  // Calculate Yes/No percentages for question 6
  const { yesPercentage, noPercentage } = calculateYesNoPercentages(surveyData);

  // Calculate distribution for question 7
  const question7Distribution = calculateQuestion7Distribution(surveyData);

  return (
    <div className="min-h-screen bg-blue-50 !font-signika">
      <div className="container mx-auto px-4 py-8">
        <Navbar userEmail={email ? email : ""} />
  
        <div className='w-full bg-white/50 rounded-lg p-8 px-12 shadow-lg mt-5'>
          {/* Seção do Gráfico e dos Cards */}
          <div className='flex justify-between items-center'>
            <div className='flex justify-center items-center flex-col w-1/2'>
              <h3 className="font-semibold text-blue-600 mb-4">Média geral de satisfação</h3>
              <GaugeChartCustom normalizedValue={normalizedValue} displayValue={displayValue} />
            </div>
  
            <div className="w-auto grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <Card cardTitle={'Promotores'} cardValue={`${promotersPercentage}%`} /> 
              <Card cardTitle={'Detratores'} cardValue={`${detractorsPercentage}%`} />
              <Card cardTitle={'Total de respostas'} cardValue={totalResponses} className='col-span-2' />  
            </div>
          </div>
  
          {/* Seção dos Gráficos de Barra e Perguntas */}
          <div className='w-full flex px-2 bg-white rounded-lg shadow-lg'>
            <div className='w-1/2 p-6'>
              <BarChart data={averageScores} />
            </div>
  
            <div className='w-1/2 p-6 flex flex-col justify-around'>
              {DashQuestions.map((item, idx) => (
                <Question color={item.color} text={item.question} key={idx} />
              ))}
            </div>
          </div>

          {/* Seção dos gráficos PieChart e LineChart */}
          <div className="w-full flex mt-8 gap-8">
            <div className="w-1/2 p-4 px-2 bg-white rounded-lg shadow-lg">
              <PieChart yesPercentage={yesPercentage} noPercentage={noPercentage} />
            </div>
            <div className="w-1/2 p-4 px-2 bg-white rounded-lg shadow-lg">
            </div>
          </div>
        </div>
        <FloatingMenu />
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
  return sums.map((sum) => sum / data.length); // Média de 1 a 5
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

const calculateQuestion7Distribution = (data: SurveyData[]) => {
  const distribution = [0, 0, 0, 0, 0];
  data.forEach((entry) => {
    const value = parseInt(entry.pergunta_07 || '0', 10);
    if (value === 0) distribution[0] += 1;
    else if (value === 25) distribution[1] += 1;
    else if (value === 50) distribution[2] += 1;
    else if (value === 75) distribution[3] += 1;
    else if (value === 100) distribution[4] += 1;
  });

  return distribution; // Retorna a contagem para cada opção de porcentagem
};

export default Dashboard;

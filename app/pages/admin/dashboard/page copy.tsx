"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/service/dbconnection';
import PieChart from '@/components/dashboard/PieChart';
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
import GaugeChartCustom from '@/components/Charts/GaugeChart';
import Navbar from '@/components/DashNav/Navbar';
import Card from '@/components/Charts/Card';
import BarChart from '@/components/Charts/BarChart/BarChart';
import Question from '@/components/Charts/BarChart/Question';
import FloatingMenu from '@/components/dashboard/FloatingMenu';

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, LineElement, PointElement, Title, Tooltip, Legend);

const DashQuestions = [
  {question: "Como você avalia a eficiência e o atendimento da nossa equipe administrativa?", color: "#363b56"},
  {question: "Como você avalia a qualidade do atendimento dos nossos médicos?", color: "#4e8baa"},
  {question: "Você está satisfeito com o serviço que recebeu em geral?", color: "#0fa5ab"},
  {question: "Você recomendaria nossos serviços para outras pessoas?", color: "#c8a2c8"},
  {question: "Como você encontrou nossos serviços?", color: "#d3aef4"},
];

interface SurveyData {
  id: number;
  email: string | null;
  pergunta_01: number | null;
  pergunta_02: number | null;
  pergunta_03: number | null;
  pergunta_04: number | null; // Sim (1) ou Não (2)
  pergunta_05: string | null; // Respostas do Select
  observacao?: string;
}

const Dashboard: React.FC = () => {
  const [surveyData, setSurveyData] = useState<SurveyData[]>([]);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const checkAuthAndLoadData = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push('/admin');
      } else {
        setEmail(session.user.email || null);

        const { data, error } = await supabase
          .from('tabela_inquerito_v2')
          .select('id, email, pergunta_01, pergunta_02, pergunta_03, pergunta_04, pergunta_05, observacao');

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

  const totalResponses = surveyData.length;
  const averageScores = calculateAverageScores(surveyData);
  const overallAverage = calculateOverallAverage(averageScores);

  const normalizedValue = Math.min(Math.max((overallAverage - 1) / 3, 0), 1);
  const displayValue = Math.round(normalizedValue * 100);  

  const { promoters, detractors } = calculatePromotersAndDetractors(surveyData);

  const promotersPercentage = ((promoters / totalResponses) * 100).toFixed(0);
  const detractorsPercentage = ((detractors / totalResponses) * 100).toFixed(0);

  const pieChartData = calculatePieChartData(surveyData);

  return (
    <div className="min-h-screen bg-blue-50 !font-signika">
      <div className="container mx-auto px-4 py-8">
        <Navbar userEmail={email ? email : ""} />
  
        <div className='w-full bg-white/50 rounded-lg p-8 px-12 shadow-lg mt-5'>
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

          <div className="w-full flex mt-8 gap-8">
            <div className="w-1/2 p-4 px-2 bg-white rounded-lg shadow-lg">
              <PieChart data={pieChartData} title="Distribuição das Respostas da Pergunta 5" />
            </div>
            <div className="w-1/2 p-4 px-2 bg-white rounded-lg shadow-lg">
              {/* Adicione outros gráficos ou informações aqui */}
            </div>
          </div>
        </div>
        <FloatingMenu />
      </div>
    </div>
  );
};

// Funções utilitárias
const calculateAverageScores = (data: SurveyData[]) => {
  const sums = [0, 0, 0];
  const counts = [0, 0, 0];

  data.forEach((entry) => {
    if (entry.pergunta_01 !== null) {
      sums[0] += entry.pergunta_01;  // Não precisa de parseInt
      counts[0]++;
    }
    if (entry.pergunta_02 !== null) {
      sums[1] += entry.pergunta_02;  // Não precisa de parseInt
      counts[1]++;
    }
    if (entry.pergunta_03 !== null) {
      sums[2] += entry.pergunta_03;  // Não precisa de parseInt
      counts[2]++;
    }
  });

  return sums.map((sum, index) => counts[index] > 0 ? sum / counts[index] : 0);
};


const calculateOverallAverage = (averageScores: number[]) => {
  const validScores = averageScores.filter(score => score > 0);
  const total = validScores.reduce((acc, score) => acc + score, 0);
  return validScores.length > 0 ? total / validScores.length : 0;
};

const calculatePromotersAndDetractors = (data: SurveyData[]) => {
  let promoters = 0;
  let detractors = 0;

  data.forEach((entry) => {
    if (entry.pergunta_04 === 1) { // Sim
      promoters += 1;
    } else if (entry.pergunta_04 === 2) { // Não
      detractors += 1;
    }
  });

  return { promoters, detractors };
};

const calculatePieChartData = (data: SurveyData[]) => {
  const counts: Record<string, number> = {
    "Indicação de amigo/familiar": 0,
    "Redes sociais": 0,
    "Busca no Google": 0,
    "Anúncios online": 0,
    "Outros": 0
  };

  data.forEach((entry) => {
    const key = entry.pergunta_05 || 'Outros';
    if (counts.hasOwnProperty(key)) {
      counts[key] += 1;
    } else {
      counts['Outros'] += 1;
    }
  });

  return Object.keys(counts).map((key) => ({
    label: key,
    value: (counts[key] / data.length) * 100,
  }));
};


export default Dashboard;

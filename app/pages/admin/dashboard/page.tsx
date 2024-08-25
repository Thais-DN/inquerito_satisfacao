"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/service/dbconnection';
import GaugeChartCustom from '@/components/Charts/GaugeChart';
import Navbar from '@/components/DashNav/Navbar';
import FloatingMenu from '@/components/dashboard/FloatingMenu';
import Card from '@/components/Charts/Card';
import BarChart from '@/components/Charts/BarChart/BarChart';
import PieChart from '@/components/dashboard/PieChart';

interface SurveyData {
  id: number;
  email: string; 
  pergunta_01: string;
  pergunta_02: string;
  pergunta_03: string;
  pergunta_04: string;
  pergunta_05: string;  // Select options
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
          .select('*');

        if (error) {
          console.error('Erro ao buscar dados:', error);
        } else {
          setSurveyData(data || []);
        }
        setLoading(false);
      }
    };

    checkAuthAndLoadData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  // Função para converter a nota (string) em porcentagem
  const convertToPercentage = (value: number) => {
    return ((value - 1) / 4) * 100;
  };

  function sumArr(arr: number[]){
    let total = arr.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    return total
  }

  const calculateAverage = (data: SurveyData[]) => {
    let media1: number[] = [];
    let media2: number[] = [];
    let media3: number[] = [];
  
    data.forEach((current) => {
      media1.push(Number(current.pergunta_01));
      media2.push(Number(current.pergunta_02));
      media3.push(Number(current.pergunta_03));
    });
  
    // Calculando a média de cada pergunta
    const avg1 = sumArr(media1) / data.length;
    const avg2 = sumArr(media2) / data.length;
    const avg3 = sumArr(media3) / data.length;
  
    // Convertendo a média para porcentagem
    return [avg1, avg2, avg3]
  }

  const averageScore = convertToPercentage(sumArr(calculateAverage(surveyData)) / 3);

  // Cálculo das respostas da pergunta 5 para o gráfico de pizza
  const calculatePieChartData = (data: SurveyData[]) => {
    const options = ["Facebook", "Instagram", "Google", "Nosso site", "Panfleto", "Outros"];
    const counts = options.map(option => ({
      label: option,
      value: data.filter(d => d.pergunta_05 === option).length,
    }));
    return counts;
  };

  const pieChartData = calculatePieChartData(surveyData);

  // Calcular percentuais de promotores e detratores
  const promotersCount = surveyData.filter(data => data.pergunta_04 == "1").length;
  const detractorsCount = surveyData.filter(data => data.pergunta_04 == '2').length;
  const totalResponses = surveyData.length;
  const promotersPercentage = Math.round((promotersCount / totalResponses) * 100);
  const detractorsPercentage = Math.round((detractorsCount / totalResponses) * 100);

  // Exibir a média diretamente
  const displayValue = Math.round(averageScore); // Média já em porcentagem

  return (
    <div className="min-h-screen bg-blue-50 !font-signika">
      <div className="container mx-auto px-4 py-8">
        <Navbar userEmail={email ? email : ""} />
  
        <div className='w-full bg-white/50 rounded-lg p-8 px-12 shadow-lg mt-5'>
          {/* Seção do Gráfico e dos Cards */}
          <div className='flex justify-between items-center'>
            <div className='flex justify-center items-center flex-col w-1/2'>
              <h3 className="font-semibold text-blue-600 mb-4">Média geral de satisfação</h3>
              <GaugeChartCustom normalizedValue={displayValue / 100} displayValue={displayValue} />
            </div>
            <div className='w-auto grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8'>
              <Card cardTitle="Promotores" cardValue={`${promotersPercentage}%`} />
              <Card cardTitle="Detratores" cardValue={`${detractorsPercentage}%`} />
              <Card cardTitle="Total de respostas" cardValue={totalResponses} className='col-span-2' />
            </div>
          </div>

          {/* Seção do Gráfico de Barras com as Perguntas ao Lado */}
          <div className='w-full flex px-2 bg-white rounded-lg shadow-lg'>
            <div className='w-3/5 p-6'>
              <BarChart data={calculateAverage(surveyData)} />
            </div>
            <div className='w-2/5 p-2 flex flex-col justify-around'>
              <ul className="list-none">
                <li className="flex items-center mb-2">
                  <span className="inline-block w-4 h-4 mr-2 bg-[#363b56]"></span>
                  Você está satisfeito com a qualidade do atendimento prestado?
                </li>
                <li className="flex items-center mb-2">
                  <span className="inline-block w-4 h-4 mr-2 bg-[#4e8baa]"></span>
                  A equipe foi eficiente ao resolver suas questões?
                </li>
                <li className="flex items-center">
                  <span className="inline-block w-4 h-4 mr-2 bg-[#0fa5ab]"></span>
                  Você recomendaria nosso serviço a outras pessoas?
                </li>
              </ul>
            </div>
          </div>

          {/* Seção do Gráfico de Pizza */}
          <div className='w-full bg-white rounded-lg shadow-lg mt-5'>
            <PieChart data={pieChartData} title="Como você encontrou nossos serviços?" />
          </div>
        </div>
        <FloatingMenu />
      </div>
    </div>
  );
};

export default Dashboard;

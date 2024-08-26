"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/service/dbconnection';
import GaugeChartCustom from '@/components/Charts/GaugeChart';
import Navbar from '@/components/DashNav/Navbar';
import Card from '@/components/Charts/Card';
import BarChart from '@/components/Charts/BarChart/BarChart';
import PieChart from '@/components/dashboard/PieChart';
import dayjs from 'dayjs';
import CustomModal from '@/components/Modal/CustomModal';
import { MessageSquareMore } from 'lucide-react';

interface SurveyData {
  id: number;
  email: string;
  pergunta_01: string;
  pergunta_02: string;
  pergunta_03: string;
  pergunta_04: string;
  pergunta_05: string;
  created_at: string;
  observacao?: string;
}

const Dashboard: React.FC = () => {
  const [surveyData, setSurveyData] = useState<SurveyData[]>([]);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState<string | null>(null);
  const [selectedSurvey, setSelectedSurvey] = useState<SurveyData | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    const checkAuthAndLoadData = async () => {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) {
            router.push('/pages/admin'); // Redireciona para a página de login se não houver sessão
        } else {
            setEmail(session.user.email || null);

            const { data, error } = await supabase
                .from('tabela_inquerito_v2')
                .select('*')
                .order('created_at', { ascending: false }); // Ordena os dados por data

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

  const convertToPercentage = (value: number) => {
    return ((value - 1) / 4) * 100;
  };

  function sumArr(arr: number[]) {
    return arr.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
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

    const avg1 = sumArr(media1) / data.length;
    const avg2 = sumArr(media2) / data.length;
    const avg3 = sumArr(media3) / data.length;

    return [avg1, avg2, avg3];
  };

  const averageScore = convertToPercentage(sumArr(calculateAverage(surveyData)) / 3);

  const calculatePieChartData = (data: SurveyData[]) => {
    const options_names = [
        "Facebook", 
        "Instagram", 
        "LinkedIn", 
        "Google", 
        "Site Oficial", 
        "Panfleto", 
        "Indicação de amigo ou familiar", 
        "Através de empresa parceira", 
        "Outros"
    ];
    
    const resultCounts = Array(options_names.length).fill(0);

    data.forEach((survey) => {
        const answerIndex = parseInt(survey.pergunta_05) - 1; 
        if (answerIndex >= 0 && answerIndex < options_names.length) {
            resultCounts[answerIndex] += 1;
        }
    });

    const chartData = options_names.map((option, index) => ({
        label: option,
        value: resultCounts[index],
    }));

    return chartData;
};

  const pieChartData = calculatePieChartData(surveyData);

  const promotersCount = surveyData.filter(data => data.pergunta_04 == "1").length;
  const detractorsCount = surveyData.filter(data => data.pergunta_04 == '2').length;
  const totalResponses = surveyData.length;
  const promotersPercentage = Math.round((promotersCount / totalResponses) * 100);
  const detractorsPercentage = Math.round((detractorsCount / totalResponses) * 100);

  const displayValue = Math.round(averageScore);

  const calculateUserAverage = (data: SurveyData) => {
    const scores = [
      Number(data.pergunta_01),
      Number(data.pergunta_02),
      Number(data.pergunta_03),
    ];
    const average = sumArr(scores) / scores.length;
    return convertToPercentage(average);
  };

  const translateContactMethod = (value: string) => {
    switch (value) {
        case '1':
            return 'Facebook';
        case '2':
            return 'Instagram';
        case '3':
            return 'LinkedIn';
        case '4':
            return 'Google';
        case '5':
            return 'Site Oficial';
        case '6':
            return 'Panfleto';
        case '7':
            return 'Indicação de amigo ou familiar';
        case '8':
            return 'Através de empresa parceira';
        case '9':
            return 'Outros';
        default:
            return 'N/A';
    }
};

  const openSurveyModal = (survey: SurveyData) => {
    setSelectedSurvey(survey);
  };

  const closeSurveyModal = () => {
    setSelectedSurvey(null);
  };

  const getEmojiList = (selectedValue: string) => {
    const emojis = [
      { value: '1', emoji: '😟' },
      { value: '2', emoji: '😕' },
      { value: '3', emoji: '😐' },
      { value: '4', emoji: '🙂' },
      { value: '5', emoji: '😃' },
    ];

    return emojis.map(({ value, emoji }) => (
      <span
        key={value}
        className={`inline-block text-2xl mx-1 ${value === selectedValue ? '' : 'grayscale'}`}
      >
        {emoji}
      </span>
    ));
  };

  const filteredData = surveyData
  .filter(data => {
    const userAverage = calculateUserAverage(data);
    const promoterDetractor = Number(data.pergunta_04) === 1 ? 'Promotor' : 'Detrator';
    
    return (
      data.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      translateContactMethod(data.pergunta_05).toLowerCase().includes(searchTerm.toLowerCase()) ||
      dayjs(data.created_at).format('DD/MM/YYYY').includes(searchTerm) ||
      userAverage.toString().includes(searchTerm) ||
      promoterDetractor.toLowerCase().includes(searchTerm.toLowerCase())
    );
  })
  .sort((a, b) => dayjs(b.created_at).unix() - dayjs(a.created_at).unix()); // Ordena por data, do mais recente para o mais antigo


  return (
    <div className="min-h-screen bg-blue-50 !font-signika">
      <div className="container mx-auto px-4 py-8">
        <Navbar userEmail={email ? email : ""} />

        <div className='w-full bg-white/50 rounded-lg p-8 px-12 shadow-lg mt-5'>
          <div className='flex justify-between items-center'>
            <div className='flex justify-center items-center flex-col w-1/2'>
              <h3 className="font-semibold text-azul mb-4">Média geral de satisfação</h3>
              <GaugeChartCustom normalizedValue={displayValue / 100} displayValue={displayValue} />
            </div>
            <div className='w-auto grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8'>
              <Card cardTitle="Promotores" cardValue={`${promotersPercentage}%`} />
              <Card cardTitle="Detratores" cardValue={`${detractorsPercentage}%`} />
              <Card cardTitle="Total de respostas" cardValue={totalResponses} className='col-span-2' />
            </div>
          </div>

          <div className='w-full grid grid-cols-12 gap-5 max-h-[500px] items-center justify-center'>
            <div className='col-span-7 w-full flex px-2 bg-white rounded-lg shadow-lg max-h-[500px] py-5'>
                <BarChart data={calculateAverage(surveyData)} />
            </div>
            <div className='col-span-5 w-full bg-white rounded-lg shadow-lg mt-5 max-h-[500px] flex justify-center items-center p-2'>
              <PieChart data={pieChartData} title="Meio de Chegada" />
            </div>
          </div>

        </div>

          

        <div className="mt-8">
          <input
            type="text"
            placeholder="Pesquisar..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {selectedSurvey && (
          <CustomModal show={true} onClose={closeSurveyModal} title="Resumo do Questionário">
            <div className="space-y-6">
              <div className="space-y-2">
                <strong>1. Como você avalia a eficiência e o atendimento da nossa equipe administrativa?</strong>
                <p className="flex items-center gap-2">
                  {getEmojiList(selectedSurvey.pergunta_01)}
                </p>
              </div>
              <div className="space-y-2">
                <strong>2. Como você avalia a qualidade do atendimento dos nossos médicos?</strong>
                <p className="flex items-center gap-2">
                  {getEmojiList(selectedSurvey.pergunta_02)}
                </p>
              </div>
              <div className="space-y-2">
                <strong>3. Em geral, você está satisfeito com o serviço que recebeu?</strong>
                <p className="flex items-center gap-2">
                  {getEmojiList(selectedSurvey.pergunta_03)}
                </p>
              </div>
              <div className="space-y-2">
                <strong>4. Você recomendaria nossos serviços para outras pessoas?</strong>
                <p className="flex items-center gap-2">
                  <span>{selectedSurvey.pergunta_04 === '1' ? 'Sim' : 'Não'}</span>
                </p>
              </div>
              <div className="space-y-2">
                <strong>5. Como você encontrou nossos serviços?</strong>
                <p>{translateContactMethod(selectedSurvey.pergunta_05)}</p>
              </div>
              {selectedSurvey.observacao && (
                <div className="space-y-2">
                  <strong>Observação:</strong>
                  <p>{selectedSurvey.observacao}</p>
                </div>
              )}
            </div>
          </CustomModal>
        )}


        <div className='w-auto flex p-2 bg-white rounded-lg shadow-lg mt-3'>
          <table className="min-w-full bg-white rounded-lg">
            <thead>
              <tr className="w-full bg-blue-200 rounded-lg ">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Satisfação
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Promotor/Detrator
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Meio de Chegada
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Data
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Respostas
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
  {filteredData.map((data) => {
    const userAverage = calculateUserAverage(data);
    const promoterDetractor = Number(data.pergunta_04) === 1 ? 'Promotor' : 'Detrator';
    const formattedDate = dayjs(data.created_at).format('DD/MM/YYYY');

    return (
      <tr key={data.id}>
        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
          {data.email}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
          {Math.round(userAverage)}%
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
          {promoterDetractor}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
          {translateContactMethod(data.pergunta_05)}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
          {formattedDate}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
          <button
            onClick={() => openSurveyModal(data)}
            className="text-blue-600 hover:underline flex items-center"
          >
            Ver inquérito
            {data.observacao && (
              <MessageSquareMore className="ml-2 h-4 w-4 text-gray-500" />
            )}
          </button>
        </td>
      </tr>
    );
  })}
</tbody>

          </table>     
        </div>

      </div>
    </div>
    
  );
};

export default Dashboard;

"use client";

import React, { useState } from 'react';
import submitForm from '@/service/submitForm';
import convertData from '@/utils/convertData';
import { getEmailLocalStorage } from '@/utils/handleEmailLocalStorage';
import { useRouter } from 'next/navigation';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, ProgressBar, Modal } from 'react-bootstrap';

export default function Inquerito() {
  const router = useRouter();
  const [responses, setResponses] = useState<Array<number | null>>(Array(questions.length).fill(null));
  const [comments, setComments] = useState<string>(""); 
  const [observacao, setObservacao] = useState<string>(""); 
  const [commentError, setCommentError] = useState<string>('');
  const [showModal, setShowModal] = useState(false); // Estado para controlar o modal

  // Função para abrir e fechar o modal
  const handleModal = () => setShowModal(!showModal);

  // Manipula a mudança no slider ou nos botões de emoji
  const handleEmojiClick = (questionIndex: number, value: number) => {
    const newResponses = [...responses];
    newResponses[questionIndex] = value;
    setResponses(newResponses);
  };

  // Manipula a mudança na resposta sim/não para as questões 3 e 4
  const handleYesNoClick = (value: number, responseNumber: number) => {
    const newResponses = [...responses];
    newResponses[responseNumber] = value;
    setResponses(newResponses);

    // Limpa o comentário se "Não" for selecionado na questão 4
    if (responseNumber === 3 && value === 2) {
      setComments("");
      setCommentError(''); 
    }
  };

  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (!allQuestionsAnswered()) {
      alert("Existem perguntas ainda não respondidas.");
    } else {
      const userEmail = getEmailLocalStorage();
      const data = convertData(responses, comments, userEmail, observacao);
      submitForm(data);
      router.push('/pages/agradecimentos');
    }
  };

  // Calcula o progresso das respostas
  const calculateProgress = () => {
    const answered = responses.filter((response) => response !== null).length;
    return (answered / questions.length) * 100;
  };

  // Verifica se todas as questões foram respondidas
  const allQuestionsAnswered = () => {
    return responses.every((response) => response !== null);
  };

  return (
    <div className="min-h-screen flex flex-col font-signika bg-gradient-to-b from-white to-purple-200 px-2 md:px-0 lg:px-8">
      <div className="flex items-center ml-2 gap-3 mt-4 lg:mt-6">
        <img src="/logo-coracao.png" alt="logo coração - vitale" width={50} />
        <h1 className="text-lg font-extrabold text-azul-escuro lg:text-2xl">
          Inquérito de satisfação
        </h1>
      </div>

      {/* Card para desktop */}
      <div className="flex-grow p-6 space-y-6 mb-6 font-semibold overflow-auto max-w-4xl mx-auto lg:max-w-6xl lg:space-y-10 lg:from-white lg:to-purple-200 lg:rounded-lg lg:shadow-lg lg:p-8 lg:mb-32">
        {questions.slice(0, 3).map((question, index) => (
          <div key={index} className="space-y-2 md:grid md:grid-cols-2 md:items-center lg:space-y-0 lg:grid-cols-2 lg:gap-6">
            <div className="flex items-center gap-2">
              <span className="text-azul-escuro lg:text-lg">{question.text}</span>
              <span 
                onClick={handleModal} 
                className="cursor-pointer text-azul-escuro bg-slate-200 rounded-full p-3 w-6 h-6 flex items-center justify-center">
                !
              </span>
            </div>
            <div className="flex flex-col items-center lg:items-center">
              <div className="flex justify-center gap-4 lg:gap-6">
                {emojis.map((emoji, emojiIndex) => (
                  <button
                    key={emojiIndex}
                    className={`focus:outline-none rounded-full transition-all duration-300 ${
                      responses[index] === emojiIndex + 1 ? '' : ''
                    }`}
                    onClick={() => handleEmojiClick(index, emojiIndex + 1)}
                    title={getEmojiTitle(emojiIndex + 1)}
                  >
                    <img
                      src={emoji.src}
                      alt={`emoji-${emojiIndex + 1}`}
                      className={`w-8 h-8 shadow-md rounded-full ${
                        responses[index] !== null && responses[index] !== emojiIndex + 1 ? 'grayscale' : ''
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        ))}

        {/* Questão 4: Você recomendaria nossos serviços para outras pessoas? */}
        <div className="space-y-2 md:grid md:grid-cols-2 md:gap-4 md:items-center lg:gap-6">
          <p className="text-azul-escuro lg:text-lg">{questions[3].text}</p>
          <div className="flex justify-center gap-4 lg:gap-6">
            <button
              className={`px-4 py-2 focus:outline-none shadow-md rounded-md ${
                responses[3] === 1 ? 'bg-azul-agua text-white' : 'bg-white text-black'
              } lg:px-6 lg:py-3`}
              onClick={() => handleYesNoClick(1, 3)}
            >
              Sim
            </button>
            <button
              className={`px-4 py-2 focus:outline-none shadow-md rounded-md ${
                responses[3] === 2 ? 'bg-azul-agua text-white' : 'bg-white text-black'
              } lg:px-6 lg:py-3`}
              onClick={() => handleYesNoClick(2, 3)}
            >
              Não
            </button>
          </div>
        </div>

        {/* Questão 5: Como você encontrou nossos serviços? */}
        <div className="space-y-2 md:grid md:grid-cols-2 md:items-center lg:space-y-0 lg:grid-cols-2 lg:gap-6">
          <span className="text-azul-escuro lg:text-lg">{questions[4].text}</span>
          <div className="flex flex-col items-center lg:items-center">
            <div>
              <Form.Select
                className='w-full !pr-20 py-2 rounded-md shadow-md !focus:outline-none'
                onChange={(e) => handleEmojiClick(4, Number(e.target.value))} // Assegura que a resposta seja registrada
              >
                <option value="" selected disabled>Selecione</option>
                <option value="1">Facebook</option>
                <option value="2">Instagram</option>
                <option value="3">LinkedIn</option>
                <option value="4">Google</option>
                <option value="5">Site Oficial</option>
                <option value="6">Panfleto</option>
                <option value="7">Indicação de amigo ou familiar</option>
                <option value="8">Através de empresa parceira</option>
                <option value="9">Outros</option>
              </Form.Select>
            </div>
          </div>
        </div>

        {/* 6ª Questão: Área de Observação Opcional */}
        <div className="pb-10 lg:pb-4">
          <p className="text-azul-escuro lg:text-lg mb-0 lg:pb-2">Deixe um comentario <span className='text-xs text-gray-500'>(opcional)</span></p>
          <textarea
            className="w-full p-4 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-azul-escuro"
            rows={5}
            placeholder="Escreva aqui"
            value={observacao}
            onChange={(e) => setObservacao(e.target.value)}
          ></textarea>
        </div>
  
      </div>

      {/* Modal Explicativo */}
      <Modal show={showModal} onHide={handleModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Considere que:</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ul>
            <li><strong>😟 Muito mau:</strong> Se está MUITO insatisfeito.</li>
            <li><strong>😕 Mau:</strong> Se está insatisfeito.</li>
            <li><strong>😐 Médio:</strong> Se acha que o serviço foi razoável.</li>
            <li><strong>🙂 Bom:</strong> Se ficou satisfeito com o serviço.</li>
            <li><strong>😃 Muito bom:</strong> Se ficou MUITO satisfeito com o serviço.</li>
          </ul>
        </Modal.Body>
      </Modal>

      <div className="w-full fixed bottom-0 left-0 p-2 !bg-azul-escuro rounded-t-lg lg:p-4 ">
        <div className="flex items-center gap-2 lg:gap-4">
          <BarraProgresso progress={calculateProgress()} />
          <button
            onClick={handleSubmit}
            type="submit"
            className={`px-6 py-2 bg-azul text-white rounded-full shadow-md lg:px-8 lg:py-3`}
            disabled={!allQuestionsAnswered()}
          >
            Avançar
          </button>
        </div>
      </div>
    </div>
  );    
}

// Função para retornar o placeholder adequado para cada emoji
const getEmojiTitle = (index: number) => {
  switch (index) {
    case 1:
      return "Muito ruim";
    case 2:
      return "Ruim";
    case 3:
      return "Médio";
    case 4:
      return "Bom";
    case 5:
      return "Muito bom";
    default:
      return "";
  }
}

// Lista de perguntas
const questions = [
  { text: '1. Como avaliaria a eficiência e o atendimento da nossa equipa administrativa?' },
  { text: '2. Como avaliaria a qualidade do atendimento dos nossos médicos?' },
  { text: '3. Em geral, você está satisfeito com o serviço que recebeu?' },
  { text: '4. Recomendaria os nossos serviços para outras pessoas?' },
  { text: '5. Como encontrou os nossos serviços?' },
];

// Lista de emojis
const emojis = [
  { src: '/emoji-1.png' },
  { src: '/emoji-2.png' },
  { src: '/emoji-3.png' },
  { src: '/emoji-4.png' },
  { src: '/emoji-5.png' },
];

// Componente da barra de progresso
function BarraProgresso({ progress }: { progress: number }) {
  return <ProgressBar animated now={progress} variant="info" className="w-full shadow-md" />;
}

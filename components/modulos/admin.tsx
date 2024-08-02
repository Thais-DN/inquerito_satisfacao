import React, { useState } from 'react';
import ProgressBar from 'react-bootstrap/ProgressBar';
import CustomizedSlider from '../Slider/Slider'; // Importa o componente Slider

interface Props {
  handleBeforeStep: () => void;
  handleNextStep: () => void;
}

export default function Admin({ handleBeforeStep, handleNextStep }: Props) {
  const [responses, setResponses] = useState<Array<number | null>>(Array(questions.length).fill(null));
  const [comments, setComments] = useState<string[]>(Array(questions.length).fill(''));

  // Manipula a mudança no slider ou nos botões de emoji
  const handleEmojiClick = (questionIndex: number, value: number) => {
    const newResponses = [...responses];
    newResponses[questionIndex] = value;
    setResponses(newResponses);
  };

  // Manipula a mudança na resposta sim/não para a questão 6
  const handleYesNoClick = (value: number) => {
    const newResponses = [...responses];
    newResponses[5] = value;
    setResponses(newResponses);

    // Limpa o comentário se "Sim" for selecionado
    if (value === 1) {
      const newComments = [...comments];
      newComments[5] = '';
      setComments(newComments);
    }
  };

  // Manipula a mudança de texto para a questão 6
  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newComments = [...comments];
    newComments[5] = e.target.value;
    setComments(newComments);
  };

  // Calcula o progresso das respostas
  const calculateProgress = () => {
    const answered = responses.filter(response => response !== null).length;
    return (answered / questions.length) * 100;
  };

  return (
    <div className="min-h-screen flex flex-col font-signika bg-gradient-to-b from-white to-purple-200 p-6">
      <div className="flex items-center gap-3 mb-12">
        <img src="logo-coracao.png" alt="logo coração - vitale" width={50} />
        <h1 className="text-lg font-extrabold text-azul-escuro">Inquérito de satisfação</h1>
      </div>
      <div className="flex-grow space-y-6 mb-14 font-semibold overflow-auto">
        {questions.slice(0, 5).map((question, index) => (
          <div key={index} className="space-y-2">
            <p className="text-azul-escuro">{question.text}</p>
            <div className="flex justify-center gap-4">
              {emojis.map((emoji, emojiIndex) => (
                <button
                  key={emojiIndex}
                  className={`focus:outline-none ${responses[index] === emojiIndex + 1 ? 'border border-azul-escuro rounded-full' : ''}`}
                  onClick={() => handleEmojiClick(index, emojiIndex + 1)}
                >
                  <img src={emoji.src} alt={`emoji-${emojiIndex + 1}`} className="w-8 h-8 shadow-md rounded-full" />
                </button>
              ))}
            </div>
          </div>
        ))}

        {/* Questão 6: Sim ou Não */}
        <div className="space-y-2">
          <p className="text-azul-escuro">{questions[5].text}</p>
          <div className="flex justify-center gap-4">
            <button
              className={`px-4 py-2 focus:outline-none ${responses[5] === 1 ? 'bg-blue-600 text-white rounded-md' : 'bg-gray-200 text-black'}`}
              onClick={() => handleYesNoClick(1)}
            >
              Sim
            </button>
            <button
              className={`px-4 py-2 focus:outline-none ${responses[5] === 2 ? 'bg-blue-600 text-white rounded-md' : 'bg-gray-200 text-black'}`}
              onClick={() => handleYesNoClick(2)}
            >
              Não
            </button>
          </div>
          {responses[5] === 1 && (
            <textarea
              placeholder="Em que sentiu dificuldade?"
              value={comments[5]}
              onChange={handleCommentChange}
              className="mt-4 p-2 w-full border rounded-md resize-none"
              rows={3}
            />
          )}
        </div>

        {/* Questão 7: Slider */}
        <div className="space-y-2">
          <p className="text-azul-escuro">{questions[6].text}</p>
          <CustomizedSlider
            defaultValue={responses[6] !== null ? responses[6] : 50}
            onChange={(value) => handleEmojiClick(6, value)}
          />
        </div>
      </div>
      <div className="w-full fixed bottom-0 left-0 p-2 bg-azul-escuro rounded-t-lg">
        <div className="flex items-center gap-2">
          <BarraProgresso progress={calculateProgress()} />
          <button
            onClick={handleNextStep}
            className="px-6 py-2 bg-azul text-white rounded-full shadow-md"
          >
            Avançar
          </button>
        </div>
      </div>
    </div>
  );
}

// Lista de perguntas
const questions = [
  { text: '1. A equipa conseguiu resolver suas dúvidas e problemas de forma satisfatória?' },
  { text: '2. Como você avalia as informações fornecidas antes e depois da sua consulta?' },
  { text: '3. Qual foi o seu grau de satisfação com a minúcia do seu médico durante a utilização da telemedicina?' },
  { text: '4. Qual o nível de facilidade em compreender as orientações dadas pelo seu médico?' },
  { text: '5. Como você avalia sua satisfação geral com os serviços de telemedicina da Vitale?' },
  { text: '6. Teve alguma dificuldade técnica durante a utilização da Vitale?' },
  { text: '7. Qual é a probabilidade de escolher a Vitale para a sua próxima consulta?' },
];

// Lista de emojis
const emojis = [
  { src: 'emoji-1.png' },
  { src: 'emoji-2.png' },
  { src: 'emoji-3.png' },
  { src: 'emoji-4.png' },
  { src: 'emoji-5.png' },
];

// Componente da barra de progresso
function BarraProgresso({ progress }: { progress: number }) {
  return <ProgressBar animated now={progress} variant='info' className="w-full bg-azul shadow-md" />;
}

import React, { useState } from 'react';
import ProgressBar from 'react-bootstrap/ProgressBar';
import CustomizedSlider from '../Slider/Slider'; // Importa o componente Slider
import submitForm from '@/service/submitForm';
import convertData from '@/utils/convertData';
import { getEmailLocalStorage } from '@/utils/handleEmailLocalStorage';

interface Props {
  handleBeforeStep: () => void;
  handleNextStep: () => void;
}

export default function Inquerito({ handleBeforeStep, handleNextStep }: Props) {
  const [responses, setResponses] = useState<Array<number | null>>(Array(questions.length).fill(null));
  const [comments, setComments] = useState<string>("");
  const [commentError, setCommentError] = useState<string>(''); // Error message state for comment validation

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

    // Limpa o comentário se "Não" for selecionado
    if (value === 2) {
      setComments("");
      setCommentError(''); // Reset comment error
    }
  };

  // Manipula a mudança de texto para a questão 6
  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComments(e.target.value);

    // Remove error message if comment is valid
    if (e.target.value.trim().length >= 15) {
      setCommentError('');
    }
  };

  // Verifica se o comentário tem pelo menos 15 caracteres ao sair do campo
  const handleCommentBlur = () => {
    if (comments.trim().length < 15 && responses[5] === 1) {
      setCommentError('O comentário deve ter pelo menos 15 caracteres.');
    } else {
      setCommentError('');
    }
  };

  // Calcula o progresso das respostas
  const calculateProgress = () => {
    const answered = responses.filter((response, index) => {
      if (index === 5) {
        return response !== null && (response === 2 || (response === 1 && comments.trim().length >= 15));
      }
      return response !== null;
    }).length;
    return (answered / questions.length) * 100;
  };

  // Verifica se todas as questões foram respondidas
  const allQuestionsAnswered = () => {
    return responses.every((response, index) => {
      if (index === 5) {
        return response !== null && (response === 2 || (response === 1 && comments.trim().length >= 15));
      }
      return response !== null;
    });
  };

  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (!allQuestionsAnswered()) {
      alert("Existem perguntas ainda não respondidas.");
    } else {
      const userEmail = getEmailLocalStorage();
      const data = convertData(responses, comments, userEmail);
      submitForm(data);
      handleNextStep();
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-signika bg-gradient-to-b from-white to-purple-200 px-2 md:px-0">
      <div className="flex items-center ml-2 gap-3 mt-4">
        <img src="logo-coracao.png" alt="logo coração - vitale" width={50} />
        <h1 className="text-lg font-extrabold text-azul-escuro">Inquérito de satisfação</h1>
      </div>
      <div className="flex-grow p-6 space-y-6 mb-6 font-semibold overflow-auto max-w-4xl mx-auto"> {/* Definição de max-w para telas maiores */}
        {questions.slice(0, 5).map((question, index) => (
          <div key={index} className="space-y-2 md:grid md:grid-cols-2 md:items-center">
            <span className="text-azul-escuro">{question.text}</span>
            <div className="flex justify-center gap-4 "> {/* Remove a margin-top em MD */}
              {emojis.map((emoji, emojiIndex) => (
                <button
                  key={emojiIndex}
                  className={`focus:outline-none rounded-full transition-all duration-300 ${
                    responses[index] === emojiIndex + 1 ? '' : ''
                  }`}
                  onClick={() => handleEmojiClick(index, emojiIndex + 1)}
                >
                  <img
                    src={emoji.src}
                    alt={`emoji-${emojiIndex + 1}`}
                    className={`w-8 h-8 shadow-md rounded-full ${
                      responses[index] !== null && responses[index] !== emojiIndex + 1 ? 'grayscale' : ''
                    }`} // Aplica filtro grayscale aos emojis não selecionados
                  />
                </button>
              ))}
            </div>
          </div>
        ))}

        {/* Questão 6: Sim ou Não */}
        <div className="space-y-2 md:grid md:grid-cols-2 md:gap-4 md:items-center">
          <p className="text-azul-escuro">{questions[5].text}</p>
          <div className="flex justify-center gap-4">
            <button
              className={`px-4 py-2 focus:outline-none shadow-md rounded-md ${
                responses[5] === 1 ? 'bg-azul-agua text-white' : 'bg-white text-black'
              }`}
              onClick={() => handleYesNoClick(1)}
            >
              Sim
            </button>
            <button
              className={`px-4 py-2 focus:outline-none shadow-md rounded-md ${
                responses[5] === 2 ? 'bg-azul-agua text-white' : 'bg-white text-black'
              }`}
              onClick={() => handleYesNoClick(2)}
            >
              Não
            </button>
          </div>
          {responses[5] === 1 && (
            <>
            <span></span>
              <textarea
                placeholder="Em que sentiu dificuldade?"
                value={comments}
                onChange={handleCommentChange}
                onBlur={handleCommentBlur}
                className="mt-4 p-2 w-full border shadow-md focus:outline-none text-azul-escuro text-sm rounded-md resize-none"
                rows={3}
              />
              {commentError && <p className="text-red-500 text-sm">{commentError}</p>}
            </>
          )}
        </div>
        

        {/* Questão 7: Slider */}
        <div className="space-y-2 md:grid md:grid-cols-2 md:gap-4 md:items-center">
          <p className="text-azul-escuro ">{questions[6].text}</p>
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
            onClick={handleSubmit}
            type="submit"
            className={`px-6 py-2 bg-azul text-white rounded-full shadow-md`}
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
  return <ProgressBar animated now={progress} variant="info" className="w-full shadow-md" />;
}


import React, { useState } from 'react';
import ProgressBar from 'react-bootstrap/ProgressBar';

interface Props {
    handleBeforeStep: () => void;
    handleNextStep: () => void;
}

export default function Admin({ handleBeforeStep, handleNextStep }: Props) {
    const [responses, setResponses] = useState(Array(questions.length).fill(null));

    const handleEmojiClick = (questionIndex: number, value: number) => {
        const newResponses = [...responses];
        newResponses[questionIndex] = value;
        setResponses(newResponses);
    };

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
            <div className="flex-grow space-y-6 font-semibold overflow-auto">
                {questions.slice(0, 9).map((question, index) => (
                    <div key={index} className="space-y-2">
                        <p className="text-azul-escuro">{question.text}</p>
                        <div className="flex justify-center gap-4">
                            {emojis.map((emoji, emojiIndex) => (
                                <button 
                                    key={emojiIndex} 
                                    className={`focus:outline-none ${responses[index] === emojiIndex + 1 ? 'border border-azul-escuro rounded-full' : ''}`}
                                    onClick={() => handleEmojiClick(index, emojiIndex + 1)}
                                >
                                    <img src={emoji.src} alt={`emoji-${emojiIndex + 1}`} className="w-8 h-8" />
                                </button>
                            ))}
                        </div>
                    </div>
                ))}
                {questions.slice(9).map((question, index) => (
                    <div key={index + 9} className="space-y-2">
                        <p className="text-azul-escuro">{question.text}</p>
                        <div className="flex justify-center gap-4">
                            {emojis.map((emoji, emojiIndex) => (
                                <button 
                                    key={emojiIndex} 
                                    className={`focus:outline-none ${responses[index + 9] === emojiIndex + 1 ? 'border border-azul-escuro rounded-full' : ''}`}
                                    onClick={() => handleEmojiClick(index + 9, emojiIndex + 1)}
                                >
                                    <img src={emoji.src} alt={`emoji-${emojiIndex + 1}`} className="w-8 h-8" />
                                </button>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
            <div className="w-full fixed bottom-0 left-0 p-2 bg-azul-escuro rounded-t-lg">
                <div className="flex items-center gap-2">
                    <BarraProgresso progress={calculateProgress()}  />
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

const questions = [
    { text: '1. Como você avalia as informações fornecidas antes da consulta, foram suficientes e claras?' },
    { text: '2. A equipe administrativa conseguiu resolver suas dúvidas e problemas de forma satisfatória?' },
    { text: '3. Você recebeu confirmação da sua consulta de forma oportuna?' },
    { text: '4. A equipe administrativa foi proativa em garantir que sua experiência fosse positiva?' },
    { text: '5. Como classificaria o tempo que o seu médico passou consigo?' },
    { text: '6. Sentiu que a sua privacidade foi respeitada durante a sua consulta de telemedicina?' },
    { text: '7. Qual foi o seu grau de satisfação com a minúcia do seu médico durante a utilização da telemedicina? ' },
    { text: '8. Você teve facilidade em compreender as orientações dadas pelo seu médico?' },
    { text: '9. Como você avalia sua satisfação geral com os serviços de telemedicina da Clínica Vitale?' },
    { text: '10. O processo de pagamento foi claro e eficiente? ' },
    { text: '11. Qual é a probabilidade de escolher a Vitale para a sua próxima consulta? ' },
    { text: '12. Teve alguma dificuldade técnica durante a utilização da Vitale?' }
];

const emojis = [
    { src: 'emoji-1.png' },
    { src: 'emoji-2.png' },
    { src: 'emoji-3.png' },
    { src: 'emoji-4.png' },
    { src: 'emoji-5.png' },
];

function BarraProgresso({ progress }: { progress: number }) {
    return <ProgressBar animated now={progress} variant='info' className="w-full bg-azul shadow-md" />;
}

import React from 'react';
import BarraProgresso from '../BarraProgresso';

interface Props {
    handleBeforeStep: () => void;
    handleNextStep: () => void;
}

export default function Admin({ handleBeforeStep, handleNextStep }: Props) {
    return (
        <div className="h-screen font-signika bg-gradient-to-b from-white to-purple-200 p-6">
            <div className="flex items-center gap-3 mb-12">
                <img src="logo-coracao.png" alt="logo coração - vitale" width={50} />
                <h1 className="text-lg font-extrabold text-azul-escuro">Inquérito de satisfação</h1>
            </div>
            <div className="space-y-6 font-semibold">
                {questions.map((question, index) => (
                    <div key={index} className="space-y-2">
                        <p className="text-azul-escuro">{question.text}</p>
                        <div className="flex justify-center gap-4">
                            {emojis.map((emoji, emojiIndex) => (
                                <button key={emojiIndex} className="focus:outline-none">
                                    <img src={emoji.src} alt={`emoji-${emojiIndex + 1}`} className="w-8 h-8" />
                                </button>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex items-center mt-8 w-full gap-2">
                <BarraProgresso />
                <button 
                    onClick={handleNextStep} 
                    className="px-6 py-2 bg-azul text-white rounded-full shadow-lg"
                >
                    Avançar
                </button>
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

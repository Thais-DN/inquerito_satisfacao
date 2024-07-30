import React from 'react';
import { Angry, Annoyed, Frown, Laugh, Smile } from 'lucide-react';
import ProgressBar from 'react-bootstrap/ProgressBar';
import BarraProgresso from '../BarraProgresso';

interface Props {
    handleBeforeStep: () => void;
    handleNextStep: () => void;
}

export default function Admin({ handleBeforeStep, handleNextStep }: Props) {
    return (
        <div className="h-screen w-screen font-signika bg-gradient-to-b from-white to-purple-200 p-6">
            <div className="flex items-center gap-3 mb-6">
                <img src="logo-coracao.png" alt="logo coração - vitale" width={50} />
                <h1 className="text-lg font-extrabold text-azul-escuro">Inquérito de satisfação</h1>
            </div>
            <div className="space-y-6 font-semibold">
                {questions.map((question, index) => (
                    <div key={index} className="space-y-2">
                        <p className="text-azul-escuro">{question.text}</p>
                        <div className="flex gap-4">
                            {emojis.map((emoji, emojiIndex) => (
                                <button key={emojiIndex} className="focus:outline-none">
                                    <emoji.icon className="w-8 h-8 text-yellow-500" />
                                </button>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex items-center mt-8 w-full gap-2
            
            ">
                <BarraProgresso/>
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
    { text: '1. As informações fornecidas antes da consulta foram suficientes e claras?' },
    { text: '2. A equipe administrativa conseguiu resolver suas dúvidas e problemas de forma satisfatória?' },
    { text: '3. Você recebeu confirmação da sua consulta de forma oportuna?' },
    { text: '4. A equipe administrativa foi proativa em garantir que sua experiência fosse positiva?' },
    { text: '5. Como classificaria o tempo que o seu médico passou consigo?' }
];

const emojis = [
    { icon: Angry },
    { icon: Frown },
    { icon: Annoyed },
    { icon: Smile },
    { icon: Laugh },
];

import { Globe, Mail, Phone } from 'lucide-react';
import React from 'react';

// Interface para as props
interface Props {
    handleBeforeStep: () => void;
    handleNextStep: () => void;
}

export default function Consulta({ handleBeforeStep, handleNextStep }: Props) {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center font-signika bg-gradient-to-b from-white to-purple-200">
            <div className="flex items-center ml-4 mb-6">
                <img src="/Logo.png" alt="logo coração - vitale" width={70} className="mr-4" />
                <h1 className="text-2xl font-extrabold text-azul-escuro">
                    Obrigado por sua Participação!
                </h1>
            </div>
            <div className="bg-white p-6 mx-4 mt-2 rounded-lg shadow-md text-center max-w-lg">
                <p className="text-lg text-azul-escuro mb-4">
                    Sua opinião é muito importante para nós e ajuda a melhorar os nossos serviços.
                </p>
                <p className="text-md text-gray-700 mb-6">
                    Continue utilizando nossos serviços de telemedicina e fique atento às novidades!
                </p>
            </div>
            <div className="flex items-center justify-between pt-3 px-3 bg-azul text-white w-full mt-10">
                <div className='flex flex-col'>
                    <div className="mb-2">
                        <a href="https://vitale.pt" className="hover:underline no-underline flex items-center gap-2 text-white">
                        <Globe size={18}/> vitale.pt</a>
                    </div>
                    <div className="mb-2">
                        <a href="mailto:vitale@vitale.pt" className="hover:underline no-underline flex items-center gap-2 text-white">
                        <Mail size={18}/> vitale@vitale.pt</a>
                    </div>
                    <div className="flex gap-1">
                        <Phone size={18}/>
                        <p>+351 256 936 200</p>
                    </div>
                </div>
                <div className='flex flex-col items-center'>
                    <p>Segunda – Sexta</p>
                    <p>10h00 – 20h00</p>
                </div>
            </div>
        </div>
    );
}

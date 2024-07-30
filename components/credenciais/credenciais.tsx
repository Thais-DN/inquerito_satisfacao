import { Globe, Mail, Phone } from 'lucide-react';
import React from 'react'

interface Props {
  handleNextStep: () => void;
}

function Credenciais({ handleNextStep }: Props) {
  return (
    <div className="flex flex-col justify-center h-screen w-screen bg-gradient-to-b from-white to-purple-200 font-signika">
      <div className="flex items-start justify-center mb-28">
        <img src="Logo.png" alt="Logo da Vitale" width={110} />
      </div>

      <div className="text-center mb-24">
        <h1 className="text-xl text-azul-escuro font-extrabold">Inquérito de satisfação</h1>
      </div>

      <div className="w-full flex flex-col px-4">
        <label htmlFor="email" className="mb-1 ml-2 text-sm font-bold text-azul-escuro">Insira seu e-mail:</label>
        <input 
          type="email" 
          name="email" 
          id="email" 
          placeholder="exemplo@exemplo.com" 
          className="w-full max-w-md border border-gray-300 rounded-xl p-2 pl-4 mb-6 bg-white"
        />
      </div>

      <div className="flex justify-center">
        <button 
          onClick={handleNextStep} 
          className="px-14 py-3 mb-24 bg-azul text-white rounded-3xl"
        >
          Iniciar
        </button>
      </div>

      <div className="flex items-center justify-between mt-10 p-5 bg-azul text-white">
        <div className='flex flex-col'>
          <div className="mb-2">
            <a href="https://vitale.pt" className="hover:underline flex items-center gap-2">
            <Globe size={18}/> vitale.pt</a>
          </div>
          <div className="mb-2">
            <a href="mailto:vitale@vitale.pt" className="hover:underline flex items-center gap-2">
              <Mail size={18}/> vitale@vitale.pt</a>
          </div>
          <div className="mb-2 flex items-center gap-1">
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

export default Credenciais;

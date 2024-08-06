import { setEmailLocalStorage } from '@/utils/handleEmailLocalStorage';
import { Globe, Mail, Phone } from 'lucide-react';
import React, { useState } from 'react';

interface Props {
  handleNextStep: () => void;
}

function Credenciais({ handleNextStep }: Props) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  // Função para validar o e-mail
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Função chamada ao clicar no botão
  const handleClick = () => {
    if (validateEmail(email)) {
      setError(''); // Limpa qualquer erro anterior
      setEmailLocalStorage(email)
      handleNextStep(); // Chama a função passada por props
    } else {
      setError('Por favor, insira um e-mail válido.');
    }
  };

  return (
    <div className="flex flex-col justify-between h-screen w-screen bg-gradient-to-b from-white to-purple-200 font-signika">
      {/* Centralizar logo em telas maiores */}
      <div className="flex items-start justify-center pt-7 md:pt-10">
        <img src="Logo.png" alt="Logo da Vitale" width={110} />
      </div>

      {/* Ajuste de título em telas maiores */}
      <div className="text-center mt-7 md:mt-10">
        <h1 className="text-2xl md:text-3xl text-azul-escuro font-extrabold">
          Inquérito de satisfação
        </h1>
      </div>

      {/* Container principal para centralizar e limitar largura */}
      <div className="flex flex-col px-4 mt-7 md:mt-10 w-full max-w-xl mx-auto">
        <label
          htmlFor="email"
          className="mb-1 ml-2 text-md font-bold text-azul-escuro"
        >
          Insira seu e-mail:
        </label>
        <input
          type="email"
          name="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="exemplo@exemplo.com"
          className="w-full max-w-md border border-gray-300 focus:outline-none rounded-xl p-2 pl-4 bg-white shadow"
        />
        {/* Mensagem de erro */}
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>

      {/* Botão centralizado e espaçamento em telas maiores */}
      <div className="flex justify-center mt-8 md:mt-12">
        <button
          onClick={handleClick}
          className="px-14 py-3 text-md bg-azul text-white rounded-3xl shadow-lg"
        >
          Iniciar
        </button>
      </div>

      <div className="flex items-center justify-between pt-3 px-3 bg-azul text-white mt-10">
        <div className='flex flex-col'>
          <div className="mb-2">
            <a href="https://vitale.healthysmartcities.pt/" className="hover:underline no-underline flex items-center gap-2 text-white">
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

export default Credenciais;

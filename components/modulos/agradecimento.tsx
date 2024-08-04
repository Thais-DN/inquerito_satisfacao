import { useEffect } from 'react';
import { Globe, Mail, Phone } from 'lucide-react';
import confetti from 'canvas-confetti';
import { removeEmailLocalStorage } from '@/utils/handleEmailLocalStorage';

// Interface for the props
interface Props {
  handleBeforeStep: () => void;
  handleNextStep: () => void;
}

export default function Consulta({ handleBeforeStep, handleNextStep }: Props) {
  // Trigger confetti when the component mounts
  useEffect(() => {
    // Basic confetti settings
    confetti({
      particleCount: 300,  // Number of confetti particles
      spread: 50,          // Spread of the particles
      origin: { y: 0.6 },  // Origin point of the confetti
      colors: ['#0fa5ab', '#d3afe4', '#4e8baa'],  // Colors of the confetti
    });
    removeEmailLocalStorage()
  }, []); // Empty dependency array ensures this runs only once

  return (
    <div className="flex flex-col justify-between h-screen w-screen bg-gradient-to-b from-white to-purple-200 font-signika">
      
      {/* Header with logo and title */}
      <div className="flex flex-col items-center justify-center pt-7">
        <img src="/logo-coracao.png" alt="Logo coração - Vitale" width={110} />
        <h1 className="text-2xl font-extrabold text-azul-escuro mt-4 text-center">
          Obrigado por sua Participação!
        </h1>
      </div>

      {/* Main content */}
      <div className="flex flex-col items-center justify-center px-4 mt-7">
        <div className="bg-white p-6 rounded-lg shadow-md text-center max-w-md w-full">
          <p className="text-lg text-azul-escuro">
            Sua opinião é muito importante para Vitale e ajuda a melhorar os nossos serviços.
          </p>
        </div>
      </div>

      {/* Footer with contact details */}
      <div className="flex items-center justify-between py-4 px-6 bg-azul text-white mt-10">
        <div className='flex flex-col'>
          <div className="mb-2">
            <a href="https://vitale.healthysmartcities.pt/" className="hover:underline no-underline flex items-center gap-2 text-white">
              <Globe size={18}/> vitale.pt
            </a>
          </div>
          <div className="mb-2">
            <a href="mailto:vitale@vitale.pt" className="hover:underline no-underline flex items-center gap-2 text-white">
              <Mail size={18}/> vitale@vitale.pt
            </a>
          </div>
          <div className="flex items-center gap-2">
            <Phone size={18}/>
            <p className='mb-0'>+351 256 936 200</p>
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


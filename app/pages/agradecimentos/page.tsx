"use client"
import { useEffect } from 'react';
import { Globe, Mail, Phone } from 'lucide-react';
import confetti from 'canvas-confetti';
import { removeEmailLocalStorage } from '@/utils/handleEmailLocalStorage';

export default function Consulta() {
  // Trigger confetti when the component mounts
  useEffect(() => {
    // Determine the settings based on the screen size
    const screenWidth = window.innerWidth;

    // Settings for different screen sizes
    let particleCount = 300;
    let spread = 50;
    let scalar = 1; // This controls the size of the confetti

    if (screenWidth >= 768 && screenWidth < 1024) { // md screens
      particleCount = 400;
      spread = 70;
      scalar = 1.2;
    } else if (screenWidth >= 1024) { // lg screens
      particleCount = 500;
      spread = 90;
      scalar = 1.5;
    }

    // Basic confetti settings with adjustments for larger screens
    confetti({
      particleCount: particleCount,
      spread: spread,
      origin: { y: 0.6 },
      scalar: scalar,  // Scale confetti size based on screen size
      colors: ['#0fa5ab', '#d3afe4', '#4e8baa'],
    });

    removeEmailLocalStorage()
  }, []); // Empty dependency array ensures this runs only once

  return (
    <div className="flex flex-col justify-between pt-10 h-screen w-screen bg-gradient-to-b from-white to-purple-200 font-signika">
      
      {/* Header with logo and title */}
      <div className="flex flex-col items-center justify-center pt-7">
        <img src="/logo-coracao.png" alt="Logo coração - Vitale" width={110} />
        <h1 className="text-2xl font-extrabold text-azul-escuro mt-4 text-center lg:text-3xl">
          Obrigado por sua Participação!
        </h1>
      </div>

      {/* Main content */}
      <div className="flex flex-col items-center justify-center px-4 mt-7">
        <div className="bg-white p-6 rounded-lg shadow-md text-center max-w-md w-full md:max-w-lg lg:max-w-xl"> {/* Ajustes responsivos */}
          <p className="text-lg text-azul-escuro md:text-xl lg:text-2xl"> {/* Ajuste do tamanho da fonte */}
            Sua opinião é muito importante para Vitale e ajuda a melhorar os nossos serviços.
          </p>
        </div>
      </div>

      {/* Footer with contact details */}
      <div className="flex items-center justify-between py-4 px-6 bg-azul text-white mt-10 md:justify-center md:gap-56 lg:gap-96">
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

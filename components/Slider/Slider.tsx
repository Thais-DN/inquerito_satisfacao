import React, { useState, useEffect } from "react";
import './Slider.css'; // Importação do CSS separado

// Definição dos tipos de chave de mapeamento de emoji
type EmojiMapKey = 0 | 25 | 50 | 75 | 100;

// Definição das labels e emojis associados
const phaseLabels = ["Muito Ruim", "Ruim", "Médio", "Bom", "Muito Bom"];
const emojiMap: Record<EmojiMapKey, string> = {
  0: "/emoji-1.png",
  25: "/emoji-2.png",
  50: "/emoji-3.png",
  75: "/emoji-4.png",
  100: "/emoji-5.png",
};

// Interface para as props do componente slider
interface SliderProps {
  defaultValue: number;
  onChange: (value: number) => void;
}

const CustomizedSlider: React.FC<SliderProps> = ({ defaultValue, onChange }) => {
  const [value, setValue] = useState<EmojiMapKey>(defaultValue as EmojiMapKey);

  // Atualiza o estado do valor quando a propriedade defaultValue muda
  useEffect(() => {
    setValue(defaultValue as EmojiMapKey);
  }, [defaultValue]);

  // Função de manipulação de mudança no slider
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value, 10) as EmojiMapKey;
    setValue(newValue);
    onChange(newValue);  // Chama a função de callback ao mudar o valor
  };

  return (
    <div className="slider-container min-w-56 relative mb-6">
      <input
        type="range"
        min="0"
        max="100"
        step="25"
        value={value}
        onChange={handleChange}
        className="slider"
        style={{
          background: `linear-gradient(to right, #52af77 ${value}%, #ddd ${value}%)`,
          transition: 'background 0.4s ease-in-out'  // Suaviza o movimento do background
        }}
      />
      <div
        className="thumb absolute transform -translate-x-1/2 transition-all"
        style={{ left: `${value}%`, transition: 'left 0.4s ease-in-out' }}
      >
        <div className="flex flex-col items-center">
          <div className="bg-gray-100 border border-gray-400 text-sm text-center px-2 py-1 rounded-sm mb-8 whitespace-nowrap">
            {phaseLabels[value / 25]}  {/* Acessa usando a indexação correta */}
          </div>
          <img
            src={emojiMap[value as EmojiMapKey]}  
            alt={phaseLabels[value / 25]}
            className="w-12 h-12"
            draggable={false}
            style={{ transform: 'translateY(-70%)', transition: 'transform 0.4s ease-in-out' }}
          />
        </div>
      </div>
    </div>
  );
};

export default CustomizedSlider;

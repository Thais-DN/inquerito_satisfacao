import React, { useState, useEffect } from "react";
import './Slider.css'; // Importação do CSS separado

// Definição dos tipos de chave de mapeamento de emoji
type EmojiMapKey = 0 | 25 | 50 | 75 | 100;

// Definição das labels e emojis associados
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
    <div className="slider-container w-full max-w-md pr mx-auto relative mb-4">
      <input
        type="range"
        min="0"
        max="100"
        step="25"
        value={value}
        onChange={handleChange}
        className="slider shadow-md"
        style={{
          background: `linear-gradient(to right, #0fa5ab ${value}%, #ddd ${value}%)`,
          transition: 'background 0.4s ease-in-out', // Suaviza o movimento do background
          width: '100%',
          height: "25px",
        }}
      />
      <div
        className="thumb absolute transform -translate-x-1/2 transition-all"
        style={{ left: `calc(${value}%)` }}  // Ajusta a posição final do emoji
      >
        <div className="flex flex-col items-center">
          <img
            src={emojiMap[value as EmojiMapKey]}
            className="min-w-10 w-10 min-h-10 h-10  md:w-12 md:h-12 shadow-md rounded-full" // Ajuste o tamanho do emoji para caber em diferentes tamanhos de tela
            draggable={false}
            style={{ transform: 'translateY(-10%)', transition: 'transform 0.4s ease-in-out' }}
          />
        </div>
      </div>
    </div>
  );
};

export default CustomizedSlider;

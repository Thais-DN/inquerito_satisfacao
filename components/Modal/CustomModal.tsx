import React, { MouseEvent } from 'react';

interface CustomModalProps {
  show: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title: string;
}

const CustomModal: React.FC<CustomModalProps> = ({ show, onClose, children, title }) => {
  if (!show) return null;

  // Função para fechar o modal ao clicar fora
  const handleOverlayClick = (e: MouseEvent<HTMLDivElement>) => {
    // Fecha o modal apenas se o clique for diretamente no overlay, e não em um filho (modal)
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-40 flex items-center justify-center bg-black bg-opacity-50"
      onClick={handleOverlayClick}
    >
      <div className="bg-white z-50 rounded-lg shadow-lg w-full max-w-2xl mx-4">
        <div className="bg-gradient-to-b from-white to-purple-200 p-4 rounded-t-lg flex justify-between items-center">
          <h2 className="text-lg font-semibold">{title}</h2>
        </div>
        <div className="bg-gradient-to-b from-white to-purple-200 p-6">
          {children}
        </div>
        <div className="bg-gradient-to-b from-white to-purple-200 p-4 rounded-b-lg flex justify-end">
          <button
            onClick={onClose}
            className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-500"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomModal;

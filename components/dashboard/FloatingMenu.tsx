"use client";

import { LineChart, MessageSquare, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const FloatingMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter(); // Hook para navegação

  const handleClick = (path: string) => {
    console.log(`Icon Clicked - Navigating to ${path}`);
    router.push(path);
  };

  return (
    <div>
      {isOpen && <div className="fixed inset-0 bg-black opacity-50 z-40"></div>}
      <div
        className="fixed z-50 menu-button"
        style={{ top: 20, left: 20 }}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="bg-blue-600/50 rounded-full w-12 h-12 flex items-center justify-center cursor-pointer">
          <span className="text-white text-2xl">≡</span> {/* Ícone de menu */}
        </div>

        {isOpen && (
          <div className="absolute flex flex-col items-center space-y-4 mt-4">
            <div
              className="bg-blue-600/50 rounded-full w-14 h-14 flex items-center justify-center cursor-pointer"
              onClick={() => handleClick('/pages/admin/dashboard/')} // Caminho para a página do gráfico de linha
            >
              <LineChart className="text-white w-8 h-8" />
            </div>
            <div
              className="bg-blue-600/50 rounded-full w-14 h-14 flex items-center justify-center cursor-pointer"
              onClick={() => handleClick('/pages/admin/client')} // Caminho para a página do cliente
            >
              <User className="text-white w-8 h-8" />
            </div>
            <div
              className="bg-blue-600/50 rounded-full w-14 h-14 flex items-center justify-center cursor-pointer"
              onClick={() => handleClick('/pages/admin/comments')} // Caminho para a página de comentários
            >
              <MessageSquare className="text-white w-8 h-8" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FloatingMenu;

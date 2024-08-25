"use client";

import { LineChart, MessageSquare, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const FloatingMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter(); // Hook para navegação
  const menuRef = useRef<HTMLDivElement>(null); // Referência ao menu

  const handleClick = (path: string) => {
    console.log(`Icon Clicked - Navigating to ${path}`);
    router.push(path);
    setIsOpen(false); // Fecha o menu ao clicar em um item
  };

  // Fecha o menu ao clicar fora dele
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div>
      {isOpen && <div className="fixed inset-0 bg-black opacity-50 z-40"></div>}
      <div
        ref={menuRef}
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

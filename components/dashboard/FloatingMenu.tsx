"use client"

import React, { useState, useEffect } from 'react';
import { LineChart, User, MessageSquare } from 'lucide-react';
import { useRouter } from 'next/navigation';

const FloatingMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 20, y: 20 });
  const [lastPosition, setLastPosition] = useState({ x: 0, y: 0 });
  const [isClick, setIsClick] = useState(true);

  const router = useRouter(); // Hook para navegação

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    setIsDragging(true);
    setLastPosition({ x: e.clientX - position.x, y: e.clientY - position.y });
    setIsClick(true);
    document.body.style.userSelect = 'none';
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      const newX = e.clientX - lastPosition.x;
      const newY = e.clientY - lastPosition.y;

      if (Math.abs(newX - position.x) > 5 || Math.abs(newY - position.y) > 5) {
        setIsClick(false);
      }

      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
      const menuWidth = 64; // largura do menu em pixels (w-16)
      const menuHeight = 64; // altura do menu em pixels (h-16)

      const clampedX = Math.max(0, Math.min(newX, windowWidth - menuWidth));
      const clampedY = Math.max(0, Math.min(newY, windowHeight - menuHeight));

      setPosition({ x: clampedX, y: clampedY });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    document.body.style.userSelect = '';
    if (isClick) {
      setIsOpen(!isOpen);
    }
  };

  const handleClickOutside = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (isOpen && target && !target.closest('.menu-button')) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    } else {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    }

    if (isOpen) {
      window.addEventListener('mousedown', handleClickOutside);
    } else {
      window.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mousedown', handleClickOutside);
      document.body.style.userSelect = '';
    };
  }, [isDragging, isOpen]);

  // Função de navegação
  const handleNavigation = (path: string) => {
    router.push(path);
  };

  return (
    <div>
      {isOpen && <div className="fixed inset-0 bg-black opacity-50 z-40"></div>}
      <div
        className="fixed z-50 menu-button"
        style={{ top: position.y, left: position.x }}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
      >
        <div className="bg-blue-600/50 rounded-full w-12 h-12 flex items-center justify-center cursor-pointer">
          <span className="text-white text-2xl">≡</span> {/* Ícone de menu */}
        </div>

        {isOpen && (
          <div className="absolute flex flex-col items-center space-y-4 mt-4">
            <div
              className="bg-blue-600/50 rounded-full w-14 h-14 flex items-center justify-center cursor-pointer"
              onClick={() => handleNavigation('/pages/dashboard/page')} // Caminho para a página do gráfico de linha
            >
              <LineChart className="text-white w-8 h-8" /> {/* Ícone de gráfico de linha */}
            </div>
            <div
              className="bg-blue-600/50 rounded-full w-14 h-14 flex items-center justify-center cursor-pointer"
              onClick={() => handleNavigation('/pages/admin/client')} // Caminho para a página do cliente
            >
              <User className="text-white w-8 h-8" /> {/* Ícone de usuário */}
            </div>
            <div
              className="bg-blue-600/50 rounded-full w-14 h-14 flex items-center justify-center cursor-pointer"
              onClick={() => handleNavigation('/pages/comments/comments')} // Caminho para a página de comentários
            >
              <MessageSquare className="text-white w-8 h-8" /> {/* Ícone de comentário */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FloatingMenu;

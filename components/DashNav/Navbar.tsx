import { User } from 'lucide-react';
import React, { useState, useEffect } from 'react';

interface NavbarProps {
  userEmail: string;
}

function Navbar({ userEmail }: NavbarProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    // Coloque aqui a lógica de logout, como redirecionamento ou chamada para API
    console.log('Logout realizado');
  };

  // Fechar dropdown ao clicar fora dele
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        event.target instanceof HTMLElement &&
        !event.target.closest('.dropdown-container')
      ) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener('click', handleClickOutside);
    } else {
      document.removeEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isDropdownOpen]);

  return (
    <div className="w-full flex justify-between items-center max-w-container relative"> 
      <h1 className="text-3xl font-bold text-gray-800">Resultados - 2024</h1>

      <div className="text-gray-600">
        <div className="flex items-center space-x-4 relative dropdown-container">
          <span className="font-semibold text-lg">{userEmail}</span>
          <div
            className="w-10 h-10 rounded-full border border-gray-400 flex items-center justify-center cursor-pointer"
            onClick={toggleDropdown}
          >
            <User />
          </div>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2">
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;

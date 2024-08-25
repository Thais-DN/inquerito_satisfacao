import { User } from 'lucide-react';
import React, { useState, useEffect } from 'react';

interface NavbarProps {
  userEmail: string;
}

function Navbar({ userEmail }: NavbarProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('sb-ccvxlexcbmaklofopssu-auth-token');
    fetch('/api/logout', { method: 'POST' })
      .then(response => {
        if (response.ok) {
          window.location.href = '/pages/admin';
        } else {
          console.error('Falha ao realizar logout');
        }
      })
      .catch(error => console.error('Erro ao fazer logout:', error))
      .finally(() => {
        window.location.reload();
      });
  };

  const handleChangePassword = () => {
    if (newPassword !== confirmNewPassword) {
      alert("As novas senhas não correspondem!");
      return;
    }

    fetch('/auth/change-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        currentPassword,
        newPassword,
      }),
    })
      .then(response => {
        if (response.ok) {
          alert("Senha alterada com sucesso!");
          setIsModalOpen(false);
        } else {
          alert("Erro ao alterar senha.");
        }
      })
      .catch(error => {
        console.error('Erro ao alterar senha:', error);
        alert("Erro ao alterar senha.");
      });    
  };

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
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 transform translate-y-full">
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
              >
                Logout
              </button>
              {/* <button
                onClick={() => setIsModalOpen(true)}
                className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
              >
                Alterar Senha
              </button> */}
            </div>
          )}
        </div>
      </div>

      {/* Modal de Alteração de Senha */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96">
            <h2 className="text-2xl font-semibold mb-4">Alterar Senha</h2>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Senha Atual
              </label>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Nova Senha
              </label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Confirmar Nova Senha
              </label>
              <input
                type="password"
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                onClick={handleChangePassword}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Alterar Senha
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Navbar;

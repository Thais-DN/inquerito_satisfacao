"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation"; // Importa o useRouter do Next.js
import { User } from "lucide-react"; // Importa o ícone de usuário do Lucide React

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>(""); // Estado para armazenar o email
  const [password, setPassword] = useState<string>(""); // Estado para armazenar a senha

  const router = useRouter(); // Inicializa o hook de navegação

  // Função para verificar se o email inserido é "thaisnunes@vitale.pt"
  const isSpecificUser = email === "thaisnunes@vitale.pt";

  // Função de submissão do formulário
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Lógica de autenticação básica (substitua pela lógica real de autenticação)
    if (email === "thaisnunes@vitale.pt" && password === "1234") {
      // Redireciona para a página de dashboard
      router.push("/admin/dashboard");
    } else {
      alert("Credenciais inválidas. Por favor, tente novamente.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-200 to-purple-300">
      <div className="flex w-full max-w-4xl mx-auto bg-white bg-opacity-30 rounded-lg shadow-lg overflow-hidden">
        {/* Seção do Logo */}
        <div className="w-1/2 bg-white bg-opacity-40 flex items-center justify-center p-6">
          <img src="/Logo.png" alt="Vitale Logo" className="w-32 h-32" />
        </div>

        {/* Seção do Formulário de Login */}
        <div className="w-1/2 p-8">
          <div className="flex justify-center mb-6">
            {/* Mostra o ícone ou a imagem com base no email inserido */}
            {isSpecificUser ? (
              <img
                src="/Thais.png"
                alt="Thais-adm"
                className="w-24 h-24 shadow-lg rounded-full"
              />
            ) : (
              <User className="w-24 h-24 text-gray-400 shadow-lg rounded-full" />
            )}
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                className="block text-gray-700 ml-1 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-3 py-2 text-gray-700 bg-white bg-opacity-50 rounded-lg focus:outline-none focus:shadow-outline"
                placeholder="Digite seu email"
                value={email}
                onChange={(e) => setEmail(e.target.value)} // Atualiza o estado do email
                required
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm ml-1 font-bold mb-2"
                htmlFor="password"
              >
                Senha
              </label>
              <input
                type="password"
                id="password"
                className="w-full px-3 py-2 text-gray-700 bg-white bg-opacity-50 rounded-lg focus:outline-none focus:shadow-outline"
                placeholder="Digite sua senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)} // Atualiza o estado da senha
                required
              />
            </div>
            <div className="flex justify-center mt-8">
              <button
                type="submit"
                className="px-14 py-3 text-md bg-azul text-white rounded-3xl shadow-lg"
              >
                Iniciar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

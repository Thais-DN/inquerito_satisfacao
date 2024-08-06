"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { User } from "lucide-react";
import { supabase } from "@/service/dbconnection";

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const router = useRouter();

  // Função de submissão do formulário com integração ao Supabase
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const { error, data } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        alert("Credenciais inválidas. Por favor, tente novamente.");
      } else {
        // Redireciona para a página de dashboard
        router.push("/admin/dashboard");
      }
    } catch (error) {
      console.error("Erro na autenticação:", error);
      alert("Erro ao tentar fazer login. Por favor, tente novamente.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br font-signika from-blue-200 to-purple-300">
      <div className="flex w-full max-w-4xl mx-auto bg-white bg-opacity-30 rounded-lg shadow-lg overflow-hidden">
        <div className="w-1/2 bg-white bg-opacity-40 flex items-center justify-center p-6">
          <img src="/Logo.png" alt="Vitale Logo" className="w-32 h-32" />
        </div>

        <div className="w-1/2 p-8">
          <div className="flex justify-center mb-6">
            <User className="w-24 h-24 text-gray-400 shadow-lg rounded-full" />
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
                onChange={(e) => setEmail(e.target.value)}
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
                onChange={(e) => setPassword(e.target.value)}
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

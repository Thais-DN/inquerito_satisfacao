"use client"

import Credenciais from "@/components/credenciais/credenciais";
import Admin from "@/components/modulos/admin";
import Consulta from "@/components/modulos/consulta";
import Geral from "@/components/modulos/geral";
import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Home() {
  // Estado para acompanhar a etapa atual do formulário
  const [currentStep, setCurrentStep] = React.useState<number>(1);

  // Função para avançar para a próxima etapa
  function handleNextStep() {
    setCurrentStep((prevStep) => {
      if (prevStep < 4) {  // Verifica se não é a última etapa
        return prevStep + 1;
      }
      return prevStep;  // Se for a última etapa, não muda
    });
  }

  // Função para voltar à etapa anterior
  function handleBeforeStep() {
    setCurrentStep((prevStep) => {
      if (prevStep > 1) {  // Verifica se não é a primeira etapa
        return prevStep - 1;
      }
      return prevStep;  // Se for a primeira etapa, não muda
    });
  }

  // Função para renderizar o componente correto com base na etapa atual
  const renderStepComponent = (currentStep: number) => {
    switch(currentStep) {
      case 1: 
        return <Credenciais handleNextStep={handleNextStep} />;
      case 2: 
        return <Admin handleBeforeStep={handleBeforeStep} handleNextStep={handleNextStep} />;
      case 3: 
        return <Consulta handleBeforeStep={handleBeforeStep} handleNextStep={handleNextStep} />;
      case 4: 
        return <Geral handleBeforeStep={handleBeforeStep} handleNextStep={handleNextStep} />;
      default:
        return <Credenciais handleNextStep={handleNextStep} />;
    }
  }

  // Renderiza o componente atual em um contêiner principal
  return (
    <main className="h-screen">
      {renderStepComponent(currentStep)}
    </main>
  );
}

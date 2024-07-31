"use client"

import Credenciais from "@/components/credenciais/credenciais";
import Admin from "@/components/modulos/admin";
import Consulta from "@/components/modulos/consulta";
import Geral from "@/components/modulos/geral";
import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Home() {
  const [currentStep, setCurrentStep] = React.useState<number>(1)

  function handleNextStep(){
    setCurrentStep((prevStep) => {
      if (prevStep < 4) {
        return prevStep + 1;
      }
      return prevStep;
    });
  }

  function handleBeforeStep(){
    setCurrentStep((prevStep) => {
      if (prevStep > 1) {
        return prevStep - 1;
      }
      return prevStep;
    });
  }


  const renderStepComponent = (currentStep: number) => {
    switch(currentStep){
      case 1: 
        return <Credenciais handleNextStep={handleNextStep} />
      case 2: 
        return <Admin handleBeforeStep={handleBeforeStep} handleNextStep={handleNextStep} />
      case 3: 
        return <Consulta handleBeforeStep={handleBeforeStep} handleNextStep={handleNextStep} />
      case 4: 
        return <Geral handleBeforeStep={handleBeforeStep} handleNextStep={handleNextStep} />
      default:
        return <Credenciais handleNextStep={handleNextStep}  />
    }
  }

  return (
    <main className="h-screen">
        {renderStepComponent(currentStep)}
    </main>
  );
}

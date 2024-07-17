"use client"

import Admin from "@/components/modulos/admin";
import Consulta from "@/components/modulos/consulta";
import Geral from "@/components/modulos/geral";
import React from "react";

export default function Home() {
  const [currentStep, setCurrentStep] = React.useState<number>(1)

  function handleNextStep(){
    setCurrentStep((prevStep) => {
      if (prevStep < 3) {
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
        return <Admin />
      case 2: 
        return <Consulta />
      case 3: 
        return <Geral />
      default:
        return <Admin />
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
        {renderStepComponent(currentStep)}
        <div className="flex mt-4">
          <button onClick={handleBeforeStep} className="mr-2 p-2 bg-gray-200 rounded">Previous</button>
          <button onClick={handleNextStep} className="ml-2 p-2 bg-gray-200 rounded">Next</button>
        </div>
    </main>
  );
}

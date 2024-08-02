import React from 'react';
import ProgressBar from 'react-bootstrap/ProgressBar';
import './ProgressBar.css'; // Importa o CSS personalizado

function BarraProgresso({ progress }: { progress: number }) {
  return (
    <ProgressBar
      animated
      now={progress}
      className="w-full shadow-md custom" // Aplica a classe personalizada
    />
  );
}

export default BarraProgresso;

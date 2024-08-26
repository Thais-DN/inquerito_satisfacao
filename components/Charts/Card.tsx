import React from 'react'

interface CardProps {
    cardTitle: string;
    cardValue: string | number;
    className?: string;
}

function Card({cardTitle, cardValue, className="col-span-1"}: CardProps) {
  return (
    <div className={`card flex flex-col items-center justify-center bg-white rounded-lg p-4 shadow-lg text-center min-w-[250px] ${className} `}>
        <p className="font-semibold text-azul">{cardTitle}</p>
        <p className="text-2xl font-bold text-gray-800">{cardValue}</p>
    </div>
  )
}

export default Card
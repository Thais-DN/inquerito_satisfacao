import { User } from 'lucide-react';
import React from 'react'

interface NavbarProps {
    userEmail: string;
}

function Navbar({userEmail}: NavbarProps) {
  return (
    <div className='w-full flex justify-between items-center max-w-container'> 
        <h1 className="text-3xl font-bold text-gray-800">Resultados - 2024</h1>

        <div className="text-gray-600 ">
            <div className="flex items-center space-x-4">
              <span className='font-semibold text-lg'>{userEmail}</span>
              <div className="w-10 h-10 rounded-full border border-gray-400 flex items-center justify-center">
                <User/>
              </div>
            </div>
        </div>
    </div>
  )
}

export default Navbar
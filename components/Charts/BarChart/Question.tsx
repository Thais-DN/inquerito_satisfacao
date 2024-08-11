import { Square } from 'lucide-react'
import React from 'react'

interface QuestionProps{
    color: string;
    text: string;
}

function Question({color, text}: QuestionProps) {
  return (
    <div className='flex gap-2 justify-start items-center'>
        <Square stroke={color} fill={color} width={18} height={18} className='min-w-5'/>
        <p>{text}</p>
    </div>
  )
}

export default Question
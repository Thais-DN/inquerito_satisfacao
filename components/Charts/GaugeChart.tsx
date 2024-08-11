import React from 'react'
import GaugeChart from 'react-gauge-chart'

interface Props { 
  normalizedValue: number
  displayValue: number
}

function GaugeChartCustom({normalizedValue, displayValue}:Props) {

  const chartStyle = {
    width: 500,
    marginTop: 20,
  }

  return (
    <GaugeChart 
      id="dashGougeChart" 
      textColor="#000" 
      style={chartStyle} 
      arcWidth={0.2} 
      colors={['#EA4228', '#F5CD19', '#5BE12C']}
      percent={normalizedValue} // Usa o valor normalizado
      formatTextValue={() => `${displayValue}%`} // Formata o texto para exibir sem casas decimais
    />
  )
}

export default GaugeChartCustom
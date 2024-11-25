import React from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Pie } from 'react-chartjs-2'
ChartJS.register(ArcElement, Tooltip, Legend)
function PieChartC({ data }) {
  const d = {
    labels: data.map((el) => el.nom),
    datasets: [
      {
        label: 'Prix',
        data: data.map((el) => el.gain),
        backgroundColor: [
          '#BC1313',
          '#3d4d72',
          '#FFD537',

          '#061b4a',

          '#707070',
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',

          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  }
  return <Pie data={d} />
}

export default PieChartC

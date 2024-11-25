import React from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)
const options = {
  responsive: true,

  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: '',
    },
  },
}

function BarChartC({ data }) {
  const labels = data.map((el) => el.date)
  const d = {
    labels,
    datasets: [
      {
        label: 'GAIN',
        data: data.map((el) => el.gain_t),
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  }

  return <Bar options={options} data={d} />
}

export default BarChartC

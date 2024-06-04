import React from 'react'
import { Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import ChartDataLabels from 'chartjs-plugin-datalabels'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels
)

interface Props {
  data: number[]
}

const DeltaChart: React.FC<Props> = ({ data }) => {
  const labels = ['Hour', 'Day', 'Week', 'Month', 'Quarter']
  const datasetLabel = 'Delta'

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: datasetLabel,
        data: data,
        backgroundColor: data.map((value) =>
          value < 0 ? 'rgba(255, 99, 132, 0.2)' : 'rgba(75, 192, 192, 0.2)'
        ),
        borderColor: data.map((value) =>
          value < 0 ? 'rgba(255, 99, 132, 1)' : 'rgba(75, 192, 192, 1)'
        ),
        borderWidth: 1,
      },
    ],
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Delta price for Bitcoin in EUR',
      },
      datalabels: {
        anchor: 'end' as const,
        align: 'end' as const,
        formatter: (value: number) => value.toFixed(2),
        color: (context: any) =>
          context.dataset.data[context.dataIndex] < 0 ? 'red' : 'green',
      },
    },
  }

  return (
    <div style={{ height: '500px', width: '100%' }}>
      <Bar data={chartData} options={options} />
    </div>
  )
}

export default DeltaChart

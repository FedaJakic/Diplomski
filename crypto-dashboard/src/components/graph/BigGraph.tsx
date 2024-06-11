import React, { useState, useEffect } from 'react'
import { Chart, ChartData, ChartOptions, registerables } from 'chart.js'
import 'chartjs-adapter-date-fns'
import { Line } from 'react-chartjs-2'
import Loading from '../global/Loading'
import { GraphHistory } from '../../util/pages/graphsAndInfos/types'

Chart.register(...registerables)

interface Props {
  historyData: GraphHistory[]
  name: string
}

const BigGraph: React.FC<Props> = ({ historyData, name }) => {
  const [data, setData] = useState<{ date: number; rate: number }[]>([])

  useEffect(() => {
    if (historyData && historyData.length > 0) {
      const processedData = historyData.map((item) => ({
        date: new Date(item.date).getTime(),
        rate: parseFloat(item.rate),
      }))
      setData(processedData)
    }
  }, [historyData])

  const chartData: ChartData<'line'> = {
    labels: data.map((item) => new Date(item.date)),
    datasets: [
      {
        label: 'Price',
        data: data.map((item) => item.rate),
        borderColor: '#2a9d8f',
        backgroundColor: 'rgba(42, 157, 143, 0.25)',
        borderWidth: 1,
        pointRadius: 0,
        tension: 0.4,
        fill: true,
      },
    ],
  }

  const chartOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'day', // Change unit to 'day' for better readability
          displayFormats: {
            day: 'MMM d', // Format for displaying date
          },
        },
        title: {
          display: true,
          text: 'Date',
        },
      },
      y: {
        beginAtZero: false,
        title: {
          display: true,
          text: 'Price (EUR)',
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      title: {
        display: true,
        text: `${name} Price History`,
        font: {
          size: 18,
        },
      },
      datalabels: {
        display: false, // Explicitly disable datalabels
      },
    },
  }

  return (
    <div style={{ height: '500px', width: '100%' }}>
      <Line data={chartData} options={chartOptions} />
    </div>
  )
}

export default BigGraph

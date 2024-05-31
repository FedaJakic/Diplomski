import React, { useEffect, useState } from 'react'
import { Chart, ChartData, ChartOptions, registerables } from 'chart.js'
import 'chartjs-adapter-date-fns'
import { Line } from 'react-chartjs-2'
import Loading from '../global/Loading'
import { GraphHistory } from '../../util/pages/graphsAndInfos/types'

Chart.register(...registerables)

interface Props {
  historyData: GraphHistory[]
}

const SmallGraph: React.FC<Props> = ({ historyData }) => {
  const [data, setData] = useState<{ date: number; rate: number }[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    if (historyData && historyData.length > 0) {
      const processedData = historyData.map((item) => ({
        date: new Date(item.date).getTime(),
        rate: parseFloat(item.rate),
      }))
      setData(processedData)
      setIsLoading(false)
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
          unit: 'minute',
        },
        display: false,
      },
      y: {
        beginAtZero: false,
        display: false,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  }

  const chartContainerStyle = {
    width: '200px',
    height: '50px',
  }

  if (isLoading) return <Loading />
  else
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={chartContainerStyle}
      >
        <Line data={chartData} options={chartOptions} />
      </div>
    )
}

export default SmallGraph

import React, { useEffect, useState } from 'react'
import {
  calculateTimeBasedOnTimestamp,
  satoshisToBTC,
} from '../../util/helpers/helpers'
import { Link } from 'react-router-dom'
import { BlockUrlsApi } from '../../api/block'
import Loading from '../global/Loading'

interface Block {
  height: string
  time: string
  totalSent: string
  totalFees: string
  transactions: string
  blockSize: string
}

const LastBlocksInfos: React.FC = () => {
  const [lastBlocks, setLastBlocks] = useState<Block[]>()
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    BlockUrlsApi.getLastBlocks()
      .then((res) => {
        setLastBlocks(res)
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false))
  }, [])

  if (isLoading) return <Loading />
  else
    return (
      <>
        <h4 className="my-4">Recent Blocks</h4>
        <table className="table table-hover">
          <thead>
            <tr>
              <th className="text-center" scope="col">
                Height
              </th>
              <th className="text-center" scope="col">
                Time
              </th>
              <th className="text-center" scope="col">
                Transactions
              </th>
              <th className="text-center" scope="col">
                Total sent
              </th>
              <th className="text-center" scope="col">
                Total Fees
              </th>
              <th className="text-center" scope="col">
                Block size
              </th>
            </tr>
          </thead>
          <tbody>
            {isLoading && <Loading />}
            {lastBlocks &&
              lastBlocks.map((block, key) => (
                <tr key={key}>
                  <td className="text-center">
                    <Link to={`/block/${block.height}`}>{block.height}</Link>
                  </td>
                  <td className="text-center">
                    {calculateTimeBasedOnTimestamp(parseInt(block.time))}
                  </td>
                  <td className="text-center">{block.transactions}</td>
                  <td className="text-center">
                    {satoshisToBTC(parseInt(block.totalSent))}
                  </td>
                  <td className="text-center">
                    {satoshisToBTC(parseInt(block.totalFees))}
                  </td>
                  <td className="text-center">{block.blockSize} bytes</td>
                </tr>
              ))}
          </tbody>
        </table>
      </>
    )
}

export default LastBlocksInfos

import React, { useEffect, useState } from 'react'
import { GraphsAndInfosApi } from '../../api/graphsAndInfos'
import { MempoolInfo } from '../../util/pages/graphsAndInfos/types'
import Loading from '../global/Loading'
const MempoolInfoComponent: React.FC = () => {
  const [mempoolInfo, setMempoolInfo] = useState<MempoolInfo>()
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchMempoolInfo = async () => {
      try {
        const response = await GraphsAndInfosApi.getMempoolInfo()
        console.log(response.data)
        setMempoolInfo(response.data)
        setIsLoading(false)
      } catch (err) {
        console.log(err)
      }
    }

    fetchMempoolInfo()
  }, [])

  if (isLoading) return <Loading />
  else
    return (
      <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
        <h1>Mempool Info</h1>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <tbody>
            <tr>
              <td style={{ padding: '10px', border: '1px solid #ccc' }}>
                <strong>Loaded:</strong>
              </td>
              <td style={{ padding: '10px', border: '1px solid #ccc' }}>
                {mempoolInfo && mempoolInfo.loaded ? 'Yes' : 'No'}
              </td>
            </tr>
            <tr>
              <td style={{ padding: '10px', border: '1px solid #ccc' }}>
                <strong>Size:</strong>
              </td>
              <td style={{ padding: '10px', border: '1px solid #ccc' }}>
                {mempoolInfo && mempoolInfo.size.toLocaleString()}
              </td>
            </tr>
            <tr>
              <td style={{ padding: '10px', border: '1px solid #ccc' }}>
                <strong>Bytes:</strong>
              </td>
              <td style={{ padding: '10px', border: '1px solid #ccc' }}>
                {mempoolInfo && mempoolInfo.bytes.toLocaleString()} bytes
              </td>
            </tr>
            <tr>
              <td style={{ padding: '10px', border: '1px solid #ccc' }}>
                <strong>Usage:</strong>
              </td>
              <td style={{ padding: '10px', border: '1px solid #ccc' }}>
                {mempoolInfo && (mempoolInfo.usage / 1024 / 1024).toFixed(2)} MB
              </td>
            </tr>
            <tr>
              <td style={{ padding: '10px', border: '1px solid #ccc' }}>
                <strong>Max Mempool:</strong>
              </td>
              <td style={{ padding: '10px', border: '1px solid #ccc' }}>
                {mempoolInfo &&
                  (mempoolInfo.maxmempool / 1024 / 1024).toFixed(2)}{' '}
                MB
              </td>
            </tr>
            <tr>
              <td style={{ padding: '10px', border: '1px solid #ccc' }}>
                <strong>Mempool Min Fee:</strong>
              </td>
              <td style={{ padding: '10px', border: '1px solid #ccc' }}>
                {mempoolInfo && mempoolInfo.mempoolminfee} BTC/kB
              </td>
            </tr>
            <tr>
              <td style={{ padding: '10px', border: '1px solid #ccc' }}>
                <strong>Min Relay Tx Fee:</strong>
              </td>
              <td style={{ padding: '10px', border: '1px solid #ccc' }}>
                {mempoolInfo && mempoolInfo.minrelaytxfee} BTC/kB
              </td>
            </tr>
            <tr>
              <td style={{ padding: '10px', border: '1px solid #ccc' }}>
                <strong>Unbroadcast Count:</strong>
              </td>
              <td style={{ padding: '10px', border: '1px solid #ccc' }}>
                {mempoolInfo && mempoolInfo.unbroadcastcount.toLocaleString()}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    )
}

export default MempoolInfoComponent

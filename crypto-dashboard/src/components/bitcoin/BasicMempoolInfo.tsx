import React from 'react'
import { OverlayTrigger, Tooltip } from 'react-bootstrap'
import { FaInfoCircle } from 'react-icons/fa'

interface MempoolInfo {
  loaded: boolean
  size: number
  bytes: number
  usage: number
  total_fee: number
  maxmempool: number
  mempoolminfee: number
  minrelaytxfee: number
  incrementalrelayfee: number
  unbroadcastcount: number
  fullrbf: boolean
}

interface MempoolInfoProps {
  mempoolInfo: MempoolInfo
}

const BasicMempoolInfo: React.FC<MempoolInfoProps> = ({ mempoolInfo }) => {
  const renderTooltip = (info: string) => (
    <Tooltip>
      <span>{info}</span>
    </Tooltip>
  )

  return (
    <div className="row">
      {[
        {
          title: 'Size',
          value: `${mempoolInfo.size.toLocaleString()} transactions`,
          info: 'The total number of transactions in the mempool.',
        },
        {
          title: 'Bytes',
          value: `${mempoolInfo.bytes.toLocaleString()} bytes`,
          info: 'The total size of transactions in the mempool in bytes.',
        },
        {
          title: 'Usage',
          value: `${mempoolInfo.usage.toLocaleString()} bytes`,
          info: 'The total memory usage for the mempool in bytes.',
        },
        {
          title: 'Total Fee',
          value: `${mempoolInfo.total_fee.toFixed(2)} BTC`,
          info: 'The total fee of transactions in the mempool.',
        },
        {
          title: 'Max Mempool',
          value: `${mempoolInfo.maxmempool.toLocaleString()} bytes`,
          info: 'The maximum memory usage allowed for the mempool in bytes.',
        },
        {
          title: 'Min Mempool Fee',
          value: `${mempoolInfo.mempoolminfee} BTC`,
          info: 'The minimum fee rate for transactions to be accepted into the mempool.',
        },
        {
          title: 'Min Relay Tx Fee',
          value: `${mempoolInfo.minrelaytxfee} BTC`,
          info: 'The minimum fee rate for transactions to be relayed to other nodes.',
        },
        {
          title: 'Incremental Relay Fee',
          value: `${mempoolInfo.incrementalrelayfee} BTC`,
          info: 'The fee rate increment used to calculate the minimum fee rate for relay.',
        },
        {
          title: 'Unbroadcast Count',
          value: mempoolInfo.unbroadcastcount,
          info: 'The number of transactions in the mempool that have not been broadcast yet.',
        },
        {
          title: 'Full RBF',
          value: mempoolInfo.fullrbf ? 'Yes' : 'No',
          info: 'Whether the full Replace-by-Fee (RBF) policy is enabled.',
        },
      ].map(({ title, value, info }) => (
        <div className="col-md-4" key={title}>
          <div className="card mb-4">
            <div className="card-body">
              <h5 className="card-title d-flex align-items-center">
                {title}
                <OverlayTrigger placement="top" overlay={renderTooltip(info)}>
                  <span>
                    <FaInfoCircle
                      className="ms-2"
                      style={{ cursor: 'pointer' }}
                    />
                  </span>
                </OverlayTrigger>
              </h5>
              <p className="card-text">{value}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default BasicMempoolInfo

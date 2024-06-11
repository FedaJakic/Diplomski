import React from 'react'

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
  return (
    <div className="row">
      <div className="col-md-4">
        <div className="card mb-4">
          <div className="card-body">
            <h5 className="card-title">
              <i className="bi bi-box-arrow-in-down"></i> Size
            </h5>
            <p className="card-text">
              {mempoolInfo.size.toLocaleString()} transactions
            </p>
          </div>
        </div>
      </div>
      <div className="col-md-4">
        <div className="card mb-4">
          <div className="card-body">
            <h5 className="card-title">
              <i className="bi bi-file-earmark-binary"></i> Bytes
            </h5>
            <p className="card-text">
              {mempoolInfo.bytes.toLocaleString()} bytes
            </p>
          </div>
        </div>
      </div>
      <div className="col-md-4">
        <div className="card mb-4">
          <div className="card-body">
            <h5 className="card-title">
              <i className="bi bi-cpu"></i> Usage
            </h5>
            <p className="card-text">
              {mempoolInfo.usage.toLocaleString()} bytes
            </p>
          </div>
        </div>
      </div>
      <div className="col-md-4">
        <div className="card mb-4">
          <div className="card-body">
            <h5 className="card-title">
              <i className="bi bi-currency-bitcoin"></i> Total Fee
            </h5>
            <p className="card-text">{mempoolInfo.total_fee.toFixed(2)} BTC</p>
          </div>
        </div>
      </div>
      <div className="col-md-4">
        <div className="card mb-4">
          <div className="card-body">
            <h5 className="card-title">
              <i className="bi bi-box-seam"></i> Max Mempool
            </h5>
            <p className="card-text">
              {mempoolInfo.maxmempool.toLocaleString()} bytes
            </p>
          </div>
        </div>
      </div>
      <div className="col-md-4">
        <div className="card mb-4">
          <div className="card-body">
            <h5 className="card-title">
              <i className="bi bi-currency-exchange"></i> Min Mempool Fee
            </h5>
            <p className="card-text">{mempoolInfo.mempoolminfee} BTC</p>
          </div>
        </div>
      </div>
      <div className="col-md-4">
        <div className="card mb-4">
          <div className="card-body">
            <h5 className="card-title">
              <i className="bi bi-currency-exchange"></i> Min Relay Tx Fee
            </h5>
            <p className="card-text">{mempoolInfo.minrelaytxfee} BTC</p>
          </div>
        </div>
      </div>
      <div className="col-md-4">
        <div className="card mb-4">
          <div className="card-body">
            <h5 className="card-title">
              <i className="bi bi-currency-exchange"></i> Incremental Relay Fee
            </h5>
            <p className="card-text">{mempoolInfo.incrementalrelayfee} BTC</p>
          </div>
        </div>
      </div>
      <div className="col-md-4">
        <div className="card mb-4">
          <div className="card-body">
            <h5 className="card-title">
              <i className="bi bi-broadcast"></i> Unbroadcast Count
            </h5>
            <p className="card-text">{mempoolInfo.unbroadcastcount}</p>
          </div>
        </div>
      </div>
      <div className="col-md-4">
        <div className="card mb-4">
          <div className="card-body">
            <h5 className="card-title">
              <i className="bi bi-arrows-angle-expand"></i> Full RBF
            </h5>
            <p className="card-text">{mempoolInfo.fullrbf ? 'Yes' : 'No'}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BasicMempoolInfo

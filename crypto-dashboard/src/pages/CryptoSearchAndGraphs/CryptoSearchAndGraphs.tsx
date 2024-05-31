import React, { useEffect, useState } from 'react'
import './graphs.module.css'
import CoinInfo from '../../components/graph/CoinInfo'
import SmallGraph from '../../components/graph/SmallGraph'
import { GraphsAndInfos } from '../../util/pages/graphsAndInfos/types'
import { GraphsAndInfosApi } from '../../api/graphsAndInfos'
import Loading from '../../components/global/Loading'

const CryptoSearchAndGraphs = () => {
  const [rowData, setRowData] = useState<GraphsAndInfos[]>()
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchTableData = async () => {
      try {
        const response = await GraphsAndInfosApi.getTableInfo()
        setRowData(response)
        setIsLoading(false)
      } catch (err) {
        setIsLoading(false)
      }
    }

    fetchTableData()
  }, [])

  if (isLoading) return <Loading />
  else
    return (
      <>
        <div className="container mt-5 px-2">
          {/* <div className="mb-2 d-flex justify-content-between align-items-center">
          <div className="position-relative">
            <span className="position-absolute search">
              <i className="fa fa-search"></i>
            </span>
            <input
              className="form-control w-100"
              placeholder="Search by order#, name..."
            />
          </div>

          <div className="px-2">
            <span>
              Filters <i className="fa fa-angle-down"></i>
            </span>
            <i className="fa fa-ellipsis-h ms-3"></i>
          </div>
        </div> */}
          <div className="table-responsive">
            <table className="table table-responsive table-borderless">
              <thead>
                <tr className="bg-light text-center">
                  <th scope="col">
                    {/* <input
                    className="form-check-input"
                    type="checkbox"
                    disabled
                  /> */}
                    FAV
                  </th>
                  <th scope="col">#</th>
                  <th scope="col">Coin</th>
                  <th scope="col">Price</th>
                  <th scope="col">Market Cap</th>
                  <th scope="col">Volume 24h</th>
                  <th scope="col">All-time high</th>
                  <th scope="col">1h</th>
                  <th scope="col">24h</th>
                  <th scope="col">Weekly</th>
                </tr>
              </thead>
              <tbody>
                {rowData &&
                  rowData.map((data) => (
                    <tr className="text-center">
                      <th scope="row">
                        <input className="form-check-input" type="checkbox" />
                      </th>
                      <td>{data.rank}</td>
                      <td>
                        <CoinInfo
                          name={data.name}
                          shortName={data.code}
                          image={data.image}
                        />
                      </td>
                      <td>{data.current_price}</td>
                      <td>{data.cap}</td>
                      <td>{data.volume}</td>
                      <td>{data.all_time_high_usd}</td>
                      <td>{data.delta_hour}</td>
                      <td>{data.delta_day}</td>
                      <td>
                        <SmallGraph historyData={data.history_7_days} />
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </>
    )
}

export default CryptoSearchAndGraphs

import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './favourites.module.css'
import CoinInfo from '../../components/graph/CoinInfo'
import SmallGraph from '../../components/graph/SmallGraph'
import { GraphsAndInfos } from '../../util/pages/graphsAndInfos/types'
import { GraphsAndInfosApi } from '../../api/graphsAndInfos'
import Loading from '../../components/global/Loading'
import { formatLargeNumber } from '../../util/pages/graphsAndInfos/helpers'
import { UserUrlsApi } from '../../api/user'
import { tokenDecode } from '../../util/helpers/tokenHelpers'

interface PaginationResponse<T> {
  data: T[]
  totalRecords: number
  currentPage: number
  totalPages: number
}

const Favourites: React.FC = () => {
  const token = localStorage.getItem('token')
  const [favourites, setFavourites] = useState<GraphsAndInfos[]>()
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const navigate = useNavigate()

  const fetchTableData = async () => {
    setIsLoading(true)
    try {
      if (token) {
        const decodedToken = tokenDecode(token)
        const responseFavourites = await UserUrlsApi.getFavourites({
          userId: decodedToken.id,
        })
        console.log(responseFavourites.favorite_cryptos)
        setFavourites(responseFavourites.favorite_cryptos)
        setIsLoading(false)
      }
    } catch (err) {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchTableData()
  }, [])

  const handleRowClick = (code: string) => {
    navigate(`/crypto-search/${code}`)
  }

  const getClassNameForDelta = (value: number) => {
    if (value > 0) {
      return `${styles.positive} ${styles['arrow-up']}`
    } else if (value < 0) {
      return `${styles.negative} ${styles['arrow-down']}`
    } else {
      return ''
    }
  }

  if (isLoading) return <Loading />
  else
    return (
      <>
        <div className="container mt-5 px-2">
          <div className="table-responsive">
            <table
              className={`table table-responsive table-borderless ${styles.table}`}
            >
              <thead>
                <tr className="bg-light text-center">
                  <th scope="col">#</th>
                  <th scope="col">Coin</th>
                  <th scope="col">Price</th>
                  <th scope="col">Market Cap</th>
                  <th scope="col">Volume 24h</th>
                  <th scope="col">All-time high (USD)</th>
                  <th scope="col">1h</th>
                  <th scope="col">24h</th>
                  <th scope="col">Weekly</th>
                </tr>
              </thead>
              <tbody>
                {favourites ? (
                  favourites.map(
                    (data, index) =>
                      data.visible && (
                        <tr
                          className={`text-center ${styles.rowHover}`}
                          key={index}
                          onClick={() => handleRowClick(data.code)}
                          style={{ cursor: 'pointer' }}
                        >
                          <td>{data.rank}</td>
                          <td>
                            <CoinInfo
                              name={data.name}
                              shortName={data.code}
                              image={data.image}
                            />
                          </td>
                          <td>{data.current_price}</td>
                          <td>{formatLargeNumber(data.cap)}</td>
                          <td>{formatLargeNumber(data.volume)}</td>
                          <td>{data.all_time_high_usd}</td>
                          <td
                            className={getClassNameForDelta(
                              parseFloat(data.delta_hour)
                            )}
                          >
                            {data.delta_hour}
                          </td>
                          <td
                            className={getClassNameForDelta(
                              parseFloat(data.delta_day)
                            )}
                          >
                            {data.delta_day}
                          </td>
                          <td>
                            <SmallGraph historyData={data.history_7_days} />
                          </td>
                        </tr>
                      )
                  )
                ) : (
                  <tr aria-colspan={6}>No favourites</tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </>
    )
}

export default Favourites

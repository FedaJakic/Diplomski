import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './graphs.module.css'
import CoinInfo from '../../components/graph/CoinInfo'
import SmallGraph from '../../components/graph/SmallGraph'
import { GraphsAndInfos } from '../../util/pages/graphsAndInfos/types'
import { GraphsAndInfosApi } from '../../api/graphsAndInfos'
import Loading from '../../components/global/Loading'
import { Pagination } from 'react-bootstrap'
import { formatLargeNumber } from '../../util/pages/graphsAndInfos/helpers'
import SearchBar from '../../components/graph/Search'
import SortDropdown from '../../components/graph/SortDropdown'

interface PaginationResponse<T> {
  data: T[]
  totalRecords: number
  currentPage: number
  totalPages: number
}

const CryptoSearchAndGraphs: React.FC = () => {
  const [rowData, setRowData] = useState<GraphsAndInfos[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [page, setPage] = useState<number>(1)
  const [totalPages, setTotalPages] = useState<number>(1)
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [sortOption, setSortOption] = useState<string>('rank_asc')

  const navigate = useNavigate()

  const fetchTableData = async (page: number) => {
    setIsLoading(true)
    try {
      const [sortField, sortOrder] = sortOption.split('_')
      const response: PaginationResponse<GraphsAndInfos> =
        await GraphsAndInfosApi.getTableInfo({
          page,
          sortField,
          sortOrder,
        })
      setRowData(response.data)
      setTotalPages(response.totalPages)
      setIsLoading(false)
    } catch (err) {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchTableData(page)
  }, [page, sortOption])

  const handlePageChange = (pageNumber: number) => {
    setPage(pageNumber)
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption(e.target.value)
  }

  const handleRowClick = (code: string) => {
    navigate(`/crypto-search/${code}`)
  }

  const filteredData = rowData.filter(
    (data) =>
      data.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      data.code.toLowerCase().includes(searchQuery.toLowerCase())
  )

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
          <div className="d-flex justify-content-between mb-3">
            <SearchBar
              searchQuery={searchQuery}
              onSearchChange={handleSearchChange}
            />
            <SortDropdown
              sortOption={sortOption}
              onSortChange={handleSortChange}
            />
          </div>
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
                {filteredData.map(
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
                )}
              </tbody>
            </table>
          </div>
          <Pagination className="d-flex justify-content-center">
            <Pagination.First
              onClick={() => handlePageChange(1)}
              disabled={page === 1}
            />
            <Pagination.Prev
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1}
            />
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(
              (pageNumber) => (
                <Pagination.Item
                  key={pageNumber}
                  active={pageNumber === page}
                  onClick={() => handlePageChange(pageNumber)}
                >
                  {pageNumber}
                </Pagination.Item>
              )
            )}
            <Pagination.Next
              onClick={() => handlePageChange(page + 1)}
              disabled={page === totalPages}
            />
            <Pagination.Last
              onClick={() => handlePageChange(totalPages)}
              disabled={page === totalPages}
            />
          </Pagination>
        </div>
      </>
    )
}

export default CryptoSearchAndGraphs

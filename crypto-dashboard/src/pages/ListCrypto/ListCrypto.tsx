import React, { useEffect, useState } from 'react'
import CoinInfo from '../../components/graph/CoinInfo'
import { GraphsAndInfos } from '../../util/pages/graphsAndInfos/types'
import { GraphsAndInfosApi } from '../../api/graphsAndInfos'
import Loading from '../../components/global/Loading'
import { Button, Pagination } from 'react-bootstrap'
import SearchBar from '../../components/graph/Search'
import SortDropdown from '../../components/graph/SortDropdown'
import styles from './listCrypto.module.css'

interface PaginationResponse<T> {
  data: T[]
  totalRecords: number
  currentPage: number
  totalPages: number
}

const ListCrypto: React.FC = () => {
  const [rowData, setRowData] = useState<GraphsAndInfos[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [page, setPage] = useState<number>(1)
  const [totalPages, setTotalPages] = useState<number>(1)
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [sortOption, setSortOption] = useState<string>('rank_asc')

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

  const toggleVisibility = async (id: string, visibility: boolean) => {
    try {
      const updatedCrypto = await GraphsAndInfosApi.updateCryptoVisibility({
        id,
        visibility,
      })
      if (updatedCrypto.success) {
        fetchTableData(page)
      }
    } catch (error) {
      console.error(error)
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

  const filteredData = rowData.filter(
    (data) =>
      data.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      data.code.toLowerCase().includes(searchQuery.toLowerCase())
  )

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
                  <th scope="col" style={{ textAlign: 'left' }}>
                    Coin
                  </th>
                  <th scope="col">Price</th>
                  <th scope="col">Visible</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((data, index) => (
                  <tr className={`text-center`} key={index}>
                    <td>{data.rank}</td>
                    <td>
                      <CoinInfo
                        name={data.name}
                        shortName={data.code}
                        image={data.image}
                      />
                    </td>
                    <td>{data.current_price} EUR</td>
                    <td>
                      <Button
                        variant={data.visible ? 'danger' : 'success'}
                        onClick={() => toggleVisibility(data.id, !data.visible)}
                      >
                        {data.visible ? 'Hide' : 'Show'}
                      </Button>
                    </td>
                  </tr>
                ))}
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

export default ListCrypto

import React, { useEffect, useState } from 'react'
import { NewsUrlsApi } from '../../api/news'
import Loading from '../../components/global/Loading'
import NewsCard from '../../components/news/NewsCard'
import { Article } from '../../util/pages/news/types'
import Pagination from 'react-bootstrap/Pagination'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import InputGroup from 'react-bootstrap/InputGroup'

const NewsAndAnalysis = () => {
  const [articles, setArticles] = useState<Article[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [currentPage, setCurrentPage] = useState<number>(0)
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [filteredArticles, setFilteredArticles] = useState<Article[]>([])
  const itemsPerPage = 18

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await NewsUrlsApi.getLatestNews()
        setArticles(response.articles)
        setFilteredArticles(response.articles)
        setIsLoading(false)
      } catch (err) {
        setIsLoading(false)
      }
    }

    fetchNews()
  }, [])

  const handlePageClick = (pageNumber: number) => {
    setCurrentPage(pageNumber)
  }

  const handleSearch = () => {
    const filtered = articles.filter(
      (article) =>
        article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (article.content &&
          article.content.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    setFilteredArticles(filtered)
    setCurrentPage(0) // Reset to first page on new search
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  const offset = currentPage * itemsPerPage
  const currentItems = filteredArticles.slice(offset, offset + itemsPerPage)

  const totalPages = Math.ceil(filteredArticles.length / itemsPerPage)

  if (isLoading) return <Loading />
  return (
    <div>
      <h1 className="d-flex flex-wrap justify-content-center m-4 text-center">
        Cryptocurrency News
      </h1>
      <div className="d-flex justify-content-center m-4">
        <InputGroup className="mb-3" style={{ maxWidth: '600px' }}>
          <Form.Control
            placeholder="Search articles"
            aria-label="Search articles"
            aria-describedby="basic-addon2"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <Button variant="primary" onClick={handleSearch}>
            Search
          </Button>
        </InputGroup>
      </div>
      {filteredArticles.length > 0 ? (
        <div>
          <div className="d-flex flex-wrap justify-content-start m-2 p-4">
            {currentItems.map((article) => (
              <NewsCard key={article.url} article={article} />
            ))}
          </div>
          <div className="d-flex justify-content-center m-4">
            <Pagination>
              <Pagination.First
                onClick={() => handlePageClick(0)}
                disabled={currentPage === 0}
              />
              <Pagination.Prev
                onClick={() => handlePageClick(currentPage - 1)}
                disabled={currentPage === 0}
              />
              {Array.from({ length: totalPages }, (_, i) => (
                <Pagination.Item
                  key={i}
                  active={i === currentPage}
                  onClick={() => handlePageClick(i)}
                >
                  {i + 1}
                </Pagination.Item>
              ))}
              <Pagination.Next
                onClick={() => handlePageClick(currentPage + 1)}
                disabled={currentPage === totalPages - 1}
              />
              <Pagination.Last
                onClick={() => handlePageClick(totalPages - 1)}
                disabled={currentPage === totalPages - 1}
              />
            </Pagination>
          </div>
        </div>
      ) : (
        <div className="d-flex justify-content-center m-4">
          <h2>No articles found</h2>
        </div>
      )}
    </div>
  )
}

export default NewsAndAnalysis

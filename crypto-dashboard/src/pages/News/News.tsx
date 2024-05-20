import React, { useEffect, useState } from 'react'
import { NewsUrlsApi } from '../../api/news'
import Loading from '../../components/global/Loading'
import NewsCard from '../../components/news/NewsCard'
import { Article } from '../../util/pages/news/types'

const NewsAndAnalysis = () => {
  const [articles, setArticles] = useState<Article[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await NewsUrlsApi.getLatestNews()
        console.log(response)
        setArticles(response.articles)
        setIsLoading(false)
      } catch (err) {
        setIsLoading(false)
      }
    }

    fetchNews()
  }, [])

  if (isLoading) return <Loading />
  return (
    <div>
      <h1 className="d-flex flex-wrap justify-content-center m-4 text-center">
        Cryptocurrency News
      </h1>
      <div className="d-flex flex-wrap justify-content-start m-2 p-4">
        {articles.map((article) => (
          <NewsCard article={article} />
        ))}
      </div>
    </div>
  )
}

export default NewsAndAnalysis

export interface Article {
  source: NewsSource
  author: string
  title: string
  description: string
  url: string
  urlToImage: string
  publishedAt: string
  content: string
}

interface NewsSource {
  id: string | null
  name: string
}

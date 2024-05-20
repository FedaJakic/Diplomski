import { axiosClient } from '..'
import { API_URL } from '../../util/env'

const NewsUrls = {
  getNews: `${API_URL.api_url}/api/news`,
}

export const NewsUrlsApi = {
  getLatestNews: async () =>
    axiosClient.get(NewsUrls.getNews).then((res) => res.data),
}

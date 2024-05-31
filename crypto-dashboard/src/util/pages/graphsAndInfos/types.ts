export interface GraphsAndInfos {
  name: string
  code: string
  rank: number
  image: string
  color: string
  official_website: string
  whitepaper: string
  current_price: number
  cap: number
  volume: number
  all_time_high_usd: number
  delta_hour: string
  delta_day: string
  history_7_days: GraphHistory[]
}

export interface GraphHistory {
  cap: string
  date: string
  rate: string
  volume: string
  liquditiy: string
}

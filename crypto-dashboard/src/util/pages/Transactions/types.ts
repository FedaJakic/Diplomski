export interface Transaction {
  address: string
  parent_descs: string[]
  category: string
  amount: number
  label: string
  vout: number
  confirmations: number
  blockhash: string
  blockheight: number
  blockindex: number
  blocktime: number
  txid: string
  wtxid: string
  walletconflicts: string[]
  time: number
  timereceived: number
  'bip125-replaceable': string
}

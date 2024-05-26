export enum API_URL {
  api_url = 'http://localhost:8000',
}

export enum Role {
  Member = '1',
  Admin = '2',
}

export enum PagesURLs {
  Login = '/login',
  Register = '/register',
  CryptoSearch = '/crypto-search',
  Graphs = '/graphs',
  NewsAndAnalysis = '/news',
  Conversion = '/conversion',
  Bitcoin = '/bitcoin',
  BitcoinBlockchain = '/latest-blocks',
  BlockHeight = '/block/:blockHeight',
  ListUser = '/list-user',
}

export enum Currencies {
  Euro = 'EUR',
  Dollar = 'USD',
  BritishPound = 'GBP',
  SwissFrank = 'CHF',
  NewZelandDollar = 'NZD',
  AustralianDollar = 'AUD',
  CanadianDollar = 'CAD',
  SerbianDinar = 'RSD',
}

export enum Cryptocurrencies {
  Bitcoin = 'BTC',
  BitcoinCash = 'BCH',
  Litecoin = 'LTC',
  Etherum = 'ETH',
  EtherumClassoc = 'ETC',
  Solana = 'SOL',
  XRP = 'XRP',
  Dogecoin = 'DOGE',
  Cardano = 'ADA',
}

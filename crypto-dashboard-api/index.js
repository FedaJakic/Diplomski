import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import block from './controllers/block.js'
import transactions from './controllers/transactions.js'
import loginAndRegister from './controllers/loginAndRegister.js'
import conversion from './controllers/conversion.js'
import news from './controllers/news.js'
import cryptoInfo from './controllers/cryptoInfo.js'
import bitcoin from './controllers/bitcoinInfo.js'
import messages from './controllers/messages.js'
import wallet from './controllers/wallet.js'
import { testConnection, syncDatabase } from './db.js'

dotenv.config()

const app = express()
const port = process.env.PORT || 8000
const enviroment = 'DEVELOPMENT'

app.use(cors())
app.use(express.json())

const startServer = async () => {
  try {
    await testConnection()

    await syncDatabase()

    app.listen(port, () => {
      console.log(`Server is running in ${enviroment} mode on port ${port}`)
    })
  } catch (error) {
    console.error('Error syncing database:', error)
  }
}

await startServer()

app.use('/api', loginAndRegister)
app.use('/api', conversion)
app.use('/api', news)
app.use('/api/blocks/', block)
app.use('/api/transactions', transactions)
app.use('/api/crypto-info', cryptoInfo)
app.use('/api/bitcoin', bitcoin)
app.use('/api/message', messages)
app.use('/api/wallet', wallet)

app.get('/', (req, res) => {
  res.send('Welcome to Express & TypeScript Server')
})

// app.listen(port, () => {
//   console.log(`Server is Fire at http://localhost:${port}`)
// })

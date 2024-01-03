import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import dashboard from './controllers/dashboard.js';

//For env File
dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

app.use('/api/dashboard/', dashboard);

app.get('/', (req, res) => {
  res.send('Welcome to Express & TypeScript Server');
});

app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});

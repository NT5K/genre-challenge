import express from 'express';
import cors from 'cors';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send({message: "home"});
});

app.get('/movie', async (req, res) => {
  const { title } = req.query;
  try {
    const url = `https://www.omdbapi.com/?t=${title}&apikey=${process.env.API_KEY}`;
    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Error fetching movie data', error);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

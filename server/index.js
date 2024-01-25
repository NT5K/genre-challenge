import express from 'express';
import cors from 'cors';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
const PORT = 3001;
const corsOptions = {
  origin: 'https://genre-challenge-demo1-4r35zmhbg-nt5k.vercel.app/', // Replace with your client's domain
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());


app.get('/movie', async (req, res) => {
  const { title } = req.query;
  // console.log('Title:', title); // Log the title
  try {
    const url = `https://www.omdbapi.com/?t=${title}&apikey=${process.env.API_KEY}`;
    const response = await axios.get(url);
    console.log('Response:', response.data); 
    res.json(response.data);
  } catch (error) {
    console.error('Error:', error); // Log the error
    res.status(500).send('Error fetching movie data');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

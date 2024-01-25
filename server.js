import express from 'express';
import cors from 'cors';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
const PORT = 3001;
// Enable CORS for all routes
app.use(cors());
app.use(express.json());

app.get('/movie', async (req, res) => {
    const { title } = req.query;
    // console.log('Title:', title); // Log the title
    try {
      const url = `http://www.omdbapi.com/?t=${title}&apikey=${process.env.API_KEY}`;
      // console.log('URL:', url); // Log the URL
      const response = await axios.get(url);
      console.log('Response:', response.data); // Log the response
      res.json(response.data);
    } catch (error) {
      console.error('Error:', error); // Log the error
      res.status(500).send('Error fetching movie data');
    }
  });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

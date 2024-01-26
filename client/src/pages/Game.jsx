import React, { useState, useEffect } from 'react';
import axios from 'axios';
import genres from '../assets/genres';
import GenreSelector from '../components/GenreSelector';
import MovieSearch from '../components/MovieSearch';
import MovieDisplay from '../components/MovieDisplay';
import SelectedMovies from '../components/SelectedMovies';
import ScoreDisplay from '../components/ScoreDisplay';

const Game = () => {
    const [isGenreMatch, setIsGenreMatch] = useState(false);
    const [selectedGenre, setSelectedGenre] = useState('');

    const [selectedMovies, setSelectedMovies] = useState([]);
    const [movieData, setMovieData] = useState(null);
    const [movieTitle, setMovieTitle] = useState('');

    const [score, setScore] = useState(0);
    const [scoreMessage, setScoreMessage] = useState('');
    const [showScore, setShowScore] = useState(false);

    const [showSubmitButton, setShowSubmitButton] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');

    const fetchMovie = async () => {
        try {
            const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
            console.log(apiUrl)
            console.log(`${apiUrl}/movie?title=${movieTitle}`, "full url")
            const response = await axios.get(`${apiUrl}/movie?title=${movieTitle}`);
            if (response.data.Response === 'False') {
                setMovieData(null);
                setErrorMessage(response.data.Error);
            } else {
                // Movie found
                setMovieData(response.data);
                setErrorMessage('');
            }
        } catch (error) {
            console.error('Error fetching movie data:', error);
        }
    };

    const handleAddMovie = () => {
        if (movieData && movieData.Genre.split(', ').includes(selectedGenre)) {
            if (selectedMovies.length >= 2) {
                alert('You can only select two movies!');
                return;
            }
            setSelectedMovies([...selectedMovies, movieData]);
            setScore(score + parseFloat(movieData.imdbRating));
        } else {
            alert(`Selected movie is not in the '${selectedGenre}' genre.`);
        }
    };

    const resetGame = (e) => {
        e.preventDefault();
        setSelectedMovies([]);
        setScore(0);
        setShowScore(false);
        setMovieData(null);
        setMovieTitle('');
        setErrorMessage('');
        setIsGenreMatch(false);
        setShowSubmitButton(true);
    };

    useEffect(() => {
        if (selectedMovies.length === 2) {
            setShowScore(true);
            setShowSubmitButton(false);
            const totalScore = selectedMovies.reduce((acc, movie) => acc + parseFloat(movie.imdbRating), 0);
            let message = '';
            if (totalScore === 10) {
                message = 'Perfect score!';
            } else if (totalScore > 10) {
                message = 'Too high!';
            } else {
                message = 'Can be better!';
            }
            setScoreMessage(`You got ${totalScore}/10! ${message}`);
        } else {
            setShowScore(false);
        }
    }, [selectedMovies]);

    useEffect(() => {
        if (movieData) {
            const match = selectedGenre && movieData && movieData.Genre.split(',').map(genre => genre.trim().toLowerCase()).includes(selectedGenre.trim().toLowerCase());
            setIsGenreMatch(match);
        }
    }, [movieData, selectedGenre]);

    return (
        <div className="container-fluid vh-100 p-1 p-md-5">
            <div className="row flex-grow-1">
                <div className="col-12 col-md-12">
                    <div className="card my-3">
                        <div className="card-header">
                            <h3 className="card-title text-center">Welcome to The Genre Challenge!</h3>
                        </div>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-12">

                                    <p className="card-text text-center">
                                        To play the game, start by selecting a movie genre from the dropdown below. Then, search for two movies within the selected genre. Your goal is to choose movies whose combined IMDb ratings total as close to 10/10 as possible without going over. Good luck! You can{' '}
                                        <a href="#" onClick={resetGame}>
                                            Click Here
                                        </a>
                                        {' '}at anytime to reset your game.
                                        <br />
                                        Once you select two movies, the game will show you how close your score is to 10/10.
                                    </p>
                                    <hr />
                                </div>
                                <div className="col-md-6">
                                    <GenreSelector genres={genres} selectedGenre={selectedGenre} setSelectedGenre={setSelectedGenre} />
                                    {selectedGenre && (
                                        <div>
                                            <MovieSearch movieTitle={movieTitle} setMovieTitle={setMovieTitle} fetchMovie={fetchMovie} errorMessage={errorMessage} />
                                            <hr />
                                            {score > 0 && (
                                                <div className="row">
                                                    <SelectedMovies selectedMovies={selectedMovies} />
                                                    {
                                                        selectedMovies.length === 2 && (
                                                            <ScoreDisplay showScore={showScore} score={score} scoreMessage={scoreMessage} resetGame={resetGame} />
                                                        )
                                                    }
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                                <div className="col-md-6">
                                    <MovieDisplay movieData={movieData} handleAddMovie={handleAddMovie} showSubmitButton={showSubmitButton} isGenreMatch={isGenreMatch} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Game;

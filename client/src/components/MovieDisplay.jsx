import React from 'react';
import logo from '../assets/images/logo.png';
import no_poster from '../assets/images/no_poster.png';

const MovieDisplay = ({ movieData, handleAddMovie, showSubmitButton, isGenreMatch }) => (
    <div className="row">
        <div className={`col-12 ${movieData === null ? 'col-md-12' : 'col-md-6'}`}>
            <div className="text-center">
                {movieData === null ? (
                    <img src={logo} alt='logo' className="img-fluid" style={{ maxHeight: '500px' }} />
                ) : movieData.Poster !== "N/A" ? (
                    <img src={movieData.Poster} alt={movieData.Title} className="img-fluid" style={{ maxHeight: '500px' }} />
                ) : (
                    <img src={no_poster} alt='no poster available' className="img-fluid" style={{ maxHeight: '500px' }} />
                )}
            </div>
        </div>
        {movieData !== null &&
            <div className="col-12 col-md-6">
                <div>
                    <p><strong>Title:</strong> {movieData.Title}</p>
                    <p><strong>Plot:</strong> {movieData.Plot}</p>
                    <p><strong>Actors:</strong> {movieData.Actors}</p>
                    <p><strong>Director:</strong> {movieData.Director}</p>
                    <p><strong>Genre:</strong> <span style={{ color: isGenreMatch ? 'green' : 'red' }}>{movieData.Genre}</span></p>
                    <p><strong>Released:</strong> {movieData.Released}</p>
                    <div className="">
                        {showSubmitButton && (
                            <button className="btn btn-success" onClick={handleAddMovie} disabled={!isGenreMatch}>Submit this Movie</button>
                        )}
                    </div>
                </div>
            </div>
        }
    </div>
);

export default MovieDisplay;
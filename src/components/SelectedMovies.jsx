import React from 'react';

const SelectedMovies = ({ selectedMovies }) => (
    <div className="col-12 col-md-6">
        <h3>Selected Movies</h3>
        <div className="row">
            {selectedMovies.map((movie, index) => (
                <div className="col-12 col-md-6 mb-3" key={`movie-${index + 1}`}>
                    <div className="card h-100">
                        <div className="card-body">
                            <h5 className="card-title">Movie {index + 1}</h5>
                            <h5 className="card-title">{movie.Title}</h5>
                            <p className="card-text">
                                Rating: <span className="badge bg-secondary">{movie.imdbRating}</span>
                            </p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
);

export default SelectedMovies;
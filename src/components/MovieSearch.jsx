import React from 'react';

const MovieSearch = ({ movieTitle, setMovieTitle, fetchMovie, errorMessage }) => (
    <div>
        <h5>Enter a Movie title</h5>
        <div className="input-group mb-3">
            <input
                type="text"
                className="form-control"
                placeholder="Enter movie title..."
                value={movieTitle}
                onChange={(e) => setMovieTitle(e.target.value)}
            />
            <button className="btn btn-secondary" onClick={fetchMovie}>Search Movie</button>
        </div>
        {errorMessage && <div className="alert alert-danger" role="alert">{errorMessage}</div>}

    </div>
);

export default MovieSearch;
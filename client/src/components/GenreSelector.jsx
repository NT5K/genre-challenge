import React from 'react';

const GenreSelector = ({ genres, selectedGenre, setSelectedGenre }) => (
    <div id='select-genre-div'>
        <h5>Select a genre to begin playing</h5>
        <div className="mb-3">
            <select className="form-select" value={selectedGenre} onChange={(e) => setSelectedGenre(e.target.value)}>
                <option value="">Choose a genre</option>
                {genres.map(genre => (
                    <option key={genre} value={genre}>{genre}</option>
                ))}
            </select>
        </div>
    </div>
);

export default GenreSelector;
import React from 'react';

const ScoreDisplay = ({ showScore, score, scoreMessage, resetGame }) => (
    <div className="col-12 col-md-6 pb-2">
        <h3>Final Score</h3>
        {showScore && (
            <div className="card text-center">
                <div className="card-body">
                    <h2 className="card-text">{score}/10</h2>
                    <h5 className="card-text">
                        {scoreMessage}
                        {' '}
                        <a href="#" onClick={resetGame}>
                            Play Again
                        </a>
                    </h5>
                </div>
            </div>
        )}
    </div>
);

export default ScoreDisplay;
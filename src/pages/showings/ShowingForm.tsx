import React, { useState } from 'react';

const ShowingForm = () => {
    const [movieTitle, setMovieTitle] = useState('');
    const [cinemaName, setCinemaName] = useState('');
    const [showingTime, setShowingTime] = useState('');
    const [showingSubmits, setShowingSubmits] = useState<string[]>([]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newSubmit = `${movieTitle} - ${cinemaName} - ${showingTime}`;
        setShowingSubmits([...showingSubmits, newSubmit]);
        setMovieTitle('');
        setCinemaName('');
        setShowingTime('');
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    Movie Title:
                    <input type="text" value={movieTitle} onChange={(e) => setMovieTitle(e.target.value)} />
                </label>
                <br />
                <label>
                    Cinema Name:
                    <input type="text" value={cinemaName} onChange={(e) => setCinemaName(e.target.value)} />
                </label>
                <br />
                <label>
                    Showing Time:
                    <input type="text" value={showingTime} onChange={(e) => setShowingTime(e.target.value)} />
                </label>
                <br />
                <button type="submit">Add Showing</button>
            </form>
            <div>
                <h2>Showing Submits:</h2>
                <ul>
                    {showingSubmits.map((submit, index) => (
                        <li key={index}>{submit}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default ShowingForm;
        
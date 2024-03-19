import React, { useState } from 'react';

type Movie = {
    id: number;
    title: string;
};

const TicketPurchase: React.FC = () => {
    const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
    const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

    const movieList: Movie[] = [
        { id: 1, title: 'Movie 1' },
        { id: 2, title: 'Movie 2' },
        { id: 3, title: 'Movie 3' },
    ];

    const handleMovieChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const movieId = parseInt(event.target.value);
        const selectedMovie = movieList.find((movie) => movie.id === movieId);
        setSelectedMovie(selectedMovie || null);
    };

    const handleSeatSelection = (seat: string) => {
        if (selectedSeats.includes(seat)) {
            setSelectedSeats(selectedSeats.filter((selectedSeat) => selectedSeat !== seat));
        } else {
            setSelectedSeats([...selectedSeats, seat]);
        }
    };

    const handleCheckout = () => {
        // Add your logic to navigate to the checkout page
    };

    return (
        <div>
            <h1>Ticket Purchase</h1>
            <label htmlFor="movie">Select a movie:</label>
            <select id="movie" value={selectedMovie?.id || ''} onChange={handleMovieChange}>
                <option value="">-- Select a movie --</option>
                {movieList.map((movie) => (
                    <option key={movie.id} value={movie.id}>
                        {movie.title}
                    </option>
                ))}
            </select>
            <h2>Available Seats</h2>
            <div>
                {selectedMovie && (
                    <ul>
                        <li onClick={() => handleSeatSelection('Seat 1')}>Seat 1</li>
                        <li onClick={() => handleSeatSelection('Seat 2')}>Seat 2</li>
                        <li onClick={() => handleSeatSelection('Seat 3')}>Seat 3</li>
                        {/* Add more seats as needed */}
                    </ul>
                )}
            </div>
            <button onClick={handleCheckout} disabled={!selectedMovie || selectedSeats.length === 0}>
                Go to Checkout
            </button>
        </div>
    );
};

export default TicketPurchase;

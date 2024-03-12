export default function Movies() {
    const movies = [
        { id: 1, title: 'Indiana Jones' },
        { id: 2, title: 'Dune 2' },
        { id: 3, title: 'Shrek 3' },
    ];

    return (
        <div>
            <h1>Movies</h1>
            <ul>
                {movies.map((movie) => (
                    <li key={movie.id}>{movie.title}</li>
                ))}
            </ul>
        </div>
    );
}

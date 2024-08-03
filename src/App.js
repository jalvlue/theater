import './App.css';
import SearchIcon from './search.svg'
import MovieCard from './MovieCard.jsx';
import { useState, useEffect } from 'react';

// 3b2f9d90
// http://www.omdbapi.com/?i=tt3896198&apikey=3b2f9d90
const API_URL = "http://www.omdbapi.com/?i=tt3896198&apikey=3b2f9d90";


function App() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const serchMovie = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();

    setMovies(data.Search);
  }

  useEffect(() => {
    serchMovie("detachment");
  }, []);

  return (
    <div className="app">
      <h1>Theater</h1>

      <div className='search'>
        <input
          placeholder='Search for moview'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <img
          src={SearchIcon}
          alt="search"
          onClick={() => serchMovie(searchTerm)}
        />
      </div>

      {
        movies?.length > 0
          ? (
            <div className="container">
              {movies.map((movie) => (
                <MovieCard movie={movie} />
              ))}
            </div>
          ) : (
            <div className='empty'>
              <h2>No movies found</h2>
            </div>
          )
      }

    </div>
  );
}

export default App;

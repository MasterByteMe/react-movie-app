import { useEffect, useState } from "react"; // Import hooks for managing state and side effects
import { useDebounce } from "react-use"; // Import debounce hook to optimize search input handling
import { getTrendingMovies, updateSearchCount } from "./appwrite.js"; // Import functions for API interactions

import Search from "./components/Search.jsx"; // Import Search component
import Spinner from "./components/Spinner.jsx"; // Import Spinner component
import MovieCard from "./components/MovieCard.jsx"; // Import MovieCard component

const API_BASE_URL = "https://api.themoviedb.org/3"; // Define base URL for the movie API
const API_KEY = import.meta.env.VITE_TMDB_API_KEY; // Retrieve API key from environment variables

const API_OPTIONS = {
  // Define API request options
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};

const App = () => {
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(""); // State for debounced search term
  const [searchTerm, setSearchTerm] = useState(""); // State for user input search term

  const [movieList, setMovieList] = useState([]); // State to store list of movies
  const [errorMessage, setErrorMessage] = useState(""); // State to store error messages
  const [isLoading, setIsLoading] = useState(false); // State to manage loading state

  const [trendingMovies, setTrendingMovies] = useState([]); // State to store trending movies

  // Debounce the search term to prevent excessive API requests (waits 500ms after last input change)
  useDebounce(() => setDebouncedSearchTerm(searchTerm), 500, [searchTerm]);

  // Function to fetch movies from API, either by search query or default trending list
  const fetchMovies = async (query = "") => {
    setIsLoading(true); // Set loading state to true
    setErrorMessage(""); // Clear previous error messages

    try {
      const endpoint = query
        ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}` // Search endpoint
        : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`; // Default popular movies endpoint

      const response = await fetch(endpoint, API_OPTIONS); // Fetch movies from API

      if (!response.ok) {
        throw new Error("Failed to fetch movies"); // Handle response error
      }

      const data = await response.json(); // Convert response to JSON

      if (data.Response === "False") {
        // Handle API error response
        setErrorMessage(data.Error || "Failed to fetch movies");
        setMovieList([]);
        return;
      }

      setMovieList(data.results || []); // Store fetched movies in state

      if (query && data.results.length > 0) {
        // If search query is valid, update search count
        await updateSearchCount(query, data.results[0]);
      }
    } catch (error) {
      console.error(`Error fetching movies: ${error}`);
      setErrorMessage("Error fetching movies. Please try again later."); // Display error message
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };

  // Function to fetch trending movies from API
  const loadTrendingMovies = async () => {
    try {
      const movies = await getTrendingMovies(); // Call API function
      setTrendingMovies(movies); // Store trending movies in state
    } catch (error) {
      console.error(`Error fetching trending movies: ${error}`);
    }
  };

  // Effect hook: Fetch movies when debounced search term changes
  useEffect(() => {
    fetchMovies(debouncedSearchTerm);
  }, [debouncedSearchTerm]);

  // Effect hook: Load trending movies on initial render
  useEffect(() => {
    loadTrendingMovies();
  }, []);

  return (
    <main>
      <div className="pattern" /> {/* Background pattern styling */}
      <div className="wrapper">
        <header>
          <img src="./hero.png" alt="Hero Banner" /> {/* Header banner image */}
          <h1>
            Find <span className="text-gradient">Movies</span> You'll Enjoy
            Without the Hassle
          </h1>
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />{" "}
          {/* Search input component */}
        </header>

        {/* Section to display trending movies */}
        {trendingMovies.length > 0 && (
          <section className="trending">
            <h2>Trending Movies</h2>
            <ul>
              {trendingMovies.map((movie, index) => (
                <li key={movie.$id}>
                  {/* Unique key for each list item */}
                  <p>{index + 1}</p> {/* Movie ranking number */}
                  <img src={movie.poster_url} alt={movie.title} />{" "}
                  {/* Movie poster */}
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Section to display all movies */}
        <section className="all-movies">
          <h2>All Movies</h2>
          {isLoading ? (
            <Spinner /> // Show loading spinner if data is being fetched
          ) : errorMessage ? (
            <p className="text-red-500">{errorMessage}</p> // Display error message if an error occurs
          ) : (
            <ul>
              {movieList.map((movie) => (
                <MovieCard key={movie.id} movie={movie} /> // Display individual movie card
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
};

export default App; // Export App component for use in the application

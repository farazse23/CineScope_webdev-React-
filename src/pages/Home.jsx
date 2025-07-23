// src/pages/Home.jsx
import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import SearchBar from "../components/SearchBar";
import axios from "axios";
import Loader from "../components/loader";
import ErrorMessage from "../components/ErrorMessage";

const Home = () => {
  const [trending, setTrending] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const apiKey = import.meta.env.VITE_TMDB_API_KEY;

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `https://api.themoviedb.org/3/trending/movie/week?api_key=${apiKey}`
        );
        setTrending(res.data.results);
        setError(false);
      } catch (error) {
        console.error("Error fetching trending movies:", error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchTrending();
  }, [apiKey]);

  const handleSearch = async (query) => {
    try {
      setLoading(true);
      setIsSearching(true);
      setSearchQuery(query);
      setError(false);
      
      const res = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(query)}&page=1`
      );
      setSearchResults(res.data.results);
    } catch (error) {
      console.error("Error searching movies:", error);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const handleClearSearch = () => {
    setIsSearching(false);
    setSearchResults([]);
    setSearchQuery("");
    setError(false);
  };

  const displayMovies = isSearching ? searchResults : trending;
  const sectionTitle = isSearching 
    ? `Search Results for "${searchQuery}"` 
    : "Trending This Week";

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message="Failed to load movies. Please try again." />;

  return (
    <div className="px-6 py-10">
      {/* Hero Section */}
      {!isSearching && (
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold mb-4 text-indigo-600 dark:text-indigo-400">
            Welcome to CineScope
          </h2>
          <p className="text-lg max-w-2xl mx-auto mb-8 text-gray-700 dark:text-gray-300">
            Explore trending movies, top rated films, and more all in one place. Updated daily with the latest from TMDB.
          </p>
        </div>
      )}

      {/* Search Bar */}
      <SearchBar onSearch={handleSearch} onClear={handleClearSearch} />

      {/* Movies Section */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-semibold">{sectionTitle}</h3>
        {isSearching && (
          <button
            onClick={handleClearSearch}
            className="px-4 py-2 text-sm bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition duration-300"
          >
            Back to Trending
          </button>
        )}
      </div>

      {displayMovies.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-xl text-gray-500 dark:text-gray-400">
            {isSearching ? "No movies found for your search." : "No trending movies available."}
          </p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {displayMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;

import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../components/loader";
import ErrorMessage from "../components/ErrorMessage";
import { FiArrowLeft, FiStar, FiCalendar, FiClock, FiBookmark, FiPlus } from "react-icons/fi";
import useWatchlist from "../hooks/watchlist";

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [videoKey, setVideoKey] = useState(null);
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { addToWatchlist, removeFromWatchlist, isInWatchlist } = useWatchlist();

  const apiKey = import.meta.env.VITE_TMDB_API_KEY;

  const handleWatchlistClick = () => {
    if (isInWatchlist(parseInt(id))) {
      removeFromWatchlist(parseInt(id));
    } else {
      addToWatchlist(movie);
    }
  };

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setLoading(true);
        const [movieRes, videoRes, castRes] = await Promise.all([
          axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en-US`),
          axios.get(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${apiKey}`),
          axios.get(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${apiKey}`)
        ]);

        setMovie(movieRes.data);

        const trailer = videoRes.data.results.find(
          (vid) => vid.type === "Trailer" && vid.site === "YouTube"
        );
        setVideoKey(trailer?.key || null);

        setCast(castRes.data.cast.slice(0, 8));
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError(true);
        setLoading(false);
      }
    };

    fetchDetails();
  }, [id, apiKey]);

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message="Failed to load movie details. Please try again." />;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 mb-6 px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition duration-300"
      >
        <FiArrowLeft />
        Back
      </button>

      {/* Movie Header */}
      <div className="grid md:grid-cols-3 gap-8 mb-8">
        <div className="md:col-span-1">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="w-full rounded-lg shadow-lg"
          />
        </div>
        
        <div className="md:col-span-2">
          <div className="flex items-start justify-between mb-4">
            <h1 className="text-4xl font-bold">{movie.title}</h1>
            <button
              onClick={handleWatchlistClick}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition duration-300 ${
                isInWatchlist(parseInt(id))
                  ? "bg-blue-500 text-white hover:bg-blue-600"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
              }`}
            >
              {isInWatchlist(parseInt(id)) ? (
                <>
                  <FiBookmark className="w-4 h-4" />
                  In Watchlist
                </>
              ) : (
                <>
                  <FiPlus className="w-4 h-4" />
                  Add to Watchlist
                </>
              )}
            </button>
          </div>
          
          <div className="flex items-center gap-6 mb-4 text-gray-600 dark:text-gray-400">
            <div className="flex items-center gap-1">
              <FiCalendar />
              <span>{movie.release_date}</span>
            </div>
            <div className="flex items-center gap-1">
              <FiClock />
              <span>{movie.runtime} min</span>
            </div>
            <div className="flex items-center gap-1">
              <FiStar className="text-yellow-500" />
              <span>{movie.vote_average.toFixed(1)}/10</span>
            </div>
          </div>

          <p className="text-lg mb-6 leading-relaxed text-gray-700 dark:text-gray-300">{movie.overview}</p>

          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-3">Genres</h3>
            <div className="flex gap-2 flex-wrap">
              {movie.genres.map((genre) => (
                <span key={genre.id} className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 rounded-full text-sm">
                  {genre.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Trailer */}
      {videoKey && (
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Trailer</h2>
          <div className="aspect-video">
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${videoKey}`}
              title="YouTube video player"
              frameBorder="0"
              allowFullScreen
              className="rounded-lg"
            ></iframe>
          </div>
        </div>
      )}

      {/* Cast */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Cast</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
          {cast.map((actor) => (
            <div key={actor.cast_id} className="text-center">
              <img
                src={
                  actor.profile_path
                    ? `https://image.tmdb.org/t/p/w185${actor.profile_path}`
                    : "https://via.placeholder.com/185x278?text=No+Image"
                }
                alt={actor.name}
                className="w-full rounded-lg mb-2 shadow-md"
              />
              <p className="text-sm font-medium">{actor.name}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">{actor.character}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;

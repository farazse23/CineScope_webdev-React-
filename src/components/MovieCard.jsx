// src/components/MovieCard.jsx
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FiStar, FiCalendar, FiBookmark, FiPlus } from "react-icons/fi";
import useWatchlist from "../hooks/watchlist";

const MovieCard = ({ movie }) => {
  const { id, title, poster_path, vote_average, release_date } = movie;
  const navigate = useNavigate();
  const { addToWatchlist, removeFromWatchlist, isInWatchlist } = useWatchlist();

  const handleClick = () => {
    navigate(`/movie/${id}`);
  };

  const handleWatchlistClick = (e) => {
    e.stopPropagation(); // Prevent navigation when clicking watchlist button
    if (isInWatchlist(id)) {
      removeFromWatchlist(id);
    } else {
      addToWatchlist(movie);
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="rounded-xl overflow-hidden shadow-md bg-white dark:bg-gray-800 cursor-pointer transition duration-300 hover:shadow-lg relative"
      onClick={handleClick}
    >
      {/* Watchlist Button */}
      <button
        onClick={handleWatchlistClick}
        className={`absolute top-2 right-2 p-2 rounded-full z-10 transition-colors duration-200 ${
          isInWatchlist(id)
            ? "bg-blue-500 text-white hover:bg-blue-600"
            : "bg-white/80 text-gray-700 hover:bg-white hover:text-blue-500"
        } backdrop-blur-sm shadow-lg`}
        title={isInWatchlist(id) ? "Remove from Watchlist" : "Add to Watchlist"}
      >
        {isInWatchlist(id) ? (
          <FiBookmark className="w-4 h-4" />
        ) : (
          <FiPlus className="w-4 h-4" />
        )}
      </button>
      <img
        src={
          poster_path
            ? `https://image.tmdb.org/t/p/w500${poster_path}`
            : "https://via.placeholder.com/300x450?text=No+Image"
        }
        alt={title}
        className="w-full h-72 object-cover"
        onError={(e) => {
          e.target.src = "https://via.placeholder.com/300x450?text=No+Image";
        }}
      />
      <div className="p-4">
        <h4 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">{title}</h4>
        <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-300">
          <div className="flex items-center space-x-1">
            <FiStar className="text-yellow-500" />
            <span>{vote_average ? vote_average.toFixed(1) : "N/A"}</span>
          </div>
          <div className="flex items-center space-x-1">
            <FiCalendar className="text-blue-500" />
            <span>{release_date ? new Date(release_date).getFullYear() : "TBD"}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default MovieCard;

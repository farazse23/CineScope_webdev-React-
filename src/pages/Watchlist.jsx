import { motion } from "framer-motion";
import useWatchlist from "../hooks/watchlist";
import MovieCard from "../components/MovieCard";
import { FiBookmark, FiTrash2 } from "react-icons/fi";

const Watchlist = () => {
  const { watchlist, removeFromWatchlist } = useWatchlist();

  const handleClearAll = () => {
    if (window.confirm("Are you sure you want to clear your entire watchlist?")) {
      watchlist.forEach(movie => removeFromWatchlist(movie.id));
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <FiBookmark className="text-3xl text-blue-500" />
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            My Watchlist
          </h1>
          <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm font-medium">
            {watchlist.length} {watchlist.length === 1 ? 'movie' : 'movies'}
          </span>
        </div>
        
        {watchlist.length > 0 && (
          <button
            onClick={handleClearAll}
            className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300"
          >
            <FiTrash2 className="w-4 h-4" />
            Clear All
          </button>
        )}
      </div>

      {watchlist.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-16"
        >
          <FiBookmark className="text-6xl text-gray-300 dark:text-gray-600 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-gray-600 dark:text-gray-400 mb-2">
            Your watchlist is empty
          </h2>
          <p className="text-gray-500 dark:text-gray-500">
            Start adding movies you want to watch later!
          </p>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
        >
          {watchlist.map((movie) => (
            <motion.div
              key={movie.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <MovieCard movie={movie} />
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default Watchlist;

// src/components/Header.jsx
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FiSun, FiMoon, FiBookmark } from "react-icons/fi";
import useWatchlist from "../hooks/watchlist";

const Header = () => {
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'dark' || 
        (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    return false;
  });
  
  const navigate = useNavigate();
  const location = useLocation();
  const { watchlist } = useWatchlist();

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const handleLogoClick = () => {
    navigate("/");
  };

  const toggleTheme = () => {
    setDarkMode(prev => !prev);
  };

  const handleWatchlistClick = () => {
    navigate("/watchlist");
  };

  return (
    <header className="flex items-center justify-between px-6 py-4 shadow-md bg-white dark:bg-gray-900 transition-colors duration-300 sticky top-0 z-50">
      <h1 
        className="text-3xl font-bold text-indigo-600 dark:text-indigo-400 cursor-pointer hover:text-indigo-700 dark:hover:text-indigo-300 transition duration-300"
        onClick={handleLogoClick}
      >
        CineScope
      </h1>

      <div className="flex items-center gap-4">
        {/* Watchlist Button */}
        <button
          onClick={handleWatchlistClick}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition duration-300 relative ${
            location.pathname === '/watchlist'
              ? 'bg-indigo-500 text-white'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
          }`}
        >
          <FiBookmark className="text-lg" />
          Watchlist
          {watchlist.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {watchlist.length > 99 ? '99+' : watchlist.length}
            </span>
          )}
        </button>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="flex items-center justify-center w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          aria-label={`Switch to ${darkMode ? 'light' : 'dark'} mode`}
        >
        {darkMode ? (
          <FiSun className="text-yellow-500 text-lg" />
        ) : (
          <FiMoon className="text-gray-700 text-lg" />
        )}
      </button>
      </div>
    </header>
  );
};

export default Header;

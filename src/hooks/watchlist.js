import { useEffect, useState, useRef } from "react";

const WATCHLIST_KEY = "watchlist";

export default function useWatchlist() {
  const [watchlist, setWatchlist] = useState(() => {
    // Initialize state with localStorage data immediately
    if (typeof window !== 'undefined') {
      try {
        const storedList = localStorage.getItem(WATCHLIST_KEY);
        if (storedList) {
          const parsedList = JSON.parse(storedList);
          return parsedList;
        }
      } catch (error) {
        console.error("Error loading watchlist from localStorage:", error);
        localStorage.removeItem(WATCHLIST_KEY);
      }
    }
    return [];
  });
  
  const isInitialized = useRef(false);

  // Mark as initialized after first render
  useEffect(() => {
    isInitialized.current = true;
  }, []);

  // Update localStorage when watchlist changes (but not on initial load)
  useEffect(() => {
    if (isInitialized.current) {
      try {
        localStorage.setItem(WATCHLIST_KEY, JSON.stringify(watchlist));
      } catch (error) {
        console.error("Error saving watchlist to localStorage:", error);
      }
    }
  }, [watchlist]);

  const addToWatchlist = (movie) => {
    if (!isInWatchlist(movie.id)) {
      setWatchlist((prev) => [...prev, movie]);
    }
  };

  const removeFromWatchlist = (movieId) => {
    setWatchlist((prev) => prev.filter((m) => m.id !== movieId));
  };

  const isInWatchlist = (movieId) => {
    return watchlist.some((m) => m.id === movieId);
  };

  return { watchlist, addToWatchlist, removeFromWatchlist, isInWatchlist };
}

// Debug helper for testing localStorage
if (typeof window !== 'undefined') {
  window.debugWatchlist = () => {
    const stored = localStorage.getItem('watchlist');
    console.log('=== WATCHLIST DEBUG ===');
    console.log('localStorage key "watchlist":', stored);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        console.log('Parsed watchlist:', parsed);
        console.log('Number of movies:', parsed.length);
      } catch (e) {
        console.error('Error parsing watchlist:', e);
      }
    } else {
      console.log('No watchlist found in localStorage');
    }
    console.log('All localStorage keys:', Object.keys(localStorage));
    console.log('======================');
  };
  
  window.clearWatchlist = () => {
    localStorage.removeItem('watchlist');
    console.log('Watchlist cleared from localStorage');
    window.location.reload(); // Reload to see changes
  };
}

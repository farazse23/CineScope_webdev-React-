// src/components/SearchBar.jsx
import { useState } from "react";
import { FiSearch, FiX } from "react-icons/fi";

const SearchBar = ({ onSearch, onClear }) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  const handleClear = () => {
    setQuery("");
    onClear();
  };

  return (
    <div className="mb-8">
      <form onSubmit={handleSubmit} className="flex max-w-2xl mx-auto">
        <div className="relative flex-1">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for movies..."
            className="w-full px-4 py-3 pl-12 pr-12 text-lg border border-gray-300 dark:border-gray-600 rounded-l-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:border-indigo-500 dark:focus:border-indigo-400"
          />
          <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
          {query && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              <FiX className="text-xl" />
            </button>
          )}
        </div>
        <button
          type="submit"
          className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-r-lg transition duration-300"
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchBar;

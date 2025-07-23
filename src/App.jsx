import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import MovieDetails from "./pages/MovieDetails";
import Watchlist from "./pages/Watchlist";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route path="/watchlist" element={<Watchlist />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;



# 🎬 CineScope - Movie Discovery & Watchlist App

A modern, responsive movie discovery application built with React and Vite. Browse trending movies, search for your favorites, view detailed information, and manage your personal watchlist.

![CineScope Preview](https://via.placeholder.com/800x400/4F46E5/FFFFFF?text=CineScope+Movie+App)

## ✨ Features

- **🔍 Movie Search** - Search for movies using The Movie Database (TMDB) API
- **📋 Movie Details** - View comprehensive movie information including:
  - Plot synopsis, cast, and crew
  - Release date, runtime, and ratings
  - Movie trailers (YouTube integration)
  - Genre information
- **⭐ Watchlist Management** - Save movies to watch later with persistent storage
- **🌙 Dark/Light Theme** - Toggle between themes with system preference detection
- **📱 Responsive Design** - Optimized for desktop, tablet, and mobile devices
- **⚡ Fast Performance** - Built with Vite for lightning-fast development and builds

## 🚀 Technologies Used

- **Frontend Framework**: React 19.1.0
- **Build Tool**: Vite 7.0.5
- **Styling**: Tailwind CSS 3.4.0
- **Icons**: React Icons (Feather Icons)
- **Animations**: Framer Motion
- **Routing**: React Router DOM
- **HTTP Client**: Axios
- **Movie Data**: The Movie Database (TMDB) API

## 🛠️ Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/cinescope.git
   cd cinescope
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   # Copy the example environment file
   cp .env.example .env
   
   # Add your TMDB API key to .env
   VITE_TMDB_API_KEY=your_tmdb_api_key_here
   ```

4. **Get TMDB API Key**
   - Visit [The Movie Database](https://www.themoviedb.org/)
   - Create a free account
   - Go to Settings → API → Request API Key
   - Copy your API key to the `.env` file

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to `http://localhost:5173`

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Header.jsx       # Navigation header with theme toggle
│   ├── MovieCard.jsx    # Individual movie display component
│   ├── SearchBar.jsx    # Movie search functionality
│   ├── ErrorMessage.jsx # Error display component
│   └── loader.jsx       # Loading spinner component
├── pages/               # Main application pages
│   ├── Home.jsx         # Homepage with trending movies
│   ├── MovieDetails.jsx # Detailed movie information page
│   └── Watchlist.jsx    # User's saved movies page
├── hooks/               # Custom React hooks
│   └── watchlist.js     # Watchlist state management
├── api/                 # API configuration
│   └── tmdb.js          # TMDB API setup
└── contexts/            # React context providers
    └── ThemeContext.jsx # Theme management context
```

## 🎯 Usage

### Browsing Movies
- Browse trending movies on the homepage
- Use the search bar to find specific movies
- Click on any movie card to view detailed information

### Managing Watchlist
- Click the **+** button on movie cards to add to watchlist
- Click the **bookmark** icon to remove from watchlist
- View your saved movies by clicking the "Watchlist" button in the header
- Clear all movies with the "Clear All" button

### Theme Switching
- Click the sun/moon icon in the header to toggle between light and dark themes
- The app remembers your preference and respects system settings

## 🔧 Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint for code quality
```

## 🌟 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License. See the `LICENSE` file for details.

## 🙏 Acknowledgments

- [The Movie Database (TMDB)](https://www.themoviedb.org/) for providing the movie data API
- [React](https://reactjs.org/) for the awesome frontend framework
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Vite](https://vitejs.dev/) for the blazing fast build tool

## 📞 Contact

Created by [Your Name] - feel free to contact me!

- GitHub: [@yourusername](https://github.com/yourusername)
- Email: your.email@example.com

---

⭐ Don't forget to star this repository if you found it helpful!

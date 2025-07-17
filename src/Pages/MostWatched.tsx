import { Link } from "react-router-dom";
import { getMovies } from "../Utils/MovieList";
import { motion } from "framer-motion";
import type { Movie } from "./MovieDetails";

export default function MostWatched() {
  // For demo purposes, we'll simulate most watched by adding a "views" property
  // In a real app, this would come from your backend analytics
  const movies: Movie[] = getMovies();

  // Simulate most watched movies by creating a mock popularity score
  const mostWatchedMovies = movies
    .map((movie) => ({
      ...movie,
      views: Math.floor(Math.random() * 1000000) + 10000, // Simulate view count
      popularity: Math.floor(Math.random() * 100) + 1, // Simulate popularity score
    }))
    .sort((a, b) => b.views - a.views);

  if (!mostWatchedMovies.length) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center text-white"
        >
          <div className="text-6xl mb-4">🎬</div>
          <h2 className="text-2xl font-bold mb-2">
            No Most Watched Movies Found
          </h2>
          <p className="text-gray-400">Try again later or check back soon!</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-black/50 z-10"></div>
        <div className="relative z-20 px-6 py-16 text-center">
          <motion.h1
            className="text-6xl md:text-7xl font-bold text-white mb-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Most
            <span className="bg-gradient-to-r from-green-400 via-emerald-500 to-teal-500 bg-clip-text text-transparent">
              {" "}
              Watched
            </span>
          </motion.h1>
          <motion.p
            className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Discover the most popular and trending films that everyone is
            watching
          </motion.p>
          <motion.div
            className="flex items-center justify-center gap-4 text-white/80"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-400 rounded-full"></span>
              {mostWatchedMovies.length} Popular Movies
            </span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 bg-emerald-400 rounded-full"></span>
              Trending Now
            </span>
          </motion.div>
        </div>
      </div>

      {/* Movies Grid Section */}
      <div className="px-6 py-12 max-w-7xl mx-auto">
        <motion.div
          className="flex items-center justify-between mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-white">Trending Films</h2>
          <div className="text-gray-400">
            Showing top {Math.min(mostWatchedMovies.length, 20)} most watched
            movies
          </div>
        </motion.div>

        <motion.ul
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {mostWatchedMovies.slice(0, 20).map((movie, index) => (
            <motion.div
              key={movie.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Link to={`/movie/${movie.id}`} state={{ movie }}>
                <motion.li
                  className="group relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                  whileHover={{
                    y: -10,
                    boxShadow: "0 20px 40px rgba(0,0,0,0.8)",
                  }}
                >
                  {/* Movie Poster */}
                  <div className="relative w-full aspect-[2/3] overflow-hidden">
                    <img
                      src={
                        movie.poster?.startsWith("http")
                          ? movie.poster
                          : "https://via.placeholder.com/300x450?text=No+Image"
                      }
                      alt={movie.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      loading="lazy"
                    />
                    {/* Overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                    {/* Views Badge */}
                    <div className="absolute top-3 right-3 bg-gradient-to-r from-green-400 to-emerald-500 text-black px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                      👁️ {(movie.views / 1000).toFixed(0)}K
                    </div>

                    {/* Popularity Rank */}
                    <div className="absolute top-3 left-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                      #{index + 1}
                    </div>

                    {/* Trending Badge */}
                    {index < 5 && (
                      <div className="absolute bottom-3 left-3 bg-gradient-to-r from-red-500 to-orange-500 text-white px-2 py-1 rounded-full text-xs font-bold shadow-lg animate-pulse">
                        🔥 Trending
                      </div>
                    )}
                  </div>

                  {/* Movie Info */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-green-400 transition-colors overflow-hidden">
                      <span className="block truncate">{movie.title}</span>
                    </h3>

                    <p className="text-gray-400 text-sm mb-4 leading-relaxed overflow-hidden">
                      <span
                        className="block"
                        style={{
                          display: "-webkit-box",
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                        }}
                      >
                        {movie.plot || "No description available."}
                      </span>
                    </p>

                    {/* Movie Meta */}
                    <div className="flex items-center justify-between text-sm mb-3">
                      <span className="text-gray-300 font-medium">
                        {movie.year || "N/A"}
                      </span>
                      <span className="text-gray-400">
                        {movie.runtime || "2h"}
                      </span>
                      <span className="bg-gradient-to-r from-green-500 to-emerald-500 text-black px-2 py-1 rounded-full text-xs font-medium">
                        Popular
                      </span>
                    </div>

                    {/* Stats Row */}
                    <div className="flex items-center justify-between text-xs text-gray-400">
                      <div className="flex items-center gap-1">
                        <span>⭐ {movie.imdbRating || "N/A"}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span>👁️ {(movie.views / 1000).toFixed(0)}K views</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span>📊 {movie.popularity}%</span>
                      </div>
                    </div>

                    {/* Popularity Bar */}
                    <div className="mt-3">
                      <div className="flex items-center gap-2 text-xs text-gray-400">
                        <span>Popularity</span>
                        <div className="flex-1 bg-gray-700 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-green-400 to-emerald-500 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${movie.popularity}%` }}
                          ></div>
                        </div>
                        <span>{movie.popularity}%</span>
                      </div>
                    </div>
                  </div>

                  {/* Hover Effect Border */}
                  <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-green-500/50 transition-colors duration-300"></div>
                </motion.li>
              </Link>
            </motion.div>
          ))}
        </motion.ul>

        {/* View All Button */}
        {mostWatchedMovies.length > 20 && (
          <motion.div
            className="flex justify-center mt-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.button
              className="group relative bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-black font-semibold py-4 px-10 rounded-full shadow-xl transition-all duration-300 overflow-hidden"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10 flex items-center gap-3">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
                View All Popular Movies
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            </motion.button>
          </motion.div>
        )}
      </div>
    </div>
  );
}

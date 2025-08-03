import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { getMovies } from "../Utils/MovieList"; // ✅ بنسحب الداتا المتخزنة
import type { Movie } from "./MovieDetails";
import { useState } from "react";

export default function Home() {
  const movies: Movie[] = getMovies();
  const [displayCount, setDisplayCount] = useState(15);
  const limitedMovies = movies.slice(0, displayCount);

  const handleLoadMore = () => {
    setDisplayCount((prev) => Math.min(prev + 15, movies.length)); // ⬅️ نزيد 15 في كل مرة
  };

  const hasMoreMovies = displayCount < movies.length; // ⬅️ نتحقق إذا كان هناك المزيد

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
            Movie
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              {" "}
              Hub
            </span>
          </motion.h1>
          <motion.p
            className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Discover the latest and greatest films from around the world
          </motion.p>
          <motion.div
            className="flex items-center justify-center gap-4 text-white/80"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-400 rounded-full"></span>
              {movies.length} Movies Available
            </span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
              Latest Releases
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
          <h2 className="text-3xl font-bold text-white">Featured Movies</h2>
          <div className="text-gray-400">
            Showing {limitedMovies.length} of {movies.length} movies
          </div>
        </motion.div>

        <motion.ul
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {limitedMovies.map((movie, index) => (
            <motion.div
              key={movie.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Link to={`/movie/${movie.id}`} state={{ movie }}>
                <motion.li
                  className="group relative flex flex-col bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl h-[520px]"
                  whileHover={{
                    y: -10,
                    boxShadow: "0 20px 40px rgba(0,0,0,0.8)",
                  }}
                >
                  <Link
                    to={`/movie/${movie.id}`}
                    state={{ movie }}
                    className="flex flex-col h-full"
                  >
                    {/* Poster */}
                    <div className="relative w-full h-[260px] overflow-hidden">
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
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute top-3 right-3 bg-yellow-500 text-black px-2 py-1 rounded-full text-sm font-bold">
                        ⭐ {movie.imdbRating || "N/A"}
                      </div>
                    </div>

                    {/* Info */}
                    <div className="p-4 flex flex-col flex-1">
                      <h3 className="text-lg font-bold text-white mb-2 line-clamp-2 group-hover:text-blue-400 transition-colors">
                        {movie.title}
                      </h3>
                      <p className="text-gray-400 text-sm line-clamp-3 mb-4">
                        {movie.plot || "No description available."}
                      </p>

                      {/* Meta Info */}
                      <div className="mt-auto flex items-center justify-between text-sm">
                        <span className="text-gray-300 font-medium">
                          {movie.year || "N/A"}
                        </span>
                        <span className="text-gray-400">
                          {movie.runtime || "2h"}
                        </span>
                        <span className="bg-blue-600 text-white px-2 py-1 rounded-full text-xs font-medium">
                          Movie
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.li>
              </Link>
            </motion.div>
          ))}
        </motion.ul>

        {/* Load More Button */}
        {hasMoreMovies && (
          <motion.div
            className="flex justify-center mt-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.button
              onClick={handleLoadMore}
              className="group relative bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-4 px-10 rounded-full shadow-xl transition-all duration-300 overflow-hidden"
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
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
                Load More Movies ({movies.length - displayCount} remaining)
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            </motion.button>
          </motion.div>
        )}
      </div>
    </div>
  );
}

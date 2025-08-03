import { useLocation, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import { useEffect, useState } from "react";

export type Movie = {
  id: string;
  title: string;
  poster: string;
  year: number;
  imdbRating: string;
  runtime?: string;
  plot: string;
};

export default function MovieDetails() {
  const { state } = useLocation();
  const movie: Movie | undefined = state?.movie;
  const [userRating, setUserRating] = useState<number | null>(null);
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [addedToWatchlist, setAddedToWatchlist] = useState(false);

  useEffect(() => {
    const ratings = JSON.parse(localStorage.getItem("ratings") || "{}");
    if (movie?.id && ratings[movie.id]) {
      setUserRating(ratings[movie.id]);
    }

    const existing = JSON.parse(localStorage.getItem("watchlist") || "[]");
    const isAlreadyAdded = existing.some((m: Movie) => m.id === movie?.id);
    setAddedToWatchlist(isAlreadyAdded);
  }, [movie?.id]);

  useEffect(() => {
    const existing = JSON.parse(localStorage.getItem("watchlist") || "[]");
    const isAlreadyAdded = existing.some((m: Movie) => m.id === movie?.id);
    setAddedToWatchlist(isAlreadyAdded);
  }, [movie?.id]);

  const handleAddToWatchlist = () => {
    const existing = JSON.parse(localStorage.getItem("watchlist") || "[]");

    const isAlreadyAdded = existing.some((m: Movie) => m.id === movie.id);

    if (isAlreadyAdded) {
      toast.error("❌ Already in Watchlist!");
      return;
    }

    const updated = [...existing, movie];
    localStorage.setItem("watchlist", JSON.stringify(updated));

    setAddedToWatchlist(true);
    toast.success("✅ Added to Watchlist!");
  };

  if (!movie) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center text-white"
        >
          <div className="text-6xl mb-4">🎬</div>
          <h2 className="text-2xl font-bold mb-2">Movie Not Found</h2>
          <p className="text-gray-400 mb-6">
            The movie you're looking for doesn't exist.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-full hover:from-blue-600 hover:to-purple-700 transition-all duration-300"
          >
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
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to Home
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Hero Section with Backdrop */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-black/60 z-10"></div>
        <div className="relative z-20 px-6 py-8">
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors duration-300 mb-6 group"
            >
              <motion.div
                className="p-2 rounded-full bg-white/10 backdrop-blur-sm group-hover:bg-white/20 transition-all duration-300"
                whileHover={{ scale: 1.1 }}
              >
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
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
              </motion.div>
              <span className="font-medium">Back to Home</span>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-6 py-8 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-md rounded-3xl border border-white/10 overflow-hidden shadow-2xl"
        >
          <div className="flex flex-col lg:flex-row">
            {/* Poster Section */}
            <motion.div
              className="lg:w-1/3 p-8"
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="relative group">
                <img
                  src={
                    movie.poster?.startsWith("http")
                      ? movie.poster
                      : "https://via.placeholder.com/400x600?text=No+Poster"
                  }
                  alt={movie.title}
                  className="w-full rounded-2xl shadow-2xl object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Rating Badge */}
                <div className="absolute top-4 right-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-4 py-2 rounded-full text-lg font-bold shadow-lg">
                  ⭐ {movie.imdbRating || "N/A"}
                </div>

                {/* Year Badge */}
                <div className="absolute top-4 left-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-full text-lg font-bold shadow-lg">
                  {movie.year}
                </div>
              </div>
            </motion.div>

            {/* Info Section */}
            <motion.div
              className="lg:w-2/3 p-8 lg:pl-0"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {/* Title */}
              <motion.h1
                className="text-4xl lg:text-5xl font-bold text-white mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                {movie.title}
              </motion.h1>

              {/* Plot */}
              <motion.p
                className="text-xl text-gray-300 leading-relaxed mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                {movie.plot || "No description available."}
              </motion.p>

              {/* Movie Stats Grid */}
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.0 }}
              >
                {/* IMDb Rating */}
                <div className="bg-gradient-to-r from-slate-700/50 to-slate-800/50 rounded-2xl p-6 border border-white/10">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center">
                      <span className="text-2xl">⭐</span>
                    </div>
                    <div>
                      <h3 className="text-white font-semibold text-lg">
                        IMDb Rating
                      </h3>
                      <p className="text-gray-400 text-sm">User Score</p>
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-yellow-400">
                    {movie.imdbRating || "N/A"}
                  </div>
                </div>

                {/* Year */}
                <div className="bg-gradient-to-r from-slate-700/50 to-slate-800/50 rounded-2xl p-6 border border-white/10">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                      <span className="text-2xl">📅</span>
                    </div>
                    <div>
                      <h3 className="text-white font-semibold text-lg">
                        Release Year
                      </h3>
                      <p className="text-gray-400 text-sm">Production Date</p>
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-blue-400">
                    {movie.year || "N/A"}
                  </div>
                </div>

                {/* Runtime */}
                <div className="bg-gradient-to-r from-slate-700/50 to-slate-800/50 rounded-2xl p-6 border border-white/10">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                      <span className="text-2xl">⏱️</span>
                    </div>
                    <div>
                      <h3 className="text-white font-semibold text-lg">
                        Runtime
                      </h3>
                      <p className="text-gray-400 text-sm">Duration</p>
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-green-400">
                    {movie.runtime || "N/A"}
                  </div>
                </div>

                {/* Genre (Mock) */}
                <div className="bg-gradient-to-r from-slate-700/50 to-slate-800/50 rounded-2xl p-6 border border-white/10">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-red-600 rounded-xl flex items-center justify-center">
                      <span className="text-2xl">🎭</span>
                    </div>
                    <div>
                      <h3 className="text-white font-semibold text-lg">
                        Genre
                      </h3>
                      <p className="text-gray-400 text-sm">Category</p>
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-pink-400">Movie</div>
                </div>
              </motion.div>

              {/* Action Buttons */}
              <motion.div
                className="flex flex-wrap gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.2 }}
              >
                <motion.button
                  className="flex items-center gap-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-8 py-4 rounded-2xl font-semibold transition-all duration-300 shadow-lg"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleAddToWatchlist()}
                >
                  {addedToWatchlist ? (
                    // icon clicked
                    <svg
                      className="w-6 h-6 text-red-400"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 
             4.42 3 7.5 3c1.74 0 3.41 0.81 
             4.5 2.09C13.09 3.81 14.76 3 
             16.5 3 19.58 3 22 5.42 22 
             8.5c0 3.78-3.4 6.86-8.55 
             11.54L12 21.35z"
                      />
                    </svg>
                  ) : (
                    // icon not clicked
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 
         4.5 0 00-6.364-6.364L12 
         7.636l-1.318-1.318a4.5 4.5 
         0 00-6.364 0z"
                      />
                    </svg>
                  )}
                  Add to Watchlist
                </motion.button>

                <motion.button
                  onClick={() => setShowRatingModal(true)}
                  className={`flex items-center gap-3 ${
                    userRating
                      ? "bg-yellow-500 hover:bg-yellow-600"
                      : "bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700"
                  } text-white px-8 py-4 rounded-2xl font-semibold transition-all duration-300 shadow-lg`}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg
                    className="w-6 h-6"
                    fill={userRating ? "currentColor" : "none"}
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                    />
                  </svg>
                  {userRating ? `Rated ${userRating}/10` : "Rate Movie"}
                </motion.button>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
        {showRatingModal && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
            <div className="bg-slate-800 p-8 rounded-2xl shadow-2xl w-[90%] max-w-md text-white space-y-6">
              <h2 className="text-2xl font-bold text-center">
                ⭐ Rate {movie.title}
              </h2>

              <div className="flex justify-center gap-2 text-3xl">
                {[...Array(10)].map((_, i) => {
                  const value = i + 1;
                  return (
                    <span
                      key={value}
                      onClick={() => setUserRating(value)}
                      className={`cursor-pointer ${
                        userRating && userRating >= value
                          ? "text-yellow-400"
                          : "text-gray-500"
                      }`}
                    >
                      ★
                    </span>
                  );
                })}
              </div>

              <div className="flex justify-end gap-4">
                <button
                  onClick={() => setShowRatingModal(false)}
                  className="px-4 py-2 bg-gray-500 hover:bg-gray-600 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    if (userRating) {
                      const ratings = JSON.parse(
                        localStorage.getItem("ratings") || "{}"
                      );
                      localStorage.setItem(
                        "ratings",
                        JSON.stringify({ ...ratings, [movie.id]: userRating })
                      );
                      toast.success(`✅ Rated ${userRating}/10`);
                      setShowRatingModal(false);
                    } else {
                      toast.error("❌ Please select a rating");
                    }
                  }}
                  className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

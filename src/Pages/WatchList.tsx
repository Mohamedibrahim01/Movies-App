import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type { Movie } from "./MovieDetails"; // عدل المسار لو مختلف

export default function Watchlist() {
  const [watchlist, setWatchlist] = useState<Movie[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("watchlist");
    if (stored) {
      setWatchlist(JSON.parse(stored));
    }
  }, []);

  const handleRemove = (id: string) => {
    const updatedList = watchlist.filter((movie) => movie.id !== id);
    setWatchlist(updatedList);
    localStorage.setItem("watchlist", JSON.stringify(updatedList));
  };

  if (watchlist.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="text-white text-center space-y-4">
          <h2 className="text-3xl font-bold">Your Watchlist is Empty 🎬</h2>
          <p className="text-gray-400">
            Start exploring movies and add them here!
          </p>
          <Link
            to="/"
            className="inline-block bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300"
          >
            🔍 Explore Movies
          </Link>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 px-6 py-12">
      <h1 className="text-white text-3xl font-bold mb-8 text-center">
        📽️ Your Watchlist
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {watchlist.map((movie) => (
          <div
            key={movie.id}
            className="relative bg-slate-800 rounded-xl overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300"
          >
            <Link to={`/movie/${movie.id}`} state={{ movie }} className="block">
              <img
                src={
                  movie.poster?.startsWith("http")
                    ? movie.poster
                    : "https://via.placeholder.com/400x600?text=No+Poster"
                }
                alt={movie.title}
                className="w-full h-72 object-cover"
              />
              <div className="p-4">
                <h2 className="text-white text-xl font-bold mb-1">
                  {movie.title}
                </h2>
                <p className="text-gray-400 text-sm mb-1">{movie.year}</p>
                <p className="text-yellow-400 font-semibold">
                  ⭐ {movie.imdbRating || "N/A"}
                </p>
              </div>
            </Link>

            {/* زرار الحذف */}
            <button
              onClick={() => handleRemove(movie.id)}
              className="absolute top-3 right-3 bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 text-white px-4 py-2 rounded-full shadow-lg text-sm font-bold flex items-center gap-2 transition-all duration-300 hover:scale-105"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

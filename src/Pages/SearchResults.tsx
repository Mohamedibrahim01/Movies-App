import { useLocation, Link } from "react-router-dom";
import { getMovies } from "../Utils/MovieList";

export default function SearchResults() {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("query") || "";

  const allMovies = getMovies();
  const filtered = allMovies.filter((movie) =>
    movie.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 px-6 py-12 text-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-8">
          Results for: <span className="text-blue-400">{query}</span>
        </h2>

        {filtered.length === 0 ? (
          <p className="text-gray-400 text-lg">No movies found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filtered.map((movie) => (
              <Link to={`/movie/${movie.id}`} state={{ movie }} key={movie.id}>
                <div className="group bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl overflow-hidden hover:scale-105 transition-transform duration-300 shadow-xl cursor-pointer flex flex-col h-[520px]">
                  {/* Poster */}
                  <div className="relative h-[260px] overflow-hidden">
                    <img
                      src={
                        movie.poster?.startsWith("http")
                          ? movie.poster
                          : "https://via.placeholder.com/300x450?text=No+Image"
                      }
                      alt={movie.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute top-3 right-3 bg-yellow-500 text-black px-2 py-1 rounded-full text-sm font-bold">
                      ⭐ {movie.imdbRating || "N/A"}
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-4 flex flex-col flex-1">
                    <h3 className="text-lg font-bold mb-2 line-clamp-2 group-hover:text-blue-400 transition-colors">
                      {movie.title}
                    </h3>

                    <p className="text-gray-400 text-sm line-clamp-3 mb-4">
                      {movie.plot || "No description available."}
                    </p>

                    <div className="mt-auto flex justify-between items-center text-sm">
                      <span className="text-gray-300">{movie.year}</span>
                      <span className="text-gray-400">{movie.runtime}</span>
                      <span className="bg-blue-600 text-white px-2 py-1 rounded-full text-xs font-medium">
                        Movie
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

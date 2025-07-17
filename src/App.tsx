import { useEffect, useState } from "react";
import axios from "axios";
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import MovieDetails from "./Pages/MovieDetails";
import Navbar from "./Components/Navbar";
import TopRated from "./Pages/TopRated";
import { setMovies as storeMovies } from "./Utils/MovieList"; // Store خارجي
import type { Movie } from "./Pages/MovieDetails"; // أو من مكان تاني لو مختلف
import MostWatched from "./Pages/MostWatched";

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMovies() {
      try {
        const res = await axios.get("https://fooapi.com/api/movies");
        const data = Array.isArray(res.data) ? res.data : res.data?.data;

        if (Array.isArray(data)) {
          const validMovies = data.filter((movie) => movie.id && movie.title);
          storeMovies(validMovies); // ⬅ نحفظهم في store
        } else {
          console.error("Unexpected response format:", res.data);
        }
      } catch (error) {
        console.error("Failed to fetch movies:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchMovies();
  }, []);

  if (loading) {
    return (
      <div className="text-center mt-20 text-white text-lg">
        🔄 Loading movies...
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/toprated" element={<TopRated />} />
        <Route path="/mostwatched" element={<MostWatched />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
      </Routes>
    </>
  );
}
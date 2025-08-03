import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [search, setSearch] = useState("");
  console.log(search);
  const navigate = useNavigate();

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 100, duration: 0.8 }}
      className="bg-gradient-to-r from-slate-900/95 via-purple-900/95 to-slate-900/95 backdrop-blur-md border-b border-white/10 sticky top-0 z-50"
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <Link
            to="/"
            className="group flex items-center gap-3 text-2xl lg:text-3xl font-bold"
          >
            <motion.div
              className="w-10 h-10 bg-gradient-to-r from-blue-400 to-purple-600 rounded-xl flex items-center justify-center shadow-lg"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <span className="text-white text-xl">🎬</span>
            </motion.div>
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent select-none">
              MovieHub
            </span>
          </Link>

          {/* Search Bar */}
          <div className="flex-1 max-w-lg w-full">
            <div className="relative group flex items-center">
              <input
                type="text"
                placeholder="Search for movies..."
                className="w-full px-4 py-3 pl-12 pr-28 rounded-2xl bg-slate-800/50 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 backdrop-blur-sm"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              {/* Icon */}
              <div className="absolute left-4 text-gray-400 group-focus-within:text-blue-400 transition-colors">
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
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              {/* Button */}
              <motion.button
                className="absolute right-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-xl text-sm font-medium hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  if (search.trim()) {
                    navigate(
                      `/search?query=${encodeURIComponent(search.trim())}`
                    );
                  }
                }}
              >
                Search
              </motion.button>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-2 lg:gap-4">
            <motion.div
              className="flex items-center gap-1 lg:gap-2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Link
                to="/"
                className="group relative px-4 py-2 rounded-xl text-gray-300 hover:text-white transition-colors duration-300 font-medium"
              >
                <span className="relative z-10">Home</span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>

              <Link
                to="/TopRated"
                className="group relative px-4 py-2 rounded-xl text-gray-300 hover:text-white transition-colors duration-300 font-medium"
              >
                <span className="relative z-10">Top Rated</span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>

              <Link
                to="/mostwatched"
                className="group relative px-4 py-2 rounded-xl text-gray-300 hover:text-white transition-colors duration-300 font-medium"
              >
                <span className="relative z-10">Most Watched</span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>

              <Link
                to="/WatchList"
                className="group relative px-4 py-2 rounded-xl text-gray-300 hover:text-white transition-colors duration-300 font-medium"
              >
                <span className="relative z-10">Watch list</span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>
            </motion.div>
          </div>

          {/* Mobile Menu Button (Visible only on small screens) */}
          <motion.button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl bg-slate-800/50 border border-white/10 text-gray-300 hover:text-white hover:bg-slate-700/50 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </motion.button>
        </div>

        {/* Mobile Navigation Links */}
        <motion.div
          className={`${
            isMobileMenuOpen ? "block" : "hidden"
          } lg:hidden mt-4 pt-4 border-t border-white/10`}
          initial={{ height: 0, opacity: 0 }}
          animate={
            isMobileMenuOpen
              ? { height: "auto", opacity: 1 }
              : { height: 0, opacity: 0 }
          }
          transition={{ duration: 0.3 }}
        >
          <div className="flex flex-col gap-2">
            <Link
              to="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className="px-4 py-2 rounded-xl text-gray-300 hover:text-white hover:bg-slate-800/50 transition-all duration-300"
            >
              Home
            </Link>
            <Link
              to="/TopRated"
              onClick={() => setIsMobileMenuOpen(false)}
              className="px-4 py-2 rounded-xl text-gray-300 hover:text-white hover:bg-slate-800/50 transition-all duration-300"
            >
              Top Rated
            </Link>
            <Link
              to="/mostwatched"
              onClick={() => setIsMobileMenuOpen(false)}
              className="px-4 py-2 rounded-xl text-gray-300 hover:text-white hover:bg-slate-800/50 transition-all duration-300"
            >
              Most Watched
            </Link>
            <Link
              to="/WatchList"
              onClick={() => setIsMobileMenuOpen(false)}
              className="px-4 py-2 rounded-xl text-gray-300 hover:text-white hover:bg-slate-800/50 transition-all duration-300"
            >
              Watch list
            </Link>
          </div>
        </motion.div>
      </div>
    </motion.nav>
  );
}

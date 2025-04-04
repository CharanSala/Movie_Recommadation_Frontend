import React, { useState } from "react";
import axios from "axios"; // Import axios for API requests

const Home = () => {
  const [movieName, setMovieName] = useState("");
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchRecommendations = async () => {
    if (!movieName.trim()) return;
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(`https://movie-recommadation.onrender.com/recommend/?title=${movieName}`);
      
      // If the response is a single object, wrap it in an array
      const data = Array.isArray(response.data) ? response.data : [response.data];

      setRecommendations(data);
    } catch (err) {
      setError("Failed to fetch recommendations. Try again.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center px-4">
      <h1 className="text-4xl font-bold mb-6 text-blue-400">Movie Recommendation System</h1>

      <div className="flex gap-4 w-full max-w-lg">
        <input
          type="text"
          className="w-full p-3 rounded-lg bg-gray-800 text-white outline-none border border-gray-700 focus:border-blue-500"
          placeholder="Enter a movie name..."
          value={movieName}
          onChange={(e) => setMovieName(e.target.value)}
        />
        <button
          onClick={fetchRecommendations}
          className="bg-blue-500 hover:bg-blue-600 px-6 py-3 rounded-lg font-semibold transition"
        >
          Recommend
        </button>
      </div>

      {loading && <p className="mt-5 text-gray-400">Fetching recommendations...</p>}
      {error && <p className="mt-5 text-red-400">{error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-6 gap-6 mt-8">
        {recommendations.map((movie, index) => (
          <div key={index} className="bg-gray-800 rounded-lg p-4 shadow-lg hover:shadow-blue-500 transition">
            <img src={movie.poster} alt={movie.title} className="w-fullh-48 rounded-lg" />
            <h3 className="text-lg font-semibold mt-2 text-center">{movie.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;

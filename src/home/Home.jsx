import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Home() {
  const [featured, setFeatured] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchFeatured() {
      try {
        const res = await axios.get("https://dummyjson.com/recipes?limit=6");
        setFeatured(res.data.recipes);
      } catch (err) {
        console.log(err.message);
      }
    }
    fetchFeatured();
  }, []);

  return (
    <div className="min-h-screen">

      {/* Hero Section */}
      <div className="bg-blue-800 text-white text-center py-20 px-6">
        <h1 className="text-5xl font-bold mb-4">Welcome to Resyp 🍽️</h1>
        <p className="text-lg text-blue-200 mb-8">
          Discover, save, and explore delicious recipes from around the world.
        </p>
        <button
          onClick={() => navigate("/recipes")}
          className="bg-white text-blue-800 font-semibold px-6 py-3 rounded-xl hover:bg-blue-100 transition"
        >
          Browse All Recipes →
        </button>
      </div>

      {/* Featured Recipes */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Featured Recipes</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {featured.map((recipe) => (
            <Link
              to={`/recipe/${recipe.id}`}
              key={recipe.id}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden"
            >
              <img
                src={recipe.image}
                alt={recipe.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800">{recipe.name}</h3>
                <p className="text-sm text-gray-500 mt-1">🌍 {recipe.cuisine}</p>
                <div className="flex justify-between items-center mt-3">
                  <span className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded-lg">⭐ {recipe.rating}</span>
                  <span className="text-xs text-gray-400">🕐 {recipe.prepTimeMinutes + recipe.cookTimeMinutes} min</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-10">
          <button
            onClick={() => navigate("/recipes")}
            className="border border-blue-800 text-blue-800 px-6 py-2 rounded-xl hover:bg-blue-800 hover:text-white transition"
          >
            View All Recipes
          </button>
        </div>
      </div>

    </div>
  );
}

export default Home;
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function RecipeDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [recipe, setRecipe] = useState(null);

    useEffect(() => {
        async function fetchRecipe() {
            try {
                const res = await axios.get(`https://dummyjson.com/recipes/${id}`);
                setRecipe(res.data);
            } catch (err) {
                console.log(err.message);
            }
        }
        fetchRecipe();
    }, [id]);

    if (!recipe) return <p className="text-center mt-20 text-gray-400">Loading...</p>;

    const totalTime = recipe.prepTimeMinutes + recipe.cookTimeMinutes;

    return (
        <div className="max-w-3xl mx-auto px-4 py-8">

            {/* Back Button */}
            <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 text-sm text-gray-500 border border-gray-200 rounded-lg px-3 py-1.5 mb-6 hover:bg-gray-50 transition"
            >
                ← Back
            </button>

            {/* Hero Image */}
            <img src={recipe.image} alt={recipe.name} className="w-full h-72 object-cover rounded-2xl mb-5" />

            {/* Title */}
            <h1 className="text-2xl font-semibold mb-3">{recipe.name}</h1>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
                {recipe.tags?.map((tag, i) => (
                    <span key={i} className="text-xs bg-gray-100 text-gray-500 rounded-full px-3 py-1">{tag}</span>
                ))}
            </div>

            {/* Badges */}
            <div className="flex flex-wrap gap-2 mb-6">
                <span className="flex items-center gap-1 text-xs bg-blue-50 text-blue-600 rounded-lg px-3 py-1.5">⭐ {recipe.rating}</span>
                <span className="flex items-center gap-1 text-xs bg-gray-100 text-gray-600 rounded-lg px-3 py-1.5">🕐 {totalTime} min</span>
                <span className="flex items-center gap-1 text-xs bg-gray-100 text-gray-600 rounded-lg px-3 py-1.5">👥 Serves {recipe.servings}</span>
                <span className="flex items-center gap-1 text-xs bg-gray-100 text-gray-600 rounded-lg px-3 py-1.5">🔥 {recipe.difficulty}</span>
                <span className="flex items-center gap-1 text-xs bg-gray-100 text-gray-600 rounded-lg px-3 py-1.5">🌍 {recipe.cuisine}</span>
                <span className="flex items-center gap-1 text-xs bg-gray-100 text-gray-600 rounded-lg px-3 py-1.5">⚡ {recipe.caloriesPerServing} kcal</span>
            </div>

            <hr className="mb-6" />

            {/* Ingredients */}
            <h2 className="text-base font-medium mb-3">Ingredients</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-6">
                {recipe.ingredients.map((item, i) => (
                    <div key={i} className="text-sm bg-gray-50 border border-gray-100 rounded-lg px-3 py-2">
                        {item}
                    </div>
                ))}
            </div>

            <hr className="mb-6" />

            {/* Instructions */}
            <h2 className="text-base font-medium mb-3">Instructions</h2>
            <div className="flex flex-col gap-3">
                {recipe.instructions.map((step, i) => (
                    <div key={i} className="flex gap-3 border border-gray-100 rounded-xl px-4 py-3">
                        <div className="min-w-[26px] h-[26px] rounded-full bg-blue-50 text-blue-600 text-xs font-medium flex items-center justify-center flex-shrink-0 mt-0.5">
                            {i + 1}
                        </div>
                        <p className="text-sm leading-relaxed text-gray-700">{step}</p>
                    </div>
                ))}
            </div>

        </div>
    );
}

export default RecipeDetails;
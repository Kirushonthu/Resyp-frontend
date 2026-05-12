import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function RecipeDetails() {
    const { id } = useParams();
    const [recipe, setRecipe] = useState(null);

    useEffect(() => {
        async function fetchRecipe() {
            try {
                const response = await axios.get(
                    `https://dummyjson.com/recipes/${id}`
                );
                setRecipe(response.data);
            } catch (error) {
                console.log(error.message);
            }
        }

        fetchRecipe();
    }, [id]);

    if (!recipe) {
        return <h2 className="text-center mt-10">Loading...</h2>;
    }

    return (
        <div className="p-20 max-w-4xl mx-auto">

            <h1 className="text-3xl text-center font-bold mb-8 mt-4">
                {recipe.name}
            </h1>

            <img
                src={recipe.image}
                alt={recipe.name}
                className="w-full rounded-lg mb-4"
            />

            <p className=" text-right">
                <strong>Cuisine:</strong> {recipe.cuisine}
            </p>

            <p className="mb-4 text-right px-5 ">
                <strong>Rating:</strong> {recipe.rating}
            </p>

            <h3 className="text-xl font-semibold  mb-2">
                Ingredients:
            </h3>

            <ul className="list-disc pl-6">
                {recipe.ingredients.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>

            <h3 className="text-xl font-semibold mt-4 mb-2">
                Instructions:
            </h3>

            <ul className="list-disc pl-6">
                {recipe.instructions.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>

        </div>
    );
}

export default RecipeDetails;

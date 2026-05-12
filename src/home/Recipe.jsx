import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaTrash, FaPlus, FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";


function Recipe() {
  const [user, setUsers] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const [showAddModal, setShowAddModal] = useState(false);
  const [newRecipe, setNewRecipe] = useState({
    name: "",
    cuisine: "",
    rating: "",
    image: ""
  });

  const [showEditModal, setShowEditModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [editRecipe, setEditRecipe] = useState({
    name: "",
    cuisine: "",
    rating: "",
  });


  useEffect(() => {
    fetchData()
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("https://dummyjson.com/recipes");
      setUsers(response.data.recipes);
    } catch (error) {
      console.log(error.message);
    }
  }

  const openDeleteModal = (id) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    const updated = user.filter((item) => item.id !== deleteId);
    setUsers(updated);
    setShowDeleteModal(false);
    setDeleteId(null);
    toast.error("Item deleted")
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setDeleteId(null);
  };

  const openAddModal = () => {
    setShowAddModal(true);
  };

  const handleAddChange = (e) => {
  const { name, value } = e.target;

  if (name === "rating") {

    if (value === "") {
      setNewRecipe(prev => ({
        ...prev,
        rating: ""
      }));
      return;
    }

    const ratingRegex = /^(?:[1-4](?:\.\d)?|5(?:\.0)?)$/;

    if (!ratingRegex.test(value)) {
      return;
    }
  }

  setNewRecipe((prev) => ({
    ...prev,
    [name]: value
  }));
};

 const handleEditChange = (e) => {
  const { name, value } = e.target;

  if (name === "rating") {

    if (value === "") {
      setEditRecipe(prev => ({
        ...prev,
        rating: ""
      }));
      return;
    }

    const ratingRegex = /^(?:[1-4](?:\.\d)?|5(?:\.0)?)$/;

    if (!ratingRegex.test(value)) {
      return; 
    }
  }

  setEditRecipe(prev => ({
    ...prev,
    [name]: value
  }));
};


  const confirmAdd = () => {
    if (!newRecipe.name || !newRecipe.cuisine) {
      toast.error("Name and Cuisine are required");
      return;
    }

    const ratingNumber = Number(newRecipe.rating);
    
    if (!newRecipe.rating) {
    toast.error("Rating is required");
    return;}

    if (ratingNumber < 1 || ratingNumber > 5) {
    toast.error("Rating must be between 1 and 5");
    return;
  }

  const decimalPart = newRecipe.rating.toString().split(".")[1];
  if (decimalPart && decimalPart.length > 1) {
    toast.error("Only one decimal place allowed (e.g., 4.5)");
    return;
  }

    const newId =
      user.length > 0
        ? Math.max(...user.map((item) => item.id)) + 1
        : 1;

    const createdRecipe = {
      id: newId,
      name: newRecipe.name,
      cuisine: newRecipe.cuisine,
      rating: newRecipe.rating || 0,
      image:
        newRecipe.image ||
        `https://cdn.dummyjson.com/recipe-images/${newId}.webp`
    };

    setUsers((prev) => [...prev, createdRecipe]);

    setShowAddModal(false);
    setNewRecipe({
      name: "",
      cuisine: "",
      rating: "",
      image: ""
    });
    toast.success("Recipe Added")
  };

  const cancelAdd = () => {
    setShowAddModal(false);
    setNewRecipe({
      name: "",
      cuisine: "",
      rating: "",
      image: ""
    });
  };

  const openEditModel = (id) => {

    const selected = user.find(item => item.id === id);

    setEditId(id);
    setEditRecipe({
      name: selected.name,
      cuisine: selected.cuisine,
      rating: selected.rating,
    });

    setShowEditModal(true)
  }

  const confirmEdit = () => {
    const ratingNumber = Number(editRecipe.rating);

   if (ratingNumber < 1 || ratingNumber > 5) {
      toast.error("Rating must be between 1 and 5");
      return;
    }
 
     const decimalPart = editRecipe.rating.toString().split(".")[1];

  if (decimalPart && decimalPart.length > 1) {
    toast.error("Only one decimal place allowed (e.g., 4.5)");
    return;
  }

    
    const updated = user.map((item) =>
      item.id === editId ? { ...item, name: editRecipe.name, cuisine: editRecipe.cuisine, rating: ratingNumber } : item
    );

    setUsers(updated);
    setShowEditModal(false);
    setEditId(null);
    toast.success("Edited Sucessfully")
  };


  const cancelEdit = () => {
    setShowEditModal(false);
    setEditId(null)
  };


  return (
    <div className="min-h-screen p-6">
      <h1 className="text-3xl font-bold text-center mb-8">
        Recipe Cards
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

        {user.map((recipe) => (
          <div key={recipe.id} className="bg-white rounded-xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden relative">

            <div className="absolute bottom-24 right-9  text-blue-600  hover:text-blue-800 z-10">

              <button
                onClick={(e) => openEditModel(recipe.id, e)}
              >
                <FaEdit className="cursor-pointer" />
              </button>
            </div>

            <div className="absolute bottom-24 right-3  text-red-600  hover:text-red-800 z-10">
              <button
                onClick={() => openDeleteModal(recipe.id)}
              >
                <FaTrash className="cursor-pointer" />
              </button>
            </div>

            <Link to={`/recipe/${recipe.id}`} key={recipe.id}>

              <img
                src={recipe.image}
                alt={recipe.name}
                className="w-full h-48 object-cover "
              />

              <div className="p-4">

                <h3 className="text-lg font-semibold mt-4 text-center"  >

                  {recipe.name}
                </h3>
                <p className="text-gray-600 text-sm mt-2 text-center">
                  Rating: {recipe.rating}
                </p>

                <p className="text-center">
                  Cuisine: {recipe.cuisine}
                </p>
              </div>
            </Link>
          </div>
        ))}

        <div
          onClick={openAddModal}
          className="bg-white rounded-xl shadow-md hover:shadow-xl 
                     transition duration-300 overflow-hidden 
                     flex items-center justify-center cursor-pointer"
        >
          <div className="p-4 flex flex-col items-center justify-center">
            <FaPlus className="text-3xl text-gray-500 mb-2" />
            <p className="text-gray-600 font-semibold">Add Recipe</p>
          </div>
        </div>

      </div>

      {showDeleteModal && (
        <div className="fixed inset-0 flex items-center justify-center 
                        bg-white/30 backdrop-blur-sm z-50">

          <div className="bg-white rounded-xl shadow-2xl p-6 w-80 text-center">
            <h2 className="text-xl font-bold mb-4 text-red-600">
              Delete Recipe
            </h2>

            <p className="mb-6 text-gray-600">
              Are you sure you want to delete this recipe?
            </p>

            <div className="flex justify-center gap-6">
              <button
                onClick={cancelDelete}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                Cancel
              </button>

              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {showAddModal && (
        <div className="fixed inset-0 flex items-center justify-center 
                        bg-white/30 backdrop-blur-sm z-50">

          <div className="bg-white rounded-xl shadow-2xl p-6 w-96">
            <h2 className="text-xl font-bold mb-4 text-green-600 text-center">
              Add New Recipe
            </h2>

            <div className="space-y-3">

              <input
                type="text"
                name="name"
                placeholder="Recipe Name"
                value={newRecipe.name}
                onChange={handleAddChange}
                className="w-full border p-2 rounded"
              />

              <input
                type="text"
                name="cuisine"
                placeholder="Cuisine"
                value={newRecipe.cuisine}
                onChange={handleAddChange}
                className="w-full border p-2 rounded"
              />

              <input
                type="number"
                name="rating"
                min="1"
                max="5"
                step="0.1"
                placeholder="Rating"
                value={newRecipe.rating}
                onChange={handleAddChange}
                className="w-full border p-2 rounded"
              />

              <input
                type="text"
                name="image"
                placeholder="Image URL (optional)"
                value={newRecipe.image}
                onChange={handleAddChange}
                className="w-full border p-2 rounded"
              />

            </div>

            <div className="flex justify-center gap-6 mt-6">
              <button
                onClick={cancelAdd}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                Cancel
              </button>

              <button
                onClick={confirmAdd}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Add Recipe
              </button>
            </div>

          </div>
        </div>
      )}

      {showEditModal && (
        <div className="fixed inset-0 flex items-center justify-center 
                        bg-white/30 backdrop-blur-sm z-50">

          <div className="bg-white rounded-xl shadow-2xl p-6 w-96">
            <h2 className="text-xl font-bold mb-4 text-green-600 text-center">
              Edit Recipe
            </h2>

            <div className="space-y-3">

              <input
                type="text"
                name="name"
                placeholder=""
                value={editRecipe.name}
                onChange={handleEditChange}
                className="w-full border p-2 rounded"
              />

              <input
                type="text"
                name="cuisine"
                placeholder=""
                value={editRecipe.cuisine}
                onChange={handleEditChange}
                className="w-full border p-2 rounded"
              />

              <input
                type="number"
                name="rating"
                step="0.5"
                value={editRecipe.rating}
                onChange={handleEditChange}
                className="w-full border p-2 rounded"
              />



            </div>

            <div className="flex justify-center gap-6 mt-6">
              <button
                onClick={cancelEdit}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                Cancel
              </button>

              <button
                onClick={confirmEdit}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Save Changes
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}

export default Recipe;

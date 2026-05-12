import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaTrash, FaPlus, FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";

const Modal = ({ title, titleColor, onCancel, onConfirm, confirmLabel, confirmColor, children }) => (
  <div className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm z-50">
    <div className="bg-white rounded-2xl shadow-2xl p-6 w-96">
      <h2 className={`text-xl font-bold mb-4 text-center ${titleColor}`}>{title}</h2>
      {children}
      <div className="flex justify-center gap-4 mt-6">
        <button onClick={onCancel} className="px-5 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium">Cancel</button>
        <button onClick={onConfirm} className={`px-5 py-2 ${confirmColor} text-white rounded-lg text-sm font-medium`}>{confirmLabel}</button>
      </div>
    </div>
  </div>
);

function Recipe() {
  const [user, setUsers] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newRecipe, setNewRecipe] = useState({ name: "", cuisine: "", rating: "", image: "" });
  const [showEditModal, setShowEditModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [editRecipe, setEditRecipe] = useState({ name: "", cuisine: "", rating: "" });
  const [search, setSearch] = useState("");

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("https://dummyjson.com/recipes");
      setUsers(response.data.recipes);
    } catch (error) {
      console.log(error.message);
    }
  };

  const filtered = user.filter(r =>
    r.name.toLowerCase().includes(search.toLowerCase()) ||
    r.cuisine.toLowerCase().includes(search.toLowerCase())
  );

  const openDeleteModal = (id) => { setDeleteId(id); setShowDeleteModal(true); };
  const confirmDelete = () => {
    setUsers(user.filter(item => item.id !== deleteId));
    setShowDeleteModal(false); setDeleteId(null);
    toast.error("Recipe deleted");
  };
  const cancelDelete = () => { setShowDeleteModal(false); setDeleteId(null); };

  const handleAddChange = (e) => {
    const { name, value } = e.target;
    if (name === "rating") {
      if (value === "") { setNewRecipe(prev => ({ ...prev, rating: "" })); return; }
      if (!/^\d*\.?\d*$/.test(value)) return;
      const num = parseFloat(value);
      if (!isNaN(num) && num > 5) return;
    }
    setNewRecipe(prev => ({ ...prev, [name]: value }));
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    if (name === "rating") {
      if (value === "") { setEditRecipe(prev => ({ ...prev, rating: "" })); return; }
      if (!/^\d*\.?\d*$/.test(value)) return;
      const num = parseFloat(value);
      if (!isNaN(num) && num > 5) return;
    }
    setEditRecipe(prev => ({ ...prev, [name]: value }));
  };

  const confirmAdd = () => {
    if (!newRecipe.name || !newRecipe.cuisine) { toast.error("Name and Cuisine are required"); return; }
    if (!newRecipe.rating) { toast.error("Rating is required"); return; }
    const ratingNumber = Number(newRecipe.rating);
    if (ratingNumber < 1 || ratingNumber > 5) { toast.error("Rating must be between 1 and 5"); return; }
    const decimalPart = newRecipe.rating.toString().split(".")[1];
    if (decimalPart && decimalPart.length > 1) { toast.error("Only one decimal place allowed"); return; }
    const newId = user.length > 0 ? Math.max(...user.map(item => item.id)) + 1 : 1;
    setUsers(prev => [...prev, {
      id: newId, name: newRecipe.name, cuisine: newRecipe.cuisine,
      rating: newRecipe.rating || 0,
      image: newRecipe.image || `https://cdn.dummyjson.com/recipe-images/${newId}.webp`
    }]);
    setShowAddModal(false);
    setNewRecipe({ name: "", cuisine: "", rating: "", image: "" });
    toast.success("Recipe Added");
  };

  const cancelAdd = () => {
    setShowAddModal(false);
    setNewRecipe({ name: "", cuisine: "", rating: "", image: "" });
  };

  const openEditModel = (id) => {
    const selected = user.find(item => item.id === id);
    setEditId(id);
    setEditRecipe({ name: selected.name, cuisine: selected.cuisine, rating: selected.rating });
    setShowEditModal(true);
  };

  const confirmEdit = () => {
    if (!editRecipe.name || !editRecipe.cuisine) { toast.error("Name and Cuisine are required"); return; }
    if (!editRecipe.rating) { toast.error("Rating is required"); return; }
    const ratingNumber = Number(editRecipe.rating);
    if (ratingNumber < 1 || ratingNumber > 5) { toast.error("Rating must be between 1 and 5"); return; }
    const decimalPart = editRecipe.rating.toString().split(".")[1];
    if (decimalPart && decimalPart.length > 1) { toast.error("Only one decimal place allowed"); return; }
    setUsers(user.map(item => item.id === editId ? { ...item, ...editRecipe, rating: ratingNumber } : item));
    setShowEditModal(false); setEditId(null);
    toast.success("Edited Successfully");
  };

  const cancelEdit = () => { setShowEditModal(false); setEditId(null); };

  const inputClass = "w-full border border-gray-200 p-2.5 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-300";

  return (
    <div className="min-h-screen bg-gray-50 p-6">

      {/* Header Row */}
      <div className="max-w-7xl mx-auto mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <h1 className="text-3xl font-bold text-gray-800">🍽️ Recipes</h1>
        <div className="flex gap-3 w-full sm:w-auto">
          <input
            type="text"
            placeholder="Search by name or cuisine..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="border border-gray-200 rounded-xl px-4 py-2 text-sm w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 bg-blue-800 hover:bg-blue-900 text-white px-4 py-2 rounded-xl text-sm font-medium transition"
          >
            <FaPlus /> Add
          </button>
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filtered.map((recipe) => (
          <div key={recipe.id} className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition duration-300 overflow-hidden relative group">

            <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition z-10">
              <button
                onClick={() => openEditModel(recipe.id)}
                className="bg-white p-1.5 rounded-lg shadow text-blue-600 hover:text-blue-800"
              >
                <FaEdit size={13} />
              </button>
              <button
                onClick={() => openDeleteModal(recipe.id)}
                className="bg-white p-1.5 rounded-lg shadow text-red-500 hover:text-red-700"
              >
                <FaTrash size={13} />
              </button>
            </div>

            <Link to={`/recipe/${recipe.id}`}>
              <img src={recipe.image} alt={recipe.name} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="text-base font-semibold text-gray-800 truncate">{recipe.name}</h3>
                <p className="text-sm text-gray-500 mt-1">🌍 {recipe.cuisine}</p>
                <div className="flex justify-between items-center mt-3">
                  <span className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded-lg">⭐ {recipe.rating}</span>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>

      {/* No results */}
      {filtered.length === 0 && (
        <p className="text-center text-gray-400 mt-20 text-lg">No recipes found for "{search}"</p>
      )}

      {/* Delete Modal */}
      {showDeleteModal && (
        <Modal title="Delete Recipe" titleColor="text-red-600" onCancel={cancelDelete} onConfirm={confirmDelete} confirmLabel="Yes, Delete" confirmColor="bg-red-600 hover:bg-red-700">
          <p className="text-center text-gray-500 text-sm">Are you sure you want to delete this recipe?</p>
        </Modal>
      )}

      {/* Add Modal */}
      {showAddModal && (
        <Modal title="Add New Recipe" titleColor="text-green-600" onCancel={cancelAdd} onConfirm={confirmAdd} confirmLabel="Add Recipe" confirmColor="bg-green-600 hover:bg-green-700">
          <div className="space-y-3">
            <input type="text" name="name" placeholder="Recipe Name" value={newRecipe.name} onChange={handleAddChange} className={inputClass} />
            <input type="text" name="cuisine" placeholder="Cuisine" value={newRecipe.cuisine} onChange={handleAddChange} className={inputClass} />
            <input type="text" name="rating" placeholder="Rating (1-5)" value={newRecipe.rating} onChange={handleAddChange} className={inputClass} />
            <input type="text" name="image" placeholder="Image URL (optional)" value={newRecipe.image} onChange={handleAddChange} className={inputClass} />
          </div>
        </Modal>
      )}

      {/* Edit Modal */}
      {showEditModal && (
        <Modal title="Edit Recipe" titleColor="text-blue-600" onCancel={cancelEdit} onConfirm={confirmEdit} confirmLabel="Save Changes" confirmColor="bg-blue-600 hover:bg-blue-700">
          <div className="space-y-3">
            <input type="text" name="name" placeholder="Recipe Name" value={editRecipe.name} onChange={handleEditChange} className={inputClass} />
            <input type="text" name="cuisine" placeholder="Cuisine" value={editRecipe.cuisine} onChange={handleEditChange} className={inputClass} />
            <input type="text" name="rating" placeholder="Rating (1-5)" value={editRecipe.rating} onChange={handleEditChange} className={inputClass} />
          </div>
        </Modal>
      )}

    </div>
  );
}

export default Recipe;
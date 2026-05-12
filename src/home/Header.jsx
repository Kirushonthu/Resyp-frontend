import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useState } from "react";

function Header({ setIsLoggedIn }) {

  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  function handleLogout() {
    setShowLogoutModal(true);
  }

  function confirmLogout() {
    localStorage.removeItem("accessToken");
    toast.success("Logged out successfully");
    setIsLoggedIn(false);
    navigate("/");
  }

  function cancelLogout() {
    setShowLogoutModal(false);
  }

  return (
    <>
      <header className="flex justify-between bg-blue-800 p-4">
        <h1 className="text-4xl font-bold text-white ">Resyp</h1>

        <nav>
          <ul className="flex gap-10 m-2 text-white items-center ">
            <li className="hover:text-blue-800 hover:bg-white rounded"><Link to="/">Home</Link></li>
            <li className="hover:text-blue-800 hover:bg-white rounded"><Link to="/about">About</Link></li>
            <li className="hover:text-blue-800 hover:bg-white rounded"><Link to="/services">Services</Link></li>
            <li className="hover:text-blue-800 hover:bg-white rounded"><Link to="/contact">Contact</Link></li>

            <button
              onClick={handleLogout}
              type="button"
              className="hover:bg-red-700 text-xl rounded-2xl px-2 py-1 cursor-pointer"
            >
              Log out
            </button>
          </ul>
        </nav>
      </header>

     {showLogoutModal && (
  <div className="fixed inset-0 flex items-center justify-center 
                  bg-white/0 backdrop-blur-sm z-50">

    <div className="bg-white rounded-xl shadow-2xl p-6 w-96 text-center">

      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        Confirm Logout
      </h2>

      <p className="text-gray-600 mb-6">
        Are you sure you want to log out?
      </p>

      <div className="flex justify-center gap-6">

        <button
          onClick={cancelLogout}
          className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded-lg"
        >
          Cancel
        </button>

        <button
          onClick={confirmLogout}
          className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg"
        >
          Yes, Logout
        </button>

      </div>

    </div>
  </div>
)}

    </>
  );
}

export default Header;

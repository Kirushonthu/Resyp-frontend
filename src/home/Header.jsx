import { Link, useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { useState } from "react";

function Header({ setIsLoggedIn }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  function handleLogout() {
    setShowLogoutModal(true);
    setMenuOpen(false);
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

  const navLink = (to, label) => (
    <li>
      <Link
        to={to}
        onClick={() => setMenuOpen(false)}
        className={`block px-3 py-1 rounded transition ${
          location.pathname === to
            ? "bg-white text-blue-800 font-semibold"
            : "text-white hover:bg-white hover:text-blue-800"
        }`}
      >
        {label}
      </Link>
    </li>
  );

  return (
    <>
      <header className="bg-blue-800 p-4">
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-bold text-white">Resyp</h1>

          {/* Desktop Nav */}
          <nav className="hidden md:block">
            <ul className="flex gap-6 items-center">
              {navLink("/", "Home")}
              {navLink("/recipes", "Recipes")}
              {navLink("/about", "About")}
              {navLink("/services", "Services")}
              {navLink("/contact", "Contact")}
              <button
                onClick={handleLogout}
                type="button"
                className="hover:bg-red-700 text-white text-xl rounded-2xl px-2 py-1 cursor-pointer"
              >
                Log out
              </button>
            </ul>
          </nav>

          {/* Hamburger Button */}
          <button
            className="md:hidden text-white focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? (
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <nav className="md:hidden mt-4">
            <ul className="flex flex-col gap-3">
              {navLink("/", "Home")}
              {navLink("/recipes", "Recipes")}
              {navLink("/about", "About")}
              {navLink("/services", "Services")}
              {navLink("/contact", "Contact")}
              <li>
                <button
                  onClick={handleLogout}
                  type="button"
                  className="w-full text-left text-white hover:bg-red-700 rounded-2xl px-3 py-1 cursor-pointer"
                >
                  Log out
                </button>
              </li>
            </ul>
          </nav>
        )}
      </header>

      {showLogoutModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-white/0 backdrop-blur-sm z-50">
          <div className="bg-white rounded-xl shadow-2xl p-6 w-96 text-center">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Confirm Logout</h2>
            <p className="text-gray-600 mb-6">Are you sure you want to log out?</p>
            <div className="flex justify-center gap-6">
              <button onClick={cancelLogout} className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded-lg">
                Cancel
              </button>
              <button onClick={confirmLogout} className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg">
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
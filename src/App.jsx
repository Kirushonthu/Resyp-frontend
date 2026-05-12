import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RecipeDetails from "./componets/RecipeDetails";
import Form from "./componets/login-page/Form";
import Footer from "./home/Footer";
import Header from "./home/Header";
import Recipe from "./home/Recipe";
import Home from "./home/Home";
import About from "./componets/About";
import Contact from "./componets/Contact";
import Services from "./componets/Services";
import { ToastContainer } from "react-toastify";
import Protectedroute from "./componets/login-page/Protectedroute";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("accessToken")
  );

  return (
    <BrowserRouter>
      {isLoggedIn && <Header setIsLoggedIn={setIsLoggedIn} />}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        theme="colored"
      />
      <Routes>

        <Route
          path="/"
          element={isLoggedIn ? <Home /> : <Form setIsLoggedIn={setIsLoggedIn} />}
        />

        <Route element={<Protectedroute isLoggedIn={isLoggedIn} />}>
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/services" element={<Services />} />

          {/* Recipe list page */}
          <Route path="/recipes" element={<Recipe />} />

          {/* Recipe detail page */}
          <Route path="/recipe/:id" element={<RecipeDetails />} />
        </Route>

      </Routes>
      {isLoggedIn && <Footer />}
    </BrowserRouter>
  );
}

export default App;
import React, { useState } from "react";
import rest from "../../assets/restaurent.jpg";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

function Form({ setIsLoggedIn }) {
  const [Name, setName] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "https://dummyjson.com/auth/login",
        { 
          username: Name,
          password: password,
        }
      );

      console.log("Login Success:", res.data);

      localStorage.setItem("accessToken", res.data.accessToken);
      toast.success("Login Successful ");

      setTimeout(() => {
        setIsLoggedIn(true);
      }, 1000);

    } catch (error) {
      const message =
        error.response?.data?.message ||
        "Invalid Username or Password ";

      toast.error(message);
    }

  };

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${rest})` }}
    >
      <form
        onSubmit={handleSubmit}
        className="bg-white/20 backdrop-blur-md border border-white/30 shadow-2xl rounded-xl p-8 w-full max-w-sm space-y-6 text-white"
      >
        <h2 className="text-2xl font-bold text-center">
          Login
        </h2>

        <div>
          <label className="block mb-1 text-sm font-medium">
            Username
          </label>
          <input
            type="text"
            value={Name}
            placeholder="emilys"
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-white/30 border border-white/40 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-white"
            required
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium">
            Password
          </label>
          <input
            type="password"
            value={password}
            placeholder="emilyspass"
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-white/30 border border-white/40 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-white"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-white text-black py-2 rounded-lg font-semibold hover:bg-gray-200 transition duration-200"
        >
          Login
        </button>
      </form>
      

    </div>
  );
}

export default Form;

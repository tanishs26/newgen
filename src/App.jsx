import React, { useEffect, useState } from "react";
import "./App.css";
import { useDispatch } from "react-redux";
import authService from "./appwrite/auth";
import { login } from "./store/authSlice";
import { Footer, Header } from "./components/import";
import { Outlet } from "react-router-dom";
const App = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login(userData));
        }
      })
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, []);

  return loading ? (
    <div className="flex flex-col justify-center items-center min-h-screen bg-[#1f1f1f]">
      <h2 className="text-cyan-400 text-3xl mb-2 font-light ">Loading</h2>

      <div className="w-14 h-14 border-1 border-cyan-400 border-t-transparent rounded-full animate-spin">
        {" "}
      </div>
    </div>
  ) : (
    <div className="min-h-screen flex flex-col justify-between bg-[#1f1f1f] text-white">
      <Header />
      <main className="w flex justify-center items-center">
        <Outlet />
        <h1 className="text-center text-3xl font-semibold">Welcome </h1>
      </main>
      <Footer />
    </div>
  );
};

export default App;

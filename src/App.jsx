import React, { useEffect, useState } from "react";
import "./App.css";
import { useDispatch } from "react-redux";
import authService from "./appwrite/auth";
import { login } from "./store/authSlice";
import { Footer, Header, AuthLayout } from "./components/import";
import { Post, Login, EditPost, AllPost, AddPost, Home, Signup } from "./pages/import2";
import { Routes, Route, Outlet } from "react-router-dom";

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
      .catch(console.log)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-[#1f1f1f]">
        <h2 className="text-cyan-400 text-3xl mb-2 font-light">Loading</h2>
        <div className="w-14 h-14 border-1 border-cyan-400 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#1f1f1f] text-white">
      <Header />
      <main className="w flex justify-center items-center">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<AuthLayout authentication={false}><Login /></AuthLayout>} />
          <Route path="/signup" element={<AuthLayout authentication={false}><Signup /></AuthLayout>} />
          <Route path="/all-posts" element={<AuthLayout authentication><AllPost /></AuthLayout>} />
          <Route path="/add-post" element={<AuthLayout authentication><AddPost /></AuthLayout>} />
          <Route path="/edit-post/:slug" element={<AuthLayout authentication><EditPost /></AuthLayout>} />
          <Route path="/post/:slug" element={<Post />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;

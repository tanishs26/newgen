import React, { useState } from "react";
import authService from "../appwrite/auth";
import { Input, Logo, Button } from "./import.js";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../store/authSlice.js";
import { Link } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");
  const signup = async (data) => {
    try {
      setError("");
      const userData = await authService.createAccount(data);
      if (userData) {
        const userData = await authService.getCurrentUser();
        if (userData) {
          dispatch(login(userData));
          navigate("/");
        }
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="w-full flex items-center justify-center flex-col">
      <div className="w-full max-w-lg bg-gray-950 rounded-xl p-10 border border-white/10">
        <Logo className="text-3xl " className2="text-xs mb-5" />

        <h2 className="text-center text-2xl font-bold">Create an account</h2>
        <form onSubmit={handleSubmit(signup)} className="mt-6 space-y-5">
          <Input
            label="Name"
            placeholder="Enter your name"
            {...register("name", { required: true })}
          />
          <Input
            label="Email"
            type="email"
            placeholder="Enter your email"
            {...register("email", { required: true })}
          />
          <Input
            label="Password"
            type="password"
            placeholder="Enter your password"
            {...register("password", { required: true })}
          />
          <div className="w-full text-center">
            <Button
              btnText="Create Account"
              type="submit"
              className="bg-white/20"
            />
          </div>
          <div className="w-full text-center">
            Already have an account&nbsp;
            <Link
              to="/login"
              className="text-white hover:text-emerald-300 hover:underline"
            >
              Log in
            </Link>
          </div>
        </form>
        {error && (
          <p className="mt-4 text-red-500 font-semibold text-center">
            {error.charAt(0).toUpperCase() + error.slice(1)}
          </p>
        )}
      </div>
    </div>
  );
};

export default Signup;

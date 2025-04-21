import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import authService from "../appwrite/auth";
import { login as authLogin } from "../store/authSlice";
import { Button, Input, Logo } from "./import.js";
import { useDispatch } from "react-redux";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [error, setError] = useState("");

  const onSubmit = async (data) => {
    setError("");
    const { email, password } = data;
    try {
      const session = await authService.login({ email, password });
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) {
          dispatch(authLogin(userData));
          navigate("/all-posts");
        }
      }
    } catch (e) {
      setError(e?.message || "Something went wrong.");
    }
  };

  return (
    <div className="w-full flex items-center flex-col justify-center">
      <div className="w-full mx-auto max-w-lg bg-gray-950 rounded-xl p-10 border-black/10 flex flex-col justify-center items-center">
        <span className="max-w-[100px] inline-block">
          <Logo width="100px" className="text-3xl" className2="text-xs mb-6" />
        </span>
        <h2 className="text-center text-2xl font-bold leading-tight">
          Sign in to your account
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-10 w-full">
          <div className="space-y-5">
            <Input
              label="Email"
              placeholder="Enter your email..."
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value:
                    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Enter a valid email",
                },
              })}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}

            <Input
              label="Password"
              placeholder="Enter your password..."
              type="password"
              {...register("password", {
                required: "Password is required",
              })}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}

            <div className="w-full text-center mb-2">
              <Button btnText="Sign In" type="submit" className="bg-white/20" />
            </div>
          </div>
        </form>

        <p className="mt-2 text-center text-base text-white/60">
          Don&apos;t have an account?{" "}
          <Link
            to="/signup"
            className="text-white hover:text-emerald-300 hover:underline"
          >
            Sign Up
          </Link>
        </p>

        {error && (
          <p className="mt-2 text-center text-base text-red-500 font-bold">
            {error[0].toUpperCase() + error.slice(1)}
          </p>
        )}
      </div>
    </div>
  );
};

export default Login;

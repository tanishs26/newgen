import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link,  useNavigate } from "react-router-dom";
import authService from "../appwrite/auth";
import { login as authLogin } from "../store/authSlice";
import { Button, Input, Select, Logo } from "./import.js";
import { useDispatch } from "react-redux";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");
  const login = async (data) => {
    setError("");
    try {
      const session = await authService.login(data);
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) {
          dispatch(authLogin(userData));
          navigate("/");
        }
      }
    } catch (e) {
      setError(e.message || "Something went wrong.");
    }
  };
  return (
    <div className="w-full flex items-center  flex-col justify-center">
      <div className="w-full mx-auto max-w-lg bg-gray-950 rounded-xl flex flex-col justify-center items-center  p-10 border-black/10">
        <span className="max-w-[100px] inline-block">
          <Logo width="100px" className="text-3xl " className2="text-xs mb-6" />
        </span>
        <h2 className="text-center text-2xl font-bold leading-tight">
          {" "}
          Sign in to your account{" "}
        </h2>

        <form onSubmit={handleSubmit(login)} className="mt-10 ">
          <div className="space-y-5">
            <Input
              label="Email : "
              placeholder="Enter your email..."
              type="email"
              {...register("email", {
                required: true,
                validate: {
                  matchPattern: (value) =>
                    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
                      value
                    ) || "Email address must be a valid one ",
                },
              })}
            />
            <Input
              type="password"
              placeholder="Enter your password"
              label="Password"
              {...register("password", {
                required: true,
              })}
            />
            <div className="w-full text-center mb-2">
              <Button
                btnText="Sign In"
                type="submit"
                className=" bg-white/20"
              />
            </div>
          </div>
        </form>
        <p className="mt-2 text-center text-base text-white/60">
          Don't have an account&nbsp;
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

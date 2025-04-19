import React from "react";
import authService from "../appwrite/auth";
import { logout } from "../store/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { Container, LogoutBtn, Logo } from "./import";
import { useNavigate } from "react-router-dom";
import { NavLink, Link } from "react-router-dom";
import { Input } from "./import.js";
const Header = () => {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
  ];
  return (
    <header className="py-1  bg-white/1 backdrop-blur-md sticky top-0 z-50 shadow-md m-0  ">
      <nav className="flex justify-between items-center p-3">
        <div className="mr-4 ">
          <Link to="/">
            <Logo
              width="70px"
              className="text-3xl"
              className2="text-xs text-gray-300"
            />
          </Link>
        </div>
        <ul className="flex items-center">
          {navItems.map((item) => {
            if (item.active) {
              return (
                <li key={item.name} className="inline-block mr-4">
                  <NavLink
                    to={item.slug}
                    className={({ isActive }) =>
                      isActive
                        ? "text-cyan-700  px-6 py-2 rounded-full"
                        : "text-gray-200 active:text-black active:bg-blue-100 duration-150 px-6 py-2 rounded-full"
                    }
                  >
                    {item.name}
                  </NavLink>
                </li>
              );
            }
            return null;
          })}
          {authStatus && <LogoutBtn />}
        </ul>
      </nav>
     
    </header>
  );
};

export default Header;

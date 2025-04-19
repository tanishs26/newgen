import React from "react";
import logo from "./logo.png";
const Logo = ({ width = "100px", className, className2 }) => {
  return (
    <div className="flex flex-col items-center gap-2 ">
      <h1
        className={`${className} font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400  to-cyan-300 tracking-wide`}
      >
        New<span className="text-white">Gen</span>
      </h1>
      <p className={` ${className2}  whitespace-nowrap`}>
        Where future evolves.
      </p>
    </div>
  );
};

export default Logo;

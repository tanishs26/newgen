import React from "react";

const Button = ({ btnText,  type = "submit", className }) => {
  return (
    <button
      type={type}
      className={`inline-block py-2 px-6 hover:bg-white hover:text-black hover:shadow-md rounded-full duration-300 cursor-pointer ${className}`}
    >
      {btnText}
    </button>
  );
};

export default Button;

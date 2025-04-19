import React from "react";

const Button = ({ btnText, onBtnClick, type = "button", className }) => {
  return (
    <button
      type={type}
      className={`inline-block py-2 px-6 hover:bg-white hover:text-black hover:shadow-md rounded-full duration-300 cursor-pointer ${className}`}
      onClick={onBtnClick}
    >
      {btnText}
    </button>
  );
};

export default Button;

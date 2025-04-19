import React from "react";
import { forwardRef, useId } from "react";
const Input = React.forwardRef(
  ({ label, type = "text", placeholder, className, ...props }, ref) => {
    const id = useId();
    return (
      <div className="w-full">
        {label && (
          <label className="inline-block mb-1 pl-1" htmlFor={id}>
            {label}
          </label>
        )}
        <input
          type={type}
          placeholder={placeholder}
          className={`${className} outline-none backdrop-blur-3xl bg-white/5 w-full `}
          ref={ref}
          {...props}
          id={id}
        />
      </div>
    );
  }
);
export default Input;

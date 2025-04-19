import React, { forwardRef, useId } from "react";

const Select = forwardRef(
  ({ options = [], className = "", label, ...props }, ref) => {
    const id = useId();

    return (
      <div className="w-full">
        {label && (
          <label htmlFor={id} className="inline-block mb-1 pl-1">
            {label}
          </label>
        )}
        <select
          id={id}
          ref={ref}
          className={`cursor-pointer outline-none backdrop-blur-3xl bg-white/5 w-full px-3 py-2 rounded-md ${className}`}
          {...props}
        >
          {options.map((option) => (
            <option
              value={option}
              className="bg-black/70 cursor-pointer backdrop-blur-3xl text-white "
              key={option}
            >
              {option[0].toUpperCase() + option.slice(1)}
            </option>
          ))}
        </select>
      </div>
    );
  }
);

export default Select;

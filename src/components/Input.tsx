import clsx from "clsx";
import { InputHTMLAttributes, ReactNode } from "react";
import { FieldError } from "react-hook-form";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  prefixIcon?: ReactNode;
  errors?: FieldError;
}

const Input = (props: InputProps) => {
  return (
    <input
      className={clsx(
        "ring-dark-cerulean text-dark-cerulean dark:ring-woodsmoke-500 dark:bg-woodsmoke-800 rounded-md px-3 py-2 ring-1 transition-all duration-150 outline-none focus:ring-2 dark:text-white",
        { "ring-rose-400": props.errors },
      )}
      {...props}
    />
  );
};

export default Input;

import { InputHTMLAttributes, ReactNode } from "react";
import { FieldError } from "react-hook-form";
import cn from "../utils/cn";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  prefixIcon?: ReactNode;
  errors?: FieldError;
  className?: string | undefined;
}

const Input = (props: InputProps) => {
  return (
    <input
      {...props}
      className={cn(
        "ring-chathams-blue text-chathams-blue dark:ring-woodsmoke-500 dark:bg-woodsmoke-800 rounded-md px-3 py-2 ring-1 transition-all duration-150 outline-none focus:ring-2 dark:text-white",
        props.className,
        props.errors ? "ring-rose-400" : "",
      )}
    />
  );
};

export default Input;

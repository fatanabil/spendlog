import { InputHTMLAttributes, ReactNode, Ref } from "react";
import { FieldError } from "react-hook-form";
import cn from "../utils/cn";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  prefixIcon?: ReactNode | string;
  errors?: FieldError;
  className?: string | undefined;
  ref?: Ref<HTMLInputElement>;
}

const Input = (props: InputProps) => {
  if (props.prefixIcon) {
    if (typeof props.prefixIcon === "string") {
      return (
        <div className="relative w-full dark:text-white">
          <span className="absolute z-10 p-2 pl-3 font-semibold">
            {props.prefixIcon}
          </span>
          <input
            {...props}
            ref={props.ref}
            className={cn(
              "ring-chathams-blue text-chathams-blue dark:ring-woodsmoke-700 dark:bg-woodsmoke-800 relative w-full rounded-md px-3 py-2 pl-10 ring-1 transition-all duration-150 outline-none focus:ring-2 dark:text-white",
              props.className,
              props.errors ? "ring-rose-400" : "",
            )}
          />
        </div>
      );
    }
  }

  return (
    <input
      {...props}
      ref={props.ref}
      className={cn(
        "ring-chathams-blue text-chathams-blue dark:ring-woodsmoke-700 dark:bg-woodsmoke-800 rounded-md px-3 py-2 ring-1 transition-all duration-150 outline-none focus:ring-2 dark:text-white",
        props.className,
        props.errors ? "ring-rose-400" : "",
      )}
    />
  );
};

export default Input;

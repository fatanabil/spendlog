import clsx from "clsx";
import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "filled" | "outline" | "secondary";
}

const Button = (props: ButtonProps) => {
  return (
    <button
      className={clsx(
        "bg-ocean-green flex w-full cursor-pointer justify-center rounded-md px-3 py-2 text-white transition-all duration-150 active:scale-95",
        props.className,
      )}
      {...props}
    >
      {props.children}
    </button>
  );
};

export default Button;

import { ButtonHTMLAttributes, ReactNode } from "react";
import cn from "../utils/cn";

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: ReactNode;
  className?: string;
}

const IconButton = (props: IconButtonProps) => {
  return (
    <button
      {...props}
      className={cn(
        "hover:bg-woodsmoke-100 h-8 w-8 cursor-pointer rounded-md p-1",
        props.className,
      )}
    >
      {props.icon}
    </button>
  );
};

export default IconButton;

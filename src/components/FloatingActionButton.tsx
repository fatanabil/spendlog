import { ButtonHTMLAttributes, ReactNode } from "react";
import cn from "../utils/cn";

interface FloatingActionButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  icon: ReactNode;
  clidren?: string | ReactNode;
}

const FloatingActionButton = (props: FloatingActionButtonProps) => {
  return (
    <button
      {...props}
      className={cn(
        "bg-tradewind hover:bg-tradewind-600 fixed top-[calc(100%-50px)] left-[calc(100%-24px)] z-30 -translate-x-full -translate-y-full cursor-pointer rounded-full p-4 shadow-md transition-all duration-150",
      )}
    >
      {props.icon}
    </button>
  );
};

export default FloatingActionButton;

import clsx from "clsx";
import { ReactNode } from "react";

interface ErrorTextFormProps {
  children: string | ReactNode;
  className?: string;
}

const ErrorTextForm = ({ className, children }: ErrorTextFormProps) => {
  return <p className={clsx("text-sm text-rose-400", className)}>{children}</p>;
};

export default ErrorTextForm;

import clsx from "clsx";
import { twMerge } from "tailwind-merge";

const cn = (...classes: (string | undefined)[]): string => {
  return twMerge(clsx(classes));
};

export default cn;

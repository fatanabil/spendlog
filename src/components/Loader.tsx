import clsx from "clsx";

interface LoaderProps {
  color?: "white" | "green" | "blue";
  className?: string;
}

const Loader = ({ color = "blue", className, ...restProps }: LoaderProps) => {
  return (
    <div
      {...restProps}
      className={clsx(
        "border-dark-cerulean h-6 w-6 animate-spin rounded-full border-4 border-t-transparent",
        {
          "border-chathams-blue": color === "blue",
          "border-tradewind": color === "green",
          "border-white": color === "white",
        },
        className,
      )}
    ></div>
  );
};

export default Loader;

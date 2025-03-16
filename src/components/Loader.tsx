import clsx from "clsx";

interface LoaderProps {
  color?: "white" | "green" | "blue";
}

const Loader = ({ color = "blue" }: LoaderProps) => {
  return (
    <div
      className={clsx(
        "border-dark-cerulean h-6 w-6 animate-spin rounded-full border-4 border-t-transparent",
        {
          "border-dark-cerulean": color === "blue",
          "border-ocean-green": color === "green",
          "border-white": color === "white",
        },
      )}
    ></div>
  );
};

export default Loader;

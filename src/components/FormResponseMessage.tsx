import clsx from "clsx";

interface FormResponseMessageProps {
  message: string;
  type: "success" | "error" | string;
}

const FormResponseMessage = ({ message, type }: FormResponseMessageProps) => {
  return (
    <div>
      <div
        className={clsx("mb-3 rounded-md border-1 p-3 text-center", {
          "bg-ocean-green-50 border-ocean-green-100 text-ocean-green":
            type === "success",
          "border-rose-200 bg-rose-100 text-rose-400": type === "error",
        })}
      >
        {message}
      </div>
    </div>
  );
};

export default FormResponseMessage;

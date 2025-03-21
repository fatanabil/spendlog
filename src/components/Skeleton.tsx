import cn from "../utils/cn";

interface SkeletonProps {
  className?: string;
}

const Skeleton = ({ className }: SkeletonProps) => {
  return (
    <div
      className={cn("h-5 w-full rounded-md", className)}
      style={{
        animation: "shimmer 1s infinite linear",
        background:
          "linear-gradient(135deg, #e0e0e0 25%, #f5f5f5 50%, #e0e0e0 75%)",
        backgroundSize: "200% 100%",
      }}
    ></div>
  );
};

export default Skeleton;

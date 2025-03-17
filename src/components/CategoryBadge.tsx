import cn from "../utils/cn";

interface CategoryBadgeType {
  type: "income" | "expense" | string;
}

const CategoryBadge = ({ type }: CategoryBadgeType) => {
  return (
    <span
      className={cn(
        "rounded-md px-2 py-1 text-xs font-semibold text-white",
        type === "expense" ? "bg-rose-400" : "bg-tradewind",
      )}
    >
      {type === "expense" ? "Pengeluaran" : "Pemasukan"}
    </span>
  );
};

export default CategoryBadge;

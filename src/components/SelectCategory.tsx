import { useRef, useState } from "react";
import useOutsideClick from "../hooks/useOutsideClick";
import { Category } from "../schemas/CategorySchema";
import { AddTransaction } from "../schemas/TransactionSchema";
import { useCategoryStore } from "../store/categoryStore";
import cn from "../utils/cn";
import Input from "./Input";
import { XMarkIcon } from "@heroicons/react/24/outline";
import IconButton from "./IconButton";

const OptionCategory = ({
  category,
  field,
  setIsOpen,
}: {
  category: Category;
  field?: {
    value: AddTransaction["category"];
    onChange: (value: AddTransaction["category"]) => void;
  };
  setIsOpen?: (value: boolean) => void;
}) => {
  return (
    <li
      id={category.id}
      className="cursor-pointer list-none rounded-md px-2 py-1 text-sm text-white transition-all duration-150 hover:scale-95"
      style={{ backgroundColor: `${category.color}` }}
      onClick={() => {
        if (field && setIsOpen) {
          field.onChange(category);
          setIsOpen(false);
        }
      }}
    >
      {category.name}
    </li>
  );
};

const SelectCategory = ({
  field,
}: {
  field: {
    value: AddTransaction["category"];
    onChange: (value: AddTransaction["category"]) => void;
  };
}) => {
  const { categories } = useCategoryStore();
  const [isOpen, setIsOpen] = useState(false);
  const selectCategoryRef = useRef<HTMLDivElement>(null);
  const selectedCat = categories.filter((cat) => cat.id === field.value.id)[0];

  useOutsideClick(selectCategoryRef, () => setIsOpen(false));

  return (
    <div className="relative w-full" ref={selectCategoryRef}>
      <Input
        readOnly
        onFocus={() => setIsOpen(true)}
        className="relative w-full"
      />
      {selectedCat && (
        <IconButton
          onClick={() => {
            field.onChange({ id: "", name: "", color: "" });
            setIsOpen(true);
          }}
          className="absolute top-1/2 right-0 mr-1 -translate-y-1/2"
          icon={<XMarkIcon className="size-6 text-rose-400" />}
        />
      )}
      {selectedCat && (
        <span className="absolute top-1/2 left-0 ml-2 -translate-y-1/2">
          <OptionCategory category={selectedCat} />
        </span>
      )}
      <div
        className={cn(
          "bg-woodsmoke-50 dark:bg-woodsmoke-800 absolute z-30 flex origin-top flex-col gap-2 rounded-md p-2 shadow-md transition-all duration-300",
          isOpen
            ? "pointer-events-auto translate-y-2 scale-y-100 opacity-100"
            : "pointer-events-none -translate-y-4 scale-y-90 opacity-0",
        )}
      >
        <div>
          <span>Pengeluaran</span>
          <ul className="mt-1 flex flex-wrap gap-2">
            {categories.map((cat) => {
              if (cat.type === "expense") {
                return (
                  <OptionCategory
                    category={cat}
                    key={cat.id}
                    field={field}
                    setIsOpen={setIsOpen}
                  />
                );
              }
            })}
          </ul>
        </div>
        <hr className="outline-tradewind border-tradewind outline-1" />
        <div>
          <span>Pemasukan</span>
          <ul className="mt-1 flex flex-wrap gap-2">
            {categories.map((cat) => {
              if (cat.type === "income") {
                return (
                  <OptionCategory
                    category={cat}
                    key={cat.id}
                    field={field}
                    setIsOpen={setIsOpen}
                  />
                );
              }
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SelectCategory;

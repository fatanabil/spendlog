import { createPortal } from "react-dom";
import Input from "../Input";
import { Controller, useForm } from "react-hook-form";
import IconButton from "../IconButton";
import { XCircleIcon } from "@heroicons/react/24/outline";
import {
  AddTransaction,
  AddTransactionSchema,
  Transaction,
} from "../../schemas/TransactionSchema";
import Button from "../Button";
import Loader from "../Loader";
import { ChangeEvent, useRef, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import SelectCategory from "../SelectCategory";
import ErrorTextForm from "../ErrorTextForm";
import Backdrop from "../Backdrop";
import cn from "../../utils/cn";
import { fetchWithToken } from "../../utils/fetchWithToken";
import { ApiResponse } from "../../schemas/ApiResponseSchema";
import { useQueryClient } from "@tanstack/react-query";

const formatNumber = (num: string) => {
  return num.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

interface AddTransactionModalProps {
  isOpen: boolean;
  closeModal: () => void;
}

const AddTransactionModal = ({
  isOpen,
  closeModal,
}: AddTransactionModalProps) => {
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { isSubmitting, errors },
  } = useForm<AddTransaction>({
    resolver: zodResolver(AddTransactionSchema),
    defaultValues: {
      title: "",
      amount: 0,
      category: { id: "", name: "", color: "" },
    },
  });
  const [displayValue, setDisplayValue] = useState("");
  const amountInputRef = useRef<HTMLInputElement>(null);

  const queryClient = useQueryClient();

  const handleAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    const rawInput = e.target.value;
    const cursorPos = e.target.selectionStart ?? 0;

    const rawValue = rawInput.replace(/\D/g, "").replace(/\./g, "");

    if (rawValue === "") {
      setDisplayValue("");
      setValue("amount", 0, { shouldValidate: true });
      return;
    }

    const formattedValue = formatNumber(rawValue);

    const prevDots = (rawInput.match(/\./g) || []).length;
    const newDots = (formattedValue.match(/\./g) || []).length;

    const dotDiff = newDots - prevDots;

    setDisplayValue(formattedValue);
    setValue("amount", parseInt(rawValue), {
      shouldValidate: true,
    });

    setTimeout(() => {
      if (amountInputRef.current) {
        amountInputRef.current.selectionStart =
          amountInputRef.current.selectionEnd = cursorPos + dotDiff;
      }
    }, 0);
  };

  const postNewTransaction = async (data: {
    title: string;
    categoryId: string;
    amount: number;
  }) => {
    await fetchWithToken<ApiResponse<{ newTransaction: Transaction }>>({
      url: "/transactions",
      method: "POST",
      data,
    });
    queryClient.invalidateQueries({
      queryKey: ["recent-transactions"],
    });
    queryClient.invalidateQueries({
      queryKey: ["summary"],
    });
    queryClient.invalidateQueries({
      queryKey: ["by-category"],
    });
    queryClient.invalidateQueries({
      queryKey: ["this-week"],
    });
    closeModal();
  };

  const addTransaction = (data: AddTransaction) => {
    const finalData = {
      title: data.title,
      amount: parseInt(data.amount.toString().replace(/\./g, "")),
      categoryId: data.category.id,
    };

    postNewTransaction(finalData);
  };

  return createPortal(
    <>
      <Backdrop isOpen={isOpen} />
      <div
        className={cn(
          "text-chathams-blue fixed top-1/2 left-1/2 z-50 w-lg -translate-x-1/2 rounded-md bg-white p-6 shadow-md transition-all duration-300",
          isOpen
            ? "pointer-events-auto -translate-y-1/2 opacity-100"
            : "pointer-events-none -translate-y-[calc(50%+16px)] opacity-0",
        )}
      >
        <div className="flex w-full justify-between">
          <h1 className="text-2xl font-semibold">Tambah Transaksi</h1>
          <IconButton
            onClick={closeModal}
            icon={<XCircleIcon className="text-rose-400" />}
          />
        </div>
        <hr className="bg-tradewind-600 mx-auto my-3 h-0.5 w-full border-none outline-none" />
        <div>
          <form
            action=""
            onSubmit={handleSubmit(addTransaction)}
            className="flex flex-col gap-4"
          >
            <div className="flex flex-col gap-2">
              <label htmlFor="title" className="text-lg font-semibold">
                Transaksi
              </label>
              <Input
                id="title"
                type="text"
                {...register("title")}
                errors={errors.title}
              />
              {errors.title && (
                <ErrorTextForm>{errors.title.message}</ErrorTextForm>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="category" className="text-lg font-semibold">
                Kategori
              </label>
              <Controller
                name="category"
                control={control}
                render={({ field }) => <SelectCategory field={field} />}
              />
              {errors.category?.name?.message && (
                <ErrorTextForm>{errors.category.name.message}</ErrorTextForm>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="amount" className="text-lg font-semibold">
                Jumlah
              </label>
              <Input
                prefixIcon="Rp"
                id="amount"
                type="text"
                {...register("amount")}
                value={displayValue}
                onChange={handleAmountChange}
                ref={amountInputRef}
                errors={errors.amount}
                autoComplete="off"
              />
              {errors.amount?.message && (
                <ErrorTextForm>{errors.amount.message}</ErrorTextForm>
              )}
            </div>
            <Button type="submit">
              {isSubmitting ? <Loader /> : "Tambah Transaksi"}
            </Button>
          </form>
        </div>
      </div>
    </>,
    document.getElementById("modal-wrapper") as Element,
  );
};

export default AddTransactionModal;

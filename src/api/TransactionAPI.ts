import { ApiResponse } from "../schemas/ApiResponseSchema";
import { Transaction } from "../schemas/TransactionSchema";
import { fetchWithToken } from "../utils/fetchWithToken";

interface TransactionSummaryDataType {
  incomeTotal: number;
  expenseTotal: number;
  currentBalance: number;
  expenseIncomeRatio: number;
}

interface TransactionByCategoryType {
  categoryId: string;
  _sum: { amount: string };
}

export const getSummaryTransaction = async () => {
  const { data } = await fetchWithToken<
    ApiResponse<{ summary: TransactionSummaryDataType }>
  >({
    url: "/transactions/summary",
  });

  if (data?.summary) {
    return data.summary as TransactionSummaryDataType;
  }

  return {
    incomeTotal: 0,
    currentBalance: 0,
    expenseTotal: 0,
    expenseIncomeRatio: 0,
  } as TransactionSummaryDataType;
};

export const getRecentTransaction = async () => {
  const { data } = await fetchWithToken<
    ApiResponse<{ transactions: Transaction[] }>
  >({ url: "/transactions?limit=15&order=desc" });

  return data?.transactions as Transaction[];
};

export const getTransactionByCategory = async () => {
  const { data } = await fetchWithToken<
    ApiResponse<{
      expense: TransactionByCategoryType[];
      income: TransactionByCategoryType[];
    }>
  >({
    url: "/transactions/by-category",
  });
  return data as {
    expense: TransactionByCategoryType[];
    income: TransactionByCategoryType[];
  };
};

export const getTransactionThisWeek = async () => {
  const { data } = await fetchWithToken<
    ApiResponse<{ transactions: Transaction[] }>
  >({ url: "/transactions/by-range?range=week&groupBy=date" });
  return data as { transactions: Transaction[] };
};

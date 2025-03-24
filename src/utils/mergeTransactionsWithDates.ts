import { Transaction } from "../schemas/TransactionSchema";
import { generateDateRange } from "./generateDateRange";

export const mergeTransactionsWithDates = (
  transactions: Transaction[],
  startDate: string,
  endDate: string,
) => {
  const dates = generateDateRange(startDate, endDate);

  const groupByDate = transactions.reduce(
    (acc, dt) => {
      const dataKey = dt.date.split("T")[0];
      if (!acc[dataKey]) {
        acc[dataKey] = { income: 0, expense: 0 };
      }

      if (dt.type === "income") {
        acc[dataKey].income += Number(dt.amount);
      } else if (dt.type === "expense") {
        acc[dataKey].expense += Number(dt.amount);
      }

      return acc;
    },
    {} as Record<string, { income: number; expense: number }>,
  );

  return dates.map((date) => ({
    date,
    income: groupByDate[date]?.income || 0,
    expense: groupByDate[date]?.expense || 0,
  }));
};

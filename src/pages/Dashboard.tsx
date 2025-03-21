import { useEffect, useState } from "react";
import { fetchWithToken } from "../utils/fetchWithToken";
import { ApiResponse } from "../schemas/ApiResponseSchema";
import {
  CheckIcon,
  PlusIcon,
  WalletIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Transaction } from "../schemas/TransactionSchema";
import formatCurrency from "../utils/formatCurrency";
import formatDate from "../utils/formatDate";
import CategoryBadge from "../components/CategoryBadge";
import AddTransactionModal from "../components/modals/AddTransactionModal";
import useModal from "../hooks/useModal";
import FloatingActionButton from "../components/FloatingActionButton";

interface TransactionSummaryDataType {
  incomeTotal: number;
  expenseTotal: number;
  currentBalance: number;
  expenseIncomeRatio: number;
}

const TransactionSummary = () => {
  const [summary, setSummary] = useState<TransactionSummaryDataType>({
    currentBalance: 0,
    expenseIncomeRatio: 0,
    expenseTotal: 0,
    incomeTotal: 0,
  });

  useEffect(() => {
    const getSummary = async () => {
      const { data } = await fetchWithToken<
        ApiResponse<{ summary: TransactionSummaryDataType }>
      >({
        url: "/transactions/summary",
      });

      if (data?.summary) {
        setSummary(data.summary);
      }
    };
    getSummary();
  }, []);

  return (
    <section className="basis-1/2 rounded-md bg-white p-6 shadow-md">
      <h1 className="text-chathams-blue text-2xl font-semibold">
        Ringkasan Keuangan
      </h1>
      <table className="mt-4 gap-1">
        <tbody>
          <tr className="text-tradewind">
            <td className="flex gap-1 pr-2">
              <CheckIcon className="size-6" />
              Total Pemasukan
            </td>
            <td className="px-2">:</td>
            <td>{formatCurrency(summary.incomeTotal)}</td>
          </tr>
          <tr className="text-rose-400">
            <td className="flex gap-1 pr-2">
              <XMarkIcon className="size-6" />
              Total Pengeluaran
            </td>
            <td className="px-2">:</td>
            <td>{formatCurrency(summary.expenseTotal)}</td>
          </tr>
          <tr className="text-chathams-blue">
            <td className="flex gap-1 pr-2">
              <WalletIcon className="size-6" />
              Saldo sekarang
            </td>
            <td className="px-2">:</td>
            <td>{formatCurrency(summary.currentBalance)}</td>
          </tr>
        </tbody>
      </table>
      <p className="text-chathams-blue mt-2">
        Pengeluaran kamu{" "}
        {summary.expenseIncomeRatio && summary.expenseIncomeRatio.toFixed(1)}%
        dari pemasukan
      </p>
    </section>
  );
};

const TransactionGraph = () => {
  return (
    <section className="basis-1/2 rounded-md bg-white p-6 shadow-md">
      <h1 className="text-chathams-blue text-2xl font-semibold">Grafik</h1>
    </section>
  );
};

const RecentTransaction = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    const getTransaction = async () => {
      const { data } = await fetchWithToken<
        ApiResponse<{ transactions: Transaction[] }>
      >({ url: "/transactions", method: "GET" });

      if (data?.transactions) {
        setTransactions(data.transactions);
      }
    };

    getTransaction();
  }, []);

  return (
    <section className="rounded-md bg-white p-6 shadow-md">
      <h1 className="text-chathams-blue text-2xl font-semibold">
        Transaksi baru-baru ini
      </h1>
      <div className="mt-4 w-full overflow-x-auto rounded-md">
        <table className="text-chathams-blue w-full min-w-max table-auto border-collapse whitespace-nowrap">
          <thead className="bg-tradewind-300">
            <tr className="divide-tradewind-400 divide-x-2">
              <th className="px-2 py-2">No.</th>
              <th className="px-4 py-2 text-left">Transaksi</th>
              <th className="px-4 py-2 text-left">Kategori</th>
              <th className="px-4 py-2 text-left">Tipe</th>
              <th className="px-4 py-2 text-left">Jumlah</th>
              <th className="px-4 py-2 text-left">Tanggal</th>
            </tr>
          </thead>
          <tbody className="bg-tradewind-50">
            {transactions.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-tradewind-400 py-3 text-center">
                  Data transaksi masih kosong
                </td>
              </tr>
            ) : (
              transactions.map((data, i) => (
                <tr
                  key={data.id}
                  className="divide-tradewind-100 hover:bg-tradewind-100 hover:divide-tradewind-200 divide-x-2 transition-all duration-150"
                >
                  <td className="px-4 py-2">{i + 1}.</td>
                  <td className="px-4 py-2">{data.title}</td>
                  <td className="px-4 py-2">{data.category.name}</td>
                  <td className="px-4 py-2">
                    <CategoryBadge type={data.type} />
                  </td>
                  <td className="px-4 py-2">
                    {data.type === "expense" ? "- " : "+ "}
                    {formatCurrency(data.amount)}
                  </td>
                  <td className="px-4 py-2">{formatDate(data.date)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

const Dashboard = () => {
  const { isOpen, openModal, closeModal } = useModal();

  return (
    <>
      <div className="flex w-full flex-col gap-3">
        <div className="flex w-full gap-3">
          <TransactionSummary />
          <TransactionGraph />
        </div>
        <RecentTransaction />
      </div>
      <FloatingActionButton
        icon={<PlusIcon className="size-10 text-white" />}
        onClick={openModal}
      />
      <AddTransactionModal isOpen={isOpen} closeModal={closeModal} />
    </>
  );
};

export default Dashboard;

import {
  CheckIcon,
  PlusIcon,
  WalletIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useSuspenseQuery } from "@tanstack/react-query";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  getRecentTransaction,
  getSummaryTransaction,
  getTransactionByCategory,
  getTransactionThisWeek,
} from "../api/TransactionAPI";
import CategoryBadge from "../components/CategoryBadge";
import FloatingActionButton from "../components/FloatingActionButton";
import Loader from "../components/Loader";
import AddTransactionModal from "../components/modals/AddTransactionModal";
import Skeleton from "../components/Skeleton";
import useModal from "../hooks/useModal";
import { useCategoryStore } from "../store/categoryStore";
import formatCurrency from "../utils/formatCurrency";
import formatDate from "../utils/formatDate";
import { mergeTransactionsWithDates } from "../utils/mergeTransactionsWithDates";

const TransactionSummary = () => {
  const { data: summary, isLoading } = useSuspenseQuery({
    queryKey: ["summary"],
    queryFn: getSummaryTransaction,
  });

  return (
    <section className="w-1/2 rounded-md bg-white p-6 shadow-md">
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
            <td>
              {isLoading ? <Skeleton /> : formatCurrency(summary.incomeTotal)}
            </td>
          </tr>
          <tr className="text-rose-400">
            <td className="flex gap-1 pr-2">
              <XMarkIcon className="size-6" />
              Total Pengeluaran
            </td>
            <td className="px-2">:</td>
            <td>
              {isLoading ? <Skeleton /> : formatCurrency(summary.expenseTotal)}
            </td>
          </tr>
          <tr className="text-chathams-blue">
            <td className="flex gap-1 pr-2">
              <WalletIcon className="size-6" />
              Saldo sekarang
            </td>
            <td className="px-2">:</td>
            <td>
              {isLoading ? (
                <Skeleton />
              ) : (
                formatCurrency(summary.currentBalance)
              )}
            </td>
          </tr>
        </tbody>
      </table>
      <p className="text-chathams-blue mt-2">
        Pengeluaran kamu{" "}
        {isLoading ? (
          <Skeleton />
        ) : (
          summary.expenseIncomeRatio && summary.expenseIncomeRatio.toFixed(1)
        )}
        % dari pemasukan
      </p>
    </section>
  );
};

const TransactionGraph = () => {
  const { categories } = useCategoryStore();
  const {
    data: { expense, income },
  } = useSuspenseQuery({
    queryKey: ["by-category"],
    queryFn: getTransactionByCategory,
  });
  const {
    data: { transactions: thisWeekTransactions },
  } = useSuspenseQuery({
    queryKey: ["this-week"],
    queryFn: getTransactionThisWeek,
  });

  const expenseData = expense.map((dt) => {
    const category = categories.filter((cat) => cat.id === dt.categoryId)[0];
    return {
      ...category,
      value: dt._sum.amount ? Number(dt._sum.amount) : 0,
    };
  });
  const incomeData = income.map((dt) => {
    const category = categories.filter((cat) => cat.id === dt.categoryId)[0];
    return {
      ...category,
      value: dt._sum.amount ? Number(dt._sum.amount) : 0,
    };
  });

  const today = new Date();
  const dayOfWeek = today.getDay();
  const start = new Date(today);
  start.setDate(today.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1));
  start.setHours(0, 0, 0, 0);
  const startDate = start.toISOString();

  const end = new Date(start);
  end.setDate(start.getDate() + 6);
  end.setHours(23, 59, 59, 999);
  const endDate = end.toISOString();

  const lineData = mergeTransactionsWithDates(
    thisWeekTransactions,
    startDate,
    endDate,
  ).map((item) => ({
    ...item,
    day: new Date(item.date).toLocaleDateString("id-ID", { weekday: "short" }),
  }));

  return (
    <section className="w-1/2 rounded-md bg-white p-6 shadow-md">
      <h1 className="text-chathams-blue text-2xl font-semibold">Grafik</h1>
      <div className="flex w-full snap-x snap-mandatory gap-3 overflow-x-auto scroll-smooth">
        <div className="mt-4 min-w-full snap-start">
          <p className="text-woodsmoke-400">Pengeluaran per kategori</p>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={expenseData} dataKey="value" nameKey="name">
                {expenseData.map((dt) => (
                  <Cell key={`cell-expense-${dt.id}`} fill={dt.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 min-w-full snap-start">
          <p className="text-woodsmoke-400">Pemasukan per kategori</p>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={incomeData} dataKey="value" nameKey="name">
                {incomeData.map((dt) => (
                  <Cell key={`cell-expense-${dt.id}`} fill={dt.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 min-w-full snap-start">
          <p className="text-woodsmoke-400">Total transaksi minggu ini</p>
          <ResponsiveContainer width="100%" height={250} className="mt-3">
            <AreaChart data={lineData}>
              <defs>
                <linearGradient id="incomeGradient" x1={0} y1={0} x2={0} y2={1}>
                  <stop offset="0%" stopColor="#52b69a" stopOpacity={0.5} />
                  <stop offset="100%" stopColor="#52b69a" stopOpacity={0} />
                </linearGradient>
                <linearGradient
                  id="expenseGradient"
                  x1={0}
                  y1={0}
                  x2={0}
                  y2={1}
                >
                  <stop offset="0%" stopColor="#ff637e" stopOpacity={0.5} />
                  <stop offset="100%" stopColor="#ff637e" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="day"
                interval={0}
                angle={-45}
                textAnchor="end"
                tick={{ fontSize: 12 }}
              />
              <YAxis fontSize={12} />
              <Tooltip />
              <Legend />
              <Area
                type="monotone"
                dataKey="income"
                stroke="#52b69a"
                fill="url(#incomeGradient)"
                name="Pemasukan"
              />
              <Area
                type="monotone"
                dataKey="expense"
                stroke="#ff637e"
                fill="url(#expenseGradient)"
                name="Pengeluaran"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  );
};

const RecentTransaction = () => {
  const { data: transactions, isLoading } = useSuspenseQuery({
    queryKey: ["recent-transactions"],
    queryFn: getRecentTransaction,
  });

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
            {isLoading ? (
              <tr>
                <td colSpan={6}>
                  <div className="flex w-full justify-center py-4">
                    <Loader />
                  </div>
                </td>
              </tr>
            ) : transactions.length === 0 ? (
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

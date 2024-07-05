import { AuthPage } from "@/components/guard/AuthPage";
import { HistoryItem } from "@/components/HistoryItem";
import { axiosInstance } from "@/lib/axios";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { format } from "date-fns";

const HistoryPage = () => {
  const [transactions, setTransactions] = useState([]);
  const userSelector = useSelector((state) => state.user);

  const fetchTransactionHistory = async () => {
    try {
      const historyResponse = await axiosInstance.get("/transactions", {
        params: {
          userId: userSelector.id,
        },
      });

      setTransactions(historyResponse.data);
    } catch (error) {
      console.log("🚀 ~ fetchTransactionHistory ~ error:", error);
    }
  };

  useEffect(() => {
    fetchTransactionHistory();
  }, []);

  return (
    <AuthPage>
      <main className="min-h-screen max-w-screen-lg mx-auto px-4 mt-8">
        <h1 className="text-3xl font-bold">My Orders</h1>

        <div className="flex flex-col mt-8 gap-24">
          {transactions.map((transaction) => {
            return (
              <HistoryItem
                key={transaction.id}
                id={transaction.id}
                total_price={transaction.total_price}
                transaction_date={format(
                  new Date(transaction.transaction_date),
                  "dd MMMM yyyy"
                )}
                tax={transaction.tax}
                items={transaction.items}
              />
            );
          })}
        </div>
      </main>
    </AuthPage>
  );
};

export default HistoryPage;

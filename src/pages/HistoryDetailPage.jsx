import { AuthPage } from "@/components/guard/AuthPage";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { axiosInstance } from "@/lib/axios";
import { format } from "date-fns";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const HistoryDetailPage = () => {
  const params = useParams();

  const userSelector = useSelector((state) => state.user);

  const [historyDetail, setHistoryDetail] = useState({
    id: "",
    userId: "",
    total_price: 0,
    tax: 0,
    transaction_date: null,
    items: [],
  });

  const fetchHistoryDetail = async () => {
    try {
      const historyDetailResponse = await axiosInstance.get(
        "/transactions/" + params.transactionId
      );

      setHistoryDetail(historyDetailResponse.data);
    } catch (error) {
      console.log("🚀 ~ fetchHistoryDetail ~ error:", error);
    }
  };

  useEffect(() => {
    fetchHistoryDetail();
  }, []);

  if (userSelector.id !== historyDetail.userId && historyDetail.userId) {
    return <Navigate to="/" />;
  }

  return (
    <AuthPage>
      <main className="min-h-screen max-w-screen-lg mx-auto px-4 mt-8">
        <h1 className="text-3xl font-bold">INV-{historyDetail.id}</h1>
        <h2 className="text-xl font-bold">
          {format(new Date(historyDetail.transaction_date), "dd MMMM yyyy")}
        </h2>

        <Card className="col-span-5 bg-gray-50 border-0 h-min my-10">
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
          </CardHeader>

          <CardContent>
            <div className="flex pb-4 justify-between border-b">
              <span className="text-sm text-muted-foreground">Subtotal</span>
              <span className="text-sm text-muted-foreground">
                Rp. {historyDetail.total_price.toLocaleString("id-ID")}
              </span>
            </div>
            <div className="flex py-4 justify-between border-b">
              <span className="text-sm text-muted-foreground">Taxes (10%)</span>
              <span className="text-sm text-muted-foreground">
                Rp. {historyDetail.tax.toLocaleString("id-ID")}
              </span>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-6">
            <div className="flex justify-between w-full">
              <span className="font-semibold text-muted-foreground">
                Order Total
              </span>
              <span className="font-semibold text-muted-foreground">
                Rp.{" "}
                {(historyDetail.total_price + historyDetail.tax).toLocaleString(
                  "id-ID"
                )}
              </span>
            </div>
          </CardFooter>
        </Card>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead colSpan={2}>Product</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Total Price</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {historyDetail.items.map((item) => {
              return (
                <TableRow
                  className="text-muted-foreground font-semibold"
                  key={item.id}
                >
                  <TableCell colSpan={2}>
                    <div className="flex items-center gap-6">
                      <div className="aspect-square w-[100px] overflow-hidden rounded-md">
                        <img src={item.product.image} alt={item.product.name} />
                      </div>
                      <p className="font-semibold text-primary">
                        {item.product.name}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    Rp. {item.product.price.toLocaleString("id-ID")}
                  </TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>
                    Rp.{" "}
                    {(item.product.price * item.quantity).toLocaleString(
                      "id-ID"
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </main>
    </AuthPage>
  );
};

export default HistoryDetailPage;

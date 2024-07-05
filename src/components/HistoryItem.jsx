import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
export const HistoryItem = (props) => {
  return (
    <div>
      <div className="rounded-md p-4 bg-slate-50 flex justify-between items-center">
        <div className="flex flex-col justify-center">
          <span className="text-muted-foreground text-sm">
            {props.transaction_date}
          </span>
          <span className="text-muted-foreground font-semibold">
            INV-{props.id}
          </span>
        </div>

        <div className="flex flex-col justify-center items-end">
          <span className="text-2xl font-bold">
            Rp. {(props.total_price + props.tax).toLocaleString("id-ID")}
          </span>
          <Link to={"/history/" + props.id}>
            <Button variant="link">View Details</Button>
          </Link>
        </div>
      </div>

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
          {props.items.map((item) => {
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
                  {(item.product.price * item.quantity).toLocaleString("id-ID")}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

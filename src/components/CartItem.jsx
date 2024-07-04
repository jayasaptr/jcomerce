import { IoIosAdd, IoIosRemove } from "react-icons/io";
import { Button } from "./ui/button";
import { IoCheckmark, IoClose } from "react-icons/io5";

export const CartItem = (props) => {
  return (
    <div className="flex gap-4">
      <div className="aspect-square w-full overflow-hidden rounded-md max-w-52">
        <img src={props.image} alt={props.name} className="w-full" />
      </div>

      <div className="flex flex-col justify-between w-full">
        <div className="flex flex-col">
          <p>{props.name}</p>
          <p className="font-bold">Rp. {props.price.toLocaleString("id-ID")}</p>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon">
            <IoIosRemove className="w-4 h-4" />
          </Button>
          <p className="text-lg font-bold">{props.quantity}</p>
          <Button variant="ghost" size="icon">
            <IoIosAdd className="w-4 h-4" />
          </Button>
        </div>

        <div className="flex justify-between w-full">
          <div className="flex gap-2 items-center">
            {props.stock < props.quantity ? (
              <>
                <IoClose className="text-red-500 h-6 w-6" />
                <span className="text-sm text-muted-foreground">
                  Not Availabel
                </span>
              </>
            ) : (
              <>
                <IoCheckmark className="text-green-500 h-6 w-6" />
                <span className="text-sm text-muted-foreground">Availabel</span>
              </>
            )}
          </div>

          <Button variant="link" className="text-destructive">
            Remove Item
          </Button>
        </div>
      </div>
    </div>
  );
};

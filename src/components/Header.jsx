import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { IoCart, IoHeart } from "react-icons/io5";
import { Separator } from "./ui/separator";

export const Header = () => {
  return (
    <header className="flex items-center justify-between px-8 py-4 border-b">
      <p className="font-bold text-2xl hover:cursor-pointer">
        JProjectCommerce
      </p>
      <Input className="max-w-[600px]" placeholder="Search Product" />
      <div className="flex space-x-4 h-5 items-center">
        <div className="flex space-x-1">
          <Button size="icon" variant="ghost">
            <IoCart className="h-6 w-6" />
          </Button>
          <Button size="icon" variant="ghost">
            <IoHeart className="h-6 w-6" />
          </Button>
        </div>

        <Separator orientation="vertical" className="h-full" />

        <div className="flex space-x-2">
          <Button>Sign In</Button>
          <Button variant="outline">Sign Up</Button>
        </div>
      </div>
    </header>
  );
};

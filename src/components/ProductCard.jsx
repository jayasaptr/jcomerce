export const ProductCard = () => {
  return (
    <div className="p-4 border rounded-md md:max-w-96 flex flex-col gap-4">
      <div className="aspect-square w-full overflow-hidden">
        <img
          className="w-full"
          src="https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/1419ed34-7762-420a-9f2a-2e2a65d5aba9/dunk-low-shoes-kKHp1z.png"
          alt="product"
        />
      </div>

      <div>
        <p className="text-base">Sepatu Jordan</p>
        <p className="text-xl font-semibold">Rp. 100.000</p>
        <p className="text-muted-foreground text-sm">In Stock: 10</p>
      </div>
    </div>
  );
};

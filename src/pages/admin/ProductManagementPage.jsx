import { AdminPage } from "@/components/guard/AdminPage";
import { AdminLayout } from "@/components/layouts/AdminLayout";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { axiosInstance } from "@/lib/axios";
import { Trash } from "lucide-react";
import { Edit } from "lucide-react";
import { ChevronRight } from "lucide-react";
import { ChevronLeft } from "lucide-react";
import { useEffect } from "react";
import { useState } from "react";
import { IoAdd } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useSearchParams } from "react-router-dom";

const ProductManagementPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [products, setProducts] = useState([]);
  const [nextPage, setNextpage] = useState(true);
  const [productName, setProductName] = useState("");
  const [selectedProductIds, setSelectedProductIds] = useState([]);

  const handleNextPage = () => {
    searchParams.set("page", Number(searchParams.get("page")) + 1);
    setSearchParams(searchParams);
  };

  const handlePrevPage = () => {
    searchParams.set("page", Number(searchParams.get("page")) - 1);
    setSearchParams(searchParams);
  };

  const fetchProducts = async () => {
    try {
      const response = await axiosInstance.get("/products", {
        params: {
          _per_page: 5,
          _page: Number(searchParams.get("page")),
          name: searchParams.get("search"),
        },
      });
      console.log("🚀 ~ fetchProducts ~ response:", response.data.last);
      setNextpage(Boolean(response.data.next));
      setProducts(response.data.data || []);
      if (Number(searchParams.get("page")) < 1) {
        searchParams.set("page", 1);
        setSearchParams(searchParams);
      }
      if (Number(searchParams.get("page")) > response.data.last) {
        searchParams.set("page", response.data.last);
        setSearchParams(searchParams);
      }
    } catch (error) {
      console.log("🚀 ~ fetchProducts ~ error:", error);
    }
  };

  const searchProducts = async () => {
    if (productName) {
      searchParams.set("search", productName);
      setSearchParams(searchParams);
    } else {
      searchParams.delete("search");
      setSearchParams(searchParams);
    }
  };

  const handleDeleteProduct = async () => {
    const shouldDelete = confirm(
      `Are you sure you want to delete ${selectedProductIds.length} product?`
    );

    if (!shouldDelete) {
      return;
    }

    const deletedPromises = selectedProductIds.map((productId) => {
      return axiosInstance.delete(`/products/${productId}`);
    });

    try {
      await Promise.all(deletedPromises);
      alert("Products deleted successfully");
      searchParams.set("page", 1);
      setSearchParams(searchParams);
      setSelectedProductIds([]);
    } catch (error) {
      console.log("🚀 ~ handleDeleteProduct ~ error:", error);
    }
  };

  const handleOnCheckedProduct = (productId, checked) => {
    if (checked) {
      setSelectedProductIds([...selectedProductIds, productId]);
    } else {
      setSelectedProductIds(
        selectedProductIds.filter((id) => id !== productId)
      );
    }
  };

  useEffect(() => {
    if (searchParams.get("page")) {
      fetchProducts();
    }
  }, [searchParams.get("page"), searchParams.get("search")]);

  useEffect(() => {
    if (!searchParams.get("page")) {
      searchParams.set("page", 1);
      setSearchParams(searchParams);
    }
  }, []);

  return (
    <div>
    <AdminLayout
      title="Products Management"
      description="Managing our products"
      rightSection={
        <div className="flex gap-2">
          {selectedProductIds.length > 0 && (
            <Button onClick={handleDeleteProduct} variant="destructive">
              Delete {selectedProductIds.length} Prodcuts
            </Button>
          )}

          <Link to="/admin/products/create">
            <Button>
              <IoAdd className="h-6 w-6 mr-2" />
              Add Product
            </Button>
          </Link>
        </div>
      }
    >
      <div className="mb-8">
        <Label>Search Product Name</Label>
        <div className="flex gap-4">
          <Input
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            className="max-w-[400px]"
            placeholder="Search product"
          />
          <Button onClick={searchProducts}>Search</Button>
        </div>
      </div>
      <Table className="p-4 border rounded-md">
        <TableHeader>
          <TableRow>
            <TableHead></TableHead>
            <TableHead>ID</TableHead>
            <TableHead>Product Name</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => {
            return (
              <TableRow>
                <TableCell>
                  <Checkbox
                    checked={selectedProductIds.includes(product.id)}
                    onCheckedChange={(checked) =>
                      handleOnCheckedProduct(product.id, checked)
                    }
                  />
                </TableCell>
                <TableCell>{product.id}</TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>
                  Rp.{product.price.toLocaleString("id-ID")}
                </TableCell>
                <TableCell>{product.stock}</TableCell>
                <TableCell>
                  <Link to={"/admin/products/edit/" + product.id}>
                    <Button variant="ghost" size="icon">
                      <Edit className="w-6 h-6" />
                    </Button>
                  </Link>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>

      <Pagination className="mt-8">
        <PaginationContent>
          <PaginationItem>
            <Button
              disabled={searchParams.get("page") == 1}
              variant="ghost"
              onClick={handlePrevPage}
            >
              <ChevronLeft className="w-6 h-6 mr-2" /> Previous
            </Button>
          </PaginationItem>

          <PaginationItem className="mx-8 font-semibold">
            Page {searchParams.get("page")}
          </PaginationItem>

          <PaginationItem>
            <Button
              disabled={!nextPage}
              variant="ghost"
              onClick={handleNextPage}
            >
              Next <ChevronRight className="w-6 h-6 mls-2" />
            </Button>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </AdminLayout>
  </div>
  );
};

export default ProductManagementPage;

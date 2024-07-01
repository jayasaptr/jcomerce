import { AdminLayout } from "@/components/layouts/AdminLayout";
import { axiosInstance } from "@/lib/axios";
import { useNavigate } from "react-router-dom";
import { ProductForm } from "@/components/forms/ProductForm";

const CreateProductPage = () => {
  const navigate = useNavigate();

  const handleCrateProduct = async (values) => {
    try {
      await axiosInstance.post("/products", {
        name: values.name,
        price: values.price,
        stock: values.stock,
        image: values.image,
      });
      alert("Product created successfully");

      navigate("/admin/products");
    } catch (error) {
      console.log("🚀 ~ handleCrateProduct ~ error:", error);
    }
  };

  return (
    <AdminLayout title="Create Products" description="Add new products">
      <ProductForm
        onSubmit={handleCrateProduct}
        cardTitle="Craete a New Product"
      />
    </AdminLayout>
  );
};

export default CreateProductPage;

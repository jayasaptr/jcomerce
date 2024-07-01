import { ProductForm } from "@/components/forms/ProductForm";
import { AdminLayout } from "@/components/layouts/AdminLayout";
import { axiosInstance } from "@/lib/axios";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const EditProductPage = () => {
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    name: "",
    price: 0,
    image: "",
    stock: 0,
    id: "",
  });
  const [productLoading, setProductLoading] = useState(true);
  const params = useParams();

  const fetchProduct = async () => {
    try {
      setProductLoading(true);
      const response = await axiosInstance.get(`/products/${params.productId}`);
      setProduct(response.data);
    } catch (error) {
      console.log("🚀 ~ fetchProduct ~ error", error);
    } finally {
      setProductLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  const handleEditProduct = async (values) => {
    try {
      await axiosInstance.put(`/products/${params.productId}`, {
        name: values.name,
        price: values.price,
        stock: values.stock,
        image: values.image,
      });
      alert("Product updated successfully");
      navigate("/admin/products");
    } catch (error) {
      console.log("🚀 ~ handleEditProduct ~ error", error);
    }
  };

  return (
    <AdminLayout title="Edit Product" description="Editing Product">
      {product.id ? (
        <ProductForm
          onSubmit={handleEditProduct}
          cardTitle={"Editing " + product.name}
          defaultName={product.name}
          defaultPrice={product.price}
          defaultStock={product.stock}
          defaultImage={product.image}
        />
      ) : null}
    </AdminLayout>
  );
};

export default EditProductPage;

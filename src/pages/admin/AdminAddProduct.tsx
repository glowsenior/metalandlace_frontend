
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Form } from "@/components/ui/form";
import { createProduct } from "@/services/productService";

// Custom components
import ProductFormLayout from "@/components/admin/ProductFormLayout";
import ProductBasicDetailsFields from "@/components/admin/ProductBasicDetailsFields";
import ProductStatusFields from "@/components/admin/ProductStatusFields";
import ProductImagesField from "@/components/admin/ProductImagesField";
import ProductFormActions from "@/components/admin/ProductFormActions"; // ADDED IMPORT
import { ProductFormValues } from "@/types/ProductFormValues";

// Form schema for validation
const formSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  price: z.coerce.number().min(0.01, "Price must be greater than 0"),
  stock: z.coerce.number().int().min(0, "Stock must be a non-negative integer"),
  category: z.string().min(1, "Category is required"),
  featured: z.boolean().default(false),
  new: z.boolean().default(false),
  bestseller: z.boolean().default(false),
  images: z.array(z.string()).min(1, "At least one image is required"),
});

const AdminAddProduct = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      stock: 0,
      category: "",
      featured: false,
      new: false,
      bestseller: false,
      images: [],
    },
  });

  const onSubmit = async (values: ProductFormValues) => {
    setIsLoading(true);
    try {
      await createProduct(values);
      toast.success("Product created successfully");
      navigate("/admin/products");
    } catch (error) {
      toast.error("Failed to create product");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ProductFormLayout
      title="Add New Product"
      subtitle="Create a new product listing"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <ProductBasicDetailsFields form={form} />

            <div className="space-y-6">
              <ProductStatusFields form={form} />
              <ProductImagesField form={form} />
            </div>
          </div>

          <ProductFormActions isLoading={isLoading} />
        </form>
      </Form>
    </ProductFormLayout>
  );
};

export default AdminAddProduct;

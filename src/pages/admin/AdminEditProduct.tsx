import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Form } from "@/components/ui/form";
import { getProductById, updateProduct, deleteProduct } from "@/services/productService";
import { ProductFormValues } from "@/types/ProductFormValues";

// Custom components
import ProductFormLayout from "@/components/admin/ProductFormLayout";
import ProductBasicDetailsFields from "@/components/admin/ProductBasicDetailsFields";
import ProductStatusFields from "@/components/admin/ProductStatusFields";
import ProductImagesField from "@/components/admin/ProductImagesField";
import ProductAdditionalDetailsFields from "@/components/admin/ProductAdditionalDetailsFields";
import ProductFormActions from "@/components/admin/ProductFormActions";
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
  images: z.array(z.object({ url: z.string() })).min(1, "At least one image is required"),
  imageFiles: z.array(z.any()).optional(), // Allow File objects
  dimensions: z.string().min(1, "Dimensions are required"),
  weight: z.string().min(1, "Weight is required"),
  care: z.string().min(1, "Care instructions are required"),
  colors: z.array(z.string()).default([]),
  materials: z.array(z.string()).default([]),
});

const AdminEditProduct = () => {
  const { productId } = useParams();
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
      imageFiles: [],
      dimensions: "",
      weight: "",
      care: "",
      colors: [],
      materials: [],
    },
  });
  
  // Load product data when the component mounts
  useEffect(() => {
    const fetchProduct = async () => {
      if (!productId) return;
      try {
        const product = await getProductById(productId);

        if (product) {
          const values: ProductFormValues = {
            name: product.name,
            description: product.description,
            price: product.price,
            stock: product.stock,
            category: product.category,
            featured: product.featured,
            new: product.new,
            bestseller: product.bestseller,
            images: product.images,
            dimensions: product.dimensions || "",
            weight: product.weight || "",
            care: product.care || "",
            colors: product.colors || [],
            materials: product.materials || [],
          };
          form.reset(values);
        } else {
          toast.error("Product not found");
          navigate("/admin/products");
        }
      } catch (error) {
        toast.error("Failed to load product");
        navigate("/admin/products");
      }
    };
    
    fetchProduct();
  }, [productId, form, navigate]);
  
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!productId) return;
    
    setIsLoading(true);
    
    try {
      // Get the imageFiles from the form
      const imageFiles = form.getValues("imageFiles");
      
      // Include imageFiles in the update if they exist
      await updateProduct(productId, {
        ...values,
        imageFiles: imageFiles
      });
      
      toast.success("Product updated successfully");
      navigate("/admin/products");
    } catch (error) {
      toast.error("Failed to update product");
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleDelete = async () => {
    if (!productId) return;
    
    if (confirm("Are you sure you want to delete this product?")) {
      try {
        await deleteProduct(productId);
        toast.success("Product deleted successfully");
        navigate("/admin/products");
      } catch (error) {
        toast.error("Failed to delete product");
      }
    }
  };
  
  return (
    <ProductFormLayout
      title="Edit Product"
      subtitle="Update product information"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <ProductBasicDetailsFields form={form} />
              <ProductAdditionalDetailsFields form={form} />
            </div>
            
            <div className="space-y-6">
              <ProductStatusFields form={form} />
              <ProductImagesField form={form} />
            </div>
          </div>
          
          <ProductFormActions
            isLoading={isLoading}
            showDeleteButton={true}
            onDelete={handleDelete}
          />
        </form>
      </Form>
    </ProductFormLayout>
  );
};

export default AdminEditProduct;


import { products as initialProducts } from '@/data/products';
import { toast } from 'sonner';

// Type definition for a product
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  images: string[];
  featured: boolean;
  new: boolean;
  bestseller: boolean;
}

// Simulating an in-memory database
let products = [...initialProducts];

// Get all products
export const getAllProducts = async (): Promise<Product[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return [...products];
};

// Get a single product by ID
export const getProductById = async (productId: string): Promise<Product | undefined> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  return products.find(p => p.id === productId);
};

// Create a new product
export const createProduct = async (productData: Omit<Product, 'id'>): Promise<Product> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Generate a random ID (in a real app, the backend would handle this)
  const id = Math.random().toString(36).substring(2, 15);
  
  const newProduct = {
    id,
    ...productData,
    // Ensure boolean fields have default values if not provided
    featured: productData.featured ?? false,
    new: productData.new ?? false,
    bestseller: productData.bestseller ?? false
  };
  
  products = [...products, newProduct];
  toast.success('Product created successfully');
  return newProduct;
};

// Update an existing product
export const updateProduct = async (productId: string, productData: Partial<Omit<Product, 'id'>>): Promise<Product> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const existingProductIndex = products.findIndex(p => p.id === productId);
  
  if (existingProductIndex === -1) {
    toast.error('Product not found');
    throw new Error('Product not found');
  }
  
  // Get the existing product to merge with updates
  const existingProduct = products[existingProductIndex];
  
  const updatedProduct = {
    ...existingProduct,
    ...productData,
    id: productId,
    // Ensure boolean fields are preserved from existing data if not provided
    featured: productData.featured ?? existingProduct.featured,
    new: productData.new ?? existingProduct.new,
    bestseller: productData.bestseller ?? existingProduct.bestseller
  };
  
  products = [
    ...products.slice(0, existingProductIndex),
    updatedProduct,
    ...products.slice(existingProductIndex + 1)
  ];
  
  toast.success('Product updated successfully');
  return updatedProduct;
};

// Delete a product
export const deleteProduct = async (productId: string): Promise<boolean> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  const existingProductIndex = products.findIndex(p => p.id === productId);
  
  if (existingProductIndex === -1) {
    toast.error('Product not found');
    throw new Error('Product not found');
  }
  
  products = [
    ...products.slice(0, existingProductIndex),
    ...products.slice(existingProductIndex + 1)
  ];
  
  toast.success('Product deleted successfully');
  return true;
};

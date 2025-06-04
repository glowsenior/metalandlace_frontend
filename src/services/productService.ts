
import { products as initialProducts } from '@/data/products';
import { toast } from 'sonner';
import api from '@/services/api';

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
  dimensions?: string;
  weight?: string;
  colors?: string[];
  materials?: string[];
  care?: string;
}

// Simulating an in-memory database
let products = [...initialProducts];

// In-memory cache for products
let productsCache: Product[] | null = null;

// Get all products
export const getAllProducts = async (): Promise<Product[]> => {
  // Simulate API delay
    try {
    // Try to fetch from API
    const response = await api.get<Product[]>('/products');
    productsCache = response.data;
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    
    // If API fails, use fallback data
    if (!productsCache) {
      toast.error('Could not connect to the server. Showing cached products.');
      productsCache = [...initialProducts];
    }
    
    return productsCache;
  }
};

export const getAllProductsAdmin = async (): Promise<Product[]> => {
  // Simulate API delay
  try {
    // Try to fetch from API
    const response:any = await api.get<Product[]>('/products/all');
    productsCache = response.data.data.products;
    return response.data.data.products;
  } catch (error) {
    console.error('Error fetching products:', error);
    
    // If API fails, use fallback data
    if (!productsCache) {
      toast.error('Could not connect to the server. Showing cached products.');
      productsCache = [...initialProducts];
    }
    
    return productsCache;
  }
};

// Get a single product by ID
export const getProductById = async (productId: string): Promise<Product | undefined> => {
  // Simulate API delay
  try {
    // Try to fetch from API
    const response:any = await api.get<Product[]>(`/products/${productId}`);
    return response.data.data.product;
  } catch (error) {
    console.error('Error fetching products:', error);
  }
};

// Create a new product
export const createProduct = async (productData: Omit<Product, 'id'>): Promise<Product> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 400));
  const response : any = await api.post<Product[]>(`/products`, productData);
  
  // Generate a random ID (in a real app, the backend would handle this)
  // const id = Math.random().toString(36).substring(2, 15);
  
  // const newProduct = {
  //   id,
  //   ...productData,
  //   // Ensure boolean fields have default values if not provided
  //   featured: productData.featured ?? false,
  //   new: productData.new ?? false,
  //   bestseller: productData.bestseller ?? false
  // };
  
  // products = [...products, newProduct];
  toast.success('Product created successfully');
  return response;
};

// Update an existing product
export const updateProduct = async (productId: string, productData: Partial<Omit<Product, 'id'>>): Promise<Product> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 400));
  const response : any = await api.patch<Product[]>(`/products/${productId}`, productData);
  
  // const existingProductIndex = products.findIndex(p => p.id === productId);
  
  // if (existingProductIndex === -1) {
  //   toast.error('Product not found');
  //   throw new Error('Product not found');
  // }
  
  // // Get the existing product to merge with updates
  // const existingProduct = products[existingProductIndex];
  
  // const updatedProduct = {
  //   ...existingProduct,
  //   ...productData,
  //   id: productId,
  //   // Ensure boolean fields are preserved from existing data if not provided
  //   featured: productData.featured ?? existingProduct.featured,
  //   new: productData.new ?? existingProduct.new,
  //   bestseller: productData.bestseller ?? existingProduct.bestseller
  // };
  
  // products = [
  //   ...products.slice(0, existingProductIndex),
  //   updatedProduct,
  //   ...products.slice(existingProductIndex + 1)
  // ];
  
  toast.success('Product updated successfully');
  return response;
};

// Delete a product
export const deleteProduct = async (productId: string): Promise<boolean> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 400));
  const response : any = await api.delete<Product[]>(`/products/${productId}`);
  
  // const existingProductIndex = products.findIndex(p => p.id === productId);
  
  // if (existingProductIndex === -1) {
  //   toast.error('Product not found');
  //   throw new Error('Product not found');
  // }
  
  // products = [
  //   ...products.slice(0, existingProductIndex),
  //   ...products.slice(existingProductIndex + 1)
  // ];
  
  toast.success('Product deleted successfully');
  return true;
};

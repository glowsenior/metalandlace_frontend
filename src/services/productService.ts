
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
  images: { url: string }[];
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
export const createProduct = async (productData: Omit<Product, 'id'> & { imageFiles?: File[] }): Promise<Product> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 400));
  
  // If we have image files, we need to use FormData instead of JSON
  if (productData.imageFiles && productData.imageFiles.length > 0) {
    const formData = new FormData();
    
    // Add all product data except imageFiles to formData
    Object.entries(productData).forEach(([key, value]) => {
      if (key !== 'imageFiles') {
        if (typeof value === 'object') {
          formData.append(key, JSON.stringify(value));
        } else {
          formData.append(key, String(value));
        }
      }
    });
    
    // Add each image file to formData
    productData.imageFiles.forEach((file, index) => {
      formData.append(`productImages`, file);
    });
    
    // Make API request with FormData
    const response: any = await api.post('/products', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        // The Authorization header will be added by the interceptor
      },
    });
    
    toast.success('Product created successfully');
    return response;
  } else {
    // If no image files, proceed with regular JSON request
    const response: any = await api.post<Product[]>(`/products`, productData);
    toast.success('Product created successfully');
    return response;
  }
};

// Update an existing product
export const updateProduct = async (
  productId: string, 
  productData: Partial<Omit<Product, 'id'>> & { imageFiles?: File[] }
): Promise<Product> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 400));
  
  // If we have image files, we need to use FormData instead of JSON
  if (productData.imageFiles && productData.imageFiles.length > 0) {
    const formData = new FormData();
    
    // Add all product data except imageFiles to formData
    Object.entries(productData).forEach(([key, value]) => {
      if (key !== 'imageFiles') {
        if (typeof value === 'object' && value !== null && !(value instanceof File)) {
          formData.append(key, JSON.stringify(value));
        } else if (value !== null && value !== undefined) {
          formData.append(key, String(value));
        }
      }
    });
    console.log(productData, '------ imageFiles');
    // Add each image file to formData
    productData.imageFiles.forEach((file) => {
      formData.append(`productImages`, file);
    });
    
    // Make API request with FormData
    const response: any = await api.patch(`/products/${productId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        // The Authorization header will be added by the interceptor
      },
    });
    
    toast.success('Product updated successfully');
    return response;
  } else {
    // If no image files, proceed with regular JSON request
    const response: any = await api.patch<Product[]>(`/products/${productId}`, productData);
    toast.success('Product updated successfully');
    return response;
  }
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

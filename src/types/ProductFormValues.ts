
export type ProductFormValues = {
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  featured: boolean;
  new: boolean;
  bestseller: boolean;
  images: string[];
  imageFiles?: File[];
  dimensions: string;
  weight: string;
  care: string;
  colors?: string[];
  materials?: string[];
};

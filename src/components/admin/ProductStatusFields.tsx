import React from "react";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { UseFormReturn } from "react-hook-form";
import { ProductFormValues } from "@/types/ProductFormValues";

type FormValues = {
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  featured: boolean;
  new: boolean;
  bestseller: boolean;
  images: string[];
};

type ProductStatusFieldsProps = {
  form: UseFormReturn<ProductFormValues>;
};

const ProductStatusFields = ({ form }: ProductStatusFieldsProps) => {
  return (
    <div className="border bg-card rounded-lg p-4 space-y-4">
      <h3 className="text-base font-semibold">Product Status</h3>
      <Separator className="my-2" />

      <FormField
        control={form.control}
        name="featured"
        render={({ field }) => (
          <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md p-2">
            <FormControl>
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
            <div className="space-y-1 leading-none">
              <FormLabel>Featured Product</FormLabel>
              <FormDescription>
                Display this product in featured sections
              </FormDescription>
            </div>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="new"
        render={({ field }) => (
          <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md p-2">
            <FormControl>
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
            <div className="space-y-1 leading-none">
              <FormLabel>New Arrival</FormLabel>
              <FormDescription>
                Mark this product as newly added
              </FormDescription>
            </div>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="bestseller"
        render={({ field }) => (
          <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md p-2">
            <FormControl>
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
            <div className="space-y-1 leading-none">
              <FormLabel>Bestseller</FormLabel>
              <FormDescription>
                Mark this product as a bestseller
              </FormDescription>
            </div>
          </FormItem>
        )}
      />
    </div>
  );
};

export default ProductStatusFields;

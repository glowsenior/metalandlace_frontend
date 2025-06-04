import React from "react";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { QuillEditor } from "@/components/ui/quill-editor";
import { TagInput } from "@/components/ui/tag-input";
import { UseFormReturn } from "react-hook-form";
import { ProductFormValues } from "@/types/ProductFormValues";

type ProductAdditionalDetailsFieldsProps = {
  form: UseFormReturn<ProductFormValues>;
};

const ProductAdditionalDetailsFields = ({ form }: ProductAdditionalDetailsFieldsProps) => {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">Additional Details</h3>
      
      <FormField
        control={form.control}
        name="dimensions"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Dimensions</FormLabel>
            <FormControl>
              <Input placeholder="e.g., 10 x 5 x 3 inches" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="weight"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Weight</FormLabel>
            <FormControl>
              <Input placeholder="e.g., 2.5 lbs" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="care"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Care Instructions</FormLabel>
            <FormControl>
              <QuillEditor
                placeholder="Enter care instructions..."
                value={field.value}
                onChange={field.onChange}
                height={200}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="colors"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Colors</FormLabel>
            <FormControl>
              <TagInput
                value={field.value || []}
                onChange={field.onChange}
                placeholder="Add a color (press Enter)"
              />
            </FormControl>
            <FormDescription>
              Press Enter or comma to add a color. Click X to remove.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="materials"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Materials</FormLabel>
            <FormControl>
              <TagInput
                value={field.value || []}
                onChange={field.onChange}
                placeholder="Add a material (press Enter)"
              />
            </FormControl>
            <FormDescription>
              Press Enter or comma to add a material. Click X to remove.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default ProductAdditionalDetailsFields;
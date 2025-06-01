import React, { useState } from "react";
import { Trash2 } from "lucide-react";
import {
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { UseFormReturn } from "react-hook-form";
import { ProductFormValues } from "@/types/ProductFormValues";

type ProductImagesFieldProps = {
  form: UseFormReturn<ProductFormValues>;
};

const ProductImagesField = ({ form }: ProductImagesFieldProps) => {
  const [imageInput, setImageInput] = useState("");

  const handleAddImage = () => {
    if (!imageInput.trim()) return;

    const currentImages = form.getValues("images") || [];
    form.setValue("images", [...currentImages, imageInput]);
    setImageInput("");
  };

  const handleRemoveImage = (index: number) => {
    const currentImages = form.getValues("images");
    form.setValue("images", currentImages.filter((_, i) => i !== index));
  };

  return (
    <div className="border bg-card rounded-lg p-4 space-y-4">
      <h3 className="text-base font-semibold">Product Images</h3>
      <Separator className="my-2" />

      <div className="grid grid-cols-1 gap-3">
        <div className="flex gap-2">
          <Input
            value={imageInput}
            onChange={(e) => setImageInput(e.target.value)}
            placeholder="Enter image URL..."
          />
          <Button type="button" onClick={handleAddImage}>
            Add
          </Button>
        </div>

        <FormField
          control={form.control}
          name="images"
          render={() => (
            <FormItem>
              <FormMessage />
              <div className="grid grid-cols-2 gap-2 mt-2">
                {form.watch("images")?.map((image, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={image}
                      alt={`Product image ${index + 1}`}
                      className="aspect-square object-cover rounded-md border"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => handleRemoveImage(index)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

export default ProductImagesField;

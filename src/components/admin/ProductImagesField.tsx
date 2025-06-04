import React, { useState, useRef } from "react";
import { Trash2, Upload } from "lucide-react";
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
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewImages, setPreviewImages] = useState<{ file: File; preview: string }[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    
    const files = Array.from(e.target.files);
    const newPreviewImages = files.map(file => ({
      file,
      preview: URL.createObjectURL(file)
    }));
    
    // Update preview images
    setPreviewImages(prev => [...prev, ...newPreviewImages]);
    
    // Update form values
    const currentImageFiles = form.getValues("imageFiles") || [];
    form.setValue("imageFiles", [...currentImageFiles, ...files]);
    
    // Create temporary URLs for display
    const currentImages = form.getValues("images") || [];
    const newImageUrls = newPreviewImages.map(img => {return {url:img.preview};});
    form.setValue("images", [...currentImages, ...newImageUrls]);
    
    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleRemoveImage = (index: number) => {
    // Remove from images array
    const currentImages = form.getValues("images");
    form.setValue("images", currentImages.filter((_, i) => i !== index));
    
    // Remove from preview images and revoke object URL to prevent memory leaks
    if (index < previewImages.length) {
      URL.revokeObjectURL(previewImages[index].preview);
      setPreviewImages(prev => prev.filter((_, i) => i !== index));
      
      // Remove from imageFiles if it exists
      const currentImageFiles = form.getValues("imageFiles") || [];
      if (currentImageFiles.length > index) {
        form.setValue("imageFiles", currentImageFiles.filter((_, i) => i !== index));
      }
    }
  };

  return (
    <div className="border bg-card rounded-lg p-4 space-y-4">
      <h3 className="text-base font-semibold">Product Images</h3>
      <Separator className="my-2" />

      <div className="grid grid-cols-1 gap-3">
        <div className="flex flex-col gap-2">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            multiple
            className="hidden"
          />
          <Button 
            type="button" 
            onClick={() => fileInputRef.current?.click()}
            className="w-full flex items-center justify-center gap-2"
          >
            <Upload className="h-4 w-4" />
            Upload Images
          </Button>
          <p className="text-xs text-muted-foreground text-center">
            Click to select one or more image files
          </p>
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
                      src={image.url}
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


import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

type ProductFormActionsProps = {
  isLoading?: boolean;
  showDeleteButton?: boolean;
  onDelete?: () => void;
};

const ProductFormActions = ({
  isLoading,
  showDeleteButton = false,
  onDelete,
}: ProductFormActionsProps) => {
  const navigate = useNavigate();

  return (
    <div className="flex gap-4 justify-between">
      {showDeleteButton && (
        <Button type="button" variant="destructive" onClick={onDelete}>
          Delete Product
        </Button>
      )}

      <div className="space-x-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => navigate("/admin/products")}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </div>
  );
};

export default ProductFormActions;

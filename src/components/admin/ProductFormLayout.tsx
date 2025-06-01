
import React from "react";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

type ProductFormLayoutProps = {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  isLoading?: boolean;
  onSubmit?: () => void;
  onDelete?: () => void;
  showDeleteButton?: boolean;
};

const ProductFormLayout = ({
  title,
  subtitle,
  children,
  isLoading,
  onSubmit,
  onDelete,
  showDeleteButton = false,
}: ProductFormLayoutProps) => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen pt-24 pb-20"
    >
      <div className="page-container">
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-6">
            <Button variant="ghost" size="icon" onClick={() => navigate("/admin/products")}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-3xl md:text-4xl font-serif font-bold text-metal">
                {title}
              </h1>
              <p className="text-metal/70">{subtitle}</p>
            </div>
          </div>
          {children}
        </div>
      </div>
    </motion.div>
  );
};

export default ProductFormLayout;

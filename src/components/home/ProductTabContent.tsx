
import ProductCard from "@/components/ProductCard";
import { Product } from "@/data/products";

interface ProductTabContentProps {
  products: Product[];
}

const ProductTabContent = ({ products }: ProductTabContentProps) => {
  return (
    <div className="flex justify-center">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product, index) => (
          <ProductCard key={product.id} product={product} index={index} />
        ))}
      </div>
    </div>
  );
};

export default ProductTabContent;

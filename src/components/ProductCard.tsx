import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Product } from "@/data/products";
import { useCart } from "@/hooks/useCart";
import { ShoppingCart } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
interface ProductCardProps {
  product: Product;
  index?: number;
}
const ProductCard = ({
  product,
  index = 0
}: ProductCardProps) => {
  const {
    addItem
  } = useCart();
  const {
    toast
  } = useToast();
  const [isHovered, setIsHovered] = useState(false);
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0]
    });
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
      duration: 2000
    });
  };
  return <motion.div initial={{
    opacity: 0,
    y: 20
  }} animate={{
    opacity: 1,
    y: 0
  }} transition={{
    duration: 0.5,
    delay: index * 0.1,
    ease: "easeOut"
  }}>
      <Link to={`/products/${product.id}`} className="block" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
        <div className="ceramic-card h-full flex flex-col">
          <div className="relative overflow-hidden aspect-square">
            <motion.img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" animate={{
            scale: isHovered ? 1.05 : 1
          }} transition={{
            duration: 0.4,
            ease: "easeOut"
          }} />
            {(product.new || product.bestseller) && <div className="absolute top-4 left-4 flex flex-col gap-2">
                {product.new && <span className="bg-amethyst text-white text-xs font-medium px-2 py-1 rounded">
                    NEW
                  </span>}
                {product.bestseller && <span className="bg-bronze text-white text-xs font-medium px-2 py-1 rounded">
                    BESTSELLER
                  </span>}
              </div>}
            <motion.div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0" animate={{
            opacity: isHovered ? 1 : 0
          }} transition={{
            duration: 0.3
          }}>
              <Button onClick={handleAddToCart} className="bg-white text-metal hover:bg-lace">
                <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
              </Button>
            </motion.div>
          </div>
          <div className="p-4 flex flex-col gap-1 flex-grow">
            <h3 className="font-serif text-lg font-medium text-metal line-clamp-1">{product.name}</h3>
            <p className="text-bronze font-medium">${product.price.toFixed(2)}</p>
            <div className="mt-2 text-sm text-metal/70 line-clamp-2">
              {product.description.substring(0, 100)}...
            </div>
          </div>
        </div>
      </Link>
    </motion.div>;
};
export default ProductCard;
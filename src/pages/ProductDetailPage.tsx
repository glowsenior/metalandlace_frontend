
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, MinusCircle, PlusCircle, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Product } from "@/data/products";
import { useCart } from "@/hooks/useCart";
import { useToast } from "@/hooks/use-toast";
import ProductCard from "@/components/ProductCard";

import { getProductById } from "@/services/productService";

const ProductDetailPage = () => {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const { addItem } = useCart();
  const { toast } = useToast();
  
  useEffect(() => {
    const getDatas = async () => {
      console.log(productId, 'sdfasdfasdf')
      if (productId) {
        // const foundProduct = getProductById(productId);
        const resData:any = await getProductById(productId);
        const foundProduct = resData
        setProduct(foundProduct || null);
        
        if (foundProduct) {
          // Reset states when product changes
          setQuantity(1);
          setCurrentImageIndex(0);
          
          // Get related products (same category)
          import("@/data/products").then(({ products }) => {
            const related = products
              .filter(p => p.category === foundProduct.category && p.id !== foundProduct.id)
              .slice(0, 3);
            setRelatedProducts(related);
          });
        }
      }
      // await new Promise(resolve => setTimeout(resolve, 400));
      // console.log(product, '------------sss')
    }
    
    getDatas();
    
    
  }, [productId]);
  
  const handlePrevImage = () => {
    if (!product) return;
    setCurrentImageIndex(prev => 
      prev === 0 ? product.images.length - 1 : prev - 1
    );
  };
  
  const handleNextImage = () => {
    if (!product) return;
    setCurrentImageIndex(prev => 
      prev === product.images.length - 1 ? 0 : prev + 1
    );
  };
  
  const handleAddToCart = () => {
    if (!product) return;
    
    // Add to cart multiple times based on quantity
    for (let i = 0; i < quantity; i++) {
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images[0].url,
      });
    }
    
    toast({
      title: "Added to cart",
      description: `${quantity} ${quantity === 1 ? 'item' : 'items'} added to your cart.`,
      duration: 2000,
    });
  };
  
  if (!product) {
    return (
      <div className="page-container py-24 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-serif font-bold text-metal mb-4">Product Not Found</h1>
          <p className="text-metal/70 mb-8">The product you're looking for doesn't exist or has been removed.</p>
          <Button asChild>
            <Link to="/products">Browse All Products</Link>
          </Button>
        </div>
      </div>
    );
  }
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen pt-24 pb-20"
    >
      <div className="page-container">
        {/* Breadcrumbs */}
        <div className="mb-8 flex items-center text-sm text-metal/70">
          <Link to="/" className="hover:text-metal transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <Link to="/products" className="hover:text-metal transition-colors">Products</Link>
          <span className="mx-2">/</span>
          <Link 
            to={`/products?category=${product.category}`}
            className="hover:text-metal transition-colors capitalize"
          >
            {product.category}
          </Link>
          <span className="mx-2">/</span>
          <span className="text-metal">{product.name}</span>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="relative">
            <div className="aspect-square overflow-hidden rounded-lg bg-white">
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentImageIndex}
                  src={product.images[currentImageIndex].url}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </AnimatePresence>
            </div>
            
            {/* Image Navigation */}
            {product.images.length > 1 && (
              <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between px-4">
                <Button
                  variant="secondary"
                  size="icon"
                  className="h-10 w-10 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white"
                  onClick={handlePrevImage}
                >
                  <ChevronLeft className="h-5 w-5" />
                </Button>
                <Button
                  variant="secondary"
                  size="icon"
                  className="h-10 w-10 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white"
                  onClick={handleNextImage}
                >
                  <ChevronRight className="h-5 w-5" />
                </Button>
              </div>
            )}
            
            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className="flex justify-center mt-4 gap-2">
                {product.images.map((img, index) => (
                  <button
                    key={index}
                    className={`h-16 w-16 rounded-md overflow-hidden ${
                      currentImageIndex === index ? "ring-2 ring-amethyst" : "opacity-60"
                    }`}
                    onClick={() => setCurrentImageIndex(index)}
                  >
                    <div
                      className="h-full w-full object-cover"
                      style={{ backgroundImage: `url(${img.url})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
          
          {/* Product Info */}
          <div>
            <div className="flex flex-wrap gap-2 mb-3">
              {product.new && (
                <Badge className="bg-amethyst hover:bg-amethyst/90">New</Badge>
              )}
              {product.bestseller && (
                <Badge variant="outline" className="border-bronze text-bronze">Bestseller</Badge>
              )}
            </div>
            
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-metal mb-3">
              {product.name}
            </h1>
            
            <div className="text-2xl font-medium text-bronze mb-6">
              ${product.price.toFixed(2)}
            </div>
            
            <p className="text-metal/80 mb-8" dangerouslySetInnerHTML={{ __html: product.description }} />
            
            <Separator className="my-6" />
            
            {/* Product attributes */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {product.dimensions && (
                <div>
                  <h3 className="text-sm text-metal/60 font-medium">Dimensions</h3>
                  <p className="text-metal">{product.dimensions}</p>
                </div>
              )}
              
              {product.weight && (
                <div>
                  <h3 className="text-sm text-metal/60 font-medium">Weight</h3>
                  <p className="text-metal">{product.weight}</p>
                </div>
              )}
              
              {product.materials && (
                <div>
                  <h3 className="text-sm text-metal/60 font-medium">Materials</h3>
                  <p className="text-metal">{product.materials.join(", ")}</p>
                </div>
              )}

              
              <div>
                <h3 className="text-sm text-metal/60 font-medium">Availability</h3>
                <p className={`${product.stock > 0 ? "text-green-600" : "text-red-500"}`}>
                  {product.stock > 0 
                    ? `In Stock (${product.stock} available)` 
                    : "Out of Stock"}
                </p>
              </div>
            </div>
            
            {/* Quantity selector */}
            <div className="flex items-center mb-8">
              <span className="mr-4 text-metal font-medium">Quantity:</span>
              <div className="flex items-center">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                  disabled={product.stock <= 0}
                >
                  <MinusCircle className="h-5 w-5" />
                </Button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setQuantity(prev => Math.min(product.stock, prev + 1))}
                  disabled={product.stock <= 0 || quantity >= product.stock}
                >
                  <PlusCircle className="h-5 w-5" />
                </Button>
              </div>
            </div>
            
            {/* Add to cart button */}
            <div className="flex items-center gap-4">
              <Button
                className="bg-metal text-lace hover:bg-metal/90 px-8 py-6"
                size="lg"
                onClick={handleAddToCart}
                disabled={product.stock <= 0}
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                Add to Cart
              </Button>
            </div>
          </div>
        </div>
        
        {/* Product details tabs */}
        <div className="mt-16">
          <Tabs defaultValue="details" className="w-full">
            <TabsList className="w-full justify-start border-b">
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="care">Care & Maintenance</TabsTrigger>
              <TabsTrigger value="shipping">Shipping & Returns</TabsTrigger>
            </TabsList>
            
            <TabsContent value="details" className="mt-6">
              <div className="prose max-w-none text-metal/80">
                <p className="mb-4" dangerouslySetInnerHTML={{ __html: product.description }} />
                <h3 className="text-lg font-medium text-metal mb-2">Features</h3>
                <ul className="list-disc pl-6 mb-4 space-y-1">
                  <li>Handcrafted by skilled artisans</li>
                  <li>Made from {product.materials?.join(", ")}</li>
                  <li>Dimensions: {product.dimensions}</li>
                  {product.colors && <li>Available in {product.colors.join(", ")}</li>}
                  <li>Unique piece with slight variations that make each one special</li>
                </ul>
              </div>
            </TabsContent>
            
            <TabsContent value="care" className="mt-6">
              <div className="prose max-w-none text-metal/80">
                <h3 className="text-lg font-medium text-metal mb-2">Care Instructions</h3>
                <p className="mb-4" dangerouslySetInnerHTML={{ __html: product.care || "Treat your ceramic piece with care to ensure it lasts for years to come." }} />
              </div>
            </TabsContent>
            
            <TabsContent value="shipping" className="mt-6">
              <div className="prose max-w-none text-metal/80">
                <h3 className="text-lg font-medium text-metal mb-2">Shipping Information</h3>
                <p className="mb-4">
                  We take great care in packaging all our ceramic pieces to ensure they reach you safely.
                </p>
                <ul className="list-disc pl-6 mb-6 space-y-1">
                  <li>Free shipping on orders over $100</li>
                  <li>Standard shipping: 5-7 business days</li>
                  <li>Express shipping: 2-3 business days (additional fee)</li>
                  <li>International shipping available to select countries</li>
                </ul>
                
                <h3 className="text-lg font-medium text-metal mb-2">Return Policy</h3>
                <p className="mb-4">
                  We want you to be completely satisfied with your purchase.
                </p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Returns accepted within 30 days of delivery</li>
                  <li>Item must be unused and in original packaging</li>
                  <li>Damaged items should be reported within 48 hours of receipt</li>
                  <li>Return shipping fees are the responsibility of the customer unless item is damaged or defective</li>
                </ul>
              </div>
            </TabsContent>
          </Tabs>
        </div>
        
        {/* Related products */}
        {relatedProducts.length > 0 && (
          <div className="mt-20">
            <h2 className="text-2xl font-serif font-bold text-metal mb-8">You May Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedProducts.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ProductDetailPage;

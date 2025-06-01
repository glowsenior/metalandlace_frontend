
import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Trash2, MinusCircle, PlusCircle, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/hooks/useCart";

const CartPage = () => {
  const { items, updateQuantity, removeItem, totalItems, totalPrice } = useCart();
  const [isUpdating, setIsUpdating] = useState(false);
  
  const handleQuantityChange = (id: string, newQuantity: number) => {
    setIsUpdating(true);
    updateQuantity(id, newQuantity);
    setTimeout(() => setIsUpdating(false), 300);
  };
  
  const handleRemove = (id: string) => {
    setIsUpdating(true);
    removeItem(id);
    setTimeout(() => setIsUpdating(false), 300);
  };
  
  // Calculate shipping (free over $100)
  const shipping = totalPrice >= 100 ? 0 : 10;
  const orderTotal = totalPrice + shipping;
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen pt-24 pb-20"
    >
      <div className="page-container">
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-metal mb-2">
          Your Cart
        </h1>
        <p className="text-metal/70 mb-8">
          {totalItems === 0 
            ? "Your cart is empty." 
            : `You have ${totalItems} ${totalItems === 1 ? 'item' : 'items'} in your cart.`}
        </p>
        
        {totalItems === 0 ? (
          <div className="text-center py-16">
            <div className="mx-auto w-24 h-24 rounded-full bg-fog/50 flex items-center justify-center mb-6">
              <ShoppingBag className="w-12 h-12 text-metal/40" />
            </div>
            <h2 className="text-2xl font-serif font-medium text-metal mb-4">Your cart is empty</h2>
            <p className="text-metal/70 mb-8">
              Explore our collection and discover unique ceramic pieces.
            </p>
            <Button asChild size="lg" className="bg-metal text-lace hover:bg-metal/90">
              <Link to="/products">Continue Shopping</Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart items */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="p-6 flex justify-between text-metal/70 font-medium border-b">
                  <span className="w-1/2">Product</span>
                  <span className="w-1/6 text-center">Price</span>
                  <span className="w-1/6 text-center">Quantity</span>
                  <span className="w-1/6 text-center">Total</span>
                </div>
                
                <motion.div
                  initial={{ opacity: 1 }}
                  animate={{ opacity: isUpdating ? 0.7 : 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {items.map(item => (
                    <div key={item.id} className="p-6 border-b last:border-b-0">
                      <div className="flex items-center">
                        {/* Product info */}
                        <div className="w-1/2 flex items-center">
                          <div className="w-20 h-20 bg-white rounded-md overflow-hidden mr-4">
                            <img 
                              src={item.image} 
                              alt={item.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <Link 
                              to={`/products/${item.id}`}
                              className="font-medium text-metal hover:text-amethyst transition-colors"
                            >
                              {item.name}
                            </Link>
                          </div>
                        </div>
                        
                        {/* Price */}
                        <div className="w-1/6 text-center text-metal">
                          ${item.price.toFixed(2)}
                        </div>
                        
                        {/* Quantity */}
                        <div className="w-1/6 flex items-center justify-center">
                          <button
                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                            className="text-metal/70 hover:text-metal transition-colors"
                          >
                            <MinusCircle className="h-4 w-4" />
                          </button>
                          <span className="mx-3 font-medium text-metal">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                            className="text-metal/70 hover:text-metal transition-colors"
                          >
                            <PlusCircle className="h-4 w-4" />
                          </button>
                        </div>
                        
                        {/* Total */}
                        <div className="w-1/6 text-center font-medium text-metal flex items-center justify-between">
                          <span className="flex-grow text-center">
                            ${(item.price * item.quantity).toFixed(2)}
                          </span>
                          <button
                            onClick={() => handleRemove(item.id)}
                            className="text-metal/50 hover:text-red-500 transition-colors ml-4"
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </motion.div>
                
                <div className="p-6 flex justify-between">
                  <Link
                    to="/products"
                    className="text-metal font-medium hover:text-amethyst transition-colors"
                  >
                    Continue Shopping
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Order summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-serif font-bold text-metal mb-6">Order Summary</h2>
                
                <div className="space-y-4">
                  <div className="flex justify-between text-metal">
                    <span>Subtotal</span>
                    <span className="font-medium">${totalPrice.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between text-metal">
                    <span>Shipping</span>
                    <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex justify-between text-lg font-medium text-metal pt-2">
                    <span>Total</span>
                    <span>${orderTotal.toFixed(2)}</span>
                  </div>
                </div>
                
                <div className="mt-8">
                  <Button 
                    asChild 
                    size="lg" 
                    className="w-full bg-metal text-lace hover:bg-metal/90 py-6"
                  >
                    <Link to="/checkout">Proceed to Checkout</Link>
                  </Button>
                  
                  <p className="text-center text-sm text-metal/60 mt-4">
                    Free shipping on orders over $100
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default CartPage;

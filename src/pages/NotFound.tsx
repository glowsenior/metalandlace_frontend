
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="min-h-screen flex flex-col items-center justify-center bg-lace/30 pt-16 px-4"
    >
      <div className="text-center max-w-md">
        <motion.h1 
          className="text-8xl font-serif font-bold text-metal mb-6"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          404
        </motion.h1>
        
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="text-2xl font-serif font-medium text-metal mb-4">
            Page Not Found
          </h2>
          
          <p className="text-metal/70 mb-8">
            The page you're looking for doesn't exist or has been moved. 
            Let's get you back to exploring our ceramic collection.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild className="bg-metal text-lace hover:bg-metal/90">
              <Link to="/">Return to Home</Link>
            </Button>
            
            <Button asChild variant="outline">
              <Link to="/products">Browse Products</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default NotFound;


import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section className="relative h-[80vh] flex items-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-metal/70 to-transparent z-10" />
        <motion.img
          src="https://images.unsplash.com/photo-1739373284885-2434cc777001?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Ceramic Art"
          className="w-full h-full object-cover"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 10, ease: "easeOut" }}
        />
      </div>
      
      <div className="page-container relative z-20">
        <motion.div
          className="max-w-2xl text-left"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-lace mb-6">
            Magical Ceramics for Everyday Wonder
          </h1>
          <p className="text-lg text-lace/90 mb-8">
            Discover our collection of handcrafted ceramic pieces that blend artistry with functionality, 
            bringing a touch of enchantment to your everyday life.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button asChild size="lg" className="bg-lace text-metal hover:bg-lace/90">
              <Link to="/products">Shop Collection</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-lace text-lace bg-lace/10 hover:bg-lace/20">
              <Link to="/about">Our Story</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;


import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const StorySection = () => {
  return (
    <section className="py-20 bg-plum/10">
      <div className="page-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            className="order-2 lg:order-1"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-metal mb-6">
              Crafted with Love & Magic
            </h2>
            <p className="text-metal/80 mb-6">
              At CeramicMagic, we believe that everyday objects can be extraordinary. 
              Our artisans combine ancient techniques with innovative designs to create 
              pieces that bring wonder to your home.
            </p>
            <p className="text-metal/80 mb-8">
              Each piece tells a story — of tradition, of craftsmanship, of the earth 
              itself. From our hands to yours, we create ceramic art that transforms 
              spaces and inspires moments of joy.
            </p>
            <Button asChild className="bg-plum text-white hover:bg-plum/90">
              <Link to="/about">Learn More About Us</Link>
            </Button>
          </motion.div>
          
          <motion.div 
            className="order-1 lg:order-2 relative"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="aspect-[4/5] overflow-hidden rounded-lg">
              <img 
                src="https://metalandlacecrafts.com/wp-content/uploads/2025/01/ghost1-scaled.jpg" 
                alt="Ceramic Artisan at Work" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 w-2/3 h-24 bg-amethyst/20 rounded-lg -z-10" />
            <div className="absolute -top-6 -left-6 w-2/3 h-24 bg-lace/70 rounded-lg -z-10" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default StorySection;

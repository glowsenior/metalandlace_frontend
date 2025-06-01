
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const NewsletterSection = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-plum to-mauve text-white">
      <div className="page-container">
        <div className="max-w-2xl mx-auto text-center">
          <motion.h2
            className="text-3xl md:text-4xl font-serif font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Join Our Creative Community
          </motion.h2>
          <motion.p
            className="text-white/80 mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Subscribe to our newsletter for ceramic inspiration, new collection 
            announcements, and exclusive offers.
          </motion.p>
          
          <motion.form
            className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            onSubmit={(e) => e.preventDefault()}
          >
            <input 
              type="email" 
              placeholder="Your email address" 
              className="flex-grow px-4 py-3 rounded-md focus:outline-none text-metal"
              required
            />
            <Button className="bg-lace text-plum hover:bg-lace/90 whitespace-nowrap">
              Subscribe
            </Button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;

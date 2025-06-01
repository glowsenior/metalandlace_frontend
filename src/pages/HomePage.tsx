
import { motion } from "framer-motion";
import HeroSection from "@/components/home/HeroSection";
import FeaturedCategories from "@/components/home/FeaturedCategories";
import ProductCollection from "@/components/home/ProductCollection";
import StorySection from "@/components/home/StorySection";
import NewsletterSection from "@/components/home/NewsletterSection";

const HomePage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="pt-16"
    >
      <HeroSection />
      <FeaturedCategories />
      <ProductCollection />
      <StorySection />
      <NewsletterSection />
    </motion.div>
  );
};

export default HomePage;

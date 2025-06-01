
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

interface CategoryCardProps {
  category: {
    name: string;
    image: string;
    link: string;
  };
  index: number;
}

const CategoryCard = ({ category, index }: CategoryCardProps) => {
  return (
    <motion.div
      key={category.name}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="ceramic-card overflow-hidden w-full max-w-xs"
    >
      <Link to={category.link} className="block relative group">
        <div className="aspect-square overflow-hidden">
          <motion.img
            src={category.image}
            alt={category.name}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.4 }}
          />
        </div>
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-t from-metal/70 to-transparent">
          <motion.span 
            className="font-serif text-xl font-medium text-white"
            whileHover={{ scale: 1.05 }}
          >
            {category.name}
          </motion.span>
        </div>
      </Link>
    </motion.div>
  );
};

export default CategoryCard;

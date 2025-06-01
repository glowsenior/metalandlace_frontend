
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Instagram, Facebook, Twitter } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-metal text-lace pt-12 pb-6">
      <div className="page-container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center mb-4">
              {/* <div className="h-8 w-8 rounded-full bg-gradient-to-br from-plum to-amethyst mr-2" /> */}
              <img src="/mark.png" alt="Logo" className="h-10 w-10 rounded-full" />
              <span className="text-xl font-serif font-bold text-lace">
                Metal & Lace Crafts
              </span>
            </Link>
            <p className="text-sm text-lace/80 mb-6">
              Discover the magical world of handcrafted ceramic art that brings elegance 
              and enchantment to your home.
            </p>
            <div className="flex space-x-4">
              <motion.a 
                href="https://instagram.com" 
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -3, color: "#9370db" }}
                className="text-lace/80 hover:text-lace"
              >
                <Instagram size={20} />
              </motion.a>
              <motion.a 
                href="https://facebook.com" 
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -3, color: "#9370db" }}
                className="text-lace/80 hover:text-lace"
              >
                <Facebook size={20} />
              </motion.a>
              <motion.a 
                href="https://twitter.com" 
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -3, color: "#9370db" }}
                className="text-lace/80 hover:text-lace"
              >
                <Twitter size={20} />
              </motion.a>
            </div>
          </div>
          
          <div>
            <h3 className="font-serif font-medium text-lg mb-4">Shop</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/products?category=vases" className="text-sm text-lace/80 hover:text-lace transition-colors">
                  Vases
                </Link>
              </li>
              <li>
                <Link to="/products?category=plates" className="text-sm text-lace/80 hover:text-lace transition-colors">
                  Plates & Bowls
                </Link>
              </li>
              <li>
                <Link to="/products?category=decor" className="text-sm text-lace/80 hover:text-lace transition-colors">
                  Home Decor
                </Link>
              </li>
              <li>
                <Link to="/products?category=gifts" className="text-sm text-lace/80 hover:text-lace transition-colors">
                  Gift Sets
                </Link>
              </li>
              <li>
                <Link to="/products?category=new" className="text-sm text-lace/80 hover:text-lace transition-colors">
                  New Arrivals
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-serif font-medium text-lg mb-4">About</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-sm text-lace/80 hover:text-lace transition-colors">
                  Our Story
                </Link>
              </li>
              <li>
                <Link to="/process" className="text-sm text-lace/80 hover:text-lace transition-colors">
                  Our Process
                </Link>
              </li>
              <li>
                <Link to="/artisans" className="text-sm text-lace/80 hover:text-lace transition-colors">
                  Artisans
                </Link>
              </li>
              <li>
                <Link to="/sustainability" className="text-sm text-lace/80 hover:text-lace transition-colors">
                  Sustainability
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-sm text-lace/80 hover:text-lace transition-colors">
                  Blog
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-serif font-medium text-lg mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/contact" className="text-sm text-lace/80 hover:text-lace transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-sm text-lace/80 hover:text-lace transition-colors">
                  FAQs
                </Link>
              </li>
              <li>
                <Link to="/shipping" className="text-sm text-lace/80 hover:text-lace transition-colors">
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link to="/returns" className="text-sm text-lace/80 hover:text-lace transition-colors">
                  Returns & Exchanges
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-sm text-lace/80 hover:text-lace transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-6 border-t border-lace/20 text-center">
          <p className="text-xs text-lace/60">
            &copy; {currentYear} Metal & Lace Crafts. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

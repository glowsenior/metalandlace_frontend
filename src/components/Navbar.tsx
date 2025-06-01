import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { ShoppingCart, Menu, X, LogIn } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/useCart";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { items } = useCart();

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/products" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
    { name: "FAQ", path: "/faq" },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300",
        isScrolled
          ? "bg-white/90 backdrop-blur-md shadow-sm py-2"
          : "bg-transparent py-4"
      )}
    >
      <div className="page-container flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <motion.div
            whileHover={{ rotate: 10 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            {/* <div className="h-10 w-10 rounded-full bg-gradient-to-br from-plum to-amethyst mr-3" /> */}
            <img src="/mark.png" alt="Logo" className="h-10 w-10 rounded-full" />
          </motion.div>
          <motion.span 
            className="text-2xl font-serif font-bold bg-gradient-to-r from-metal to-plum bg-clip-text text-transparent"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            Metal & Lace Crafts
          </motion.span>
        </Link>

        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) => cn(
                "font-medium transition-all duration-200 hover:text-amethyst",
                isActive ? "text-plum font-semibold" : "text-metal"
              )}
            >
              <motion.span
                whileHover={{ y: -2 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                {link.name}
              </motion.span>
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center space-x-4">
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <NavLink to="/auth" className={({ isActive }) => cn(
              "flex items-center space-x-1.5 font-medium transition-all duration-200",
              isActive ? "text-plum" : "text-metal hover:text-amethyst"
            )}>
              <LogIn className="h-5 w-5" />
              <span className="hidden sm:inline">Login</span>
            </NavLink>
          </motion.div>
          
          <Link to="/cart">
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="relative"
            >
              <ShoppingCart className="h-6 w-6 text-metal" />
              {items.length > 0 && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center rounded-full bg-amethyst text-white text-xs font-bold"
                >
                  {items.length}
                </motion.div>
              )}
            </motion.div>
          </Link>

          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={toggleMenu}>
              {isOpen ? (
                <X className="h-6 w-6 text-metal" />
              ) : (
                <Menu className="h-6 w-6 text-metal" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg py-4"
        >
          <div className="flex flex-col space-y-4 px-6">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) => cn(
                  "font-medium transition-all duration-200 py-2 border-b border-gray-100",
                  isActive ? "text-amethyst font-semibold" : "text-metal"
                )}
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </NavLink>
            ))}
            <Link 
              to="/auth"
              className="font-medium text-metal py-2 border-b border-gray-100 hover:text-amethyst transition-all"
              onClick={() => setIsOpen(false)}
            >
              Login / Register
            </Link>
            <Link 
              to="/admin"
              className="font-medium text-metal py-2 border-b border-gray-100 hover:text-amethyst transition-all"
              onClick={() => setIsOpen(false)}
            >
              Admin Dashboard
            </Link>
            <Link 
              to="/admin/sales-history"
              className="font-medium text-metal py-2 border-b border-gray-100 hover:text-amethyst transition-all"
              onClick={() => setIsOpen(false)}
            >
              Sales History
            </Link>
            <Link 
              to="/admin/user-management"
              className="font-medium text-metal py-2 border-b border-gray-100 hover:text-amethyst transition-all"
              onClick={() => setIsOpen(false)}
            >
              User Management
            </Link>
          </div>
        </motion.div>
      )}
    </header>
  );
};

export default Navbar;

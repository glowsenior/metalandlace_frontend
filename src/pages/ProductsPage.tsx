import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { products, Product } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
} from "@/components/ui/pagination";
import { useToast } from "@/hooks/use-toast";

import { getAllProducts } from "@/services/productService";

const ProductsPage = () => {
  const { toast } = useToast();
  const [searchParams, setSearchParams] = useSearchParams();
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [priceRange, setPriceRange] = useState([0, 300]);
  const [sortOrder, setSortOrder] = useState("featured");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6;
  const totalPages = Math.ceil(filteredProducts.length / pageSize);

  const categoryParam = searchParams.get("category") || "all";
  
  // Filter categories
  const categories = [
    { value: "all", label: "All Products" },
    { value: "Tumblers", label: "Tumblers" },
    { value: "Ceramics", label: "Ceramics" },
    // { value: "decor", label: "Home Decor" },
    // { value: "gifts", label: "Gift Sets" },
  ];
  
  // Filter options
  const [filters, setFilters] = useState({
    new: false,
    bestseller: false,
    featured: false,
  });
  
  // Update URL when category changes
  const handleCategoryChange = (value: string) => {
    if (value === "all") {
      searchParams.delete("category");
    } else {
      searchParams.set("category", value);
    }
    setSearchParams(searchParams);
  };
  
  // Handle filter changes
  const handleFilterChange = (key: keyof typeof filters) => {
    setFilters(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
  };
  
  // Handle sort changes
  const handleSortChange = (value: string) => {
    setSortOrder(value);
  };
  
  // Apply filters and sorting
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let result = [];
        const resData:any = await getAllProducts();
        result = resData.data.products

        // Apply category filter
        if (categoryParam !== "all") {
          result = result.filter(product => product.category === categoryParam);
        }
        
        // Apply attribute filters
        if (filters.new) {
          result = result.filter(product => product.new);
        }
        if (filters.bestseller) {
          result = result.filter(product => product.bestseller);
        }
        if (filters.featured) {
          result = result.filter(product => product.featured);
        }
        
        // Apply price range filter
        result = result.filter(
          product => product.price >= priceRange[0] && product.price <= priceRange[1]
        );
        
        // Apply sorting
        switch (sortOrder) {
          case "price-asc":
            result.sort((a, b) => a.price - b.price);
            break;
          case "price-desc":
            result.sort((a, b) => b.price - a.price);
            break;
          case "name-asc":
            result.sort((a, b) => a.name.localeCompare(b.name));
            break;
          case "name-desc":
            result.sort((a, b) => b.name.localeCompare(a.name));
            break;
          default:
            // Featured sorting (no change to order)
            break;
        }
        
        setFilteredProducts(result);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load products",
          variant: "destructive",
        });
      }
    };
    
    fetchProducts();
    // let result = [...products];
    
    
  }, [categoryParam, filters, priceRange, sortOrder]);
  
  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [categoryParam, filters, priceRange, sortOrder]);

  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="pt-20 pb-16"
    >
      <div className="page-container">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-metal mb-2">
            {categories.find(cat => cat.value === categoryParam)?.label || "All Products"}
          </h1>
          <p className="text-metal/70">
            Discover our collection of handcrafted ceramic pieces
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="lg:col-span-1"
          >
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="font-serif font-medium text-lg mb-4 text-metal">Filters</h2>
              
              {/* Categories */}
              <div className="mb-6">
                <h3 className="font-medium mb-3 text-metal">Category</h3>
                <div className="space-y-2">
                  {categories.map(cat => (
                    <button
                      key={cat.value}
                      className={`block w-full text-left px-3 py-2 rounded-md transition-colors ${
                        categoryParam === cat.value
                          ? "bg-plum/10 text-plum font-medium"
                          : "text-metal hover:bg-fog/30"
                      }`}
                      onClick={() => handleCategoryChange(cat.value)}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Price range */}
              <div className="mb-6">
                <h3 className="font-medium mb-3 text-metal">Price Range</h3>
                <div className="px-2">
                  <Slider
                  min={0}
                  max={300}
                  step={50}
                  value={priceRange}
                  onValueChange={setPriceRange}
                  className="mb-4"
                  />
                  <div className="flex justify-between text-sm text-metal/70">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}</span>
                  </div>
                  <div className="flex justify-between mt-2 text-xs text-metal/50">
                  {[0, 100, 200, 300].map(val => (
                    <span key={val}>${val}</span>
                  ))}
                  </div>
                </div>
              </div>
              
              {/* Product attributes */}
              <div className="mb-6">
                <h3 className="font-medium mb-3 text-metal">Product Type</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="new" 
                      checked={filters.new}
                      onCheckedChange={() => handleFilterChange('new')}
                    />
                    <Label htmlFor="new" className="text-metal">New Arrivals</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="bestseller" 
                      checked={filters.bestseller}
                      onCheckedChange={() => handleFilterChange('bestseller')}
                    />
                    <Label htmlFor="bestseller" className="text-metal">Bestsellers</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="featured" 
                      checked={filters.featured}
                      onCheckedChange={() => handleFilterChange('featured')}
                    />
                    <Label htmlFor="featured" className="text-metal">Featured</Label>
                  </div>
                </div>
              </div>
              
              <Button 
                variant="outline"
                onClick={() => {
                  setFilters({ new: false, bestseller: false, featured: false });
                  setPriceRange([0, 300]);
                  setSortOrder("featured");
                  searchParams.delete("category");
                  setSearchParams(searchParams);
                }}
                className="w-full border-metal/30 text-metal hover:bg-fog/20"
              >
                Clear Filters
              </Button>
            </div>
          </motion.div>
          
          {/* Products grid */}
          <div className="lg:col-span-3">
            {/* Sort options */}
            <div className="flex justify-between items-center mb-6">
              <p className="text-metal/70">
                {filteredProducts.length} products
              </p>
              <Select value={sortOrder} onValueChange={handleSortChange}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="price-asc">Price: Low to High</SelectItem>
                  <SelectItem value="price-desc">Price: High to Low</SelectItem>
                  <SelectItem value="name-asc">Name: A to Z</SelectItem>
                  <SelectItem value="name-desc">Name: Z to A</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {filteredProducts.length === 0 ? (
              <div className="text-center py-16">
                <h3 className="text-2xl font-serif mb-4 text-metal">No products found</h3>
                <p className="text-metal/70 mb-8">Try adjusting your filters or browse our categories</p>
                <Button onClick={() => {
                  setFilters({ new: false, bestseller: false, featured: false });
                  setPriceRange([0, 300]);
                  setSortOrder("featured");
                  searchParams.delete("category");
                  setSearchParams(searchParams);
                }}>
                  Reset Filters
                </Button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {paginatedProducts.map((product, index) => (
                    <ProductCard 
                      key={product.id} 
                      product={product} 
                      index={index} 
                    />
                  ))}
                </div>
                {/* Pagination controls */}
                {totalPages > 1 && (
                  <div className="flex justify-center mt-10">
                    <Pagination>
                      <PaginationContent>
                        <PaginationItem>
                          <PaginationPrevious
                            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                            aria-disabled={currentPage === 1}
                            tabIndex={currentPage === 1 ? -1 : 0}
                            style={{ cursor: currentPage === 1 ? "not-allowed" : "pointer" }}
                          />
                        </PaginationItem>
                        {/* Page number links */}
                        {Array.from({ length: totalPages }).map((_, i) => (
                          <PaginationItem key={i + 1}>
                            <PaginationLink
                              isActive={currentPage === i + 1}
                              onClick={() => setCurrentPage(i + 1)}
                            >
                              {i + 1}
                            </PaginationLink>
                          </PaginationItem>
                        ))}
                        <PaginationItem>
                          <PaginationNext
                            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                            aria-disabled={currentPage === totalPages}
                            tabIndex={currentPage === totalPages ? -1 : 0}
                            style={{ cursor: currentPage === totalPages ? "not-allowed" : "pointer" }}
                          />
                        </PaginationItem>
                      </PaginationContent>
                    </Pagination>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductsPage;

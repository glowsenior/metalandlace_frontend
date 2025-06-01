
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProductTabContent from "./ProductTabContent";
import { 
  getFeaturedProducts,
  getNewProducts,
  getBestsellerProducts
} from "@/data/products";

const ProductCollection = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [newProducts, setNewProducts] = useState([]);
  const [bestsellerProducts, setBestsellerProducts] = useState([]);

  useEffect(() => {
    setFeaturedProducts(getFeaturedProducts());
    setNewProducts(getNewProducts());
    setBestsellerProducts(getBestsellerProducts());
  }, []);

  return (
    <section className="py-20">
      <div className="page-container">
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-center text-metal mb-4">
          Our Collection
        </h2>
        <p className="text-center text-metal/70 mb-12 max-w-2xl mx-auto">
          Each piece is handcrafted with care, bringing together tradition and innovation to create
          ceramic art that inspires and delights.
        </p>

        <Tabs defaultValue="featured" className="mb-12">
          <TabsList className="mx-auto w-fit">
            <TabsTrigger value="featured">Featured</TabsTrigger>
            <TabsTrigger value="bestsellers">Bestsellers</TabsTrigger>
            <TabsTrigger value="new">New Arrivals</TabsTrigger>
          </TabsList>
          
          <TabsContent value="featured" className="mt-8">
            <ProductTabContent products={featuredProducts} />
          </TabsContent>
          
          <TabsContent value="bestsellers" className="mt-8">
            <ProductTabContent products={bestsellerProducts} />
          </TabsContent>
          
          <TabsContent value="new" className="mt-8">
            <ProductTabContent products={newProducts} />
          </TabsContent>
        </Tabs>

        <div className="text-center">
          <Button asChild size="lg" className="bg-metal text-lace hover:bg-metal/90">
            <Link to="/products">View All Products</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProductCollection;

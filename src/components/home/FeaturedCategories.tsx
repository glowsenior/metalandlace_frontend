
import CategoryCard from "./CategoryCard";

const FeaturedCategories = () => {
  const categories = [
    { name: "Vases", image: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?q=80&w=2876&auto=format&fit=crop", link: "/products?category=vases" },
    { name: "Dining", image: "https://plus.unsplash.com/premium_photo-1673329319294-cb70fb0cba60?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDU5fHx8ZW58MHx8fHx8", link: "/products?category=plates" },
    { name: "Home Decor", image: "https://images.unsplash.com/photo-1582131503261-fca1d1c0589f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8aG9tZSUyMGRlY29yfGVufDB8fDB8fHww", link: "/products?category=decor" },
    { name: "Gift Sets", image: "https://images.unsplash.com/photo-1639301556800-5b05e6f5403a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NzB8fGhvbWUlMjBkZWNvciUyMGdpZnR8ZW58MHx8MHx8fDA%3D", link: "/products?category=gifts" },
  ];

  return (
    <section className="py-20 bg-lace/30">
      <div className="page-container">
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-center text-metal mb-16">
          Discover Our Collections
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 place-items-center">
          {categories.map((category, index) => (
            <CategoryCard key={category.name} category={category} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCategories;


import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const AboutPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="pt-16"
    >
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-metal/70 to-transparent z-10" />
          <motion.img
            src="https://images.unsplash.com/photo-1554907984-15263bfd63bd?q=80&w=2940&auto=format&fit=crop"
            alt="Ceramic Workshop"
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
              Our Story
            </h1>
            <p className="text-lg text-lace/90 mb-8">
              Crafting magic from clay since 2015, our journey is one of passion, 
              creativity, and the pursuit of functional art.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-lace/30">
        <div className="page-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              whileHover={{ 
                scale: 1.02,
                transition: { duration: 0.3 }
              }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="space-y-6 text-center p-6 rounded-lg transition-all duration-300"
            >
              <div className="relative flex flex-col items-center">
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-metal z-10 relative text-[#5a3e7c]">
                  Metal and Lace Crafts
                </h2>
                <img
                  src="https://metalandlacecrafts.com/wp-content/themes/Iva/images/heading-floral-decor-image.png"
                  alt=""
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none w-50 md:w-36 opacity-70"
                  style={{ zIndex: 0 }}
                  aria-hidden="true"
                />
              </div>
              <p className="text-metal/80">
                Welcome to <b>Metal and Lace Crafts</b>, where artistry meets functionality! We specialize in creating <b>custom handcrafted tumblers, ceramics, and other unique handmade items</b> designed to add a personal touch to your everyday life.
              </p>
              <p className="text-metal/80">
                Each piece is thoughtfully crafted with a blend of creativity, skill, and attention to detail, ensuring no two items are ever the same. Whether you’re searching for a glittering tumbler to make a bold statement, an elegant ceramic piece to elevate your home décor, or a custom gift that leaves a lasting impression, we’ve got you covered.
              </p>
              <p className="text-metal/80">
                At <b>Metal and Lace Crafts</b>, we believe in the beauty of handmade craftsmanship and the joy of personalization. Explore our collection and find something that’s not only beautiful but also <b>tailored just for you</b>.
              </p>
              <p className="text-metal/80">
                Let’s turn your ideas into one-of-a-kind treasures!
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              whileHover={{ 
                scale: 1.01,
                transition: { duration: 0.3 }
              }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div 
                className="absolute -top-6 -left-6 w-2/3 h-24 bg-lace/70 rounded-lg -z-10"
              />
              <div className="aspect-square overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
                <motion.img 
                  src="https://metalandlacecrafts.com/wp-content/uploads/2025/01/MetalandLace-logo-withbackbackground-1536x1280.png" 
                  alt="Ceramic Studio" 
                  className="w-full h-full object-cover"
                  whileHover={{ 
                    scale: 1.05,
                    transition: { duration: 0.5 }
                  }}
                />
              </div>
              <div 
                className="absolute -bottom-6 -right-6 w-2/3 h-24 bg-amethyst/20 rounded-lg -z-10"
              />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-lace/30">
        <div className="page-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            <div className="aspect-square overflow-hidden rounded-lg duration-300">
              <motion.img 
                src="https://metalandlacecrafts.com/wp-content/uploads/2025/01/channiShaiprojectlogo1.png" 
                alt="Ceramic Studio" 
                className="w-full h-full object-cover"
                whileHover={{
                  scale: 1.02,
                  transition: { duration: 0.5 }
                }}
              />
            </div>

            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              whileHover={{ 
                scale: 1.02,
                transition: { duration: 0.3 }
              }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="space-y-6 text-center p-6 rounded-lg transition-all duration-300"
            >
              <div className="relative flex flex-col items-center">
                <h4 className="text-3xl md:text-2xl font-serif font-bold text-metal z-10 relative text-[#5a3e7c]">
                  Channi Shai Project
                </h4>
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-metal z-10 relative text-[#5a3e7c]">
                  Metal and Lace Crafts
                </h2>
                <img
                  src="https://metalandlacecrafts.com/wp-content/themes/Iva/images/heading-floral-decor-image.png"
                  alt=""
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none w-50 md:w-36 opacity-70"
                  style={{ zIndex: 0 }}
                  aria-hidden="true"
                />
              </div>
              <p className="text-metal/80">
                At Metal and Lace Crafts, we create custom tumblers and handcrafted items with a heartfelt purpose. Under the <b>ChanniShai Project</b>, inspired by the memory of our beloved daughter with autism, we strive to honor and celebrate individuals with special needs and their extraordinary stories.
              </p>
              <p className="text-metal/80">
                Each tumbler is a work of art, designed to reflect the beauty, strength, and individuality of those who inspire us. Through this project, we aim to spread love, raise awareness, and keep our daughter’s spirit alive by crafting meaningful pieces that bring joy and connection to others.
              </p>
              <p className="text-metal/80">
                Let us help you create a custom design that celebrates the uniqueness of your loved one or supports the causes closest to your heart. Together, we turn memories into treasures.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Process */}
      {/* <section className="py-20">
        <div className="page-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-metal mb-6">
              Our Creative Process
            </h2>
            <p className="text-metal/80">
              Every piece in our collection begins as an idea, a vision of beauty and utility.
              From there, it undergoes a transformative journey through skillful hands and fire.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
            {[
              {
                title: "Design & Concept",
                description: "Each piece begins with sketches and material exploration, balancing form and function.",
                image: "https://images.unsplash.com/photo-1459865264687-595d652de67e?q=80&w=2940&auto=format&fit=crop"
              },
              {
                title: "Handcrafting",
                description: "Our artisans bring designs to life using traditional wheel-throwing and hand-building techniques.",
                image: "https://images.unsplash.com/photo-1614587367770-15bb788c608c?q=80&w=2864&auto=format&fit=crop"
              },
              {
                title: "Finishing & Firing",
                description: "Multiple firings and careful glazing create our signature colors and textures.",
                image: "https://images.unsplash.com/photo-1638122406208-95c3b4b89863?q=80&w=2940&auto=format&fit=crop"
              }
            ].map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="ceramic-card"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img 
                    src={step.image}
                    alt={step.title} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-serif font-semibold text-metal mb-3">
                    {step.title}
                  </h3>
                  <p className="text-metal/70">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Our Values */}
      <section className="py-20 bg-plum/10">
        <div className="page-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-metal mb-6">
              Our Values
            </h2>
            <p className="text-metal/80">
              At Metal & Lace Crafts, our work is guided by principles that honor tradition, 
              respect our environment, and celebrate the human touch in a digital age.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {[
              {
                title: "Sustainability",
                description: "We use locally sourced clay, non-toxic glazes, and energy-efficient kilns to minimize our environmental footprint."
              },
              {
                title: "Craftsmanship",
                description: "We believe in the value of handmade objects and the unique character that comes from human hands shaping clay."
              },
              {
                title: "Community",
                description: "Our studio hosts workshops and apprenticeships to share ceramic arts with our community and preserve traditional techniques."
              },
              {
                title: "Innovation",
                description: "While honoring tradition, we continuously explore new forms, techniques, and applications for ceramic art."
              }
            ].map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="p-8 rounded-lg bg-white shadow-lg"
              >
                <h3 className="text-xl font-serif font-semibold text-plum mb-4">
                  {value.title}
                </h3>
                <p className="text-metal/80">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-plum to-mauve text-white">
        <div className="page-container text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
              Experience the Magic Yourself
            </h2>
            <p className="text-white/80 mb-10">
              Browse our collections to discover pieces that will bring beauty and wonder to your everyday life, 
              or reach out to learn more about custom commissions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-lace text-plum hover:bg-lace/90">
                <Link to="/products">Shop Our Collections</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-lace bg-lace/10 text-lace hover:bg-lace/30">
                <Link to="/contact">Contact Us</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default AboutPage;


import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { products } from "@/data/products";

const AdminDashboard = () => {
  // Sample data for dashboard
  const totalProducts = products.length;
  const totalCategories = new Set(products.map(p => p.category)).size;
  const totalSales = 14; // Sample data
  const totalRevenue = 2459.87; // Sample data
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen pt-24 pb-20"
    >
      <div className="page-container">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-metal mb-2">
              Admin Dashboard
            </h1>
            <p className="text-metal/70">
              Manage your ceramic store
            </p>
          </div>
          
          <div className="mt-4 md:mt-0">
            <Button asChild>
              <Link to="/admin/products/add" className="bg-amethyst hover:bg-amethyst/90">
                Add New Product
              </Link>
            </Button>
          </div>
        </div>
        
        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[
            { title: "Total Products", value: totalProducts, description: "Products in inventory" },
            { title: "Categories", value: totalCategories, description: "Product categories" },
            { title: "Total Sales", value: totalSales, description: "Orders this month" },
            { title: "Revenue", value: `$${totalRevenue.toFixed(2)}`, description: "Revenue this month" },
          ].map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg text-metal">{card.title}</CardTitle>
                  <CardDescription>{card.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-metal">{card.value}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
        
        {/* Quick Links */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common tasks for store management</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Link 
                  to="/admin/products"
                  className="flex items-center p-4 rounded-md bg-fog/20 hover:bg-fog/40 transition-colors"
                >
                  <div>
                    <h3 className="font-medium text-metal">Manage Products</h3>
                    <p className="text-sm text-metal/70">Edit or delete existing products</p>
                  </div>
                </Link>
                
                <Link 
                  to="/admin/products/add"
                  className="flex items-center p-4 rounded-md bg-fog/20 hover:bg-fog/40 transition-colors"
                >
                  <div>
                    <h3 className="font-medium text-metal">Add New Product</h3>
                    <p className="text-sm text-metal/70">Create a new product listing</p>
                  </div>
                </Link>
                
                <Link 
                  to="/admin/orders"
                  className="flex items-center p-4 rounded-md bg-fog/20 hover:bg-fog/40 transition-colors"
                >
                  <div>
                    <h3 className="font-medium text-metal">Manage Orders</h3>
                    <p className="text-sm text-metal/70">View and process customer orders</p>
                  </div>
                </Link>
                
                <Link 
                  to="/admin/categories"
                  className="flex items-center p-4 rounded-md bg-fog/20 hover:bg-fog/40 transition-colors"
                >
                  <div>
                    <h3 className="font-medium text-metal">Manage Categories</h3>
                    <p className="text-sm text-metal/70">Add or edit product categories</p>
                  </div>
                </Link>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Store Status</CardTitle>
              <CardDescription>Overview of your store's health</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-metal/70">Inventory Status</span>
                    <span className="text-sm text-green-600 font-medium">Healthy</span>
                  </div>
                  <div className="w-full h-2 bg-fog/40 rounded-full overflow-hidden">
                    <div className="h-full bg-green-500 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-metal/70">Low Stock Items</span>
                    <span className="text-sm text-amber-600 font-medium">2 Items</span>
                  </div>
                  <div className="w-full h-2 bg-fog/40 rounded-full overflow-hidden">
                    <div className="h-full bg-amber-500 rounded-full" style={{ width: '20%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-metal/70">Orders Pending</span>
                    <span className="text-sm text-blue-600 font-medium">3 Orders</span>
                  </div>
                  <div className="w-full h-2 bg-fog/40 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 rounded-full" style={{ width: '30%' }}></div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">View Detailed Reports</Button>
            </CardFooter>
          </Card>
        </div>
        
        {/* Recent Products Table */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Recent Products</CardTitle>
                <CardDescription>Latest additions to your store</CardDescription>
              </div>
              <Link 
                to="/admin/products"
                className="text-sm text-amethyst hover:underline"
              >
                View All
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-metal/10">
                    <th className="pb-3 font-medium text-metal">Product</th>
                    <th className="pb-3 font-medium text-metal">Price</th>
                    <th className="pb-3 font-medium text-metal">Category</th>
                    <th className="pb-3 font-medium text-metal">Stock</th>
                    <th className="pb-3 font-medium text-metal">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {products.slice(0, 5).map(product => (
                    <tr key={product.id} className="border-b border-metal/10 last:border-none">
                      <td className="py-4">
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded overflow-hidden mr-3">
                            <img
                              src={product.images[0].url}
                              alt={product.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <span className="font-medium text-metal">{product.name}</span>
                        </div>
                      </td>
                      <td className="py-4">${product.price.toFixed(2)}</td>
                      <td className="py-4 capitalize">{product.category}</td>
                      <td className="py-4">{product.stock}</td>
                      <td className="py-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          product.new 
                            ? "bg-green-100 text-green-800" 
                            : "bg-blue-100 text-blue-800"
                        }`}>
                          {product.new ? "New" : "Regular"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
};

export default AdminDashboard;

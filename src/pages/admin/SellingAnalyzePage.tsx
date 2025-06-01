import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, Package, ShoppingCart, BarChart3 } from "lucide-react";
import { motion } from "framer-motion";
const SellingAnalyzePage = () => {
  const keyMetrics = [{
    title: "Total Revenue",
    value: "$12,345",
    icon: DollarSign,
    trend: "+5.2%"
  }, {
    title: "Total Orders",
    value: "456",
    icon: ShoppingCart,
    trend: "+2.1%"
  }, {
    title: "Products Sold",
    value: "789",
    icon: Package,
    trend: "+8.0%"
  }, {
    title: "Average Order Value",
    value: "$27.07",
    icon: DollarSign,
    trend: "-1.5%"
  }];
  return <div className="container mx-auto px-4 min-h-[calc(100vh-8rem)] py-[64px]">
      <motion.div initial={{
      opacity: 0,
      y: 20
    }} animate={{
      opacity: 1,
      y: 0
    }} transition={{
      duration: 0.5
    }}>
        <div className="flex items-center mb-8">
          <BarChart3 className="w-8 h-8 text-amethyst mr-3" />
          <h1 className="text-3xl font-serif font-bold text-metal">Sales Analytics</h1>
        </div>

        {/* Key Metrics Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-metal mb-4">Key Metrics</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {keyMetrics.map(metric => <Card key={metric.title} className="shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-metal/80">{metric.title}</CardTitle>
                  <metric.icon className="h-5 w-5 text-amethyst" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-metal">{metric.value}</div>
                  <p className={`text-xs ${metric.trend.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                    {metric.trend} from last month
                  </p>
                </CardContent>
              </Card>)}
          </div>
        </section>

        {/* Sales Trends Placeholder */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-metal mb-4">Sales Trends</h2>
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-metal">Sales Over Time</CardTitle>
              <CardDescription className="text-metal/70">Monthly sales performance.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80 bg-lace/50 rounded-md flex items-center justify-center">
                <p className="text-metal/60 text-lg">Chart placeholder: Sales data will be displayed here.</p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Top Products Placeholder */}
        <section>
          <h2 className="text-2xl font-semibold text-metal mb-4">Top Products</h2>
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-metal">Best Selling Products</CardTitle>
              <CardDescription className="text-metal/70">Products with the highest sales volume.</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {["Mystique Spiral Vase", "Aurora Bowl Set", "Moonlight Dinner Plate Set"].map((product, idx) => <li key={idx} className="flex justify-between items-center p-3 bg-lace/50 rounded-md">
                    <span className="text-metal">{product}</span>
                    <span className="text-bronze font-medium">${(Math.random() * 1000 + 500).toFixed(2)}</span>
                  </li>)}
              </ul>
            </CardContent>
          </Card>
        </section>
      </motion.div>
    </div>;
};
export default SellingAnalyzePage;
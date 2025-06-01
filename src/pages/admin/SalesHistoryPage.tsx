
import * as React from "react";
import { useState } from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon, FileChartColumn } from "lucide-react";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableCaption,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const SalesHistoryPage = () => {
  const [startDate, setStartDate] = useState<Date | undefined>(new Date(new Date().setDate(new Date().getDate() - 30)));
  const [endDate, setEndDate] = useState<Date | undefined>(new Date());

  // Placeholder data - replace with actual data fetching
  const productSalesData = [
    { id: "1", name: "Mystique Spiral Vase", date: "2025-05-10", quantity: 5, revenue: 249.95 },
    { id: "2", name: "Aurora Bowl Set", date: "2025-05-12", quantity: 3, revenue: 179.97 },
    { id: "3", name: "Moonlight Dinner Plate", date: "2025-05-14", quantity: 10, revenue: 450.00 },
  ];

  const customerSalesData = [
    { id: "1", customerName: "Alice Wonderland", date: "2025-05-10", product: "Mystique Spiral Vase", orderValue: 99.98 },
    { id: "2", customerName: "Bob The Builder", date: "2025-05-12", product: "Aurora Bowl Set", orderValue: 59.99 },
    { id: "3", customerName: "Charlie Brown", date: "2025-05-14", product: "Moonlight Dinner Plate", orderValue: 45.00 },
  ];

  const handleApplyDateRange = () => {
    console.log("Applying date range:", { startDate, endDate });
    // Add logic to fetch data based on date range
  };

  return (
    <div className="container mx-auto px-4 min-h-[calc(100vh-8rem)] py-[64px]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center mb-8">
          <FileChartColumn className="w-8 h-8 text-amethyst mr-3" />
          <h1 className="text-3xl font-serif font-bold text-metal">Sales History</h1>
        </div>

        <Card className="mb-8 shadow-lg">
          <CardHeader>
            <CardTitle className="text-metal">Filter by Date Range</CardTitle>
            <CardDescription className="text-metal/70">
              Select a start and end date to view sales history.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col sm:flex-row gap-4 items-center">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full sm:w-[280px] justify-start text-left font-normal",
                    !startDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {startDate ? format(startDate, "PPP") : <span>Pick a start date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={startDate}
                  onSelect={setStartDate}
                  initialFocus
                  className={cn("p-3 pointer-events-auto")}
                />
              </PopoverContent>
            </Popover>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full sm:w-[280px] justify-start text-left font-normal",
                    !endDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {endDate ? format(endDate, "PPP") : <span>Pick an end date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={endDate}
                  onSelect={setEndDate}
                  disabled={(date) => date < (startDate || new Date(0)) || date > new Date()}
                  initialFocus
                  className={cn("p-3 pointer-events-auto")}
                />
              </PopoverContent>
            </Popover>
            <Button onClick={handleApplyDateRange} className="w-full sm:w-auto bg-amethyst hover:bg-plum text-white">
              Apply Filter
            </Button>
          </CardContent>
        </Card>

        <Tabs defaultValue="byProduct">
          <TabsList className="grid w-full grid-cols-2 md:w-[400px] mb-6">
            <TabsTrigger value="byProduct">By Product</TabsTrigger>
            <TabsTrigger value="byCustomer">By Customer</TabsTrigger>
          </TabsList>
          <TabsContent value="byProduct">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-metal">Sales by Product</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableCaption>A list of sales data grouped by product.</TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Product Name</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead className="text-right">Quantity Sold</TableHead>
                      <TableHead className="text-right">Total Revenue</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {productSalesData.map((sale) => (
                      <TableRow key={sale.id}>
                        <TableCell className="font-medium">{sale.name}</TableCell>
                        <TableCell>{sale.date}</TableCell>
                        <TableCell className="text-right">{sale.quantity}</TableCell>
                        <TableCell className="text-right">${sale.revenue.toFixed(2)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="byCustomer">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-metal">Sales by Customer</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableCaption>A list of sales data grouped by customer.</TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Customer Name</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Product Purchased</TableHead>
                      <TableHead className="text-right">Order Value</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {customerSalesData.map((sale) => (
                      <TableRow key={sale.id}>
                        <TableCell className="font-medium">{sale.customerName}</TableCell>
                        <TableCell>{sale.date}</TableCell>
                        <TableCell>{sale.product}</TableCell>
                        <TableCell className="text-right">${sale.orderValue.toFixed(2)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
};

export default SalesHistoryPage;

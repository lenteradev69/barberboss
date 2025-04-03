import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  BarChart2,
  Calendar,
  Download,
  FileText,
  Filter,
  Package,
  PieChart,
  Plus,
  Printer,
  RefreshCw,
  Search,
  Scissors,
  Share2,
  TrendingUp,
  Users,
} from "lucide-react";

interface SalesData {
  date: string;
  totalSales: number;
  serviceRevenue: number;
  productRevenue: number;
  transactions: number;
}

interface ServicePopularity {
  service: string;
  count: number;
  revenue: number;
}

interface ProductPopularity {
  product: string;
  count: number;
  revenue: number;
}

interface BarberPerformance {
  barber: string;
  customers: number;
  revenue: number;
  services: number;
}

const FinancialReports = () => {
  const [activeTab, setActiveTab] = useState("daily");
  const [dateRange, setDateRange] = useState("today");
  const [showExportDialog, setShowExportDialog] = useState(false);

  // Mock data for sales
  const mockSalesData: SalesData[] = [
    {
      date: "2023-12-20",
      totalSales: 2450000,
      serviceRevenue: 1850000,
      productRevenue: 600000,
      transactions: 18,
    },
    {
      date: "2023-12-19",
      totalSales: 2150000,
      serviceRevenue: 1650000,
      productRevenue: 500000,
      transactions: 15,
    },
    {
      date: "2023-12-18",
      totalSales: 1950000,
      serviceRevenue: 1450000,
      productRevenue: 500000,
      transactions: 14,
    },
    {
      date: "2023-12-17",
      totalSales: 2650000,
      serviceRevenue: 2050000,
      productRevenue: 600000,
      transactions: 20,
    },
    {
      date: "2023-12-16",
      totalSales: 2850000,
      serviceRevenue: 2250000,
      productRevenue: 600000,
      transactions: 22,
    },
    {
      date: "2023-12-15",
      totalSales: 2350000,
      serviceRevenue: 1750000,
      productRevenue: 600000,
      transactions: 17,
    },
    {
      date: "2023-12-14",
      totalSales: 2050000,
      serviceRevenue: 1550000,
      productRevenue: 500000,
      transactions: 16,
    },
  ];

  // Mock data for service popularity
  const mockServicePopularity: ServicePopularity[] = [
    {
      service: "Regular Haircut",
      count: 42,
      revenue: 3150000,
    },
    {
      service: "Hair Coloring",
      count: 15,
      revenue: 3750000,
    },
    {
      service: "Beard Trim",
      count: 28,
      revenue: 1400000,
    },
    {
      service: "Hair & Beard Combo",
      count: 22,
      revenue: 2640000,
    },
    {
      service: "Shave",
      count: 18,
      revenue: 1080000,
    },
  ];

  // Mock data for product popularity
  const mockProductPopularity: ProductPopularity[] = [
    {
      product: "Premium Pomade",
      count: 25,
      revenue: 2125000,
    },
    {
      product: "Beard Oil",
      count: 18,
      revenue: 1170000,
    },
    {
      product: "Hair Wax",
      count: 15,
      revenue: 1050000,
    },
    {
      product: "Shampoo",
      count: 12,
      revenue: 1140000,
    },
  ];

  // Mock data for barber performance
  const mockBarberPerformance: BarberPerformance[] = [
    {
      barber: "Deni",
      customers: 45,
      revenue: 4850000,
      services: 52,
    },
    {
      barber: "Budi",
      customers: 38,
      revenue: 3950000,
      services: 42,
    },
    {
      barber: "Agus",
      customers: 32,
      revenue: 3250000,
      services: 35,
    },
  ];

  // Format currency to Indonesian Rupiah
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Format date to readable format
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Calculate total sales for the selected period
  const calculateTotalSales = () => {
    return mockSalesData.reduce((sum, day) => sum + day.totalSales, 0);
  };

  // Calculate total service revenue for the selected period
  const calculateServiceRevenue = () => {
    return mockSalesData.reduce((sum, day) => sum + day.serviceRevenue, 0);
  };

  // Calculate total product revenue for the selected period
  const calculateProductRevenue = () => {
    return mockSalesData.reduce((sum, day) => sum + day.productRevenue, 0);
  };

  // Calculate total transactions for the selected period
  const calculateTotalTransactions = () => {
    return mockSalesData.reduce((sum, day) => sum + day.transactions, 0);
  };

  // Calculate average transaction value
  const calculateAverageTransactionValue = () => {
    const totalSales = calculateTotalSales();
    const totalTransactions = calculateTotalTransactions();
    return totalTransactions > 0 ? totalSales / totalTransactions : 0;
  };

  // Calculate percentage change from previous period
  const calculatePercentageChange = (current: number, previous: number) => {
    if (previous === 0) return 100;
    return ((current - previous) / previous) * 100;
  };

  // Get color based on percentage change
  const getPercentageChangeColor = (change: number) => {
    return change >= 0 ? "text-green-500" : "text-red-500";
  };

  // Get arrow icon based on percentage change
  const getPercentageChangeIcon = (change: number) => {
    return change >= 0 ? (
      <TrendingUp className="h-4 w-4" />
    ) : (
      <TrendingUp className="h-4 w-4 transform rotate-180" />
    );
  };

  return (
    <div className="w-full min-h-screen bg-black text-white p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
              Financial Reports
            </h1>
            <p className="text-gray-400">
              Track sales, revenue, and business performance
            </p>
          </div>
          <div className="flex gap-2 mt-4 md:mt-0">
            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger className="w-[180px] bg-zinc-900 border-zinc-700 text-white">
                <SelectValue placeholder="Select period" />
              </SelectTrigger>
              <SelectContent className="bg-zinc-900 border-zinc-700 text-white">
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="yesterday">Yesterday</SelectItem>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
                <SelectItem value="quarter">This Quarter</SelectItem>
                <SelectItem value="year">This Year</SelectItem>
              </SelectContent>
            </Select>
            <Dialog open={showExportDialog} onOpenChange={setShowExportDialog}>
              <DialogTrigger asChild>
                <Button className="bg-amber-500 text-black hover:bg-amber-600">
                  <Download className="mr-2 h-4 w-4" />
                  Export
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-zinc-900 border border-amber-500 text-white">
                <DialogHeader>
                  <DialogTitle className="text-amber-500">
                    Export Financial Report
                  </DialogTitle>
                  <DialogDescription className="text-gray-400">
                    Choose a format to export your financial data.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid grid-cols-2 gap-4 py-4">
                  <Button
                    variant="outline"
                    className="h-24 flex flex-col items-center justify-center border-zinc-700 text-white hover:bg-zinc-800"
                  >
                    <FileText className="h-8 w-8 mb-2" />
                    PDF Report
                  </Button>
                  <Button
                    variant="outline"
                    className="h-24 flex flex-col items-center justify-center border-zinc-700 text-white hover:bg-zinc-800"
                  >
                    <FileText className="h-8 w-8 mb-2" />
                    Excel Spreadsheet
                  </Button>
                  <Button
                    variant="outline"
                    className="h-24 flex flex-col items-center justify-center border-zinc-700 text-white hover:bg-zinc-800"
                  >
                    <Printer className="h-8 w-8 mb-2" />
                    Print Report
                  </Button>
                  <Button
                    variant="outline"
                    className="h-24 flex flex-col items-center justify-center border-zinc-700 text-white hover:bg-zinc-800"
                  >
                    <Share2 className="h-8 w-8 mb-2" />
                    Share Report
                  </Button>
                </div>
                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => setShowExportDialog(false)}
                    className="border-zinc-700 text-white hover:bg-zinc-800"
                  >
                    Cancel
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card className="bg-zinc-900 border-zinc-800 hover:border-amber-500/50 transition-colors">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg text-white">
                Total Revenue
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-amber-500">
                {formatCurrency(calculateTotalSales())}
              </div>
              <div className="flex items-center gap-1 mt-1 text-sm">
                <span
                  className={getPercentageChangeColor(
                    calculatePercentageChange(2450000, 2150000),
                  )}
                >
                  +13.9%
                </span>
                {getPercentageChangeIcon(
                  calculatePercentageChange(2450000, 2150000),
                )}
                <span className="text-gray-400">vs previous period</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-zinc-900 border-zinc-800 hover:border-amber-500/50 transition-colors">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg text-white">
                Service Revenue
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-amber-500">
                {formatCurrency(calculateServiceRevenue())}
              </div>
              <div className="flex items-center gap-1 mt-1 text-sm">
                <span
                  className={getPercentageChangeColor(
                    calculatePercentageChange(1850000, 1650000),
                  )}
                >
                  +12.1%
                </span>
                {getPercentageChangeIcon(
                  calculatePercentageChange(1850000, 1650000),
                )}
                <span className="text-gray-400">vs previous period</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-zinc-900 border-zinc-800 hover:border-amber-500/50 transition-colors">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg text-white">
                Product Revenue
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-amber-500">
                {formatCurrency(calculateProductRevenue())}
              </div>
              <div className="flex items-center gap-1 mt-1 text-sm">
                <span
                  className={getPercentageChangeColor(
                    calculatePercentageChange(600000, 500000),
                  )}
                >
                  +20.0%
                </span>
                {getPercentageChangeIcon(
                  calculatePercentageChange(600000, 500000),
                )}
                <span className="text-gray-400">vs previous period</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-zinc-900 border-zinc-800 hover:border-amber-500/50 transition-colors">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg text-white">Transactions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-amber-500">
                {calculateTotalTransactions()}
              </div>
              <div className="flex items-center gap-1 mt-1 text-sm">
                <span
                  className={getPercentageChangeColor(
                    calculatePercentageChange(18, 15),
                  )}
                >
                  +20.0%
                </span>
                {getPercentageChangeIcon(calculatePercentageChange(18, 15))}
                <span className="text-gray-400">vs previous period</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs
          defaultValue="daily"
          className="mb-6"
          onValueChange={setActiveTab}
        >
          <TabsList className="bg-zinc-900 border border-zinc-800">
            <TabsTrigger
              value="daily"
              className="data-[state=active]:bg-amber-500 data-[state=active]:text-black"
            >
              Daily Sales
            </TabsTrigger>
            <TabsTrigger
              value="services"
              className="data-[state=active]:bg-amber-500 data-[state=active]:text-black"
            >
              Service Analysis
            </TabsTrigger>
            <TabsTrigger
              value="products"
              className="data-[state=active]:bg-amber-500 data-[state=active]:text-black"
            >
              Product Analysis
            </TabsTrigger>
            <TabsTrigger
              value="barbers"
              className="data-[state=active]:bg-amber-500 data-[state=active]:text-black"
            >
              Barber Performance
            </TabsTrigger>
          </TabsList>

          {/* Daily Sales Tab Content */}
          <TabsContent value="daily" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Sales Chart */}
              <Card className="bg-zinc-900 border-zinc-800 lg:col-span-2">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <BarChart2 className="h-5 w-5 text-amber-500" />
                    Daily Sales Trend
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    Revenue breakdown for the last 7 days
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] flex items-end justify-between gap-2">
                    {mockSalesData.map((day, index) => (
                      <div key={index} className="flex flex-col items-center">
                        <div className="w-16 flex flex-col items-center">
                          <div className="relative w-full h-[200px] flex items-end mb-2">
                            <div
                              className="w-4 bg-amber-500/20 rounded-t"
                              style={{
                                height: `${(day.totalSales / 3000000) * 100}%`,
                              }}
                            ></div>
                            <div
                              className="w-4 bg-amber-500 rounded-t absolute bottom-0 left-0"
                              style={{
                                height: `${(day.serviceRevenue / 3000000) * 100}%`,
                              }}
                            ></div>
                            <div
                              className="w-4 bg-amber-300 rounded-t absolute bottom-0 left-6"
                              style={{
                                height: `${(day.productRevenue / 3000000) * 100}%`,
                              }}
                            ></div>
                          </div>
                          <div className="text-xs text-gray-400 mt-1">
                            {new Date(day.date).toLocaleDateString("id-ID", {
                              weekday: "short",
                            })}
                          </div>
                          <div className="text-xs font-medium">
                            {formatCurrency(day.totalSales).replace("Rp", "")}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-center gap-6 mt-4">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-amber-500 rounded"></div>
                      <span className="text-sm">Services</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-amber-300 rounded"></div>
                      <span className="text-sm">Products</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Additional Stats */}
              <Card className="bg-zinc-900 border-zinc-800">
                <CardHeader>
                  <CardTitle className="text-white">
                    Performance Metrics
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-gray-400">
                        Avg. Transaction Value
                      </span>
                      <span className="font-medium">
                        {formatCurrency(calculateAverageTransactionValue())}
                      </span>
                    </div>
                    <Progress value={70} className="h-2 bg-zinc-800" />
                  </div>

                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-gray-400">
                        Service to Product Ratio
                      </span>
                      <span className="font-medium">
                        {Math.round(
                          (calculateServiceRevenue() / calculateTotalSales()) *
                            100,
                        )}
                        % :{" "}
                        {Math.round(
                          (calculateProductRevenue() / calculateTotalSales()) *
                            100,
                        )}
                        %
                      </span>
                    </div>
                    <div className="flex h-2">
                      <div
                        className="bg-amber-500 rounded-l"
                        style={{
                          width: `${(calculateServiceRevenue() / calculateTotalSales()) * 100}%`,
                        }}
                      ></div>
                      <div
                        className="bg-amber-300 rounded-r"
                        style={{
                          width: `${(calculateProductRevenue() / calculateTotalSales()) * 100}%`,
                        }}
                      ></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-gray-400">
                        Daily Target Achievement
                      </span>
                      <span className="font-medium">82%</span>
                    </div>
                    <Progress value={82} className="h-2 bg-zinc-800" />
                  </div>

                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-gray-400">
                        Customer Retention Rate
                      </span>
                      <span className="font-medium">76%</span>
                    </div>
                    <Progress value={76} className="h-2 bg-zinc-800" />
                  </div>

                  <div className="pt-4">
                    <Button
                      variant="outline"
                      className="w-full border-amber-500/50 text-amber-500 hover:bg-amber-500/10"
                    >
                      <RefreshCw className="mr-2 h-4 w-4" />
                      Refresh Data
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Service Analysis Tab Content */}
          <TabsContent value="services" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Service Popularity Chart */}
              <Card className="bg-zinc-900 border-zinc-800 lg:col-span-2">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Scissors className="h-5 w-5 text-amber-500" />
                    Service Popularity
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    Most popular services by revenue and number of appointments
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[400px] pr-4">
                    <div className="space-y-6">
                      {mockServicePopularity.map((service, index) => (
                        <div key={index}>
                          <div className="flex justify-between items-center mb-2">
                            <div>
                              <p className="font-medium">{service.service}</p>
                              <p className="text-sm text-gray-400">
                                {service.count} appointments
                              </p>
                            </div>
                            <p className="text-amber-500 font-bold">
                              {formatCurrency(service.revenue)}
                            </p>
                          </div>
                          <div className="relative pt-1">
                            <div className="flex mb-2 items-center justify-between">
                              <div>
                                <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full bg-amber-500 text-black">
                                  {Math.round(
                                    (service.revenue /
                                      mockServicePopularity.reduce(
                                        (sum, s) => sum + s.revenue,
                                        0,
                                      )) *
                                      100,
                                  )}
                                  %
                                </span>
                              </div>
                            </div>
                            <div className="flex h-2 mb-4">
                              <div
                                style={{
                                  width: `${
                                    (service.revenue /
                                      mockServicePopularity.reduce(
                                        (sum, s) => sum + s.revenue,
                                        0,
                                      )) *
                                    100
                                  }%`,
                                }}
                                className="bg-amber-500 rounded"
                              ></div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>

              {/* Service Insights */}
              <Card className="bg-zinc-900 border-zinc-800">
                <CardHeader>
                  <CardTitle className="text-white">Service Insights</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="text-sm font-medium mb-2 text-amber-500">
                      Top Performing Service
                    </h3>
                    <div className="bg-zinc-800 p-3 rounded-md">
                      <p className="font-medium">Hair Coloring</p>
                      <p className="text-sm text-gray-400 mb-1">
                        15 appointments
                      </p>
                      <p className="text-amber-500 font-bold">
                        {formatCurrency(3750000)}
                      </p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium mb-2 text-amber-500">
                      Most Frequent Service
                    </h3>
                    <div className="bg-zinc-800 p-3 rounded-md">
                      <p className="font-medium">Regular Haircut</p>
                      <p className="text-sm text-gray-400 mb-1">
                        42 appointments
                      </p>
                      <p className="text-amber-500 font-bold">
                        {formatCurrency(3150000)}
                      </p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium mb-2 text-amber-500">
                      Average Service Value
                    </h3>
                    <div className="bg-zinc-800 p-3 rounded-md">
                      <p className="font-medium">{formatCurrency(95200)}</p>
                      <p className="text-sm text-gray-400">
                        Based on{" "}
                        {mockServicePopularity.reduce(
                          (sum, s) => sum + s.count,
                          0,
                        )}{" "}
                        total services
                      </p>
                    </div>
                  </div>

                  <div className="pt-4">
                    <Button
                      variant="outline"
                      className="w-full border-amber-500/50 text-amber-500 hover:bg-amber-500/10"
                    >
                      <PieChart className="mr-2 h-4 w-4" />
                      View Detailed Analysis
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Product Analysis Tab Content */}
          <TabsContent value="products" className="mt-6">
            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Package className="h-5 w-5 text-amber-500" />
                  Product Sales Analysis
                </CardTitle>
                <CardDescription className="text-gray-400">
                  This feature is coming soon. Please check back later.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Package className="h-16 w-16 text-gray-600 mb-4" />
                <h3 className="text-xl font-medium mb-2">
                  Product Analysis Coming Soon
                </h3>
                <p className="text-gray-400 text-center max-w-md">
                  We're working on implementing detailed product sales analysis.
                  Please check back soon for updates.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Barber Performance Tab Content */}
          <TabsContent value="barbers" className="mt-6">
            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Users className="h-5 w-5 text-amber-500" />
                  Barber Performance
                </CardTitle>
                <CardDescription className="text-gray-400">
                  This feature is coming soon. Please check back later.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Users className="h-16 w-16 text-gray-600 mb-4" />
                <h3 className="text-xl font-medium mb-2">
                  Barber Analysis Coming Soon
                </h3>
                <p className="text-gray-400 text-center max-w-md">
                  We're working on implementing detailed barber performance
                  metrics. Please check back soon for updates.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default FinancialReports;

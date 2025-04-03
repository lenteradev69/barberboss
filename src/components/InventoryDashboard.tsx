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
  AlertCircle,
  ArrowDownUp,
  Calendar,
  Download,
  Filter,
  Package,
  Plus,
  RefreshCw,
  Search,
  ShoppingCart,
} from "lucide-react";

interface Product {
  id: string;
  name: string;
  category: string;
  stock: number;
  minStock: number;
  price: number;
  supplier: string;
  expiryDate: string;
  lastRestocked: string;
  image: string;
}

const InventoryDashboard = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddProductDialog, setShowAddProductDialog] = useState(false);
  const [showRestockDialog, setShowRestockDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Mock data for inventory products
  const mockProducts: Product[] = [
    {
      id: "1",
      name: "Premium Hair Pomade",
      category: "Styling",
      stock: 24,
      minStock: 10,
      price: 85000,
      supplier: "BarberSupply Co.",
      expiryDate: "2025-06-15",
      lastRestocked: "2023-11-10",
      image:
        "https://images.unsplash.com/photo-1626808642875-0aa545482dfb?w=300&q=80",
    },
    {
      id: "2",
      name: "Beard Oil",
      category: "Grooming",
      stock: 8,
      minStock: 10,
      price: 65000,
      supplier: "MensGrooming Inc.",
      expiryDate: "2024-12-20",
      lastRestocked: "2023-10-05",
      image:
        "https://images.unsplash.com/photo-1621607512214-68297480165e?w=300&q=80",
    },
    {
      id: "3",
      name: "Hair Shampoo",
      category: "Haircare",
      stock: 3,
      minStock: 8,
      price: 95000,
      supplier: "BarberSupply Co.",
      expiryDate: "2024-09-30",
      lastRestocked: "2023-09-15",
      image:
        "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=300&q=80",
    },
    {
      id: "4",
      name: "Razor Blades",
      category: "Equipment",
      stock: 45,
      minStock: 20,
      price: 120000,
      supplier: "SharpEdge Supplies",
      expiryDate: "2026-01-10",
      lastRestocked: "2023-12-01",
      image:
        "https://images.unsplash.com/photo-1621607512214-68297480165e?w=300&q=80",
    },
    {
      id: "5",
      name: "Hair Conditioner",
      category: "Haircare",
      stock: 12,
      minStock: 10,
      price: 75000,
      supplier: "BarberSupply Co.",
      expiryDate: "2024-11-15",
      lastRestocked: "2023-10-20",
      image:
        "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=300&q=80",
    },
    {
      id: "6",
      name: "Styling Gel",
      category: "Styling",
      stock: 18,
      minStock: 15,
      price: 55000,
      supplier: "MensGrooming Inc.",
      expiryDate: "2025-02-28",
      lastRestocked: "2023-11-25",
      image:
        "https://images.unsplash.com/photo-1626808642875-0aa545482dfb?w=300&q=80",
    },
  ];

  // Filter products based on active tab and search query
  const filteredProducts = mockProducts.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.supplier.toLowerCase().includes(searchQuery.toLowerCase());

    if (activeTab === "all") return matchesSearch;
    if (activeTab === "low")
      return matchesSearch && product.stock <= product.minStock;
    if (activeTab === "out") return matchesSearch && product.stock === 0;
    return matchesSearch;
  });

  // Format price to Indonesian Rupiah
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(price);
  };

  // Get stock status and color
  const getStockStatus = (stock: number, minStock: number) => {
    if (stock === 0) return { status: "Out of Stock", color: "destructive" };
    if (stock <= minStock) return { status: "Low Stock", color: "warning" };
    return { status: "In Stock", color: "success" };
  };

  // Calculate stock percentage for progress bar
  const calculateStockPercentage = (stock: number, minStock: number) => {
    // Consider 2x minStock as "full" for visual purposes
    const fullStock = minStock * 2;
    const percentage = Math.min(Math.round((stock / fullStock) * 100), 100);
    return percentage;
  };

  // Handle restock dialog open
  const handleRestockClick = (product: Product) => {
    setSelectedProduct(product);
    setShowRestockDialog(true);
  };

  return (
    <div className="w-full min-h-screen bg-black text-white p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
              Inventory Dashboard
            </h1>
            <p className="text-gray-400">
              Manage your barbershop products and supplies
            </p>
          </div>
          <div className="flex gap-2 mt-4 md:mt-0">
            <Button
              variant="outline"
              className="border-gold hover:bg-gold hover:text-black"
            >
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
            <Dialog
              open={showAddProductDialog}
              onOpenChange={setShowAddProductDialog}
            >
              <DialogTrigger asChild>
                <Button className="bg-gold text-black hover:bg-gold/80">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Product
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-zinc-900 border border-gold text-white">
                <DialogHeader>
                  <DialogTitle className="text-gold">
                    Add New Product
                  </DialogTitle>
                  <DialogDescription className="text-gray-400">
                    Fill in the details to add a new product to your inventory.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2">
                      <label
                        htmlFor="name"
                        className="text-sm font-medium mb-2 block"
                      >
                        Product Name
                      </label>
                      <Input
                        id="name"
                        placeholder="Enter product name"
                        className="bg-zinc-800 border-zinc-700"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="category"
                        className="text-sm font-medium mb-2 block"
                      >
                        Category
                      </label>
                      <Select>
                        <SelectTrigger className="bg-zinc-800 border-zinc-700">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent className="bg-zinc-800 border-zinc-700 text-white">
                          <SelectItem value="styling">Styling</SelectItem>
                          <SelectItem value="haircare">Haircare</SelectItem>
                          <SelectItem value="grooming">Grooming</SelectItem>
                          <SelectItem value="equipment">Equipment</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label
                        htmlFor="price"
                        className="text-sm font-medium mb-2 block"
                      >
                        Price (Rp)
                      </label>
                      <Input
                        id="price"
                        type="number"
                        placeholder="0"
                        className="bg-zinc-800 border-zinc-700"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="stock"
                        className="text-sm font-medium mb-2 block"
                      >
                        Initial Stock
                      </label>
                      <Input
                        id="stock"
                        type="number"
                        placeholder="0"
                        className="bg-zinc-800 border-zinc-700"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="minStock"
                        className="text-sm font-medium mb-2 block"
                      >
                        Min Stock Level
                      </label>
                      <Input
                        id="minStock"
                        type="number"
                        placeholder="0"
                        className="bg-zinc-800 border-zinc-700"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="supplier"
                        className="text-sm font-medium mb-2 block"
                      >
                        Supplier
                      </label>
                      <Input
                        id="supplier"
                        placeholder="Enter supplier name"
                        className="bg-zinc-800 border-zinc-700"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="expiryDate"
                        className="text-sm font-medium mb-2 block"
                      >
                        Expiry Date
                      </label>
                      <Input
                        id="expiryDate"
                        type="date"
                        className="bg-zinc-800 border-zinc-700"
                      />
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => setShowAddProductDialog(false)}
                  >
                    Cancel
                  </Button>
                  <Button className="bg-gold text-black hover:bg-gold/80">
                    Add Product
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search products, categories, or suppliers..."
              className="pl-10 bg-zinc-900 border-zinc-700 text-white"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              className="border-zinc-700 hover:bg-zinc-800"
            >
              <Filter className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="border-zinc-700 hover:bg-zinc-800"
            >
              <ArrowDownUp className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="all" className="mb-6" onValueChange={setActiveTab}>
          <TabsList className="bg-zinc-900 border border-zinc-800">
            <TabsTrigger
              value="all"
              className="data-[state=active]:bg-gold data-[state=active]:text-black"
            >
              All Products
            </TabsTrigger>
            <TabsTrigger
              value="low"
              className="data-[state=active]:bg-gold data-[state=active]:text-black"
            >
              Low Stock
            </TabsTrigger>
            <TabsTrigger
              value="out"
              className="data-[state=active]:bg-gold data-[state=active]:text-black"
            >
              Out of Stock
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => {
            const stockStatus = getStockStatus(product.stock, product.minStock);
            const stockPercentage = calculateStockPercentage(
              product.stock,
              product.minStock,
            );

            return (
              <Card
                key={product.id}
                className="bg-zinc-900 border-zinc-800 overflow-hidden"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  <Badge
                    className={`absolute top-2 right-2 ${
                      stockStatus.color === "success"
                        ? "bg-green-600"
                        : stockStatus.color === "warning"
                          ? "bg-amber-600"
                          : "bg-red-600"
                    }`}
                  >
                    {stockStatus.status}
                  </Badge>
                </div>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-white">
                        {product.name}
                      </CardTitle>
                      <CardDescription className="text-gray-400">
                        {product.category}
                      </CardDescription>
                    </div>
                    <div className="text-right">
                      <p className="text-gold font-bold">
                        {formatPrice(product.price)}
                      </p>
                      <p className="text-xs text-gray-400">ID: {product.id}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="mb-4">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-gray-400">Stock Level</span>
                      <span className="text-sm font-medium">
                        {product.stock} units
                      </span>
                    </div>
                    <Progress
                      value={stockPercentage}
                      className="h-2 bg-zinc-800"
                      style={{
                        color:
                          stockStatus.color === "success"
                            ? "#22c55e"
                            : stockStatus.color === "warning"
                              ? "#f59e0b"
                              : "#ef4444",
                      }}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                    <div>
                      <p className="text-gray-400">Supplier</p>
                      <p className="font-medium truncate">{product.supplier}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Expiry Date</p>
                      <p className="font-medium">
                        {new Date(product.expiryDate).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-400">Min Stock</p>
                      <p className="font-medium">{product.minStock} units</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Last Restocked</p>
                      <p className="font-medium">
                        {new Date(product.lastRestocked).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between pt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-zinc-700 hover:bg-zinc-800"
                  >
                    <Package className="mr-2 h-4 w-4" />
                    Details
                  </Button>
                  <Button
                    size="sm"
                    className="bg-gold text-black hover:bg-gold/80"
                    onClick={() => handleRestockClick(product)}
                  >
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Restock
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="bg-zinc-800 p-4 rounded-full mb-4">
              <Package className="h-10 w-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-medium mb-2">No products found</h3>
            <p className="text-gray-400 mb-6 max-w-md">
              {searchQuery
                ? `We couldn't find any products matching "${searchQuery}". Try a different search term.`
                : "There are no products in this category. Add some products to get started."}
            </p>
            <Button className="bg-gold text-black hover:bg-gold/80">
              <Plus className="mr-2 h-4 w-4" />
              Add Product
            </Button>
          </div>
        )}

        {/* Restock Dialog */}
        <Dialog open={showRestockDialog} onOpenChange={setShowRestockDialog}>
          <DialogContent className="bg-zinc-900 border border-gold text-white">
            <DialogHeader>
              <DialogTitle className="text-gold">Restock Product</DialogTitle>
              <DialogDescription className="text-gray-400">
                Add inventory to {selectedProduct?.name}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="flex items-center gap-4">
                {selectedProduct && (
                  <img
                    src={selectedProduct.image}
                    alt={selectedProduct.name}
                    className="w-16 h-16 object-cover rounded-md"
                  />
                )}
                <div>
                  <h4 className="font-medium">{selectedProduct?.name}</h4>
                  <p className="text-sm text-gray-400">
                    Current stock: {selectedProduct?.stock} units
                  </p>
                </div>
              </div>
              <div>
                <label
                  htmlFor="quantity"
                  className="text-sm font-medium mb-2 block"
                >
                  Quantity to Add
                </label>
                <Input
                  id="quantity"
                  type="number"
                  placeholder="0"
                  className="bg-zinc-800 border-zinc-700"
                />
              </div>
              <div>
                <label
                  htmlFor="supplier"
                  className="text-sm font-medium mb-2 block"
                >
                  Supplier
                </label>
                <Select defaultValue={selectedProduct?.supplier}>
                  <SelectTrigger className="bg-zinc-800 border-zinc-700">
                    <SelectValue placeholder="Select supplier" />
                  </SelectTrigger>
                  <SelectContent className="bg-zinc-800 border-zinc-700 text-white">
                    <SelectItem value="BarberSupply Co.">
                      BarberSupply Co.
                    </SelectItem>
                    <SelectItem value="MensGrooming Inc.">
                      MensGrooming Inc.
                    </SelectItem>
                    <SelectItem value="SharpEdge Supplies">
                      SharpEdge Supplies
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label
                  htmlFor="date"
                  className="text-sm font-medium mb-2 block"
                >
                  Restock Date
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="date"
                    type="date"
                    defaultValue={new Date().toISOString().split("T")[0]}
                    className="pl-10 bg-zinc-800 border-zinc-700"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="expiryDate"
                  className="text-sm font-medium mb-2 block"
                >
                  New Expiry Date
                </label>
                <Input
                  id="expiryDate"
                  type="date"
                  defaultValue={selectedProduct?.expiryDate}
                  className="bg-zinc-800 border-zinc-700"
                />
              </div>
              <div>
                <label
                  htmlFor="notes"
                  className="text-sm font-medium mb-2 block"
                >
                  Notes
                </label>
                <Input
                  id="notes"
                  placeholder="Add any additional notes"
                  className="bg-zinc-800 border-zinc-700"
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setShowRestockDialog(false)}
              >
                Cancel
              </Button>
              <Button className="bg-gold text-black hover:bg-gold/80">
                Confirm Restock
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Low Stock Alert */}
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              className="fixed bottom-6 right-6 bg-red-600 hover:bg-red-700 text-white border-0 shadow-lg"
            >
              <AlertCircle className="mr-2 h-4 w-4" />3 Low Stock Items
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-zinc-900 border border-gold text-white">
            <DialogHeader>
              <DialogTitle className="text-gold">Low Stock Alert</DialogTitle>
              <DialogDescription className="text-gray-400">
                The following products are running low and need to be restocked
                soon.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              {mockProducts
                .filter((product) => product.stock <= product.minStock)
                .map((product) => (
                  <div
                    key={product.id}
                    className="flex items-center justify-between border-b border-zinc-800 pb-4"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-12 h-12 object-cover rounded-md"
                      />
                      <div>
                        <h4 className="font-medium">{product.name}</h4>
                        <p className="text-sm text-gray-400">
                          {product.stock} of {product.minStock} min units
                        </p>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      className="bg-gold text-black hover:bg-gold/80"
                      onClick={() => handleRestockClick(product)}
                    >
                      Restock
                    </Button>
                  </div>
                ))}
            </div>
            <DialogFooter>
              <Button className="w-full bg-gold text-black hover:bg-gold/80">
                <ShoppingCart className="mr-2 h-4 w-4" />
                Order All Low Stock Items
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default InventoryDashboard;

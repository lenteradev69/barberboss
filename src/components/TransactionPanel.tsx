import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
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
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Printer,
  CreditCard,
  Banknote,
  QrCode,
  Plus,
  Minus,
  Check,
  X,
} from "lucide-react";
import ServiceCard from "./ServiceCard";

interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: string;
  image: string;
}

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  stock: number;
}

const TransactionPanel = () => {
  // Default services data
  const defaultServices: Service[] = [
    {
      id: "1",
      name: "Regular Haircut",
      description: "Classic haircut with styling",
      price: 75000,
      duration: "30 min",
      image:
        "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=500&q=80",
    },
    {
      id: "2",
      name: "Beard Trim",
      description: "Precision beard shaping and trimming",
      price: 50000,
      duration: "20 min",
      image:
        "https://images.unsplash.com/photo-1517832606299-7ae9b720a186?w=500&q=80",
    },
    {
      id: "3",
      name: "Hair Coloring",
      description: "Full hair coloring service",
      price: 250000,
      duration: "90 min",
      image:
        "https://images.unsplash.com/photo-1562322140-8baeececf3df?w=500&q=80",
    },
    {
      id: "4",
      name: "Shave",
      description: "Traditional straight razor shave",
      price: 60000,
      duration: "25 min",
      image:
        "https://images.unsplash.com/photo-1521498542256-5aeb47ba2b36?w=500&q=80",
    },
    {
      id: "5",
      name: "Hair & Beard Combo",
      description: "Haircut with beard trim and styling",
      price: 120000,
      duration: "45 min",
      image:
        "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=500&q=80",
    },
  ];

  // Default products data
  const defaultProducts: Product[] = [
    {
      id: "p1",
      name: "Premium Pomade",
      price: 85000,
      image:
        "https://images.unsplash.com/photo-1597854710119-a352ea82a28d?w=500&q=80",
      stock: 15,
    },
    {
      id: "p2",
      name: "Beard Oil",
      price: 65000,
      image:
        "https://images.unsplash.com/photo-1621607512214-68297480165e?w=500&q=80",
      stock: 8,
    },
    {
      id: "p3",
      name: "Hair Wax",
      price: 70000,
      image:
        "https://images.unsplash.com/photo-1626108870272-ebe3b9a68825?w=500&q=80",
      stock: 12,
    },
    {
      id: "p4",
      name: "Shampoo",
      price: 95000,
      image:
        "https://images.unsplash.com/photo-1556227834-09f1de7a7d14?w=500&q=80",
      stock: 20,
    },
  ];

  // State management
  const [services] = useState<Service[]>(defaultServices);
  const [products] = useState<Product[]>(defaultProducts);
  const [selectedServices, setSelectedServices] = useState<Service[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<
    { product: Product; quantity: number }[]
  >([]);
  const [paymentMethod, setPaymentMethod] = useState<string>("cash");
  const [customerName, setCustomerName] = useState<string>("");
  const [customerPhone, setCustomerPhone] = useState<string>("");
  const [receiptDialogOpen, setReceiptDialogOpen] = useState<boolean>(false);
  const [paymentDialogOpen, setPaymentDialogOpen] = useState<boolean>(false);
  const [currentTab, setCurrentTab] = useState<string>("services");

  // Calculate subtotal, tax, and total
  const calculateSubtotal = () => {
    const servicesTotal = selectedServices.reduce(
      (sum, service) => sum + service.price,
      0,
    );
    const productsTotal = selectedProducts.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0,
    );
    return servicesTotal + productsTotal;
  };

  const subtotal = calculateSubtotal();
  const tax = Math.round(subtotal * 0.1); // 10% tax
  const total = subtotal + tax;

  // Format currency in Indonesian Rupiah
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(amount);
  };

  // Handle service selection
  const toggleServiceSelection = (service: Service) => {
    if (selectedServices.some((s) => s.id === service.id)) {
      setSelectedServices(selectedServices.filter((s) => s.id !== service.id));
    } else {
      setSelectedServices([...selectedServices, service]);
    }
  };

  // Handle product selection
  const addProduct = (product: Product) => {
    const existingProduct = selectedProducts.find(
      (item) => item.product.id === product.id,
    );
    if (existingProduct) {
      setSelectedProducts(
        selectedProducts.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        ),
      );
    } else {
      setSelectedProducts([...selectedProducts, { product, quantity: 1 }]);
    }
  };

  // Handle product quantity change
  const updateProductQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      setSelectedProducts(
        selectedProducts.filter((item) => item.product.id !== productId),
      );
    } else {
      setSelectedProducts(
        selectedProducts.map((item) =>
          item.product.id === productId
            ? { ...item, quantity: newQuantity }
            : item,
        ),
      );
    }
  };

  // Handle checkout process
  const handleCheckout = () => {
    if (selectedServices.length === 0 && selectedProducts.length === 0) {
      // Show error or notification that cart is empty
      return;
    }
    setPaymentDialogOpen(true);
  };

  // Handle payment completion
  const handlePaymentComplete = () => {
    setPaymentDialogOpen(false);
    setReceiptDialogOpen(true);
  };

  // Handle transaction completion
  const handleTransactionComplete = () => {
    // Reset the transaction
    setSelectedServices([]);
    setSelectedProducts([]);
    setCustomerName("");
    setCustomerPhone("");
    setPaymentMethod("cash");
    setReceiptDialogOpen(false);
  };

  // Generate receipt data for Bluetooth printing
  const getReceiptData = () => {
    return {
      customerName,
      customerPhone,
      services: selectedServices,
      products: selectedProducts,
      subtotal,
      tax,
      total,
      paymentMethod,
    };
  };

  // Generate receipt content
  const receiptContent = () => {
    const date = new Date().toLocaleDateString("id-ID");
    const time = new Date().toLocaleTimeString("id-ID");

    return (
      <div className="space-y-4 p-2">
        <div className="text-center">
          <h3 className="font-bold text-lg">BARBERSHOP POS</h3>
          <p className="text-sm text-muted-foreground">
            Jl. Contoh No. 123, Jakarta
          </p>
          <p className="text-sm text-muted-foreground">Tel: 021-1234567</p>
          <div className="flex justify-between text-sm mt-2">
            <span>Date: {date}</span>
            <span>Time: {time}</span>
          </div>
          {customerName && (
            <p className="text-sm mt-1">Customer: {customerName}</p>
          )}
        </div>

        <Separator />

        <div>
          <h4 className="font-medium mb-2">Services:</h4>
          {selectedServices.map((service) => (
            <div key={service.id} className="flex justify-between text-sm">
              <span>{service.name}</span>
              <span>{formatCurrency(service.price)}</span>
            </div>
          ))}
        </div>

        {selectedProducts.length > 0 && (
          <div>
            <h4 className="font-medium mb-2">Products:</h4>
            {selectedProducts.map((item) => (
              <div
                key={item.product.id}
                className="flex justify-between text-sm"
              >
                <span>
                  {item.product.name} x{item.quantity}
                </span>
                <span>
                  {formatCurrency(item.product.price * item.quantity)}
                </span>
              </div>
            ))}
          </div>
        )}

        <Separator />

        <div className="space-y-1">
          <div className="flex justify-between text-sm">
            <span>Subtotal:</span>
            <span>{formatCurrency(subtotal)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Tax (10%):</span>
            <span>{formatCurrency(tax)}</span>
          </div>
          <div className="flex justify-between font-bold">
            <span>Total:</span>
            <span>{formatCurrency(total)}</span>
          </div>
          <div className="flex justify-between text-sm mt-2">
            <span>Payment Method:</span>
            <span className="capitalize">{paymentMethod}</span>
          </div>
        </div>

        <Separator />

        <div className="text-center text-sm">
          <p>Thank you for your visit!</p>
          <p>Please come again</p>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-black min-h-screen text-white">
      <div className="container mx-auto p-4">
        <h1 className="text-2xl md:text-3xl font-bold text-center mb-6 text-amber-400">
          Transaction Panel
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Services and Products Selection */}
          <div className="lg:col-span-2">
            <Tabs
              defaultValue="services"
              className="w-full"
              onValueChange={setCurrentTab}
            >
              <TabsList className="grid w-full grid-cols-2 bg-gray-900">
                <TabsTrigger
                  value="services"
                  className="data-[state=active]:bg-amber-500 data-[state=active]:text-black"
                >
                  Services
                </TabsTrigger>
                <TabsTrigger
                  value="products"
                  className="data-[state=active]:bg-amber-500 data-[state=active]:text-black"
                >
                  Products
                </TabsTrigger>
              </TabsList>

              <TabsContent value="services" className="mt-4">
                <ScrollArea className="h-[60vh]">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {services.map((service) => (
                      <ServiceCard
                        key={service.id}
                        service={service}
                        isSelected={selectedServices.some(
                          (s) => s.id === service.id,
                        )}
                        onSelect={() => toggleServiceSelection(service)}
                        formatCurrency={formatCurrency}
                      />
                    ))}
                  </div>
                </ScrollArea>
              </TabsContent>

              <TabsContent value="products" className="mt-4">
                <ScrollArea className="h-[60vh]">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {products.map((product) => (
                      <Card
                        key={product.id}
                        className="bg-gray-900 border-amber-500/30 overflow-hidden"
                      >
                        <div className="relative h-40">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                          <Badge className="absolute top-2 right-2 bg-amber-500 text-black">
                            Stock: {product.stock}
                          </Badge>
                        </div>
                        <CardContent className="p-4">
                          <div className="flex justify-between items-center mb-2">
                            <h3 className="font-semibold text-lg">
                              {product.name}
                            </h3>
                            <span className="text-amber-400 font-medium">
                              {formatCurrency(product.price)}
                            </span>
                          </div>
                          <Button
                            onClick={() => addProduct(product)}
                            className="w-full bg-amber-500 hover:bg-amber-600 text-black"
                          >
                            Add to Cart
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </ScrollArea>
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Column - Cart and Checkout */}
          <div>
            <Card className="bg-gray-900 border-amber-500/30">
              <CardHeader>
                <CardTitle className="text-amber-400">
                  Current Transaction
                </CardTitle>
                <CardDescription>
                  Selected services and products
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Customer Information */}
                <div className="space-y-2">
                  <Label htmlFor="customerName">Customer Name</Label>
                  <Input
                    id="customerName"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Enter customer name"
                    className="bg-gray-800 border-gray-700"
                  />

                  <Label htmlFor="customerPhone">Phone Number</Label>
                  <Input
                    id="customerPhone"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="Enter phone number"
                    className="bg-gray-800 border-gray-700"
                  />
                </div>

                <Separator className="bg-gray-700" />

                {/* Selected Services */}
                <div>
                  <h3 className="font-medium mb-2">Selected Services</h3>
                  {selectedServices.length === 0 ? (
                    <p className="text-sm text-gray-400">
                      No services selected
                    </p>
                  ) : (
                    <ScrollArea className="h-[120px]">
                      <div className="space-y-2">
                        {selectedServices.map((service) => (
                          <div
                            key={service.id}
                            className="flex justify-between items-center"
                          >
                            <div>
                              <p className="font-medium">{service.name}</p>
                              <p className="text-sm text-gray-400">
                                {service.duration}
                              </p>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-amber-400">
                                {formatCurrency(service.price)}
                              </span>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => toggleServiceSelection(service)}
                                className="h-8 w-8 p-0 text-red-500 hover:text-red-400 hover:bg-gray-800"
                              >
                                <X size={16} />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  )}
                </div>

                {/* Selected Products */}
                <div>
                  <h3 className="font-medium mb-2">Selected Products</h3>
                  {selectedProducts.length === 0 ? (
                    <p className="text-sm text-gray-400">
                      No products selected
                    </p>
                  ) : (
                    <ScrollArea className="h-[120px]">
                      <div className="space-y-2">
                        {selectedProducts.map((item) => (
                          <div
                            key={item.product.id}
                            className="flex justify-between items-center"
                          >
                            <p className="font-medium">{item.product.name}</p>
                            <div className="flex items-center gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() =>
                                  updateProductQuantity(
                                    item.product.id,
                                    item.quantity - 1,
                                  )
                                }
                                className="h-6 w-6 p-0 border-gray-700 hover:bg-gray-800"
                              >
                                <Minus size={12} />
                              </Button>
                              <span className="w-6 text-center">
                                {item.quantity}
                              </span>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() =>
                                  updateProductQuantity(
                                    item.product.id,
                                    item.quantity + 1,
                                  )
                                }
                                className="h-6 w-6 p-0 border-gray-700 hover:bg-gray-800"
                              >
                                <Plus size={12} />
                              </Button>
                              <span className="text-amber-400 min-w-[80px] text-right">
                                {formatCurrency(
                                  item.product.price * item.quantity,
                                )}
                              </span>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() =>
                                  updateProductQuantity(item.product.id, 0)
                                }
                                className="h-8 w-8 p-0 text-red-500 hover:text-red-400 hover:bg-gray-800"
                              >
                                <X size={16} />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  )}
                </div>

                <Separator className="bg-gray-700" />

                {/* Transaction Summary */}
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span>{formatCurrency(subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax (10%):</span>
                    <span>{formatCurrency(tax)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total:</span>
                    <span className="text-amber-400">
                      {formatCurrency(total)}
                    </span>
                  </div>
                </div>
              </CardContent>

              <CardFooter>
                <Button
                  onClick={handleCheckout}
                  disabled={
                    selectedServices.length === 0 &&
                    selectedProducts.length === 0
                  }
                  className="w-full bg-amber-500 hover:bg-amber-600 text-black font-bold py-6"
                >
                  Proceed to Checkout
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>

      {/* Payment Method Dialog */}
      <Dialog open={paymentDialogOpen} onOpenChange={setPaymentDialogOpen}>
        <DialogContent className="bg-gray-900 text-white border-amber-500/30 max-w-md">
          <DialogHeader>
            <DialogTitle className="text-amber-400">
              Select Payment Method
            </DialogTitle>
            <DialogDescription>
              Choose how the customer will pay for this transaction.
            </DialogDescription>
          </DialogHeader>

          <div className="py-4">
            <RadioGroup
              value={paymentMethod}
              onValueChange={setPaymentMethod}
              className="space-y-3"
            >
              <div className="flex items-center space-x-2 rounded-md border border-gray-700 p-3 hover:bg-gray-800">
                <RadioGroupItem
                  value="cash"
                  id="cash"
                  className="border-amber-500 text-amber-500"
                />
                <Label
                  htmlFor="cash"
                  className="flex items-center gap-2 cursor-pointer w-full"
                >
                  <Banknote className="h-5 w-5 text-amber-400" />
                  <div>
                    <p className="font-medium">Cash</p>
                    <p className="text-sm text-gray-400">
                      Traditional cash payment
                    </p>
                  </div>
                </Label>
              </div>

              <div className="flex items-center space-x-2 rounded-md border border-gray-700 p-3 hover:bg-gray-800">
                <RadioGroupItem
                  value="qris"
                  id="qris"
                  className="border-amber-500 text-amber-500"
                />
                <Label
                  htmlFor="qris"
                  className="flex items-center gap-2 cursor-pointer w-full"
                >
                  <QrCode className="h-5 w-5 text-amber-400" />
                  <div>
                    <p className="font-medium">QRIS</p>
                    <p className="text-sm text-gray-400">Scan QR code to pay</p>
                  </div>
                </Label>
              </div>

              <div className="flex items-center space-x-2 rounded-md border border-gray-700 p-3 hover:bg-gray-800">
                <RadioGroupItem
                  value="transfer"
                  id="transfer"
                  className="border-amber-500 text-amber-500"
                />
                <Label
                  htmlFor="transfer"
                  className="flex items-center gap-2 cursor-pointer w-full"
                >
                  <CreditCard className="h-5 w-5 text-amber-400" />
                  <div>
                    <p className="font-medium">Bank Transfer</p>
                    <p className="text-sm text-gray-400">
                      Direct bank transfer
                    </p>
                  </div>
                </Label>
              </div>
            </RadioGroup>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setPaymentDialogOpen(false)}
              className="border-gray-700 hover:bg-gray-800"
            >
              Cancel
            </Button>
            <Button
              onClick={handlePaymentComplete}
              className="bg-amber-500 hover:bg-amber-600 text-black"
            >
              Confirm Payment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Receipt Dialog */}
      <Dialog open={receiptDialogOpen} onOpenChange={setReceiptDialogOpen}>
        <DialogContent className="bg-white text-black border-amber-500/30 max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center">Receipt</DialogTitle>
          </DialogHeader>

          <div className="bg-white rounded-md p-4">{receiptContent()}</div>

          <DialogFooter className="flex flex-col sm:flex-row gap-2">
            <a
              href={`my.bluetoothprint.scheme://${window.location.origin}/api/print-receipt?id=${Date.now()}`}
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-gray-300 bg-white hover:bg-gray-100 h-10 px-4 py-2 gap-2"
            >
              <Printer size={16} />
              Print via Bluetooth
            </a>
            <Button
              variant="outline"
              className="border-gray-300 hover:bg-gray-100 flex items-center gap-2"
              onClick={() => console.log("Print receipt")}
            >
              <Printer size={16} />
              Print Receipt
            </Button>
            <Button
              onClick={handleTransactionComplete}
              className="bg-amber-500 hover:bg-amber-600 text-black flex items-center gap-2"
            >
              <Check size={16} />
              Complete Transaction
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Empty Cart Alert */}
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <span className="hidden">Open Alert</span>
        </AlertDialogTrigger>
        <AlertDialogContent className="bg-gray-900 text-white border-amber-500/30">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-amber-400">
              Empty Cart
            </AlertDialogTitle>
            <AlertDialogDescription>
              Please select at least one service or product before proceeding to
              checkout.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction className="bg-amber-500 hover:bg-amber-600 text-black">
              OK
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default TransactionPanel;

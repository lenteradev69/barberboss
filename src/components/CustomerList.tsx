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
import { ScrollArea } from "@/components/ui/scroll-area";
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
  Calendar,
  Download,
  Filter,
  Plus,
  Search,
  Scissors,
  Phone,
  Mail,
  Star,
  Clock,
  User,
  Users,
} from "lucide-react";

interface Customer {
  id: string;
  name: string;
  phone: string;
  email: string;
  membershipLevel: string;
  loyaltyPoints: number;
  lastVisit: string;
  totalVisits: number;
  favoriteServices: string[];
  avatar: string;
}

const CustomerList = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddCustomerDialog, setShowAddCustomerDialog] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null,
  );

  // Mock data for customers
  const mockCustomers: Customer[] = [
    {
      id: "1",
      name: "Ahmad Rizky",
      phone: "+62 812-3456-7890",
      email: "ahmad.r@example.com",
      membershipLevel: "Gold",
      loyaltyPoints: 450,
      lastVisit: "2023-11-15",
      totalVisits: 24,
      favoriteServices: ["Regular Haircut", "Beard Trim"],
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ahmad",
    },
    {
      id: "2",
      name: "Budi Santoso",
      phone: "+62 813-9876-5432",
      email: "budi.s@example.com",
      membershipLevel: "Silver",
      loyaltyPoints: 280,
      lastVisit: "2023-12-01",
      totalVisits: 15,
      favoriteServices: ["Hair Coloring", "Shave"],
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Budi",
    },
    {
      id: "3",
      name: "Citra Dewi",
      phone: "+62 857-1234-5678",
      email: "citra.d@example.com",
      membershipLevel: "Bronze",
      loyaltyPoints: 120,
      lastVisit: "2023-12-10",
      totalVisits: 8,
      favoriteServices: ["Regular Haircut"],
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Citra",
    },
    {
      id: "4",
      name: "Denny Pratama",
      phone: "+62 878-8765-4321",
      email: "denny.p@example.com",
      membershipLevel: "Gold",
      loyaltyPoints: 520,
      lastVisit: "2023-12-05",
      totalVisits: 32,
      favoriteServices: ["Hair & Beard Combo", "Hair Coloring"],
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Denny",
    },
    {
      id: "5",
      name: "Eka Putri",
      phone: "+62 819-2345-6789",
      email: "eka.p@example.com",
      membershipLevel: "Silver",
      loyaltyPoints: 310,
      lastVisit: "2023-11-25",
      totalVisits: 18,
      favoriteServices: ["Hair Coloring"],
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Eka",
    },
    {
      id: "6",
      name: "Farhan Malik",
      phone: "+62 838-7654-3210",
      email: "farhan.m@example.com",
      membershipLevel: "Bronze",
      loyaltyPoints: 90,
      lastVisit: "2023-12-15",
      totalVisits: 5,
      favoriteServices: ["Regular Haircut", "Shave"],
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Farhan",
    },
  ];

  // Filter customers based on active tab and search query
  const filteredCustomers = mockCustomers.filter((customer) => {
    const matchesSearch =
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.phone.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchQuery.toLowerCase());

    if (activeTab === "all") return matchesSearch;
    if (activeTab === "gold")
      return matchesSearch && customer.membershipLevel === "Gold";
    if (activeTab === "silver")
      return matchesSearch && customer.membershipLevel === "Silver";
    if (activeTab === "bronze")
      return matchesSearch && customer.membershipLevel === "Bronze";
    return matchesSearch;
  });

  // Get membership badge color
  const getMembershipColor = (level: string) => {
    switch (level) {
      case "Gold":
        return "bg-amber-500 text-black";
      case "Silver":
        return "bg-gray-400 text-black";
      case "Bronze":
        return "bg-amber-700 text-white";
      default:
        return "bg-gray-600";
    }
  };

  // Format date to readable format
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="w-full min-h-screen bg-black text-white p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
              Customer Management
            </h1>
            <p className="text-gray-400">
              Manage your customer profiles and loyalty programs
            </p>
          </div>
          <div className="flex gap-2 mt-4 md:mt-0">
            <Button
              variant="outline"
              className="border-amber-500 hover:bg-amber-500 hover:text-black"
            >
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
            <Dialog
              open={showAddCustomerDialog}
              onOpenChange={setShowAddCustomerDialog}
            >
              <DialogTrigger asChild>
                <Button className="bg-amber-500 text-black hover:bg-amber-600">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Customer
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-zinc-900 border border-amber-500 text-white">
                <DialogHeader>
                  <DialogTitle className="text-amber-500">
                    Add New Customer
                  </DialogTitle>
                  <DialogDescription className="text-gray-400">
                    Fill in the details to add a new customer to your database.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2">
                      <label
                        htmlFor="name"
                        className="text-sm font-medium mb-2 block"
                      >
                        Full Name
                      </label>
                      <Input
                        id="name"
                        placeholder="Enter customer name"
                        className="bg-zinc-800 border-zinc-700"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="phone"
                        className="text-sm font-medium mb-2 block"
                      >
                        Phone Number
                      </label>
                      <Input
                        id="phone"
                        placeholder="+62 xxx-xxxx-xxxx"
                        className="bg-zinc-800 border-zinc-700"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="text-sm font-medium mb-2 block"
                      >
                        Email Address
                      </label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="customer@example.com"
                        className="bg-zinc-800 border-zinc-700"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="membership"
                        className="text-sm font-medium mb-2 block"
                      >
                        Membership Level
                      </label>
                      <Select>
                        <SelectTrigger className="bg-zinc-800 border-zinc-700">
                          <SelectValue placeholder="Select level" />
                        </SelectTrigger>
                        <SelectContent className="bg-zinc-800 border-zinc-700 text-white">
                          <SelectItem value="bronze">Bronze</SelectItem>
                          <SelectItem value="silver">Silver</SelectItem>
                          <SelectItem value="gold">Gold</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label
                        htmlFor="points"
                        className="text-sm font-medium mb-2 block"
                      >
                        Initial Loyalty Points
                      </label>
                      <Input
                        id="points"
                        type="number"
                        placeholder="0"
                        className="bg-zinc-800 border-zinc-700"
                      />
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => setShowAddCustomerDialog(false)}
                  >
                    Cancel
                  </Button>
                  <Button className="bg-amber-500 text-black hover:bg-amber-600">
                    Add Customer
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
              placeholder="Search by name, phone, or email..."
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
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="all" className="mb-6" onValueChange={setActiveTab}>
          <TabsList className="bg-zinc-900 border border-zinc-800">
            <TabsTrigger
              value="all"
              className="data-[state=active]:bg-amber-500 data-[state=active]:text-black"
            >
              All Customers
            </TabsTrigger>
            <TabsTrigger
              value="gold"
              className="data-[state=active]:bg-amber-500 data-[state=active]:text-black"
            >
              Gold Members
            </TabsTrigger>
            <TabsTrigger
              value="silver"
              className="data-[state=active]:bg-amber-500 data-[state=active]:text-black"
            >
              Silver Members
            </TabsTrigger>
            <TabsTrigger
              value="bronze"
              className="data-[state=active]:bg-amber-500 data-[state=active]:text-black"
            >
              Bronze Members
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Customer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCustomers.map((customer) => (
            <Card
              key={customer.id}
              className="bg-zinc-900 border-zinc-800 overflow-hidden hover:border-amber-500/50 transition-colors"
            >
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-full overflow-hidden bg-zinc-800">
                      <img
                        src={customer.avatar}
                        alt={customer.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div>
                      <CardTitle className="text-white text-lg">
                        {customer.name}
                      </CardTitle>
                      <CardDescription className="text-gray-400">
                        Customer ID: {customer.id}
                      </CardDescription>
                    </div>
                  </div>
                  <Badge
                    className={getMembershipColor(customer.membershipLevel)}
                  >
                    {customer.membershipLevel}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-gray-400" />
                    <p className="font-medium">{customer.phone}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-gray-400" />
                    <p className="font-medium truncate">{customer.email}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-amber-500" />
                    <p className="font-medium">
                      {customer.loyaltyPoints} Points
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-gray-400" />
                    <p className="font-medium">
                      Last visit: {formatDate(customer.lastVisit)}
                    </p>
                  </div>
                </div>

                <div className="mt-4">
                  <p className="text-sm text-gray-400 mb-2">
                    Favorite Services:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {customer.favoriteServices.map((service, index) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className="border-amber-500/50 text-amber-500"
                      >
                        <Scissors className="h-3 w-3 mr-1" />
                        {service}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between pt-2">
                <div className="flex items-center gap-1 text-sm text-gray-400">
                  <Users className="h-4 w-4" />
                  <span>{customer.totalVisits} total visits</span>
                </div>
                <Button
                  size="sm"
                  className="bg-amber-500 text-black hover:bg-amber-600"
                >
                  <User className="mr-2 h-4 w-4" />
                  View Profile
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredCustomers.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="bg-zinc-800 p-4 rounded-full mb-4">
              <Users className="h-10 w-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-medium mb-2">No customers found</h3>
            <p className="text-gray-400 mb-6 max-w-md">
              {searchQuery
                ? `We couldn't find any customers matching "${searchQuery}". Try a different search term.`
                : "There are no customers in this category. Add some customers to get started."}
            </p>
            <Button className="bg-amber-500 text-black hover:bg-amber-600">
              <Plus className="mr-2 h-4 w-4" />
              Add Customer
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerList;

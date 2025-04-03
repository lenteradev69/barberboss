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
  Calendar,
  Phone,
  Mail,
  Star,
  Clock,
  User,
  Users,
  Edit,
  Trash2,
  Gift,
  Scissors,
  ArrowLeft,
  MessageSquare,
  CalendarClock,
  CreditCard,
  History,
  Award,
  ChevronRight,
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
  address?: string;
  birthdate?: string;
  notes?: string;
  joinDate: string;
}

interface Visit {
  id: string;
  date: string;
  services: string[];
  products: string[];
  totalAmount: number;
  barber: string;
}

const CustomerProfile = ({ customerId = "1" }: { customerId?: string }) => {
  const [activeTab, setActiveTab] = useState("profile");
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showAddPointsDialog, setShowAddPointsDialog] = useState(false);

  // Mock customer data
  const customer: Customer = {
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
    address: "Jl. Sudirman No. 123, Jakarta Pusat",
    birthdate: "1990-05-15",
    notes: "Prefers classic styles. Allergic to certain hair products.",
    joinDate: "2022-03-10",
  };

  // Mock visit history
  const visitHistory: Visit[] = [
    {
      id: "v1",
      date: "2023-11-15",
      services: ["Regular Haircut", "Beard Trim"],
      products: ["Hair Pomade"],
      totalAmount: 150000,
      barber: "Deni",
    },
    {
      id: "v2",
      date: "2023-10-20",
      services: ["Hair Coloring"],
      products: [],
      totalAmount: 250000,
      barber: "Budi",
    },
    {
      id: "v3",
      date: "2023-09-05",
      services: ["Regular Haircut"],
      products: ["Beard Oil"],
      totalAmount: 140000,
      barber: "Deni",
    },
    {
      id: "v4",
      date: "2023-08-15",
      services: ["Hair & Beard Combo"],
      products: [],
      totalAmount: 120000,
      barber: "Agus",
    },
    {
      id: "v5",
      date: "2023-07-22",
      services: ["Regular Haircut", "Shave"],
      products: ["Hair Wax"],
      totalAmount: 185000,
      barber: "Budi",
    },
  ];

  // Format currency to Indonesian Rupiah
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(price);
  };

  // Format date to readable format
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

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

  // Calculate progress to next tier
  const calculateNextTierProgress = () => {
    if (customer.membershipLevel === "Bronze") {
      // Need 300 points for Silver
      return Math.min(Math.round((customer.loyaltyPoints / 300) * 100), 100);
    } else if (customer.membershipLevel === "Silver") {
      // Need 500 points for Gold
      return Math.min(Math.round((customer.loyaltyPoints / 500) * 100), 100);
    } else {
      // Already Gold, show full
      return 100;
    }
  };

  // Get next tier name
  const getNextTier = () => {
    if (customer.membershipLevel === "Bronze") return "Silver";
    if (customer.membershipLevel === "Silver") return "Gold";
    return "Gold (Max Level)";
  };

  // Get points needed for next tier
  const getPointsNeeded = () => {
    if (customer.membershipLevel === "Bronze") {
      return Math.max(300 - customer.loyaltyPoints, 0);
    } else if (customer.membershipLevel === "Silver") {
      return Math.max(500 - customer.loyaltyPoints, 0);
    }
    return 0;
  };

  return (
    <div className="w-full min-h-screen bg-black text-white p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header with back button */}
        <div className="flex items-center mb-6">
          <Button
            variant="ghost"
            size="sm"
            className="mr-2 text-gray-400 hover:text-white"
            onClick={() => console.log("Navigate back to customer list")}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl md:text-3xl font-bold text-white">
            Customer Profile
          </h1>
        </div>

        {/* Customer Profile Header Card */}
        <Card className="bg-zinc-900 border-zinc-800 mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
              {/* Avatar and basic info */}
              <div className="flex flex-col items-center text-center md:text-left md:items-start">
                <div className="h-24 w-24 rounded-full overflow-hidden bg-zinc-800 mb-4">
                  <img
                    src={customer.avatar}
                    alt={customer.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <h2 className="text-2xl font-bold text-white mb-1">
                  {customer.name}
                </h2>
                <div className="flex items-center gap-2 mb-3">
                  <Badge
                    className={getMembershipColor(customer.membershipLevel)}
                  >
                    {customer.membershipLevel} Member
                  </Badge>
                  <Badge variant="outline" className="border-amber-500/50">
                    {customer.totalVisits} Visits
                  </Badge>
                </div>
                <div className="flex flex-col gap-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-gray-400" />
                    <span>{customer.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-gray-400" />
                    <span>{customer.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <span>Joined: {formatDate(customer.joinDate)}</span>
                  </div>
                </div>
              </div>

              {/* Loyalty points and actions */}
              <div className="flex-1 w-full md:w-auto">
                <Card className="bg-zinc-800 border-amber-500/30">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-amber-500 flex items-center gap-2">
                      <Star className="h-5 w-5" />
                      Loyalty Program
                    </CardTitle>
                    <CardDescription>
                      Track points and membership benefits
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="mb-4">
                      <div className="flex justify-between mb-1">
                        <span className="text-sm text-gray-400">
                          Progress to {getNextTier()}
                        </span>
                        <span className="text-sm font-medium">
                          {customer.loyaltyPoints} points
                        </span>
                      </div>
                      <Progress
                        value={calculateNextTierProgress()}
                        className="h-2 bg-zinc-700"
                      />
                      {getPointsNeeded() > 0 && (
                        <p className="text-xs text-gray-400 mt-1">
                          {getPointsNeeded()} more points needed for{" "}
                          {getNextTier()}
                        </p>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-amber-500/50 hover:bg-amber-500/10"
                        onClick={() => setShowAddPointsDialog(true)}
                      >
                        <Gift className="mr-2 h-4 w-4" />
                        Add Points
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-amber-500/50 hover:bg-amber-500/10"
                      >
                        <Award className="mr-2 h-4 w-4" />
                        Benefits
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <div className="flex gap-2 mt-4">
                  <Button
                    className="flex-1 bg-amber-500 text-black hover:bg-amber-600"
                    onClick={() => console.log("New transaction")}
                  >
                    <Scissors className="mr-2 h-4 w-4" />
                    New Service
                  </Button>
                  <Button
                    variant="outline"
                    className="border-zinc-700 hover:bg-zinc-800"
                    onClick={() => setShowEditDialog(true)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    className="border-zinc-700 hover:bg-zinc-800 text-red-500 hover:text-red-400"
                    onClick={() => setShowDeleteDialog(true)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs for different sections */}
        <Tabs
          defaultValue="profile"
          className="mb-6"
          onValueChange={setActiveTab}
        >
          <TabsList className="bg-zinc-900 border border-zinc-800">
            <TabsTrigger
              value="profile"
              className="data-[state=active]:bg-amber-500 data-[state=active]:text-black"
            >
              Profile
            </TabsTrigger>
            <TabsTrigger
              value="history"
              className="data-[state=active]:bg-amber-500 data-[state=active]:text-black"
            >
              Visit History
            </TabsTrigger>
            <TabsTrigger
              value="appointments"
              className="data-[state=active]:bg-amber-500 data-[state=active]:text-black"
            >
              Appointments
            </TabsTrigger>
          </TabsList>

          {/* Profile Tab Content */}
          <TabsContent value="profile" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Personal Information */}
              <Card className="bg-zinc-900 border-zinc-800">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <User className="h-5 w-5 text-amber-500" />
                    Personal Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-400">Full Name</p>
                      <p className="font-medium">{customer.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Phone Number</p>
                      <p className="font-medium">{customer.phone}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Email Address</p>
                      <p className="font-medium">{customer.email}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Address</p>
                      <p className="font-medium">{customer.address || "N/A"}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Birthdate</p>
                      <p className="font-medium">
                        {customer.birthdate
                          ? formatDate(customer.birthdate)
                          : "N/A"}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Preferences and Notes */}
              <Card className="bg-zinc-900 border-zinc-800">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Scissors className="h-5 w-5 text-amber-500" />
                    Preferences & Notes
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-400">Favorite Services</p>
                      <div className="flex flex-wrap gap-2 mt-2">
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
                    <div>
                      <p className="text-sm text-gray-400">Notes</p>
                      <p className="font-medium mt-1">
                        {customer.notes || "No notes available"}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Last Visit</p>
                      <p className="font-medium">
                        {formatDate(customer.lastVisit)}
                      </p>
                    </div>
                    <div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full border-amber-500/50 hover:bg-amber-500/10 mt-2"
                      >
                        <MessageSquare className="mr-2 h-4 w-4" />
                        Send Message
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Visit History Tab Content */}
          <TabsContent value="history" className="mt-6">
            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <History className="h-5 w-5 text-amber-500" />
                  Visit History
                </CardTitle>
                <CardDescription>
                  Record of past services and purchases
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[400px] pr-4">
                  <div className="space-y-4">
                    {visitHistory.map((visit) => (
                      <div
                        key={visit.id}
                        className="border-b border-zinc-800 pb-4 last:border-0"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <p className="font-medium">
                              {formatDate(visit.date)}
                            </p>
                            <p className="text-sm text-gray-400">
                              Barber: {visit.barber}
                            </p>
                          </div>
                          <p className="text-amber-500 font-bold">
                            {formatPrice(visit.totalAmount)}
                          </p>
                        </div>

                        <div className="mt-2">
                          <p className="text-sm text-gray-400 mb-1">
                            Services:
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {visit.services.map((service, index) => (
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

                        {visit.products.length > 0 && (
                          <div className="mt-2">
                            <p className="text-sm text-gray-400 mb-1">
                              Products:
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {visit.products.map((product, index) => (
                                <Badge
                                  key={index}
                                  className="bg-zinc-800 text-white"
                                >
                                  {product}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
              <CardFooter>
                <Button
                  variant="outline"
                  className="w-full border-amber-500/50 hover:bg-amber-500/10"
                >
                  View Complete History
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* Appointments Tab Content */}
          <TabsContent value="appointments" className="mt-6">
            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <CalendarClock className="h-5 w-5 text-amber-500" />
                  Upcoming Appointments
                </CardTitle>
                <CardDescription>
                  Scheduled services and reminders
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <div className="bg-zinc-800 p-4 rounded-full mb-4">
                    <CalendarClock className="h-10 w-10 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-medium mb-2">
                    No upcoming appointments
                  </h3>
                  <p className="text-gray-400 mb-6 max-w-md">
                    This customer doesn't have any scheduled appointments.
                  </p>
                  <Button className="bg-amber-500 text-black hover:bg-amber-600">
                    Schedule Appointment
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Edit Customer Dialog */}
        <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
          <DialogContent className="bg-zinc-900 border border-amber-500 text-white">
            <DialogHeader>
              <DialogTitle className="text-amber-500">
                Edit Customer Details
              </DialogTitle>
              <DialogDescription className="text-gray-400">
                Update customer information and preferences.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label
                    htmlFor="edit-name"
                    className="text-sm font-medium mb-2 block"
                  >
                    Full Name
                  </label>
                  <Input
                    id="edit-name"
                    defaultValue={customer.name}
                    className="bg-zinc-800 border-zinc-700"
                  />
                </div>
                <div>
                  <label
                    htmlFor="edit-phone"
                    className="text-sm font-medium mb-2 block"
                  >
                    Phone Number
                  </label>
                  <Input
                    id="edit-phone"
                    defaultValue={customer.phone}
                    className="bg-zinc-800 border-zinc-700"
                  />
                </div>
                <div>
                  <label
                    htmlFor="edit-email"
                    className="text-sm font-medium mb-2 block"
                  >
                    Email Address
                  </label>
                  <Input
                    id="edit-email"
                    type="email"
                    defaultValue={customer.email}
                    className="bg-zinc-800 border-zinc-700"
                  />
                </div>
                <div className="col-span-2">
                  <label
                    htmlFor="edit-address"
                    className="text-sm font-medium mb-2 block"
                  >
                    Address
                  </label>
                  <Input
                    id="edit-address"
                    defaultValue={customer.address}
                    className="bg-zinc-800 border-zinc-700"
                  />
                </div>
                <div>
                  <label
                    htmlFor="edit-birthdate"
                    className="text-sm font-medium mb-2 block"
                  >
                    Birthdate
                  </label>
                  <Input
                    id="edit-birthdate"
                    type="date"
                    defaultValue={customer.birthdate}
                    className="bg-zinc-800 border-zinc-700"
                  />
                </div>
                <div>
                  <label
                    htmlFor="edit-membership"
                    className="text-sm font-medium mb-2 block"
                  >
                    Membership Level
                  </label>
                  <select
                    id="edit-membership"
                    defaultValue={customer.membershipLevel}
                    className="w-full rounded-md bg-zinc-800 border-zinc-700 text-white py-2 px-3"
                  >
                    <option value="Bronze">Bronze</option>
                    <option value="Silver">Silver</option>
                    <option value="Gold">Gold</option>
                  </select>
                </div>
                <div className="col-span-2">
                  <label
                    htmlFor="edit-notes"
                    className="text-sm font-medium mb-2 block"
                  >
                    Notes
                  </label>
                  <Input
                    id="edit-notes"
                    defaultValue={customer.notes}
                    className="bg-zinc-800 border-zinc-700"
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setShowEditDialog(false)}
              >
                Cancel
              </Button>
              <Button className="bg-amber-500 text-black hover:bg-amber-600">
                Save Changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Delete Customer Dialog */}
        <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
          <AlertDialogContent className="bg-zinc-900 border border-red-500/30 text-white">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-red-500">
                Delete Customer
              </AlertDialogTitle>
              <AlertDialogDescription className="text-gray-400">
                Are you sure you want to delete this customer? This action
                cannot be undone and all customer data will be permanently
                removed.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel
                className="bg-transparent border-zinc-700 hover:bg-zinc-800 text-white"
                onClick={() => setShowDeleteDialog(false)}
              >
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction className="bg-red-500 hover:bg-red-600 text-white">
                Delete Customer
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {/* Add Points Dialog */}
        <Dialog
          open={showAddPointsDialog}
          onOpenChange={setShowAddPointsDialog}
        >
          <DialogContent className="bg-zinc-900 border border-amber-500 text-white">
            <DialogHeader>
              <DialogTitle className="text-amber-500">
                Add Loyalty Points
              </DialogTitle>
              <DialogDescription className="text-gray-400">
                Add loyalty points for purchases or special promotions.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div>
                <label
                  htmlFor="points-amount"
                  className="text-sm font-medium mb-2 block"
                >
                  Points to Add
                </label>
                <Input
                  id="points-amount"
                  type="number"
                  placeholder="0"
                  className="bg-zinc-800 border-zinc-700"
                />
              </div>
              <div>
                <label
                  htmlFor="points-reason"
                  className="text-sm font-medium mb-2 block"
                >
                  Reason
                </label>
                <select
                  id="points-reason"
                  className="w-full rounded-md bg-zinc-800 border-zinc-700 text-white py-2 px-3"
                >
                  <option value="purchase">Product Purchase</option>
                  <option value="service">Service Completed</option>
                  <option value="referral">Customer Referral</option>
                  <option value="promotion">Special Promotion</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="points-notes"
                  className="text-sm font-medium mb-2 block"
                >
                  Notes (Optional)
                </label>
                <Input
                  id="points-notes"
                  placeholder="Add any additional notes"
                  className="bg-zinc-800 border-zinc-700"
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setShowAddPointsDialog(false)}
              >
                Cancel
              </Button>
              <Button className="bg-amber-500 text-black hover:bg-amber-600">
                Add Points
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default CustomerProfile;

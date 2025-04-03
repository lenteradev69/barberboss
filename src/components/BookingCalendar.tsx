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
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Clock,
  Download,
  Filter,
  MessageSquare,
  Phone,
  Plus,
  Scissors,
  Search,
  User,
  Users,
  X,
} from "lucide-react";

interface Appointment {
  id: string;
  customerName: string;
  customerPhone: string;
  service: string;
  barber: string;
  date: string;
  time: string;
  duration: number;
  status: "confirmed" | "pending" | "cancelled";
  notes?: string;
}

interface TimeSlot {
  time: string;
  available: boolean;
  appointmentId?: string;
}

const BookingCalendar = () => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [activeTab, setActiveTab] = useState("daily");
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddAppointmentDialog, setShowAddAppointmentDialog] =
    useState(false);
  const [selectedAppointment, setSelectedAppointment] =
    useState<Appointment | null>(null);
  const [showAppointmentDetailsDialog, setShowAppointmentDetailsDialog] =
    useState(false);

  // Mock data for appointments
  const mockAppointments: Appointment[] = [
    {
      id: "1",
      customerName: "Ahmad Rizky",
      customerPhone: "+62 812-3456-7890",
      service: "Regular Haircut",
      barber: "Deni",
      date: "2023-12-20",
      time: "10:00",
      duration: 30,
      status: "confirmed",
      notes: "Regular customer, prefers classic style",
    },
    {
      id: "2",
      customerName: "Budi Santoso",
      customerPhone: "+62 813-9876-5432",
      service: "Hair Coloring",
      barber: "Agus",
      date: "2023-12-20",
      time: "11:30",
      duration: 90,
      status: "confirmed",
    },
    {
      id: "3",
      customerName: "Citra Dewi",
      customerPhone: "+62 857-1234-5678",
      service: "Beard Trim",
      barber: "Budi",
      date: "2023-12-20",
      time: "14:00",
      duration: 20,
      status: "pending",
    },
    {
      id: "4",
      customerName: "Denny Pratama",
      customerPhone: "+62 878-8765-4321",
      service: "Hair & Beard Combo",
      barber: "Deni",
      date: "2023-12-21",
      time: "09:30",
      duration: 45,
      status: "confirmed",
    },
  ];

  // Generate time slots for the day
  const generateTimeSlots = (date: Date): TimeSlot[] => {
    const dateString = date.toISOString().split("T")[0];
    const slots: TimeSlot[] = [];

    // Generate slots from 9:00 to 18:00
    for (let hour = 9; hour < 18; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const timeString = `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`;

        // Check if slot is booked
        const appointment = mockAppointments.find(
          (apt) => apt.date === dateString && apt.time === timeString,
        );

        slots.push({
          time: timeString,
          available: !appointment,
          appointmentId: appointment?.id,
        });
      }
    }

    return slots;
  };

  // Filter appointments based on search query and date
  const filteredAppointments = mockAppointments.filter((appointment) => {
    const matchesSearch =
      appointment.customerName
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      appointment.service.toLowerCase().includes(searchQuery.toLowerCase()) ||
      appointment.barber.toLowerCase().includes(searchQuery.toLowerCase());

    const appointmentDate = new Date(appointment.date);
    const currentDateString = currentDate.toISOString().split("T")[0];
    const matchesDate = appointment.date === currentDateString;

    return matchesSearch && matchesDate;
  });

  // Format date to readable format
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Handle appointment click
  const handleAppointmentClick = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setShowAppointmentDetailsDialog(true);
  };

  // Navigate to previous day
  const goToPreviousDay = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() - 1);
    setCurrentDate(newDate);
  };

  // Navigate to next day
  const goToNextDay = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + 1);
    setCurrentDate(newDate);
  };

  // Get status badge color
  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-600 text-white hover:bg-green-700";
      case "pending":
        return "bg-amber-500 text-black hover:bg-amber-600";
      case "cancelled":
        return "bg-red-600 text-white hover:bg-red-700";
      default:
        return "bg-gray-600 text-white hover:bg-gray-700";
    }
  };

  return (
    <div className="w-full min-h-screen bg-black text-white p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
              Booking Calendar
            </h1>
            <p className="text-gray-400">
              Manage appointments and customer bookings
            </p>
          </div>
          <div className="flex gap-2 mt-4 md:mt-0">
            <Button
              variant="outline"
              className="border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-black"
            >
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
            <Dialog
              open={showAddAppointmentDialog}
              onOpenChange={setShowAddAppointmentDialog}
            >
              <DialogTrigger asChild>
                <Button className="bg-amber-500 text-black hover:bg-amber-600">
                  <Plus className="mr-2 h-4 w-4" />
                  New Appointment
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-zinc-900 border border-amber-500 text-white">
                <DialogHeader>
                  <DialogTitle className="text-amber-500">
                    Add New Appointment
                  </DialogTitle>
                  <DialogDescription className="text-gray-400">
                    Schedule a new appointment for a customer.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2">
                      <label
                        htmlFor="customer"
                        className="text-sm font-medium mb-2 block"
                      >
                        Customer
                      </label>
                      <Select>
                        <SelectTrigger className="bg-zinc-800 border-zinc-700 text-white">
                          <SelectValue placeholder="Select customer" />
                        </SelectTrigger>
                        <SelectContent className="bg-zinc-800 border-zinc-700 text-white">
                          <SelectItem value="new">
                            + Add New Customer
                          </SelectItem>
                          <SelectItem value="1">Ahmad Rizky</SelectItem>
                          <SelectItem value="2">Budi Santoso</SelectItem>
                          <SelectItem value="3">Citra Dewi</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label
                        htmlFor="service"
                        className="text-sm font-medium mb-2 block"
                      >
                        Service
                      </label>
                      <Select>
                        <SelectTrigger className="bg-zinc-800 border-zinc-700 text-white">
                          <SelectValue placeholder="Select service" />
                        </SelectTrigger>
                        <SelectContent className="bg-zinc-800 border-zinc-700 text-white">
                          <SelectItem value="haircut">
                            Regular Haircut
                          </SelectItem>
                          <SelectItem value="beard">Beard Trim</SelectItem>
                          <SelectItem value="coloring">
                            Hair Coloring
                          </SelectItem>
                          <SelectItem value="combo">
                            Hair & Beard Combo
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label
                        htmlFor="barber"
                        className="text-sm font-medium mb-2 block"
                      >
                        Barber
                      </label>
                      <Select>
                        <SelectTrigger className="bg-zinc-800 border-zinc-700 text-white">
                          <SelectValue placeholder="Select barber" />
                        </SelectTrigger>
                        <SelectContent className="bg-zinc-800 border-zinc-700 text-white">
                          <SelectItem value="deni">Deni</SelectItem>
                          <SelectItem value="budi">Budi</SelectItem>
                          <SelectItem value="agus">Agus</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label
                        htmlFor="date"
                        className="text-sm font-medium mb-2 block"
                      >
                        Date
                      </label>
                      <Input
                        id="date"
                        type="date"
                        className="bg-zinc-800 border-zinc-700 text-white"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="time"
                        className="text-sm font-medium mb-2 block"
                      >
                        Time
                      </label>
                      <Select>
                        <SelectTrigger className="bg-zinc-800 border-zinc-700 text-white">
                          <SelectValue placeholder="Select time" />
                        </SelectTrigger>
                        <SelectContent className="bg-zinc-800 border-zinc-700 text-white max-h-[200px]">
                          <SelectItem value="09:00">09:00 AM</SelectItem>
                          <SelectItem value="09:30">09:30 AM</SelectItem>
                          <SelectItem value="10:00">10:00 AM</SelectItem>
                          <SelectItem value="10:30">10:30 AM</SelectItem>
                          <SelectItem value="11:00">11:00 AM</SelectItem>
                          <SelectItem value="11:30">11:30 AM</SelectItem>
                          <SelectItem value="13:00">01:00 PM</SelectItem>
                          <SelectItem value="13:30">01:30 PM</SelectItem>
                          <SelectItem value="14:00">02:00 PM</SelectItem>
                          <SelectItem value="14:30">02:30 PM</SelectItem>
                          <SelectItem value="15:00">03:00 PM</SelectItem>
                          <SelectItem value="15:30">03:30 PM</SelectItem>
                          <SelectItem value="16:00">04:00 PM</SelectItem>
                          <SelectItem value="16:30">04:30 PM</SelectItem>
                          <SelectItem value="17:00">05:00 PM</SelectItem>
                          <SelectItem value="17:30">05:30 PM</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="col-span-2">
                      <label
                        htmlFor="notes"
                        className="text-sm font-medium mb-2 block"
                      >
                        Notes (Optional)
                      </label>
                      <Input
                        id="notes"
                        placeholder="Add any special requests or notes"
                        className="bg-zinc-800 border-zinc-700 text-white"
                      />
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => setShowAddAppointmentDialog(false)}
                    className="border-zinc-700 text-white hover:bg-zinc-800"
                  >
                    Cancel
                  </Button>
                  <Button className="bg-amber-500 text-black hover:bg-amber-600">
                    Schedule Appointment
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
              placeholder="Search appointments..."
              className="pl-10 bg-zinc-900 border-zinc-700 text-white"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              className="border-zinc-700 text-white hover:bg-zinc-800"
            >
              <Filter className="h-4 w-4" />
            </Button>
          </div>
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
              Daily View
            </TabsTrigger>
            <TabsTrigger
              value="weekly"
              className="data-[state=active]:bg-amber-500 data-[state=active]:text-black"
            >
              Weekly View
            </TabsTrigger>
            <TabsTrigger
              value="monthly"
              className="data-[state=active]:bg-amber-500 data-[state=active]:text-black"
            >
              Monthly View
            </TabsTrigger>
          </TabsList>

          {/* Daily View Content */}
          <TabsContent value="daily" className="mt-6">
            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={goToPreviousDay}
                    className="text-gray-400 hover:text-white hover:bg-zinc-800"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </Button>
                  <CardTitle className="text-white text-center flex items-center gap-2">
                    <CalendarIcon className="h-5 w-5 text-amber-500" />
                    {currentDate.toLocaleDateString("id-ID", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </CardTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={goToNextDay}
                    className="text-gray-400 hover:text-white hover:bg-zinc-800"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Time slots */}
                  <div className="md:col-span-2">
                    <h3 className="font-medium mb-4 text-amber-500">
                      Available Time Slots
                    </h3>
                    <div className="grid grid-cols-4 gap-2">
                      {generateTimeSlots(currentDate).map((slot, index) => (
                        <Button
                          key={index}
                          variant={slot.available ? "outline" : "default"}
                          className={`h-12 ${slot.available ? "border-zinc-700 text-white hover:bg-zinc-800" : "bg-amber-500 text-black hover:bg-amber-600"}`}
                          disabled={!slot.available}
                          onClick={() => {
                            if (!slot.available && slot.appointmentId) {
                              const appointment = mockAppointments.find(
                                (apt) => apt.id === slot.appointmentId,
                              );
                              if (appointment) {
                                handleAppointmentClick(appointment);
                              }
                            }
                          }}
                        >
                          {slot.time}
                          {!slot.available && (
                            <span className="ml-1 text-xs">•</span>
                          )}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Today's appointments */}
                  <div>
                    <h3 className="font-medium mb-4 text-amber-500">
                      Today's Appointments
                    </h3>
                    <ScrollArea className="h-[400px] pr-4">
                      <div className="space-y-3">
                        {filteredAppointments.length > 0 ? (
                          filteredAppointments.map((appointment) => (
                            <Card
                              key={appointment.id}
                              className="bg-zinc-800 border-zinc-700 hover:border-amber-500/50 transition-colors cursor-pointer"
                              onClick={() =>
                                handleAppointmentClick(appointment)
                              }
                            >
                              <CardContent className="p-3">
                                <div className="flex justify-between items-start mb-2">
                                  <div>
                                    <p className="font-medium text-white">
                                      {appointment.time} - {appointment.service}
                                    </p>
                                    <p className="text-sm text-gray-400">
                                      {appointment.duration} min with{" "}
                                      {appointment.barber}
                                    </p>
                                  </div>
                                  <Badge
                                    className={getStatusBadgeColor(
                                      appointment.status,
                                    )}
                                  >
                                    {appointment.status}
                                  </Badge>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                  <User className="h-3 w-3 text-gray-400" />
                                  <span>{appointment.customerName}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                  <Phone className="h-3 w-3 text-gray-400" />
                                  <span>{appointment.customerPhone}</span>
                                </div>
                              </CardContent>
                            </Card>
                          ))
                        ) : (
                          <div className="text-center py-8">
                            <p className="text-gray-400">
                              No appointments for this day
                            </p>
                          </div>
                        )}
                      </div>
                    </ScrollArea>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between pt-4">
                <Button
                  variant="outline"
                  className="border-amber-500/50 text-amber-500 hover:bg-amber-500/10"
                >
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Send Reminders
                </Button>
                <Button className="bg-amber-500 text-black hover:bg-amber-600">
                  <Plus className="mr-2 h-4 w-4" />
                  New Appointment
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* Weekly View Content */}
          <TabsContent value="weekly" className="mt-6">
            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader>
                <CardTitle className="text-white">
                  Weekly Calendar View
                </CardTitle>
                <CardDescription className="text-gray-400">
                  This feature is coming soon. Please use the daily view for
                  now.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <CalendarIcon className="h-16 w-16 text-gray-600 mb-4" />
                <h3 className="text-xl font-medium mb-2">
                  Weekly View Coming Soon
                </h3>
                <p className="text-gray-400 text-center max-w-md">
                  We're working on implementing a comprehensive weekly calendar
                  view. Please check back soon for updates.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Monthly View Content */}
          <TabsContent value="monthly" className="mt-6">
            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader>
                <CardTitle className="text-white">
                  Monthly Calendar View
                </CardTitle>
                <CardDescription className="text-gray-400">
                  This feature is coming soon. Please use the daily view for
                  now.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <CalendarIcon className="h-16 w-16 text-gray-600 mb-4" />
                <h3 className="text-xl font-medium mb-2">
                  Monthly View Coming Soon
                </h3>
                <p className="text-gray-400 text-center max-w-md">
                  We're working on implementing a comprehensive monthly calendar
                  view. Please check back soon for updates.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Appointment Details Dialog */}
        <Dialog
          open={showAppointmentDetailsDialog}
          onOpenChange={setShowAppointmentDetailsDialog}
        >
          <DialogContent className="bg-zinc-900 border border-amber-500 text-white">
            {selectedAppointment && (
              <>
                <DialogHeader>
                  <DialogTitle className="text-amber-500">
                    Appointment Details
                  </DialogTitle>
                  <DialogDescription className="text-gray-400">
                    {formatDate(selectedAppointment.date)} at{" "}
                    {selectedAppointment.time}
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-400">Customer</p>
                      <p className="font-medium">
                        {selectedAppointment.customerName}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Phone</p>
                      <p className="font-medium">
                        {selectedAppointment.customerPhone}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Service</p>
                      <p className="font-medium">
                        {selectedAppointment.service}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Duration</p>
                      <p className="font-medium">
                        {selectedAppointment.duration} minutes
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Barber</p>
                      <p className="font-medium">
                        {selectedAppointment.barber}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Status</p>
                      <Badge
                        className={getStatusBadgeColor(
                          selectedAppointment.status,
                        )}
                      >
                        {selectedAppointment.status}
                      </Badge>
                    </div>
                  </div>
                  {selectedAppointment.notes && (
                    <div>
                      <p className="text-sm text-gray-400">Notes</p>
                      <p className="font-medium">{selectedAppointment.notes}</p>
                    </div>
                  )}
                </div>
                <DialogFooter className="flex flex-col sm:flex-row gap-2">
                  <Button
                    variant="outline"
                    className="border-zinc-700 text-white hover:bg-zinc-800"
                    onClick={() => setShowAppointmentDetailsDialog(false)}
                  >
                    Close
                  </Button>
                  <Button
                    variant="outline"
                    className="border-amber-500 text-amber-500 hover:bg-amber-500/10"
                  >
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Send Reminder
                  </Button>
                  <Button className="bg-amber-500 text-black hover:bg-amber-600">
                    <Scissors className="mr-2 h-4 w-4" />
                    Start Service
                  </Button>
                </DialogFooter>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default BookingCalendar;

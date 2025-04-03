import React from "react";
import { motion } from "framer-motion";
import {
  ShoppingCart,
  Package,
  Users,
  BarChart2,
  Calendar,
} from "lucide-react";
import ModuleSelector from "./ModuleSelector";
import TransactionPanel from "./TransactionPanel";
import InventoryDashboard from "./InventoryDashboard";
import CustomerList from "./CustomerList";
import BookingCalendar from "./BookingCalendar";
import FinancialReports from "./FinancialReports";

const modules = [
  {
    id: "transaction",
    title: "Transaction",
    description: "Process sales, services, and payments",
    icon: <ShoppingCart className="h-8 w-8 text-amber-400" />,
    component: TransactionPanel,
    color: "bg-black/40",
  },
  {
    id: "inventory",
    title: "Inventory",
    description: "Manage products and stock levels",
    icon: <Package className="h-8 w-8 text-amber-400" />,
    component: InventoryDashboard,
    color: "bg-black/40",
  },
  {
    id: "customers",
    title: "Customers",
    description: "Customer profiles and loyalty tracking",
    icon: <Users className="h-8 w-8 text-amber-400" />,
    component: CustomerList,
    color: "bg-black/40",
  },
  {
    id: "financials",
    title: "Financial Reports",
    description: "View sales data and analytics",
    icon: <BarChart2 className="h-8 w-8 text-amber-400" />,
    component: FinancialReports,
    color: "bg-black/40",
  },
  {
    id: "booking",
    title: "Booking Calendar",
    description: "Manage appointments and schedules",
    icon: <Calendar className="h-8 w-8 text-amber-400" />,
    component: BookingCalendar,
    color: "bg-black/40",
  },
];

const Home = () => {
  const [activeModule, setActiveModule] = React.useState<string | null>(null);

  const handleModuleSelect = (moduleId: string) => {
    setActiveModule(moduleId === activeModule ? null : moduleId);
  };

  const ActiveComponent = React.useMemo(() => {
    if (!activeModule) return null;
    const module = modules.find((m) => m.id === activeModule);
    return module?.component || null;
  }, [activeModule]);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-amber-500/30 bg-black/90 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-amber-500 flex items-center justify-center">
              <span className="font-bold text-black">BB</span>
            </div>
            <h1 className="text-xl md:text-2xl font-bold">
              <span className="text-amber-500">Barber</span>Boss
            </h1>
          </div>

          {activeModule && (
            <button
              onClick={() => setActiveModule(null)}
              className="px-3 py-1.5 text-sm border border-amber-500/50 rounded-md hover:bg-amber-500/10 transition-colors"
            >
              Back to Dashboard
            </button>
          )}
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {!activeModule ? (
          <>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-8 text-center"
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-2">
                Barbershop POS System
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Complete point of sale system with transaction management,
                inventory tracking, customer profiles, financial reporting, and
                appointment scheduling.
              </p>
            </motion.div>

            <ModuleSelector modules={modules} onSelect={handleModuleSelect} />
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="w-full"
          >
            {ActiveComponent && <ActiveComponent />}
            {!ActiveComponent && (
              <div className="p-8 border border-amber-500/20 rounded-lg bg-gray-900/50 text-center">
                <h3 className="text-xl font-medium mb-2">
                  Module Under Development
                </h3>
                <p className="text-gray-400">
                  The {modules.find((m) => m.id === activeModule)?.title} module
                  is currently being developed. Please check back soon for
                  updates.
                </p>
              </div>
            )}
          </motion.div>
        )}
      </main>

      <footer className="border-t border-amber-500/30 py-6 mt-auto">
        <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
          <p>© 2023 BarberBoss POS System. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Scissors, Package, Users, BarChart2, Calendar } from "lucide-react";

interface ModuleProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  onClick: () => void;
  color: string;
}

const ModuleCard = ({
  title,
  description,
  icon,
  onClick,
  color = "bg-card",
}: ModuleProps) => {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      className="h-full"
    >
      <Card
        className={`h-full border-2 border-amber-500/20 bg-black hover:border-amber-500/70 transition-all cursor-pointer`}
        onClick={onClick}
      >
        <CardContent className="flex flex-col items-center justify-center p-6 h-full">
          <div className={`p-4 rounded-full mb-4 ${color} text-amber-500`}>
            {icon}
          </div>
          <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
          <p className="text-gray-400 text-center text-sm">{description}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
};

interface ModuleSelectorProps {
  modules: {
    id: string;
    title: string;
    description: string;
    icon: React.ReactNode;
    color?: string;
    component: React.ComponentType | null;
  }[];
  onSelect: (moduleId: string) => void;
}

const ModuleSelector = ({ modules = [], onSelect }: ModuleSelectorProps) => {
  return (
    <div className="w-full bg-black p-4 md:p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 md:gap-6">
        {modules.map((module, index) => (
          <ModuleCard
            key={index}
            title={module.title}
            description={module.description}
            icon={module.icon}
            color={module.color}
            onClick={() => onSelect(module.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default ModuleSelector;

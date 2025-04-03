import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface ServiceCardProps {
  id?: string;
  name?: string;
  description?: string;
  price?: number;
  duration?: number;
  image?: string;
  isSelected?: boolean;
  onSelect?: (id: string) => void;
}

const ServiceCard = ({
  id = "1",
  name = "Classic Haircut",
  description = "Traditional barbershop haircut with precision trimming and styling",
  price = 75000,
  duration = 30,
  image = "https://placehold.co/500x300/222/gold?text=Haircut",
  isSelected = false,
  onSelect = () => {},
}: ServiceCardProps) => {
  // Format price to Indonesian Rupiah
  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <Card
      className={`w-full max-w-[200px] h-[250px] overflow-hidden transition-all duration-200 ${isSelected ? "ring-2 ring-amber-500 bg-black/90" : "bg-black hover:shadow-md hover:shadow-amber-500/20"}`}
    >
      <div className="relative h-24 overflow-hidden">
        <img src={image} alt={name} className="w-full h-full object-cover" />
        <Badge
          variant="secondary"
          className="absolute top-2 right-2 bg-amber-500 text-black font-semibold"
        >
          {duration} min
        </Badge>
      </div>

      <CardContent className="p-3 flex flex-col h-[calc(250px-6rem)]">
        <h3 className="font-bold text-white text-sm mb-1 truncate">{name}</h3>
        <p className="text-gray-300 text-xs line-clamp-2 mb-2 flex-grow">
          {description}
        </p>

        <div className="flex justify-between items-center mt-auto">
          <span className="text-amber-500 font-bold">{formatPrice(price)}</span>
          <Button
            variant={isSelected ? "default" : "outline"}
            size="sm"
            className={`${isSelected ? "bg-amber-500 text-black hover:bg-amber-600" : "border-amber-500 text-amber-500 hover:bg-amber-500/10"}`}
            onClick={() => onSelect(id)}
          >
            {isSelected ? "Selected" : "Select"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ServiceCard;

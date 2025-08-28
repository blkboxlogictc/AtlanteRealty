import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bed, Bath, Square, MapPin } from "lucide-react";
import type { Property } from "@shared/schema";

interface PropertyCardProps {
  property: Property;
  onViewDetails?: (property: Property) => void;
}

export default function PropertyCard({ property, onViewDetails }: PropertyCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'for sale':
        return 'bg-primary/10 text-primary';
      case 'sold':
        return 'bg-destructive/10 text-destructive';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const primaryImage = property.images?.[0] || 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&h=300&fit=crop';

  return (
    <Card className="group hover:shadow-xl transition-all duration-300 border border-border overflow-hidden">
      <div className="relative">
        <img
          src={primaryImage}
          alt={property.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&h=300&fit=crop';
          }}
        />
        <div className="absolute top-4 right-4">
          <Badge className={getStatusColor(property.status)} data-testid={`status-${property.id}`}>
            {property.status}
          </Badge>
        </div>
      </div>
      
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-3">
          <div className="text-2xl font-bold text-primary" data-testid={`price-${property.id}`}>
            {formatPrice(property.price)}
          </div>
        </div>
        
        <h3 className="text-lg font-semibold text-foreground mb-2" data-testid={`title-${property.id}`}>
          {property.title}
        </h3>
        
        <div className="flex items-center text-muted-foreground mb-4">
          <MapPin className="h-4 w-4 mr-1" />
          <span className="text-sm" data-testid={`address-${property.id}`}>
            {property.address}, {property.city}, {property.state}
          </span>
        </div>
        
        <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-4">
          {property.bedrooms && (
            <span className="flex items-center" data-testid={`bedrooms-${property.id}`}>
              <Bed className="h-4 w-4 mr-1" />
              {property.bedrooms} Beds
            </span>
          )}
          {property.bathrooms && (
            <span className="flex items-center" data-testid={`bathrooms-${property.id}`}>
              <Bath className="h-4 w-4 mr-1" />
              {property.bathrooms} Baths
            </span>
          )}
          {property.sqft && (
            <span className="flex items-center" data-testid={`sqft-${property.id}`}>
              <Square className="h-4 w-4 mr-1" />
              {property.sqft.toLocaleString()} sq ft
            </span>
          )}
        </div>
        
        <Button
          className="w-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
          onClick={() => onViewDetails?.(property)}
          disabled={property.status.toLowerCase() === 'sold'}
          data-testid={`button-view-details-${property.id}`}
        >
          {property.status.toLowerCase() === 'sold' ? 'Recently Sold' : 'View Details'}
        </Button>
      </CardContent>
    </Card>
  );
}

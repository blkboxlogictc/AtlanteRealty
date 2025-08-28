import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "wouter";
import PropertyCard from "@/components/cards/PropertyCard";
import IDXEmbed from "@/components/embeds/IDXEmbed";
import { Skeleton } from "@/components/ui/skeleton";
import type { Property } from "@shared/schema";

export default function FeaturedListings() {
  const { data: properties, isLoading, error } = useQuery<Property[]>({
    queryKey: ["/api/properties/featured"],
  });

  if (error) {
    return (
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-3xl lg:text-4xl font-serif font-bold text-foreground mb-4">
              Featured Properties
            </h2>
            <p className="text-muted-foreground">
              Unable to load properties at this time. Please try again later.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h2 className="text-3xl lg:text-4xl font-serif font-bold text-foreground mb-4">
              Featured Properties
            </h2>
            <p className="text-lg text-muted-foreground">
              Discover exceptional properties in prime locations
            </p>
          </div>
          <Link href="/brokerage">
            <Button 
              variant="outline"
              className="hidden lg:flex items-center border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
              data-testid="button-view-all-properties"
            >
              View All Properties
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </Link>
        </div>
        
        {/* IDX Showcase Integration */}
        <IDXEmbed
          embedType="showcase"
          className="mb-8"
          scriptSrc={import.meta.env.VITE_IDX_SHOWCASE_SCRIPT}
        >
          {/* Fallback content when IDX is not available */}
          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="space-y-4">
                  <Skeleton className="h-48 w-full rounded-2xl" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              ))}
            </div>
          ) : properties && properties.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {properties.map((property) => (
                <PropertyCard 
                  key={property.id} 
                  property={property}
                  onViewDetails={(prop) => {
                    // Navigate to property details or open IDX page
                    window.open(`/brokerage?property=${prop.id}`, '_blank');
                  }}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                No featured properties available at this time.
              </p>
            </div>
          )}
        </IDXEmbed>
        
        {/* Mobile View All Button */}
        <div className="text-center lg:hidden">
          <Link href="/brokerage">
            <Button 
              variant="outline"
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
              data-testid="button-view-all-properties-mobile"
            >
              View All Properties
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

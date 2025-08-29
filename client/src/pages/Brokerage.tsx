import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PropertySearchForm from "@/components/forms/PropertySearchForm";
import PropertyCard from "@/components/cards/PropertyCard";
import IDXEmbed from "@/components/embeds/IDXEmbed";
import LeadForm from "@/components/forms/LeadForm";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Search, Filter } from "lucide-react";
import type { Property } from "@shared/schema";

export default function Brokerage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [priceRange, setPriceRange] = useState("");

  const {
    data: properties,
    isLoading,
    error,
  } = useQuery<Property[]>({
    queryKey: ["/api/properties"],
  });

  const filteredProperties =
    properties?.filter((property) => {
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        if (
          !property.title.toLowerCase().includes(query) &&
          !property.address.toLowerCase().includes(query) &&
          !property.city.toLowerCase().includes(query)
        ) {
          return false;
        }
      }
      if (
        propertyType &&
        propertyType !== "all" &&
        property.propertyType !== propertyType
      ) {
        return false;
      }
      if (priceRange && priceRange !== "all") {
        const [min, max] = priceRange.split("-").map(Number);
        if (max && (property.price < min || property.price > max)) {
          return false;
        }
        if (!max && property.price < min) {
          return false;
        }
      }
      return true;
    }) || [];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="bg-card py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8">
              <h1 className="text-4xl lg:text-5xl font-serif font-bold text-foreground mb-4">
                Find Your Perfect Property
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Search our comprehensive database of residential and commercial
                properties across the Treasure Coast
              </p>
            </div>

            {/* Search Form */}
            <div className="max-w-4xl mx-auto">
              <PropertySearchForm onSearch={setSearchQuery} />
            </div>
          </div>
        </section>

        {/* IDX Integration Section */}
        <section className="py-12 bg-background">
          <div className="container mx-auto px-4">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                MLS Search
              </h2>
              <p className="text-muted-foreground">
                Access the complete Multiple Listing Service database with
                real-time updates
              </p>
            </div>

            {/* IDX Search Widget */}
            <IDXEmbed
              embedType="search"
              scriptSrc={import.meta.env.VITE_IDX_SEARCH_SCRIPT}
              className="mb-8"
            />

            {/* IDX Map Results */}
            <IDXEmbed
              embedType="map"
              scriptSrc={import.meta.env.VITE_IDX_MAP_SCRIPT}
              className="mb-8"
            />
          </div>
        </section>

        {/* Filters and Results */}
        <section className="py-12 bg-card">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Filters Sidebar */}
              <div className="lg:w-1/4">
                <div className="bg-background rounded-2xl p-6 shadow-lg border border-border">
                  <h3 className="text-lg font-semibold mb-4 flex items-center">
                    <Filter className="h-5 w-5 mr-2" />
                    Filter Properties
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">
                        Property Type
                      </label>
                      <Select
                        onValueChange={setPropertyType}
                        data-testid="filter-property-type"
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="All Types" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Types</SelectItem>
                          <SelectItem value="Single Family">
                            Single Family
                          </SelectItem>
                          <SelectItem value="Condo">Condo</SelectItem>
                          <SelectItem value="Townhouse">Townhouse</SelectItem>
                          <SelectItem value="Commercial">Commercial</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">
                        Price Range
                      </label>
                      <Select
                        onValueChange={setPriceRange}
                        data-testid="filter-price-range"
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Any Price" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Any Price</SelectItem>
                          <SelectItem value="0-300000">Under $300K</SelectItem>
                          <SelectItem value="300000-600000">
                            $300K - $600K
                          </SelectItem>
                          <SelectItem value="600000-1000000">
                            $600K - $1M
                          </SelectItem>
                          <SelectItem value="1000000-2000000">
                            $1M - $2M
                          </SelectItem>
                          <SelectItem value="2000000">Over $2M</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => {
                        setSearchQuery("");
                        setPropertyType("all");
                        setPriceRange("all");
                      }}
                      data-testid="button-clear-filters"
                    >
                      Clear Filters
                    </Button>
                  </div>
                </div>
              </div>

              {/* Results */}
              <div className="lg:w-3/4">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-foreground">
                    Property Listings
                  </h2>
                  <div className="text-sm text-muted-foreground">
                    {isLoading
                      ? "Loading..."
                      : `${filteredProperties.length} properties found`}
                  </div>
                </div>

                {error ? (
                  <div className="text-center py-12">
                    <p className="text-destructive">
                      Failed to load properties. Please try again later.
                    </p>
                  </div>
                ) : isLoading ? (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {Array.from({ length: 6 }).map((_, index) => (
                      <Skeleton key={index} className="h-96 rounded-2xl" />
                    ))}
                  </div>
                ) : filteredProperties.length > 0 ? (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProperties.map((property) => (
                      <PropertyCard
                        key={property.id}
                        property={property}
                        onViewDetails={(prop) => {
                          // Navigate to property details or open IDX page
                          window.open(
                            `/brokerage?property=${prop.id}`,
                            "_blank"
                          );
                        }}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      No properties found
                    </h3>
                    <p className="text-muted-foreground">
                      Try adjusting your search criteria or clear the filters to
                      see all properties.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Lead Generation Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-serif font-bold text-foreground mb-4">
                  Ready to Find Your Dream Home?
                </h2>
                <p className="text-lg text-muted-foreground mb-6">
                  Our experienced agents are here to help you navigate the real
                  estate market and find the perfect property for your needs.
                </p>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-center">
                    <div className="h-2 w-2 rounded-full bg-primary mr-3" />
                    Exclusive access to off-market properties
                  </li>
                  <li className="flex items-center">
                    <div className="h-2 w-2 rounded-full bg-primary mr-3" />
                    Professional market analysis and pricing guidance
                  </li>
                  <li className="flex items-center">
                    <div className="h-2 w-2 rounded-full bg-primary mr-3" />
                    Personalized property tours and viewings
                  </li>
                </ul>
              </div>

              <div className="flex justify-center">
                <LeadForm title="Request a Property Tour" source="brokerage" />
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

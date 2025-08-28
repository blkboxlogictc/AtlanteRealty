import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AgentCard from "@/components/cards/AgentCard";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Search } from "lucide-react";
import type { Agent } from "@shared/schema";

export default function Agents() {
  const [searchQuery, setSearchQuery] = useState("");
  const [specialty, setSpecialty] = useState("");

  const { data: agents, isLoading, error } = useQuery<Agent[]>({
    queryKey: ["/api/agents"],
  });

  const filteredAgents = agents?.filter(agent => {
    if (!agent.isActive) return false;
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      if (!agent.name.toLowerCase().includes(query) &&
          !agent.title.toLowerCase().includes(query) &&
          !agent.specialties?.some(s => s.toLowerCase().includes(query))) {
        return false;
      }
    }
    
    if (specialty) {
      if (!agent.specialties?.some(s => s.toLowerCase().includes(specialty.toLowerCase()))) {
        return false;
      }
    }
    
    return true;
  }) || [];

  const uniqueSpecialties = Array.from(
    new Set(
      agents?.flatMap(agent => agent.specialties || []) || []
    )
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="bg-card py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8">
              <h1 className="text-4xl lg:text-5xl font-serif font-bold text-foreground mb-4">
                Meet Our Expert Agents
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Our experienced real estate professionals are dedicated to helping you achieve your property goals with personalized service and local market expertise.
              </p>
            </div>
            
            {/* Search and Filter */}
            <div className="max-w-2xl mx-auto grid md:grid-cols-2 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name or specialty..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                  data-testid="input-agent-search"
                />
              </div>
              
              <Select onValueChange={setSpecialty} data-testid="select-agent-specialty">
                <SelectTrigger>
                  <SelectValue placeholder="All Specialties" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Specialties</SelectItem>
                  {uniqueSpecialties.map((spec) => (
                    <SelectItem key={spec} value={spec}>
                      {spec}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </section>

        {/* Agents Grid */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            {error ? (
              <div className="text-center py-12">
                <p className="text-destructive">Failed to load agents. Please try again later.</p>
              </div>
            ) : isLoading ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {Array.from({ length: 8 }).map((_, index) => (
                  <Skeleton key={index} className="h-96 rounded-2xl" />
                ))}
              </div>
            ) : filteredAgents.length > 0 ? (
              <>
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-2xl font-bold text-foreground">
                    Our Team
                  </h2>
                  <div className="text-sm text-muted-foreground">
                    {filteredAgents.length} agent{filteredAgents.length !== 1 ? 's' : ''} found
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                  {filteredAgents.map((agent) => (
                    <AgentCard 
                      key={agent.id} 
                      agent={agent}
                      onContact={(agent) => {
                        window.location.href = `/agents/${agent.id}?contact=true`;
                      }}
                    />
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-12">
                <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">No agents found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your search criteria to find the right agent for you.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-card">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-serif font-bold text-foreground mb-4">
              Need Help Choosing an Agent?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Our team can help match you with the perfect agent based on your specific needs, location preferences, and property goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/contact" className="inline-block">
                <button className="px-8 py-3 gradient-gold text-white rounded-xl font-medium hover:opacity-90 transition-opacity" data-testid="button-contact-team">
                  Contact Our Team
                </button>
              </a>
              <a href="tel:(772) 555-0123" className="inline-block">
                <button className="px-8 py-3 border border-primary text-primary rounded-xl font-medium hover:bg-primary hover:text-primary-foreground transition-colors" data-testid="button-call-now">
                  Call Now: (772) 555-0123
                </button>
              </a>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}

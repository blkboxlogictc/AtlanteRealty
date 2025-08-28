import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "wouter";
import AgentCard from "@/components/cards/AgentCard";
import { Skeleton } from "@/components/ui/skeleton";
import type { Agent } from "@shared/schema";

export default function AgentSpotlight() {
  const { data: agents, isLoading, error } = useQuery<Agent[]>({
    queryKey: ["/api/agents"],
  });

  if (error) {
    return (
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-3xl lg:text-4xl font-serif font-bold text-foreground mb-4">
              Meet Our Expert Agents
            </h2>
            <p className="text-muted-foreground">
              Unable to load agent information at this time.
            </p>
          </div>
        </div>
      </section>
    );
  }

  // Show first 3 agents for spotlight
  const featuredAgents = agents?.slice(0, 3) || [];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-serif font-bold text-foreground mb-4">
            Meet Our Expert Agents
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our experienced team is dedicated to helping you achieve your real estate goals
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading
            ? Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="space-y-4">
                  <Skeleton className="h-80 w-full rounded-2xl" />
                </div>
              ))
            : featuredAgents.map((agent) => (
                <AgentCard 
                  key={agent.id} 
                  agent={agent}
                  onContact={(agent) => {
                    // Navigate to agent contact form
                    window.location.href = `/agents/${agent.id}?contact=true`;
                  }}
                />
              ))
          }
        </div>
        
        <div className="text-center mt-12">
          <Link href="/agents">
            <Button 
              variant="outline"
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
              data-testid="button-view-all-agents"
            >
              View All Agents
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

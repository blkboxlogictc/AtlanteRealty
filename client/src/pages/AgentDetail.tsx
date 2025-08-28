import { useQuery } from "@tanstack/react-query";
import { useRoute } from "wouter";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import LeadForm from "@/components/forms/LeadForm";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Phone, Mail, MapPin, Calendar, Award, Star } from "lucide-react";
import type { Agent } from "@shared/schema";

export default function AgentDetail() {
  const [match, params] = useRoute("/agents/:id");
  const agentId = params?.id;

  const { data: agent, isLoading, error } = useQuery<Agent>({
    queryKey: ["/api/agents", agentId],
    enabled: !!agentId,
  });

  if (!match || !agentId) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-2xl font-bold text-foreground">Agent not found</h1>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-2xl font-bold text-foreground mb-4">Agent Not Found</h1>
            <p className="text-muted-foreground">
              The agent you're looking for could not be found or is no longer available.
            </p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2 space-y-8">
                <Skeleton className="h-64 w-full rounded-2xl" />
                <Skeleton className="h-32 w-full rounded-2xl" />
                <Skeleton className="h-48 w-full rounded-2xl" />
              </div>
              <div>
                <Skeleton className="h-96 w-full rounded-2xl" />
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!agent) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-2xl font-bold text-foreground">Agent not found</h1>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const defaultImage = `https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&face=center`;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        {/* Agent Hero */}
        <section className="py-16 bg-card">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="text-center lg:text-left">
                <img
                  src={agent.image || defaultImage}
                  alt={`${agent.name} - ${agent.title}`}
                  className="w-32 h-32 lg:w-40 lg:h-40 rounded-full mx-auto lg:mx-0 mb-6 object-cover ring-8 ring-primary/10"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = defaultImage;
                  }}
                />
                
                <h1 className="text-3xl lg:text-4xl font-serif font-bold text-foreground mb-2" data-testid="agent-name">
                  {agent.name}
                </h1>
                
                <p className="text-xl text-primary font-medium mb-4" data-testid="agent-title">
                  {agent.title}
                </p>
                
                {agent.specialties && agent.specialties.length > 0 && (
                  <div className="flex flex-wrap gap-2 justify-center lg:justify-start mb-6">
                    {agent.specialties.map((specialty, index) => (
                      <Badge key={index} variant="secondary" data-testid={`agent-specialty-${index}`}>
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                )}
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  {agent.phone && (
                    <Button
                      variant="outline"
                      className="flex items-center border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                      onClick={() => window.open(`tel:${agent.phone}`, '_self')}
                      data-testid="agent-phone-button"
                    >
                      <Phone className="h-4 w-4 mr-2" />
                      {agent.phone}
                    </Button>
                  )}
                  
                  {agent.email && (
                    <Button
                      variant="outline"
                      className="flex items-center border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                      onClick={() => window.open(`mailto:${agent.email}`, '_self')}
                      data-testid="agent-email-button"
                    >
                      <Mail className="h-4 w-4 mr-2" />
                      Email
                    </Button>
                  )}
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-6">
                {agent.yearsExperience && (
                  <Card>
                    <CardContent className="p-6 text-center">
                      <div className="text-3xl font-bold text-primary mb-2" data-testid="agent-experience">
                        {agent.yearsExperience}+
                      </div>
                      <div className="text-sm text-muted-foreground">Years Experience</div>
                    </CardContent>
                  </Card>
                )}
                
                {agent.totalSales && (
                  <Card>
                    <CardContent className="p-6 text-center">
                      <div className="text-2xl font-bold text-primary mb-2" data-testid="agent-sales">
                        {agent.totalSales}
                      </div>
                      <div className="text-sm text-muted-foreground">Total Sales</div>
                    </CardContent>
                  </Card>
                )}
                
                {agent.license && (
                  <Card className="col-span-2">
                    <CardContent className="p-6 text-center">
                      <div className="flex items-center justify-center mb-2">
                        <Award className="h-5 w-5 text-primary mr-2" />
                        <span className="font-semibold text-foreground">Licensed Professional</span>
                      </div>
                      <div className="text-sm text-muted-foreground" data-testid="agent-license">
                        License: {agent.license}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Agent Details */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2 space-y-8">
                {/* Biography */}
                {agent.bio && (
                  <Card>
                    <CardContent className="p-8">
                      <h2 className="text-2xl font-serif font-bold text-foreground mb-6">About {agent.name}</h2>
                      <div className="prose prose-gray max-w-none" data-testid="agent-bio">
                        <p className="text-muted-foreground leading-relaxed">{agent.bio}</p>
                      </div>
                    </CardContent>
                  </Card>
                )}
                
                {/* Service Area */}
                {agent.serviceArea && (
                  <Card>
                    <CardContent className="p-8">
                      <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center">
                        <MapPin className="h-5 w-5 mr-2 text-primary" />
                        Service Area
                      </h3>
                      <p className="text-muted-foreground" data-testid="agent-service-area">
                        {agent.serviceArea}
                      </p>
                    </CardContent>
                  </Card>
                )}
                
                {/* Calendar Integration */}
                {agent.calendlyLink && (
                  <Card>
                    <CardContent className="p-8">
                      <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center">
                        <Calendar className="h-5 w-5 mr-2 text-primary" />
                        Schedule a Meeting
                      </h3>
                      <p className="text-muted-foreground mb-6">
                        Book a consultation directly with {agent.name} to discuss your real estate needs.
                      </p>
                      <Button
                        className="gradient-gold text-white hover:opacity-90 transition-opacity"
                        onClick={() => window.open(agent.calendlyLink, '_blank')}
                        data-testid="agent-calendly-button"
                      >
                        <Calendar className="h-4 w-4 mr-2" />
                        Schedule Now
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </div>
              
              {/* Contact Form */}
              <div className="space-y-8">
                <LeadForm
                  title={`Contact ${agent.name}`}
                  agentId={agent.id}
                  source="agent-profile"
                />
                
                {/* Quick Contact */}
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-foreground mb-4">Quick Contact</h3>
                    <div className="space-y-3">
                      {agent.phone && (
                        <div className="flex items-center text-sm">
                          <Phone className="h-4 w-4 text-primary mr-3" />
                          <span className="text-muted-foreground">{agent.phone}</span>
                        </div>
                      )}
                      {agent.email && (
                        <div className="flex items-center text-sm">
                          <Mail className="h-4 w-4 text-primary mr-3" />
                          <span className="text-muted-foreground">{agent.email}</span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}

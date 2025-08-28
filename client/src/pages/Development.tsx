import { useQuery } from "@tanstack/react-query";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import LeadForm from "@/components/forms/LeadForm";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Building, MapPin, Calendar, Users, TrendingUp, ExternalLink } from "lucide-react";
import type { Project } from "@shared/schema";

const services = [
  {
    icon: TrendingUp,
    title: "Feasibility Studies",
    description: "Comprehensive market analysis and financial modeling to evaluate project viability and potential returns.",
    features: [
      "Market demand analysis",
      "Financial projections",
      "Risk assessment",
      "ROI calculations",
    ],
  },
  {
    icon: MapPin,
    title: "Site Acquisition",
    description: "Expert guidance in identifying, evaluating, and securing optimal development sites.",
    features: [
      "Site identification",
      "Due diligence support",
      "Negotiation assistance",
      "Contract review",
    ],
  },
  {
    icon: Building,
    title: "Entitlement Support",
    description: "Navigate complex zoning and permitting processes to ensure your project moves forward smoothly.",
    features: [
      "Zoning analysis",
      "Permit coordination",
      "Municipal relations",
      "Timeline management",
    ],
  },
  {
    icon: Users,
    title: "Project Management",
    description: "End-to-end project oversight from conception through completion and delivery.",
    features: [
      "Timeline coordination",
      "Budget management",
      "Quality control",
      "Stakeholder communication",
    ],
  },
];

export default function Development() {
  const { data: projects, isLoading } = useQuery<Project[]>({
    queryKey: ["/api/projects"],
  });

  const formatDate = (dateString: string | Date | null) => {
    if (!dateString) return 'Ongoing';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'in progress':
        return 'bg-blue-100 text-blue-800';
      case 'planning':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="py-20 bg-card">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-4xl lg:text-5xl font-serif font-bold text-foreground mb-6">
                  Strategic <span className="text-gradient-gold">Development Consulting</span>
                </h1>
                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                  Transform your vision into reality with our comprehensive development consulting services. 
                  From feasibility studies to project completion, we guide you through every step of the development process.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    className="gradient-gold text-white hover:opacity-90 transition-opacity"
                    onClick={() => document.getElementById('consultation-form')?.scrollIntoView({ behavior: 'smooth' })}
                    data-testid="button-book-consultation"
                  >
                    <Calendar className="h-4 w-4 mr-2" />
                    Book a Consultation
                  </Button>
                  <Button 
                    variant="outline"
                    className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                    onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
                    data-testid="button-our-services"
                  >
                    Our Services
                  </Button>
                </div>
              </div>
              
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=600"
                  alt="Construction site development project"
                  className="rounded-2xl shadow-2xl w-full h-auto"
                />
                <div className="absolute inset-0 rounded-2xl ring-1 ring-black/10" />
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-serif font-bold text-foreground mb-4">
                Comprehensive Development Services
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Our expert team provides end-to-end development consulting to maximize your project's success
              </p>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-8">
              {services.map((service, index) => {
                const Icon = service.icon;
                return (
                  <Card key={index} className="hover:shadow-xl transition-all duration-300">
                    <CardContent className="p-8">
                      <div className="flex items-start space-x-4">
                        <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <Icon className="h-6 w-6 text-primary" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold text-foreground mb-3" data-testid={`service-title-${index}`}>
                            {service.title}
                          </h3>
                          <p className="text-muted-foreground mb-4" data-testid={`service-description-${index}`}>
                            {service.description}
                          </p>
                          <ul className="space-y-2">
                            {service.features.map((feature, featureIndex) => (
                              <li key={featureIndex} className="flex items-center text-sm text-muted-foreground">
                                <div className="h-1.5 w-1.5 rounded-full bg-primary mr-3 flex-shrink-0" />
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Project Portfolio */}
        <section className="py-20 bg-card">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-serif font-bold text-foreground mb-4">
                Our Project Portfolio
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Explore our successful development projects across the Treasure Coast
              </p>
            </div>
            
            {isLoading ? (
              <div className="grid lg:grid-cols-2 gap-8">
                {Array.from({ length: 4 }).map((_, index) => (
                  <Skeleton key={index} className="h-96 rounded-2xl" />
                ))}
              </div>
            ) : projects && projects.length > 0 ? (
              <div className="grid lg:grid-cols-2 gap-8">
                {projects.map((project) => (
                  <Card key={project.id} className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
                    {project.images && project.images.length > 0 && (
                      <div className="relative">
                        <img
                          src={project.images[0]}
                          alt={project.title}
                          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&h=300&fit=crop';
                          }}
                        />
                        <div className="absolute top-4 right-4">
                          <Badge className={getStatusColor(project.status)} data-testid={`project-status-${project.id}`}>
                            {project.status}
                          </Badge>
                        </div>
                      </div>
                    )}
                    
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold text-foreground mb-2" data-testid={`project-title-${project.id}`}>
                        {project.title}
                      </h3>
                      
                      <div className="flex items-center text-muted-foreground mb-3">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span className="text-sm" data-testid={`project-location-${project.id}`}>
                          {project.location}
                        </span>
                      </div>
                      
                      <p className="text-muted-foreground mb-4 line-clamp-3" data-testid={`project-description-${project.id}`}>
                        {project.description}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-muted-foreground">
                          <span className="font-medium">Type:</span> {project.projectType}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          <span className="font-medium">Completed:</span> {formatDate(project.completionDate)}
                        </div>
                      </div>
                      
                      {project.communityImpact && (
                        <div className="mt-4 pt-4 border-t border-border">
                          <h4 className="font-medium text-foreground mb-2">Community Impact</h4>
                          <p className="text-sm text-muted-foreground" data-testid={`project-impact-${project.id}`}>
                            {project.communityImpact}
                          </p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Building className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">Project Portfolio Coming Soon</h3>
                <p className="text-muted-foreground">
                  We're currently updating our project showcase. Check back soon to see our latest developments.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Process Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-serif font-bold text-foreground mb-4">
                Our Development Process
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                A proven methodology that ensures your project's success from concept to completion
              </p>
            </div>
            
            <div className="grid lg:grid-cols-4 gap-8">
              {[
                {
                  step: "01",
                  title: "Discovery & Analysis",
                  description: "We start by understanding your vision, goals, and constraints to develop a comprehensive project strategy.",
                },
                {
                  step: "02", 
                  title: "Planning & Design",
                  description: "Our team creates detailed plans, conducts feasibility studies, and designs solutions that maximize value.",
                },
                {
                  step: "03",
                  title: "Approvals & Permits",
                  description: "We navigate the regulatory landscape to secure all necessary approvals and permits efficiently.",
                },
                {
                  step: "04",
                  title: "Execution & Delivery",
                  description: "We oversee project implementation, ensuring quality standards and timely delivery within budget.",
                },
              ].map((phase, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="text-4xl font-bold text-primary mb-4" data-testid={`process-step-${index}`}>
                      {phase.step}
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-3" data-testid={`process-title-${index}`}>
                      {phase.title}
                    </h3>
                    <p className="text-sm text-muted-foreground" data-testid={`process-description-${index}`}>
                      {phase.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Consultation Form Section */}
        <section id="consultation-form" className="py-20 bg-card">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-serif font-bold text-foreground mb-6">
                  Ready to Start Your Project?
                </h2>
                <p className="text-lg text-muted-foreground mb-8">
                  Schedule a consultation with our development experts to discuss your project goals and explore how we can help bring your vision to life.
                </p>
                
                <div className="space-y-4 mb-8">
                  <div className="flex items-center">
                    <TrendingUp className="h-5 w-5 text-primary mr-3" />
                    <span className="text-muted-foreground">Comprehensive market analysis</span>
                  </div>
                  <div className="flex items-center">
                    <Building className="h-5 w-5 text-primary mr-3" />
                    <span className="text-muted-foreground">Expert project management</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="h-5 w-5 text-primary mr-3" />
                    <span className="text-muted-foreground">Dedicated development team</span>
                  </div>
                </div>

                {/* Optional Calendly Integration */}
                <div className="p-6 bg-background rounded-2xl border border-border">
                  <h3 className="font-semibold text-foreground mb-4">Book a Consultation</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Schedule a 30-minute consultation to discuss your development needs and project goals.
                  </p>
                  <Button
                    className="w-full gradient-gold text-white hover:opacity-90 transition-opacity"
                    onClick={() => window.open(import.meta.env.VITE_CALENDLY_DEVELOPMENT_URL || "https://calendly.com/atlante-development", "_blank")}
                    data-testid="button-schedule-calendly"
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Schedule Now
                  </Button>
                </div>
              </div>
              
              <div className="flex justify-center">
                <LeadForm
                  title="Development Consultation Request"
                  source="development"
                />
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}

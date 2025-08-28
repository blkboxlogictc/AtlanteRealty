import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import LeadForm from "@/components/forms/LeadForm";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Key, Users, Wrench, FileText, DollarSign, Shield, ExternalLink } from "lucide-react";

const services = [
  {
    icon: Users,
    title: "Tenant Screening",
    description: "Comprehensive background checks and credit screening to find qualified, reliable tenants for your property.",
    features: [
      "Credit and background checks",
      "Employment verification",
      "Rental history review",
      "Reference verification",
    ],
  },
  {
    icon: Wrench,
    title: "Maintenance Coordination",
    description: "24/7 maintenance support with our network of licensed, insured contractors and service providers.",
    features: [
      "Emergency response",
      "Preventive maintenance",
      "Quality control",
      "Vendor management",
    ],
  },
  {
    icon: FileText,
    title: "Legal Compliance",
    description: "Stay compliant with all local, state, and federal regulations governing rental properties.",
    features: [
      "Lease agreement preparation",
      "Eviction proceedings",
      "Fair housing compliance",
      "Legal documentation",
    ],
  },
  {
    icon: DollarSign,
    title: "Financial Management",
    description: "Complete financial oversight including rent collection, expense tracking, and detailed reporting.",
    features: [
      "Automated rent collection",
      "Monthly financial reports",
      "Tax preparation support",
      "Budget planning",
    ],
  },
];

const benefits = [
  {
    title: "Maximize Rental Income",
    description: "Our market expertise ensures competitive pricing and minimal vacancy periods.",
    icon: DollarSign,
  },
  {
    title: "Reduce Stress",
    description: "Let us handle tenant issues, maintenance, and day-to-day property management tasks.",
    icon: Shield,
  },
  {
    title: "Professional Service",
    description: "Licensed property management with years of experience and local market knowledge.",
    icon: Users,
  },
];

const pricingTiers = [
  {
    name: "Residential",
    description: "Perfect for single-family homes and small multi-unit properties",
    rate: "8%",
    features: [
      "Tenant screening & placement",
      "Rent collection & accounting",
      "Maintenance coordination",
      "Monthly financial reports",
      "24/7 emergency support",
    ],
  },
  {
    name: "Commercial",
    description: "Comprehensive management for commercial and retail properties",
    rate: "Contact for quote",
    features: [
      "Lease administration",
      "Tenant relations",
      "Property maintenance",
      "Financial reporting",
      "Capital improvement planning",
    ],
  },
  {
    name: "Portfolio",
    description: "Customized solutions for large property portfolios",
    rate: "Custom pricing",
    features: [
      "Dedicated account manager",
      "Custom reporting",
      "Volume discounts",
      "Strategic planning",
      "Performance analytics",
    ],
  },
];

export default function PropertyManagement() {
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
                  Professional <span className="text-gradient-gold">Property Management</span>
                </h1>
                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                  Maximize your investment returns with our comprehensive property management services. 
                  We handle everything from tenant screening to maintenance coordination, so you can enjoy passive income stress-free.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <Button 
                    className="gradient-gold text-white hover:opacity-90 transition-opacity"
                    onClick={() => window.open(import.meta.env.VITE_OWNER_PORTAL_URL || "https://portal.atlante.com", "_blank")}
                    data-testid="button-owner-login"
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Owner Login
                  </Button>
                  <Button 
                    variant="outline"
                    className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                    onClick={() => window.open(import.meta.env.VITE_TENANT_PORTAL_URL || "https://tenants.atlante.com", "_blank")}
                    data-testid="button-tenant-login"
                  >
                    <Key className="h-4 w-4 mr-2" />
                    Tenant Login
                  </Button>
                </div>
                
                <div className="grid grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">500+</div>
                    <div className="text-sm text-muted-foreground">Properties Managed</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">98%</div>
                    <div className="text-sm text-muted-foreground">Occupancy Rate</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">24/7</div>
                    <div className="text-sm text-muted-foreground">Support</div>
                  </div>
                </div>
              </div>
              
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=600"
                  alt="Modern apartment building"
                  className="rounded-2xl shadow-2xl w-full h-auto"
                />
                <div className="absolute inset-0 rounded-2xl ring-1 ring-black/10" />
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-serif font-bold text-foreground mb-4">
                Comprehensive Management Services
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                From tenant placement to financial reporting, we handle every aspect of property management
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

        {/* Benefits Section */}
        <section className="py-20 bg-card">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-serif font-bold text-foreground mb-4">
                Why Choose Our Management Services?
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Experience the peace of mind that comes with professional property management
              </p>
            </div>
            
            <div className="grid lg:grid-cols-3 gap-8">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <Card key={index} className="text-center hover:shadow-xl transition-all duration-300">
                    <CardContent className="p-8">
                      <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
                        <Icon className="h-8 w-8 text-primary" />
                      </div>
                      <h3 className="text-xl font-semibold text-foreground mb-4" data-testid={`benefit-title-${index}`}>
                        {benefit.title}
                      </h3>
                      <p className="text-muted-foreground" data-testid={`benefit-description-${index}`}>
                        {benefit.description}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-serif font-bold text-foreground mb-4">
                Transparent Pricing
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Our management fees are competitive and only charged when your property is occupied
              </p>
            </div>
            
            <div className="grid lg:grid-cols-3 gap-8">
              {pricingTiers.map((tier, index) => (
                <Card key={index} className="relative hover:shadow-xl transition-all duration-300">
                  {index === 1 && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <div className="bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-medium">
                        Most Popular
                      </div>
                    </div>
                  )}
                  
                  <CardContent className="p-8">
                    <div className="text-center mb-8">
                      <h3 className="text-2xl font-bold text-foreground mb-2" data-testid={`pricing-name-${index}`}>
                        {tier.name}
                      </h3>
                      <p className="text-muted-foreground mb-4" data-testid={`pricing-description-${index}`}>
                        {tier.description}
                      </p>
                      <div className="text-3xl font-bold text-primary" data-testid={`pricing-rate-${index}`}>
                        {tier.rate}
                        {tier.rate.includes('%') && <span className="text-lg text-muted-foreground"> of rent</span>}
                      </div>
                    </div>
                    
                    <ul className="space-y-3 mb-8">
                      {tier.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center text-sm">
                          <div className="h-2 w-2 rounded-full bg-primary mr-3 flex-shrink-0" />
                          <span className="text-muted-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <Button 
                      className="w-full gradient-gold text-white hover:opacity-90 transition-opacity"
                      onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
                      data-testid={`pricing-button-${index}`}
                    >
                      Get Started
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-20 bg-card">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-serif font-bold text-foreground mb-4">
                How It Works
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Getting started with professional property management is simple
              </p>
            </div>
            
            <div className="grid lg:grid-cols-4 gap-8">
              {[
                {
                  step: "01",
                  title: "Property Assessment",
                  description: "We evaluate your property and provide market analysis and rental recommendations.",
                },
                {
                  step: "02",
                  title: "Marketing & Leasing",
                  description: "Professional photography, listing creation, and tenant screening to find qualified renters.",
                },
                {
                  step: "03",
                  title: "Move-In & Management",
                  description: "Handle lease signing, move-in coordination, and ongoing property management.",
                },
                {
                  step: "04",
                  title: "Ongoing Support",
                  description: "Monthly reporting, maintenance coordination, and 24/7 support for you and your tenants.",
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

        {/* Contact Section */}
        <section id="contact-form" className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-serif font-bold text-foreground mb-6">
                  Ready to Maximize Your Investment?
                </h2>
                <p className="text-lg text-muted-foreground mb-8">
                  Let our experienced property management team take care of your investment property 
                  while you enjoy passive income and peace of mind.
                </p>
                
                <div className="space-y-4 mb-8">
                  <div className="flex items-center">
                    <Users className="h-5 w-5 text-primary mr-3" />
                    <span className="text-muted-foreground">Professional tenant screening</span>
                  </div>
                  <div className="flex items-center">
                    <Wrench className="h-5 w-5 text-primary mr-3" />
                    <span className="text-muted-foreground">24/7 maintenance support</span>
                  </div>
                  <div className="flex items-center">
                    <FileText className="h-5 w-5 text-primary mr-3" />
                    <span className="text-muted-foreground">Detailed monthly reporting</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <Button
                    variant="outline"
                    className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                    onClick={() => window.open(import.meta.env.VITE_OWNER_PORTAL_URL || "https://portal.atlante.com", "_blank")}
                    data-testid="button-owner-portal"
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Owner Portal
                  </Button>
                  <Button
                    variant="outline"
                    className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                    onClick={() => window.open(import.meta.env.VITE_TENANT_PORTAL_URL || "https://tenants.atlante.com", "_blank")}
                    data-testid="button-tenant-portal"
                  >
                    <Key className="h-4 w-4 mr-2" />
                    Tenant Portal
                  </Button>
                </div>
              </div>
              
              <div className="flex justify-center">
                <LeadForm
                  title="Property Management Inquiry"
                  source="property-management"
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

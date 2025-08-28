import { Home, GraduationCap, Building, Key } from "lucide-react";
import ServiceCard from "@/components/cards/ServiceCard";

const services = [
  {
    title: "Brokerage",
    description: "Full-service residential and commercial real estate with MLS access and expert local agents.",
    features: [
      "Buy & Sell Properties",
      "MLS Search Access", 
      "Market Analysis"
    ],
    icon: Home,
    href: "/brokerage",
    buttonText: "Explore Brokerage",
  },
  {
    title: "Real Estate School",
    description: "Professional education and licensing programs for aspiring real estate professionals.",
    features: [
      "License Preparation",
      "Continuing Education",
      "Expert Instructors"
    ],
    icon: GraduationCap,
    href: "/school",
    buttonText: "View Classes",
  },
  {
    title: "Development Consulting",
    description: "Strategic guidance for real estate development projects from feasibility to completion.",
    features: [
      "Feasibility Studies",
      "Site Acquisition",
      "Entitlement Support"
    ],
    icon: Building,
    href: "/development",
    buttonText: "Learn More",
  },
  {
    title: "Property Management",
    description: "Professional management services for residential and commercial property owners.",
    features: [
      "Tenant Screening",
      "Maintenance Coordination", 
      "Financial Reporting"
    ],
    icon: Key,
    href: "/property-management",
    buttonText: "Get Started",
  },
];

export default function ServicesSection() {
  return (
    <section className="py-20 bg-card">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-serif font-bold text-foreground mb-4">
            Comprehensive Real Estate Services
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Four specialized divisions working together to serve all your real estate needs
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
}

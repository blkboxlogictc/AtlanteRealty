import { Button } from "@/components/ui/button";
import { Award, Users, Handshake } from "lucide-react";
import { Link } from "wouter";

const features = [
  {
    icon: Award,
    title: "Award-Winning Service",
    description: "Recognized for excellence in real estate transactions and customer satisfaction.",
  },
  {
    icon: Users,
    title: "Local Expertise", 
    description: "Deep knowledge of Treasure Coast markets and communities.",
  },
  {
    icon: Handshake,
    title: "Full-Service Solutions",
    description: "One partner for all your real estate needs, from buying to development.",
  },
];

const images = [
  {
    src: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&h=400",
    alt: "Professional real estate team meeting",
    className: "rounded-2xl shadow-lg w-full h-48 object-cover",
  },
  {
    src: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&h=400",
    alt: "Modern office building",
    className: "rounded-2xl shadow-lg w-full h-48 object-cover mt-8",
  },
  {
    src: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&h=400",
    alt: "Construction site development",
    className: "rounded-2xl shadow-lg w-full h-48 object-cover -mt-8",
  },
  {
    src: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&h=400",
    alt: "Educational classroom setting",
    className: "rounded-2xl shadow-lg w-full h-48 object-cover",
  },
];

export default function WhyAtlante() {
  return (
    <section className="py-20 bg-card">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl lg:text-4xl font-serif font-bold text-foreground mb-6">
                Why Choose Atlante?
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Our integrated approach to real estate combines decades of experience with 
                innovative solutions, providing you with comprehensive service across all 
                aspects of property ownership and development.
              </p>
            </div>
            
            <div className="grid gap-6">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-2" data-testid={`feature-title-${index}`}>
                        {feature.title}
                      </h4>
                      <p className="text-muted-foreground" data-testid={`feature-description-${index}`}>
                        {feature.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/contact">
                <Button 
                  className="gradient-gold text-white hover:opacity-90 transition-opacity"
                  data-testid="button-schedule-consultation"
                >
                  Schedule Consultation
                </Button>
              </Link>
              <Link href="/blog">
                <Button 
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
                  data-testid="button-learn-story"
                >
                  Learn Our Story
                </Button>
              </Link>
            </div>
          </div>
          
          {/* Image Grid */}
          <div className="grid grid-cols-2 gap-4">
            {images.map((image, index) => (
              <img
                key={index}
                src={image.src}
                alt={image.alt}
                className={image.className}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";

interface Service {
  title: string;
  description: string;
  features: string[];
  icon: LucideIcon;
  href: string;
  buttonText: string;
}

interface ServiceCardProps {
  service: Service;
  onLearnMore?: (service: Service) => void;
}

export default function ServiceCard({ service, onLearnMore }: ServiceCardProps) {
  const Icon = service.icon;

  const handleClick = () => {
    if (onLearnMore) {
      onLearnMore(service);
    } else {
      window.location.href = service.href;
    }
  };

  return (
    <Card className="group bg-background hover:shadow-xl transition-all duration-300 border border-border hover:border-primary/20 h-full">
      <CardContent className="p-8 flex flex-col h-full">
        <div className="h-16 w-16 rounded-2xl gradient-gold flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
          <Icon className="h-6 w-6 text-white" />
        </div>
        
        <h3 className="text-xl font-semibold mb-4 text-foreground" data-testid={`service-title-${service.title.toLowerCase().replace(/\s+/g, '-')}`}>
          {service.title}
        </h3>
        
        <p className="text-muted-foreground mb-6 leading-relaxed flex-grow" data-testid={`service-description-${service.title.toLowerCase().replace(/\s+/g, '-')}`}>
          {service.description}
        </p>
        
        <ul className="space-y-2 mb-6">
          {service.features.map((feature, index) => (
            <li key={index} className="flex items-center text-sm text-muted-foreground">
              <div className="h-1.5 w-1.5 rounded-full bg-primary mr-2 flex-shrink-0" />
              {feature}
            </li>
          ))}
        </ul>
        
        <Button
          variant="outline"
          className="w-full py-3 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-colors mt-auto"
          onClick={handleClick}
          data-testid={`service-button-${service.title.toLowerCase().replace(/\s+/g, '-')}`}
        >
          {service.buttonText}
        </Button>
      </CardContent>
    </Card>
  );
}

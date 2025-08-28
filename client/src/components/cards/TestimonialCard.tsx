import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import type { Testimonial } from "@shared/schema";

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export default function TestimonialCard({ testimonial }: TestimonialCardProps) {
  const defaultImage = `https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&face=center`;

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`h-4 w-4 ${
          index < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <Card className="bg-background border border-border h-full">
      <CardContent className="p-8 flex flex-col h-full">
        <div className="flex items-center mb-4">
          <div className="flex" data-testid={`testimonial-rating-${testimonial.id}`}>
            {renderStars(testimonial.rating)}
          </div>
        </div>
        
        <blockquote className="text-muted-foreground mb-6 leading-relaxed flex-grow italic">
          "{testimonial.quote}"
        </blockquote>
        
        <div className="flex items-center mt-auto">
          <img
            src={testimonial.image || defaultImage}
            alt={`${testimonial.name} testimonial`}
            className="w-12 h-12 rounded-full object-cover mr-4"
            onError={(e) => {
              (e.target as HTMLImageElement).src = defaultImage;
            }}
          />
          <div>
            <div className="font-semibold text-foreground" data-testid={`testimonial-name-${testimonial.id}`}>
              {testimonial.name}
            </div>
            <div className="text-sm text-muted-foreground" data-testid={`testimonial-location-${testimonial.id}`}>
              {testimonial.location}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

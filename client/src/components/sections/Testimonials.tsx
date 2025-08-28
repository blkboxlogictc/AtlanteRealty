import { useQuery } from "@tanstack/react-query";
import TestimonialCard from "@/components/cards/TestimonialCard";
import { Skeleton } from "@/components/ui/skeleton";
import type { Testimonial } from "@shared/schema";

export default function Testimonials() {
  const { data: testimonials, isLoading, error } = useQuery<Testimonial[]>({
    queryKey: ["/api/testimonials"],
  });

  if (error) {
    return null; // Gracefully hide section if testimonials can't load
  }

  // Show first 3 testimonials
  const featuredTestimonials = testimonials?.filter(t => t.isActive).slice(0, 3) || [];

  return (
    <section className="py-20 bg-card">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-serif font-bold text-foreground mb-4">
            What Our Clients Say
          </h2>
          <p className="text-lg text-muted-foreground">
            Real experiences from satisfied clients across all our services
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading
            ? Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="space-y-4">
                  <Skeleton className="h-64 w-full rounded-2xl" />
                </div>
              ))
            : featuredTestimonials.map((testimonial) => (
                <TestimonialCard key={testimonial.id} testimonial={testimonial} />
              ))
          }
        </div>
        
        {!isLoading && featuredTestimonials.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              Client testimonials will be displayed here once available.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

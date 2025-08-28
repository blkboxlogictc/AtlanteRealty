import { Button } from "@/components/ui/button";
import { Calendar, Phone } from "lucide-react";
import { Link } from "wouter";

export default function CTASection() {
  return (
    <section className="py-20 bg-card">
      <div className="container mx-auto px-4">
        <div className="bg-gradient-to-r from-primary to-secondary rounded-3xl p-12 text-center text-white">
          <h2 className="text-3xl lg:text-4xl font-serif font-bold mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Whether you're buying, selling, learning, or developing, our team is here to 
            guide you every step of the way.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button 
                className="bg-white text-primary hover:bg-gray-50 transition-colors"
                data-testid="button-schedule-consultation-cta"
              >
                <Calendar className="h-4 w-4 mr-2" />
                Schedule Consultation
              </Button>
            </Link>
            <Link href="/contact">
              <Button 
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-primary transition-colors"
                data-testid="button-contact-today-cta"
              >
                <Phone className="h-4 w-4 mr-2" />
                Contact Us Today
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

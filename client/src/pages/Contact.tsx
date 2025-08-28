import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import LeadForm from "@/components/forms/LeadForm";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Phone, Mail, MapPin, Clock, Calendar, ExternalLink } from "lucide-react";

const contactInfo = [
  {
    icon: Phone,
    title: "Phone",
    details: "(772) 555-0123",
    action: "tel:(772) 555-0123",
    actionText: "Call Now",
  },
  {
    icon: Mail,
    title: "Email",
    details: "info@atlante.com",
    action: "mailto:info@atlante.com",
    actionText: "Send Email",
  },
  {
    icon: MapPin,
    title: "Office Location",
    details: "123 Main Street\nVero Beach, FL 32963",
    action: "https://maps.google.com/?q=123+Main+Street+Vero+Beach+FL+32963",
    actionText: "Get Directions",
  },
];

const officeHours = [
  { day: "Monday - Friday", hours: "9:00 AM - 6:00 PM" },
  { day: "Saturday", hours: "10:00 AM - 4:00 PM" },
  { day: "Sunday", hours: "By Appointment" },
];

const departments = [
  {
    title: "Residential Sales",
    email: "sales@atlante.com",
    phone: "(772) 555-0124",
    description: "Buying or selling residential properties",
  },
  {
    title: "Commercial Sales",
    email: "commercial@atlante.com", 
    phone: "(772) 555-0125",
    description: "Commercial real estate transactions",
  },
  {
    title: "Property Management",
    email: "management@atlante.com",
    phone: "(772) 555-0126", 
    description: "Rental property management services",
  },
  {
    title: "Real Estate School",
    email: "school@atlante.com",
    phone: "(772) 555-0127",
    description: "Education and licensing programs",
  },
  {
    title: "Development Consulting", 
    email: "development@atlante.com",
    phone: "(772) 555-0128",
    description: "Development and consulting services",
  },
];

export default function Contact() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="py-20 bg-card">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h1 className="text-4xl lg:text-5xl font-serif font-bold text-foreground mb-4">
                Get in Touch
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Ready to start your real estate journey? Our team of experts is here to help you every step of the way.
              </p>
            </div>
            
            <div className="grid lg:grid-cols-3 gap-8">
              {contactInfo.map((info, index) => {
                const Icon = info.icon;
                return (
                  <Card key={index} className="text-center hover:shadow-xl transition-all duration-300">
                    <CardContent className="p-8">
                      <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
                        <Icon className="h-8 w-8 text-primary" />
                      </div>
                      <h3 className="text-xl font-semibold text-foreground mb-3" data-testid={`contact-title-${index}`}>
                        {info.title}
                      </h3>
                      <p className="text-muted-foreground mb-6 whitespace-pre-line" data-testid={`contact-details-${index}`}>
                        {info.details}
                      </p>
                      <Button
                        variant="outline"
                        className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                        onClick={() => window.open(info.action, info.action.startsWith('http') ? '_blank' : '_self')}
                        data-testid={`contact-action-${index}`}
                      >
                        {info.actionText}
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Contact Form & Info */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div>
                <LeadForm
                  title="Send Us a Message"
                  source="contact-page"
                />
              </div>
              
              {/* Additional Info */}
              <div className="space-y-8">
                {/* Office Hours */}
                <Card>
                  <CardContent className="p-8">
                    <h3 className="text-xl font-semibold text-foreground mb-6 flex items-center">
                      <Clock className="h-5 w-5 mr-2 text-primary" />
                      Office Hours
                    </h3>
                    <div className="space-y-3">
                      {officeHours.map((schedule, index) => (
                        <div key={index} className="flex justify-between items-center">
                          <span className="text-muted-foreground" data-testid={`hours-day-${index}`}>
                            {schedule.day}
                          </span>
                          <span className="font-medium text-foreground" data-testid={`hours-time-${index}`}>
                            {schedule.hours}
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Emergency Contact */}
                <Card>
                  <CardContent className="p-8">
                    <h3 className="text-xl font-semibold text-foreground mb-4">
                      Emergency Contact
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      For urgent property management issues outside of business hours:
                    </p>
                    <Button
                      className="w-full gradient-gold text-white hover:opacity-90 transition-opacity"
                      onClick={() => window.open('tel:(772) 555-0199', '_self')}
                      data-testid="button-emergency-contact"
                    >
                      <Phone className="h-4 w-4 mr-2" />
                      Emergency Line: (772) 555-0199
                    </Button>
                  </CardContent>
                </Card>

                {/* Schedule Meeting */}
                <Card>
                  <CardContent className="p-8">
                    <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center">
                      <Calendar className="h-5 w-5 mr-2 text-primary" />
                      Schedule a Meeting
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      Prefer to schedule a consultation at your convenience? Book a meeting with one of our specialists.
                    </p>
                    <Button
                      variant="outline"
                      className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                      onClick={() => window.open(import.meta.env.VITE_CALENDLY_MAIN_URL || "https://calendly.com/atlante", "_blank")}
                      data-testid="button-schedule-meeting"
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Schedule Now
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Department Contacts */}
        <section className="py-20 bg-card">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-serif font-bold text-foreground mb-4">
                Department Contacts
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Get in touch with the right specialist for your specific needs
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {departments.map((dept, index) => (
                <Card key={index} className="hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-foreground mb-2" data-testid={`dept-title-${index}`}>
                      {dept.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4" data-testid={`dept-description-${index}`}>
                      {dept.description}
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center text-sm">
                        <Phone className="h-4 w-4 text-primary mr-2" />
                        <a 
                          href={`tel:${dept.phone}`}
                          className="text-muted-foreground hover:text-primary transition-colors"
                          data-testid={`dept-phone-${index}`}
                        >
                          {dept.phone}
                        </a>
                      </div>
                      <div className="flex items-center text-sm">
                        <Mail className="h-4 w-4 text-primary mr-2" />
                        <a 
                          href={`mailto:${dept.email}`}
                          className="text-muted-foreground hover:text-primary transition-colors"
                          data-testid={`dept-email-${index}`}
                        >
                          {dept.email}
                        </a>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-serif font-bold text-foreground mb-4">
                Visit Our Office
              </h2>
              <p className="text-muted-foreground">
                Located in the heart of Vero Beach, convenient to all Treasure Coast communities
              </p>
            </div>
            
            {/* Map Placeholder */}
            <div className="bg-muted rounded-2xl h-96 flex items-center justify-center border-2 border-dashed border-muted-foreground/20">
              <div className="text-center">
                <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">Interactive Map</h3>
                <p className="text-muted-foreground mb-4 max-w-md">
                  Embed Google Maps or another mapping service to show your office location
                </p>
                <Button
                  variant="outline"
                  onClick={() => window.open("https://maps.google.com/?q=123+Main+Street+Vero+Beach+FL+32963", "_blank")}
                  data-testid="button-view-map"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  View in Google Maps
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}

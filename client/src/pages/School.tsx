import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import LeadForm from "@/components/forms/LeadForm";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, Clock, Users, Award, Calendar, ExternalLink } from "lucide-react";

const programs = [
  {
    title: "Real Estate Pre-License Course",
    description: "Complete 63-hour course covering Florida real estate law, principles, and practices",
    duration: "4-6 weeks",
    format: "Online & In-Person",
    price: "$299",
    features: [
      "State-approved curriculum",
      "Expert instruction",
      "Exam preparation",
      "Study materials included",
    ],
  },
  {
    title: "Continuing Education",
    description: "Stay current with industry changes and maintain your license with our CE courses",
    duration: "14 hours",
    format: "Online",
    price: "$149",
    features: [
      "FREC approved courses",
      "Self-paced learning",
      "Instant certificates",
      "Mobile friendly",
    ],
  },
  {
    title: "Post-License Education",
    description: "Required 45-hour course for new licensees in their first renewal period",
    duration: "6-8 weeks",
    format: "Online & In-Person",
    price: "$249",
    features: [
      "Advanced real estate topics",
      "Practical applications",
      "Industry best practices",
      "Career development",
    ],
  },
];

const instructors = [
  {
    name: "Maria Rodriguez",
    title: "Lead Instructor",
    credentials: "Licensed Broker, 20+ Years Experience",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b830?w=300&h=300&fit=crop&face=center",
  },
  {
    name: "James Wilson",
    title: "Real Estate Law Expert",
    credentials: "JD, Real Estate Attorney",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&face=center",
  },
  {
    name: "Sarah Chen",
    title: "Commercial Specialist",
    credentials: "CCIM, Commercial Expert",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&face=center",
  },
];

const stats = [
  { value: "95%", label: "Pass Rate" },
  { value: "1,500+", label: "Graduates" },
  { value: "15", label: "Years Teaching" },
  { value: "4.9/5", label: "Student Rating" },
];

export default function School() {
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
                  Launch Your <span className="text-gradient-gold">Real Estate Career</span>
                </h1>
                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                  Get the education and licensing you need to succeed in Florida real estate. 
                  Our state-approved courses are taught by industry experts with decades of experience.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <Button 
                    className="gradient-gold text-white hover:opacity-90 transition-opacity"
                    onClick={() => window.open("https://school.atlante.com", "_blank")}
                    data-testid="button-view-classes"
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    View Classes & Register
                  </Button>
                  <Button 
                    variant="outline"
                    className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                    onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
                    data-testid="button-learn-more"
                  >
                    Learn More
                  </Button>
                </div>
                
                {/* Stats */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  {stats.map((stat, index) => (
                    <div key={index} className="text-center">
                      <div className="text-2xl font-bold text-primary" data-testid={`stat-value-${index}`}>
                        {stat.value}
                      </div>
                      <div className="text-sm text-muted-foreground" data-testid={`stat-label-${index}`}>
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=600"
                  alt="Real estate education classroom"
                  className="rounded-2xl shadow-2xl w-full h-auto"
                />
                <div className="absolute inset-0 rounded-2xl ring-1 ring-black/10" />
              </div>
            </div>
          </div>
        </section>

        {/* Programs Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-serif font-bold text-foreground mb-4">
                Our Programs
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Comprehensive real estate education designed to help you succeed from licensing through your entire career
              </p>
            </div>
            
            <div className="grid lg:grid-cols-3 gap-8">
              {programs.map((program, index) => (
                <Card key={index} className="h-full hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-8 flex flex-col h-full">
                    <div className="mb-6">
                      <h3 className="text-xl font-semibold text-foreground mb-3" data-testid={`program-title-${index}`}>
                        {program.title}
                      </h3>
                      <p className="text-muted-foreground mb-4" data-testid={`program-description-${index}`}>
                        {program.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        <Badge variant="secondary" className="flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          {program.duration}
                        </Badge>
                        <Badge variant="secondary" className="flex items-center">
                          <Users className="h-3 w-3 mr-1" />
                          {program.format}
                        </Badge>
                      </div>
                      
                      <div className="text-2xl font-bold text-primary mb-4" data-testid={`program-price-${index}`}>
                        {program.price}
                      </div>
                    </div>
                    
                    <ul className="space-y-2 mb-6 flex-grow">
                      {program.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center text-sm text-muted-foreground">
                          <div className="h-1.5 w-1.5 rounded-full bg-primary mr-3 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    
                    <Button 
                      className="w-full gradient-gold text-white hover:opacity-90 transition-opacity mt-auto"
                      onClick={() => window.open("https://school.atlante.com", "_blank")}
                      data-testid={`program-enroll-${index}`}
                    >
                      <GraduationCap className="h-4 w-4 mr-2" />
                      Enroll Now
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Instructors Section */}
        <section className="py-20 bg-card">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-serif font-bold text-foreground mb-4">
                Learn from the Best
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Our instructors are seasoned real estate professionals with decades of combined experience
              </p>
            </div>
            
            <div className="grid lg:grid-cols-3 gap-8">
              {instructors.map((instructor, index) => (
                <Card key={index} className="text-center hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-8">
                    <img
                      src={instructor.image}
                      alt={`${instructor.name} - ${instructor.title}`}
                      className="w-24 h-24 rounded-full mx-auto mb-4 object-cover ring-4 ring-primary/10"
                    />
                    <h3 className="text-xl font-semibold text-foreground mb-2" data-testid={`instructor-name-${index}`}>
                      {instructor.name}
                    </h3>
                    <p className="text-primary font-medium mb-3" data-testid={`instructor-title-${index}`}>
                      {instructor.title}
                    </p>
                    <p className="text-sm text-muted-foreground" data-testid={`instructor-credentials-${index}`}>
                      {instructor.credentials}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl lg:text-4xl font-serif font-bold text-foreground mb-4">
                  Frequently Asked Questions
                </h2>
              </div>
              
              <div className="space-y-6">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-foreground mb-3">
                      How long does it take to get my real estate license?
                    </h3>
                    <p className="text-muted-foreground">
                      After completing our 63-hour pre-license course, you'll be eligible to take the state exam. 
                      Most students complete the course in 4-6 weeks and are licensed within 2-3 months.
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-foreground mb-3">
                      Do you offer online courses?
                    </h3>
                    <p className="text-muted-foreground">
                      Yes! We offer both online and in-person options for most of our courses. 
                      Our online platform is available 24/7 with full mobile compatibility.
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-foreground mb-3">
                      What is your pass rate?
                    </h3>
                    <p className="text-muted-foreground">
                      We maintain a 95% pass rate for students who complete our courses and follow our study recommendations. 
                      We provide comprehensive exam preparation and ongoing support.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact-form" className="py-20 bg-card">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-serif font-bold text-foreground mb-6">
                  Ready to Start Your Career?
                </h2>
                <p className="text-lg text-muted-foreground mb-8">
                  Have questions about our programs or need help choosing the right course? 
                  Our education advisors are here to help you get started.
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Award className="h-5 w-5 text-primary mr-3" />
                    <span className="text-muted-foreground">State-approved curriculum</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 text-primary mr-3" />
                    <span className="text-muted-foreground">Flexible scheduling options</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="h-5 w-5 text-primary mr-3" />
                    <span className="text-muted-foreground">Expert instructor support</span>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-center">
                <LeadForm
                  title="Get Course Information"
                  source="school"
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

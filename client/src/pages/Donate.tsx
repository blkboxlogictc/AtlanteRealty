import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import LeadForm from "@/components/forms/LeadForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, Users, Building, GraduationCap, Award, ExternalLink } from "lucide-react";

const donationTiers = [
  {
    name: "Community Supporter",
    amount: "$50",
    description: "Help us support local community initiatives and educational programs",
    benefits: [
      "Recognition on our website",
      "Quarterly newsletter updates",
      "Community event invitations",
    ],
    popular: false,
  },
  {
    name: "Education Advocate", 
    amount: "$250",
    description: "Support our real estate education and professional development programs",
    benefits: [
      "All Community Supporter benefits",
      "Free access to educational webinars",
      "Annual appreciation dinner invitation",
      "Featured recognition in materials",
    ],
    popular: true,
  },
  {
    name: "Development Partner",
    amount: "$1,000",
    description: "Partner with us on community development and housing initiatives",
    benefits: [
      "All Education Advocate benefits",
      "Quarterly meeting with leadership",
      "Co-branding opportunities",
      "Custom partnership recognition",
    ],
    popular: false,
  },
];

const sponsorshipTiers = [
  {
    name: "Event Sponsor",
    description: "Sponsor community events and educational seminars",
    investment: "$500 - $2,500",
    benefits: [
      "Event logo placement",
      "Speaking opportunities",
      "Networking access",
      "Marketing materials inclusion",
    ],
    icon: Users,
  },
  {
    name: "Program Sponsor",
    description: "Support ongoing educational and community programs",
    investment: "$2,500 - $10,000",
    benefits: [
      "Program naming rights",
      "Website and materials recognition",
      "Exclusive networking events",
      "Custom marketing content",
    ],
    icon: GraduationCap,
  },
  {
    name: "Legacy Partner",
    description: "Long-term partnership for community development initiatives",
    investment: "$10,000+",
    benefits: [
      "Strategic partnership meetings",
      "Co-development opportunities",
      "Premium brand placement",
      "Custom community impact projects",
    ],
    icon: Building,
  },
];

const impactStats = [
  { value: "50+", label: "Families Housed", description: "Through our affordable housing initiatives" },
  { value: "200+", label: "Students Educated", description: "Real estate professionals licensed through our programs" },
  { value: "$2M+", label: "Community Investment", description: "Direct investment in local development projects" },
  { value: "15", label: "Annual Events", description: "Community education and networking events hosted" },
];

export default function Donate() {
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
                  Building <span className="text-gradient-gold">Stronger Communities</span> Together
                </h1>
                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                  Your support helps us create affordable housing opportunities, educate future real estate professionals, 
                  and strengthen communities across the Treasure Coast through strategic development initiatives.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    className="gradient-gold text-white hover:opacity-90 transition-opacity"
                    onClick={() => document.getElementById('donation-form')?.scrollIntoView({ behavior: 'smooth' })}
                    data-testid="button-donate-now"
                  >
                    <Heart className="h-4 w-4 mr-2" />
                    Donate Now
                  </Button>
                  <Button 
                    variant="outline"
                    className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                    onClick={() => document.getElementById('sponsorship')?.scrollIntoView({ behavior: 'smooth' })}
                    data-testid="button-learn-sponsorship"
                  >
                    Learn About Sponsorship
                  </Button>
                </div>
              </div>
              
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=600"
                  alt="Community housing development"
                  className="rounded-2xl shadow-2xl w-full h-auto"
                />
                <div className="absolute inset-0 rounded-2xl ring-1 ring-black/10" />
              </div>
            </div>
          </div>
        </section>

        {/* Impact Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-serif font-bold text-foreground mb-4">
                Our Community Impact
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                See how your contributions are making a real difference in our communities
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {impactStats.map((stat, index) => (
                <Card key={index} className="text-center hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-8">
                    <div className="text-4xl font-bold text-primary mb-2" data-testid={`impact-value-${index}`}>
                      {stat.value}
                    </div>
                    <div className="text-lg font-semibold text-foreground mb-2" data-testid={`impact-label-${index}`}>
                      {stat.label}
                    </div>
                    <p className="text-sm text-muted-foreground" data-testid={`impact-description-${index}`}>
                      {stat.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Donation Tiers */}
        <section id="donation-form" className="py-20 bg-card">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-serif font-bold text-foreground mb-4">
                Make a Donation
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Choose a donation level that works for you and help us continue our mission
              </p>
            </div>
            
            <div className="grid lg:grid-cols-3 gap-8 mb-12">
              {donationTiers.map((tier, index) => (
                <Card key={index} className={`relative hover:shadow-xl transition-all duration-300 ${
                  tier.popular ? 'ring-2 ring-primary' : ''
                }`}>
                  {tier.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-primary text-primary-foreground">
                        Most Popular
                      </Badge>
                    </div>
                  )}
                  
                  <CardHeader className="text-center">
                    <CardTitle className="text-2xl" data-testid={`donation-tier-${index}`}>
                      {tier.name}
                    </CardTitle>
                    <div className="text-4xl font-bold text-primary" data-testid={`donation-amount-${index}`}>
                      {tier.amount}
                    </div>
                    <p className="text-muted-foreground" data-testid={`donation-description-${index}`}>
                      {tier.description}
                    </p>
                  </CardHeader>
                  
                  <CardContent>
                    <ul className="space-y-3 mb-6">
                      {tier.benefits.map((benefit, benefitIndex) => (
                        <li key={benefitIndex} className="flex items-center text-sm">
                          <div className="h-2 w-2 rounded-full bg-primary mr-3 flex-shrink-0" />
                          <span className="text-muted-foreground">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <Button 
                      className="w-full gradient-gold text-white hover:opacity-90 transition-opacity"
                      onClick={() => window.open(import.meta.env.VITE_DONATION_URL || "https://donate.atlante.com", "_blank")}
                      data-testid={`donation-button-${index}`}
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Donate {tier.amount}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            {/* Custom Donation */}
            <Card className="max-w-md mx-auto">
              <CardHeader className="text-center">
                <CardTitle>Custom Donation</CardTitle>
                <p className="text-muted-foreground">
                  Choose your own donation amount
                </p>
              </CardHeader>
              <CardContent>
                <Button 
                  className="w-full gradient-gold text-white hover:opacity-90 transition-opacity"
                  onClick={() => window.open(import.meta.env.VITE_DONATION_CUSTOM_URL || "https://donate.atlante.com/custom", "_blank")}
                  data-testid="button-custom-donation"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Make Custom Donation
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Sponsorship Section */}
        <section id="sponsorship" className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-serif font-bold text-foreground mb-4">
                Corporate Sponsorship Opportunities
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Partner with us to make a lasting impact while gaining valuable brand exposure
              </p>
            </div>
            
            <div className="grid lg:grid-cols-3 gap-8">
              {sponsorshipTiers.map((tier, index) => {
                const Icon = tier.icon;
                return (
                  <Card key={index} className="hover:shadow-xl transition-all duration-300">
                    <CardContent className="p-8">
                      <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
                        <Icon className="h-8 w-8 text-primary" />
                      </div>
                      
                      <h3 className="text-xl font-semibold text-foreground mb-3 text-center" data-testid={`sponsor-name-${index}`}>
                        {tier.name}
                      </h3>
                      
                      <p className="text-muted-foreground mb-4 text-center" data-testid={`sponsor-description-${index}`}>
                        {tier.description}
                      </p>
                      
                      <div className="text-center mb-6">
                        <div className="text-2xl font-bold text-primary" data-testid={`sponsor-investment-${index}`}>
                          {tier.investment}
                        </div>
                      </div>
                      
                      <ul className="space-y-2 mb-6">
                        {tier.benefits.map((benefit, benefitIndex) => (
                          <li key={benefitIndex} className="flex items-center text-sm">
                            <div className="h-1.5 w-1.5 rounded-full bg-primary mr-3 flex-shrink-0" />
                            <span className="text-muted-foreground">{benefit}</span>
                          </li>
                        ))}
                      </ul>
                      
                      <Button 
                        variant="outline"
                        className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                        onClick={() => document.getElementById('partnership-form')?.scrollIntoView({ behavior: 'smooth' })}
                        data-testid={`sponsor-button-${index}`}
                      >
                        Learn More
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Partnership Form */}
        <section id="partnership-form" className="py-20 bg-card">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-serif font-bold text-foreground mb-6">
                  Partner With Us
                </h2>
                <p className="text-lg text-muted-foreground mb-8">
                  Interested in sponsorship or partnership opportunities? We'd love to discuss how we can work together 
                  to create positive impact in our communities while supporting your business goals.
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Award className="h-5 w-5 text-primary mr-3" />
                    <span className="text-muted-foreground">Brand exposure across multiple channels</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="h-5 w-5 text-primary mr-3" />
                    <span className="text-muted-foreground">Access to professional networking opportunities</span>
                  </div>
                  <div className="flex items-center">
                    <Heart className="h-5 w-5 text-primary mr-3" />
                    <span className="text-muted-foreground">Meaningful community impact and legacy</span>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-center">
                <LeadForm
                  title="Partnership Inquiry"
                  source="sponsorship"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Tax Information */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <Card className="max-w-4xl mx-auto">
              <CardContent className="p-8">
                <div className="text-center">
                  <h3 className="text-xl font-semibold text-foreground mb-4">
                    Tax Deductible Donations
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Atlante Real Estate Foundation is a 501(c)(3) non-profit organization. 
                    Your donations are tax-deductible to the extent allowed by law.
                  </p>
                  <div className="grid md:grid-cols-2 gap-8 text-left">
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Tax ID Information</h4>
                      <p className="text-sm text-muted-foreground">
                        EIN: 12-3456789<br />
                        501(c)(3) Status: Confirmed<br />
                        Deductibility Code: PC
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Receipt Information</h4>
                      <p className="text-sm text-muted-foreground">
                        All donors will receive a tax-deductible receipt via email within 24 hours. 
                        For donations over $250, detailed acknowledgment letters are provided.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}

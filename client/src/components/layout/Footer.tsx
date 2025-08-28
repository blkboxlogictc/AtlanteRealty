import { Link } from "wouter";
import { Globe, Phone, Mail, MapPin, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import NewsletterForm from "@/components/forms/NewsletterForm";

const services = [
  { name: "Real Estate Brokerage", href: "/brokerage" },
  { name: "Property Search", href: "/brokerage" },
  { name: "Real Estate School", href: "/school" },
  { name: "Development Consulting", href: "/development" },
  { name: "Property Management", href: "/property-management" },
];

const resources = [
  { name: "Market Reports", href: "/blog" },
  { name: "Blog", href: "/blog" },
  { name: "Agent Directory", href: "/agents" },
  { name: "Community Guide", href: "/blog" },
  { name: "Donation Portal", href: "/donate" },
];

const legal = [
  { name: "Privacy Policy", href: "/privacy" },
  { name: "Terms of Service", href: "/terms" },
  { name: "Accessibility", href: "/accessibility" },
];

export default function Footer() {
  return (
    <footer className="bg-foreground text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-full gradient-gold flex items-center justify-center">
                <Globe className="h-4 w-4 text-white" />
              </div>
              <span className="text-xl font-serif font-semibold">Atlante</span>
            </div>
            <p className="text-gray-300 leading-relaxed">
              Your trusted partner for comprehensive real estate solutions across the Treasure Coast.
            </p>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="text-gray-400 hover:text-primary transition-colors" 
                aria-label="Facebook"
                data-testid="social-facebook"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a 
                href="#" 
                className="text-gray-400 hover:text-primary transition-colors" 
                aria-label="Twitter"
                data-testid="social-twitter"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
              <a 
                href="#" 
                className="text-gray-400 hover:text-primary transition-colors" 
                aria-label="LinkedIn"
                data-testid="social-linkedin"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a 
                href="#" 
                className="text-gray-400 hover:text-primary transition-colors" 
                aria-label="Instagram"
                data-testid="social-instagram"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.618 5.367 11.986 11.988 11.986s11.987-5.368 11.987-11.986C24.014 5.367 18.635.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.596-3.205-1.533l1.666-1.11c.289.445.794.742 1.539.742.745 0 1.25-.297 1.539-.742l1.666 1.11c-.757.937-1.908 1.533-3.205 1.533zm7.073 0c-1.297 0-2.448-.596-3.205-1.533l1.666-1.11c.289.445.794.742 1.539.742.745 0 1.25-.297 1.539-.742l1.666 1.11c-.757.937-1.908 1.533-3.205 1.533zm1.54-6.675c0 .297-.24.538-.538.538h-8.07c-.297 0-.538-.241-.538-.538v-1.612c0-.297.241-.538.538-.538h8.07c.298 0 .538.241.538.538v1.612z"/>
                </svg>
              </a>
            </div>
          </div>
          
          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Services</h4>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.name}>
                  <Link 
                    href={service.href} 
                    className="text-gray-300 hover:text-primary transition-colors"
                    data-testid={`footer-service-${service.name.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Resources */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Resources</h4>
            <ul className="space-y-3">
              {resources.map((resource) => (
                <li key={resource.name}>
                  <Link 
                    href={resource.href} 
                    className="text-gray-300 hover:text-primary transition-colors"
                    data-testid={`footer-resource-${resource.name.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    {resource.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Contact & Newsletter */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Stay Connected</h4>
            <div className="space-y-4 mb-6">
              <div className="flex items-center text-gray-300">
                <Phone className="h-4 w-4 mr-3 text-primary" />
                <span data-testid="contact-phone">(772) 555-0123</span>
              </div>
              <div className="flex items-center text-gray-300">
                <Mail className="h-4 w-4 mr-3 text-primary" />
                <span data-testid="contact-email">info@atlante.com</span>
              </div>
              <div className="flex items-start text-gray-300">
                <MapPin className="h-4 w-4 mr-3 text-primary mt-1" />
                <div data-testid="contact-address">
                  123 Main Street<br />
                  Vero Beach, FL 32963
                </div>
              </div>
            </div>
            
            {/* Email Signup */}
            <div className="space-y-3">
              <h5 className="font-medium">Newsletter Signup</h5>
              <NewsletterForm />
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm" data-testid="copyright">
            © 2024 Atlante Real Estate. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            {legal.map((item) => (
              <Link 
                key={item.name}
                href={item.href} 
                className="text-gray-400 hover:text-primary text-sm transition-colors"
                data-testid={`footer-legal-${item.name.toLowerCase().replace(/\s+/g, '-')}`}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

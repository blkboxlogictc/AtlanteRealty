import { useState } from "react";
import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Globe } from "lucide-react";

const navigation = [
  { name: "Home", href: "/" },
  { 
    name: "Brokerage", 
    href: "/brokerage",
    submenu: [
      { name: "Search Properties", href: "/brokerage" },
      { name: "Our Agents", href: "/agents" },
    ]
  },
  { name: "Real Estate School", href: "/school" },
  { name: "Development", href: "/development" },
  { name: "Property Management", href: "/property-management" },
  { name: "Blog", href: "/blog" },
];

export default function Header() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2" data-testid="logo-link">
            <div className="h-8 w-8 rounded-full gradient-gold flex items-center justify-center">
              <Globe className="h-4 w-4 text-white" />
            </div>
            <span className="text-xl font-serif font-semibold text-foreground">Atlante</span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) => (
              <div key={item.name} className="relative group">
                <Link href={item.href}>
                  <Button 
                    variant="ghost" 
                    className={cn(
                      "text-sm font-medium text-foreground hover:text-primary transition-colors",
                      location === item.href && "text-primary"
                    )}
                    data-testid={`nav-${item.name.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    {item.name}
                  </Button>
                </Link>
                
                {/* Submenu */}
                {item.submenu && (
                  <div className="absolute top-full left-0 w-64 bg-card border border-border rounded-2xl shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 mt-2">
                    <div className="p-4">
                      <div className="space-y-2">
                        {item.submenu.map((subItem) => (
                          <Link key={subItem.name} href={subItem.href}>
                            <Button 
                              variant="ghost" 
                              className="w-full justify-start p-3 rounded-xl hover:bg-muted transition-colors"
                              data-testid={`subnav-${subItem.name.toLowerCase().replace(/\s+/g, '-')}`}
                            >
                              <div>
                                <div className="font-medium text-sm">{subItem.name}</div>
                              </div>
                            </Button>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>
          
          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center space-x-3">
            <Link href="/contact">
              <Button 
                variant="ghost" 
                className="text-sm font-medium text-foreground hover:text-primary transition-colors"
                data-testid="button-contact"
              >
                Contact
              </Button>
            </Link>
            <Link href="/brokerage">
              <Button 
                className="gradient-gold text-white hover:opacity-90 transition-opacity shadow-gold"
                data-testid="button-find-properties"
              >
                Find Properties
              </Button>
            </Link>
          </div>
          
          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden" data-testid="mobile-menu-toggle">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <div className="flex flex-col space-y-4 mt-8">
                {navigation.map((item) => (
                  <div key={item.name}>
                    <Link href={item.href}>
                      <Button 
                        variant="ghost" 
                        className="w-full justify-start text-left"
                        onClick={() => setIsOpen(false)}
                        data-testid={`mobile-nav-${item.name.toLowerCase().replace(/\s+/g, '-')}`}
                      >
                        {item.name}
                      </Button>
                    </Link>
                    {item.submenu && (
                      <div className="ml-4 mt-2 space-y-2">
                        {item.submenu.map((subItem) => (
                          <Link key={subItem.name} href={subItem.href}>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              className="w-full justify-start text-left text-muted-foreground"
                              onClick={() => setIsOpen(false)}
                              data-testid={`mobile-subnav-${subItem.name.toLowerCase().replace(/\s+/g, '-')}`}
                            >
                              {subItem.name}
                            </Button>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                <div className="pt-4 space-y-2">
                  <Link href="/contact">
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => setIsOpen(false)}
                      data-testid="mobile-button-contact"
                    >
                      Contact
                    </Button>
                  </Link>
                  <Link href="/brokerage">
                    <Button 
                      className="w-full gradient-gold text-white"
                      onClick={() => setIsOpen(false)}
                      data-testid="mobile-button-find-properties"
                    >
                      Find Properties
                    </Button>
                  </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

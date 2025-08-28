import { useState } from "react";
import { Link } from "wouter";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Home, Users, Search, Building, GraduationCap, Key } from "lucide-react";

const brokerageItems = [
  {
    title: "Search Properties",
    description: "Browse MLS listings and find your perfect home",
    href: "/brokerage",
    icon: Search,
  },
  {
    title: "Our Agents",
    description: "Meet our experienced real estate professionals",
    href: "/agents",
    icon: Users,
  },
  {
    title: "Featured Listings",
    description: "Discover exceptional properties in prime locations",
    href: "/brokerage?featured=true",
    icon: Home,
  },
];

const servicesItems = [
  {
    title: "Real Estate School",
    description: "Professional education and licensing programs",
    href: "/school",
    icon: GraduationCap,
  },
  {
    title: "Development Consulting",
    description: "Strategic guidance for development projects",
    href: "/development",
    icon: Building,
  },
  {
    title: "Property Management",
    description: "Professional management services",
    href: "/property-management",
    icon: Key,
  },
];

interface MegaMenuProps {
  className?: string;
}

export default function MegaMenu({ className }: MegaMenuProps) {
  return (
    <NavigationMenu className={className}>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger data-testid="megamenu-brokerage-trigger">
            Brokerage
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              {brokerageItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link key={item.href} href={item.href}>
                    <NavigationMenuLink asChild>
                      <div className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                        <div className="flex items-center space-x-2 mb-2">
                          <Icon className="h-4 w-4 text-primary" />
                          <div className="text-sm font-medium leading-none">
                            {item.title}
                          </div>
                        </div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          {item.description}
                        </p>
                      </div>
                    </NavigationMenuLink>
                  </Link>
                );
              })}
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger data-testid="megamenu-services-trigger">
            Services
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-1 lg:w-[600px]">
              {servicesItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link key={item.href} href={item.href}>
                    <NavigationMenuLink asChild>
                      <div className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                        <div className="flex items-center space-x-2 mb-2">
                          <Icon className="h-4 w-4 text-primary" />
                          <div className="text-sm font-medium leading-none">
                            {item.title}
                          </div>
                        </div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          {item.description}
                        </p>
                      </div>
                    </NavigationMenuLink>
                  </Link>
                );
              })}
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

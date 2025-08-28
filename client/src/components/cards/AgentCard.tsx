import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Phone, Mail, User } from "lucide-react";
import { Link } from "wouter";
import type { Agent } from "@shared/schema";

interface AgentCardProps {
  agent: Agent;
  onContact?: (agent: Agent) => void;
}

export default function AgentCard({ agent, onContact }: AgentCardProps) {
  const defaultImage = `https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&face=center`;

  return (
    <Card className="group hover:shadow-xl transition-all duration-300 text-center border border-border">
      <CardContent className="p-8">
        <img
          src={agent.image || defaultImage}
          alt={`${agent.name} - ${agent.title}`}
          className="w-24 h-24 rounded-full mx-auto mb-4 object-cover ring-4 ring-primary/10"
          onError={(e) => {
            (e.target as HTMLImageElement).src = defaultImage;
          }}
        />
        
        <h3 className="text-xl font-semibold text-foreground mb-2" data-testid={`agent-name-${agent.id}`}>
          {agent.name}
        </h3>
        
        <p className="text-primary font-medium mb-3" data-testid={`agent-title-${agent.id}`}>
          {agent.title}
        </p>
        
        {agent.specialties && agent.specialties.length > 0 && (
          <p className="text-muted-foreground text-sm mb-4" data-testid={`agent-specialties-${agent.id}`}>
            {agent.specialties.join(' • ')}
          </p>
        )}
        
        <div className="flex justify-center space-x-2 mb-6">
          {agent.yearsExperience && (
            <Badge variant="secondary" className="text-xs">
              {agent.yearsExperience}+ Years
            </Badge>
          )}
          {agent.totalSales && (
            <Badge variant="secondary" className="text-xs">
              {agent.totalSales} Sales
            </Badge>
          )}
        </div>
        
        <div className="flex justify-center space-x-3 mb-4">
          {agent.phone && (
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-primary transition-colors"
              onClick={() => window.open(`tel:${agent.phone}`, '_self')}
              data-testid={`agent-phone-${agent.id}`}
            >
              <Phone className="h-4 w-4" />
            </Button>
          )}
          
          {agent.email && (
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-primary transition-colors"
              onClick={() => window.open(`mailto:${agent.email}`, '_self')}
              data-testid={`agent-email-${agent.id}`}
            >
              <Mail className="h-4 w-4" />
            </Button>
          )}
          
          <Link href={`/agents/${agent.id}`}>
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-primary transition-colors"
              data-testid={`agent-profile-${agent.id}`}
            >
              <User className="h-4 w-4" />
            </Button>
          </Link>
        </div>
        
        {onContact && (
          <Button
            variant="outline"
            className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
            onClick={() => onContact(agent)}
            data-testid={`agent-contact-${agent.id}`}
          >
            Contact Agent
          </Button>
        )}
      </CardContent>
    </Card>
  );
}

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";

const leadSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
  propertyInterest: z.string().optional(),
  source: z.string().optional(),
  consent: z.boolean().refine(val => val === true, "You must agree to be contacted"),
  agentId: z.string().optional(),
});

type LeadFormData = z.infer<typeof leadSchema>;

interface LeadFormProps {
  title?: string;
  agentId?: string;
  source?: string;
  onSuccess?: () => void;
}

export default function LeadForm({ 
  title = "Contact an Agent", 
  agentId, 
  source = "website",
  onSuccess 
}: LeadFormProps) {
  const { toast } = useToast();

  const form = useForm<LeadFormData>({
    resolver: zodResolver(leadSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
      propertyInterest: "",
      source,
      consent: false,
      agentId,
    },
  });

  const leadMutation = useMutation({
    mutationFn: async (data: LeadFormData) => {
      const response = await apiRequest("POST", "/api/lead", data);
      return response.json();
    },
    onSuccess: () => {
      form.reset();
      toast({
        title: "Message sent successfully!",
        description: "An agent will contact you within 24 hours.",
      });
      if (onSuccess) onSuccess();
    },
    onError: () => {
      toast({
        title: "Failed to send message",
        description: "Please try again or call us directly.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: LeadFormData) => {
    leadMutation.mutate(data);
  };

  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4" data-testid="lead-form">
          <div>
            <Label htmlFor="name">Full Name *</Label>
            <Input
              id="name"
              {...form.register("name")}
              disabled={leadMutation.isPending}
              data-testid="input-lead-name"
            />
            {form.formState.errors.name && (
              <p className="text-destructive text-sm mt-1">
                {form.formState.errors.name.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              type="email"
              {...form.register("email")}
              disabled={leadMutation.isPending}
              data-testid="input-lead-email"
            />
            {form.formState.errors.email && (
              <p className="text-destructive text-sm mt-1">
                {form.formState.errors.email.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              type="tel"
              {...form.register("phone")}
              disabled={leadMutation.isPending}
              data-testid="input-lead-phone"
            />
          </div>

          <div>
            <Label htmlFor="propertyInterest">Property Interest</Label>
            <Select onValueChange={(value) => form.setValue("propertyInterest", value)}>
              <SelectTrigger data-testid="select-property-interest">
                <SelectValue placeholder="Select your interest" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="buying">Buying</SelectItem>
                <SelectItem value="selling">Selling</SelectItem>
                <SelectItem value="renting">Renting</SelectItem>
                <SelectItem value="investment">Investment</SelectItem>
                <SelectItem value="development">Development</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="message">Message *</Label>
            <Textarea
              id="message"
              rows={4}
              placeholder="Tell us about your real estate needs..."
              {...form.register("message")}
              disabled={leadMutation.isPending}
              data-testid="textarea-lead-message"
            />
            {form.formState.errors.message && (
              <p className="text-destructive text-sm mt-1">
                {form.formState.errors.message.message}
              </p>
            )}
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="consent"
              checked={form.watch("consent")}
              onCheckedChange={(checked) => form.setValue("consent", !!checked)}
              disabled={leadMutation.isPending}
              data-testid="checkbox-lead-consent"
            />
            <Label htmlFor="consent" className="text-sm">
              I agree to be contacted by Atlante Real Estate regarding my inquiry *
            </Label>
          </div>
          {form.formState.errors.consent && (
            <p className="text-destructive text-sm">
              {form.formState.errors.consent.message}
            </p>
          )}

          <Button
            type="submit"
            className="w-full gradient-gold text-white hover:opacity-90 transition-opacity"
            disabled={leadMutation.isPending}
            data-testid="button-lead-submit"
          >
            {leadMutation.isPending ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Sending...
              </>
            ) : (
              "Send Message"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

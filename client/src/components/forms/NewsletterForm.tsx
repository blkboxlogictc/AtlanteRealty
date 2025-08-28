import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Send, Loader2 } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";

const newsletterSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

type NewsletterFormData = z.infer<typeof newsletterSchema>;

export default function NewsletterForm() {
  const { toast } = useToast();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<NewsletterFormData>({
    resolver: zodResolver(newsletterSchema),
    defaultValues: {
      email: "",
    },
  });

  const subscribeMutation = useMutation({
    mutationFn: async (data: NewsletterFormData) => {
      const response = await apiRequest("POST", "/api/subscribe", data);
      return response.json();
    },
    onSuccess: () => {
      setIsSubmitted(true);
      form.reset();
      toast({
        title: "Successfully subscribed!",
        description: "Thank you for subscribing to our newsletter.",
      });
    },
    onError: (error: any) => {
      const message = error.message.includes("409") 
        ? "This email is already subscribed to our newsletter."
        : "Failed to subscribe. Please try again.";
      
      toast({
        title: "Subscription failed",
        description: message,
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: NewsletterFormData) => {
    subscribeMutation.mutate(data);
  };

  if (isSubmitted) {
    return (
      <div className="flex items-center justify-center p-4 bg-primary/10 rounded-xl text-primary text-sm">
        ✓ Thank you for subscribing!
      </div>
    );
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="flex" data-testid="newsletter-form">
      <Input
        type="email"
        placeholder="Your email"
        className="flex-1 bg-gray-800 border-gray-700 rounded-l-xl focus:ring-primary text-white"
        {...form.register("email")}
        disabled={subscribeMutation.isPending}
        data-testid="input-newsletter-email"
      />
      <Button
        type="submit"
        className="gradient-gold text-white rounded-r-xl hover:opacity-90 transition-opacity px-6"
        disabled={subscribeMutation.isPending}
        data-testid="button-newsletter-submit"
      >
        {subscribeMutation.isPending ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Send className="h-4 w-4" />
        )}
      </Button>
    </form>
  );
}

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Search } from "lucide-react";

const searchSchema = z.object({
  query: z.string().min(1, "Please enter a search term"),
});

type SearchFormData = z.infer<typeof searchSchema>;

interface PropertySearchFormProps {
  onSearch?: (query: string) => void;
  className?: string;
}

export default function PropertySearchForm({ onSearch, className }: PropertySearchFormProps) {
  const form = useForm<SearchFormData>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      query: "",
    },
  });

  const onSubmit = (data: SearchFormData) => {
    if (onSearch) {
      onSearch(data.query);
    } else {
      // Default behavior - redirect to brokerage page with search
      window.location.href = `/brokerage?search=${encodeURIComponent(data.query)}`;
    }
  };

  return (
    <Card className={`shadow-lg border border-border ${className}`}>
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold mb-4">Find Your Perfect Property</h3>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col sm:flex-row gap-3">
          <Input
            placeholder="Enter location, property type, or MLS #"
            className="flex-1"
            {...form.register("query")}
            data-testid="input-property-search"
          />
          <Button 
            type="submit"
            className="gradient-gold text-white hover:opacity-90 transition-opacity"
            data-testid="button-property-search"
          >
            <Search className="h-4 w-4 mr-2" />
            Search
          </Button>
        </form>
        {form.formState.errors.query && (
          <p className="text-destructive text-sm mt-2">
            {form.formState.errors.query.message}
          </p>
        )}
      </CardContent>
    </Card>
  );
}

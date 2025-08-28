import PropertySearchForm from "@/components/forms/PropertySearchForm";

export default function Hero() {
  const stats = [
    { value: "500+", label: "Properties Sold" },
    { value: "15", label: "Years Experience" },
    { value: "1000+", label: "Happy Clients" },
  ];

  return (
    <section className="relative overflow-hidden bg-background hero-pattern">
      <div className="container mx-auto px-4 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Hero Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-serif font-bold text-foreground leading-tight">
                Your Complete{" "}
                <span className="text-gradient-gold">Real Estate</span>{" "}
                Solution
              </h1>
              <p className="text-lg text-muted-foreground max-w-xl">
                From property brokerage to development consulting, Atlante provides 
                unified real estate services across the Treasure Coast with expertise you can trust.
              </p>
            </div>
            
            {/* Search CTA */}
            <PropertySearchForm />
            
            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8">
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
          
          {/* Hero Image */}
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&h=800"
              alt="Luxury waterfront home with modern architecture"
              className="rounded-2xl shadow-2xl w-full h-auto"
            />
            <div className="absolute inset-0 rounded-2xl ring-1 ring-black/10" />
          </div>
        </div>
      </div>
    </section>
  );
}

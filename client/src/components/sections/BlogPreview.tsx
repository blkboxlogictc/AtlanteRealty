import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "wouter";
import BlogCard from "@/components/cards/BlogCard";
import { Skeleton } from "@/components/ui/skeleton";
import type { BlogPost } from "@shared/schema";

export default function BlogPreview() {
  const { data: posts, isLoading, error } = useQuery<BlogPost[]>({
    queryKey: ["/api/blog"],
  });

  if (error) {
    return null; // Gracefully hide section if blog can't load
  }

  // Show first 3 published posts
  const featuredPosts = posts?.slice(0, 3) || [];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h2 className="text-3xl lg:text-4xl font-serif font-bold text-foreground mb-4">
              Latest Insights
            </h2>
            <p className="text-lg text-muted-foreground">
              Stay informed with market trends and company updates
            </p>
          </div>
          <Link href="/blog">
            <Button 
              variant="outline"
              className="hidden lg:flex items-center border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
              data-testid="button-view-all-posts"
            >
              View All Posts
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </Link>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading
            ? Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="space-y-4">
                  <Skeleton className="h-48 w-full rounded-2xl" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-20 w-full" />
                </div>
              ))
            : featuredPosts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))
          }
        </div>
        
        {!isLoading && featuredPosts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              Blog posts will be displayed here once available.
            </p>
          </div>
        )}
        
        {/* Mobile View All Button */}
        <div className="text-center mt-12 lg:hidden">
          <Link href="/blog">
            <Button 
              variant="outline"
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
              data-testid="button-view-all-posts-mobile"
            >
              View All Posts
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

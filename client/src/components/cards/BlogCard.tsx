import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, ArrowRight } from "lucide-react";
import { Link } from "wouter";
import type { BlogPost } from "@shared/schema";

interface BlogCardProps {
  post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
  const defaultImage = 'https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=800&h=400&fit=crop';

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'market insights':
        return 'bg-primary/10 text-primary';
      case 'company news':
        return 'bg-accent/10 text-accent';
      case 'community':
        return 'bg-secondary/10 text-secondary';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const formatDate = (dateString: string | Date | null) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <Card className="group hover:shadow-xl transition-all duration-300 border border-border overflow-hidden h-full">
      <div className="relative">
        <img
          src={post.image || defaultImage}
          alt={post.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            (e.target as HTMLImageElement).src = defaultImage;
          }}
        />
      </div>
      
      <CardContent className="p-6 flex flex-col h-full">
        <div className="flex items-center mb-3">
          <Badge className={getCategoryColor(post.category)} data-testid={`blog-category-${post.id}`}>
            {post.category}
          </Badge>
          <div className="flex items-center text-sm text-muted-foreground ml-3">
            <Calendar className="h-3 w-3 mr-1" />
            <span data-testid={`blog-date-${post.id}`}>
              {formatDate(post.publishedAt)}
            </span>
          </div>
        </div>
        
        <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2">
          <Link href={`/blog/${post.slug}`} data-testid={`blog-title-${post.id}`}>
            {post.title}
          </Link>
        </h3>
        
        <p className="text-muted-foreground mb-4 flex-grow line-clamp-3" data-testid={`blog-excerpt-${post.id}`}>
          {post.excerpt}
        </p>
        
        <Link href={`/blog/${post.slug}`} className="mt-auto">
          <Button 
            variant="ghost" 
            className="text-primary font-medium hover:underline p-0 h-auto"
            data-testid={`blog-read-more-${post.id}`}
          >
            Read More <ArrowRight className="h-4 w-4 ml-1" />
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}

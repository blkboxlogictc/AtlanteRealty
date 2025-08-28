import { useQuery } from "@tanstack/react-query";
import { useRoute, Link } from "wouter";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, Calendar, User, Share2, Twitter, Facebook, Linkedin } from "lucide-react";
import type { BlogPost } from "@shared/schema";

export default function BlogPostPage() {
  const [match, params] = useRoute("/blog/:slug");
  const slug = params?.slug;

  const { data: post, isLoading, error } = useQuery<BlogPost>({
    queryKey: ["/api/blog", slug],
    enabled: !!slug,
  });

  if (!match || !slug) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-2xl font-bold text-foreground">Post not found</h1>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-2xl font-bold text-foreground mb-4">Article Not Found</h1>
            <p className="text-muted-foreground mb-8">
              The article you're looking for could not be found or is no longer available.
            </p>
            <Link href="/blog">
              <Button>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Blog
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="py-20">
          <div className="container mx-auto px-4 max-w-4xl">
            <Skeleton className="h-8 w-32 mb-8" />
            <Skeleton className="h-12 w-3/4 mb-4" />
            <Skeleton className="h-6 w-1/2 mb-8" />
            <Skeleton className="h-64 w-full mb-8 rounded-2xl" />
            <div className="space-y-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-4/5" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-2xl font-bold text-foreground">Post not found</h1>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const formatDate = (dateString: string | Date | null) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

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

  const shareUrl = window.location.href;
  const shareText = `${post.title} - ${post.excerpt || ''}`;

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        <article className="py-20">
          <div className="container mx-auto px-4 max-w-4xl">
            {/* Back Button */}
            <Link href="/blog">
              <Button variant="outline" className="mb-8" data-testid="button-back-to-blog">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Blog
              </Button>
            </Link>

            {/* Article Header */}
            <header className="mb-12">
              <div className="flex items-center gap-4 mb-6">
                <Badge className={getCategoryColor(post.category)} data-testid="post-category">
                  {post.category}
                </Badge>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4 mr-2" />
                  <time data-testid="post-date">
                    {formatDate(post.publishedAt)}
                  </time>
                </div>
                {post.author && (
                  <div className="flex items-center text-sm text-muted-foreground">
                    <User className="h-4 w-4 mr-2" />
                    <span data-testid="post-author">{post.author}</span>
                  </div>
                )}
              </div>
              
              <h1 className="text-4xl lg:text-5xl font-serif font-bold text-foreground mb-6 leading-tight" data-testid="post-title">
                {post.title}
              </h1>
              
              {post.excerpt && (
                <p className="text-xl text-muted-foreground leading-relaxed" data-testid="post-excerpt">
                  {post.excerpt}
                </p>
              )}
            </header>

            {/* Featured Image */}
            {post.image && (
              <div className="mb-12">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-auto rounded-2xl shadow-lg"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=1200&h=600&fit=crop';
                  }}
                />
              </div>
            )}

            {/* Share Buttons */}
            <div className="flex items-center gap-4 mb-8 pb-8 border-b border-border">
              <span className="text-sm font-medium text-foreground">Share this article:</span>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => window.open(shareLinks.twitter, '_blank')}
                  data-testid="share-twitter"
                >
                  <Twitter className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => window.open(shareLinks.facebook, '_blank')}
                  data-testid="share-facebook"
                >
                  <Facebook className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => window.open(shareLinks.linkedin, '_blank')}
                  data-testid="share-linkedin"
                >
                  <Linkedin className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Article Content */}
            <div className="prose prose-lg max-w-none">
              <div 
                className="text-muted-foreground leading-relaxed"
                dangerouslySetInnerHTML={{ __html: post.content }}
                data-testid="post-content"
              />
            </div>

            {/* Article Footer */}
            <footer className="mt-16 pt-8 border-t border-border">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Published on {formatDate(post.publishedAt)}
                    {post.author && ` by ${post.author}`}
                  </p>
                </div>
                
                <div className="flex items-center gap-2">
                  <Share2 className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Share this article</span>
                </div>
              </div>
            </footer>
          </div>
        </article>

        {/* Related Articles CTA */}
        <section className="py-16 bg-card">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl font-serif font-bold text-foreground mb-4">
              Explore More Articles
            </h2>
            <p className="text-muted-foreground mb-8">
              Discover more insights and updates from our real estate experts
            </p>
            <Link href="/blog">
              <Button className="gradient-gold text-white hover:opacity-90 transition-opacity" data-testid="button-explore-articles">
                View All Articles
              </Button>
            </Link>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}

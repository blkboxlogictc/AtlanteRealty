import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BlogCard from "@/components/cards/BlogCard";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Search } from "lucide-react";
import type { BlogPost } from "@shared/schema";

export default function Blog() {
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("");

  const {
    data: posts,
    isLoading,
    error,
  } = useQuery<BlogPost[]>({
    queryKey: ["/api/blog"],
  });

  const filteredPosts =
    posts?.filter((post) => {
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        if (
          !post.title.toLowerCase().includes(query) &&
          !post.excerpt?.toLowerCase().includes(query) &&
          !post.content.toLowerCase().includes(query)
        ) {
          return false;
        }
      }

      if (category && category !== "all" && post.category !== category) {
        return false;
      }

      return true;
    }) || [];

  const categories = Array.from(
    new Set(posts?.map((post) => post.category) || [])
  );

  const featuredPost =
    filteredPosts.find((post) => post.isPublished) || filteredPosts[0];
  const otherPosts = filteredPosts.filter(
    (post) => post.id !== featuredPost?.id
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="py-20 bg-card">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8">
              <h1 className="text-4xl lg:text-5xl font-serif font-bold text-foreground mb-4">
                Real Estate Insights & News
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Stay informed with the latest market trends, industry news, and
                expert insights from our team of real estate professionals.
              </p>
            </div>

            {/* Search and Filter */}
            <div className="max-w-2xl mx-auto grid md:grid-cols-2 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                  data-testid="input-blog-search"
                />
              </div>

              <Select
                onValueChange={setCategory}
                data-testid="select-blog-category"
              >
                <SelectTrigger>
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </section>

        {/* Featured Post */}
        {featuredPost && (
          <section className="py-12 bg-background">
            <div className="container mx-auto px-4">
              <h2 className="text-2xl font-bold text-foreground mb-8">
                Featured Article
              </h2>
              <div className="max-w-4xl">
                <BlogCard post={featuredPost} />
              </div>
            </div>
          </section>
        )}

        {/* Blog Grid */}
        <section className="py-12 bg-background">
          <div className="container mx-auto px-4">
            {error ? (
              <div className="text-center py-12">
                <p className="text-destructive">
                  Failed to load blog posts. Please try again later.
                </p>
              </div>
            ) : isLoading ? (
              <>
                <div className="flex justify-between items-center mb-8">
                  <Skeleton className="h-8 w-32" />
                  <Skeleton className="h-4 w-24" />
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {Array.from({ length: 6 }).map((_, index) => (
                    <div key={index} className="space-y-4">
                      <Skeleton className="h-48 w-full rounded-2xl" />
                      <Skeleton className="h-4 w-3/4" />
                      <Skeleton className="h-4 w-1/2" />
                      <Skeleton className="h-20 w-full" />
                    </div>
                  ))}
                </div>
              </>
            ) : otherPosts.length > 0 ? (
              <>
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-2xl font-bold text-foreground">
                    {featuredPost ? "More Articles" : "Latest Articles"}
                  </h2>
                  <div className="text-sm text-muted-foreground">
                    {filteredPosts.length} article
                    {filteredPosts.length !== 1 ? "s" : ""} found
                  </div>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {otherPosts.map((post) => (
                    <BlogCard key={post.id} post={post} />
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-12">
                <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  No articles found
                </h3>
                <p className="text-muted-foreground">
                  Try adjusting your search criteria or check back later for new
                  content.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className="py-20 bg-card">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-serif font-bold text-foreground mb-4">
              Stay Updated
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Subscribe to our newsletter to receive the latest real estate
              insights, market updates, and company news directly in your inbox.
            </p>
            <a href="#newsletter" className="inline-block">
              <button
                className="px-8 py-3 gradient-gold text-white rounded-xl font-medium hover:opacity-90 transition-opacity"
                data-testid="button-subscribe-newsletter"
              >
                Subscribe to Newsletter
              </button>
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

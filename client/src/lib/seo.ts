export interface SEOConfig {
  siteName: string;
  siteUrl: string;
  defaultTitle: string;
  defaultDescription: string;
  defaultImage: string;
  twitterHandle?: string;
  facebookAppId?: string;
  googleSiteVerification?: string;
  bingSiteVerification?: string;
}

export interface PageSEO {
  title?: string;
  description?: string;
  image?: string;
  canonical?: string;
  noindex?: boolean;
  keywords?: string[];
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  type?: 'website' | 'article' | 'profile' | 'product';
  locale?: string;
}

export interface StructuredData {
  '@context': string;
  '@type': string;
  [key: string]: any;
}

export class SEOManager {
  private config: SEOConfig;

  constructor(config: SEOConfig) {
    this.config = config;
  }

  /**
   * Generate complete page title
   */
  getPageTitle(title?: string): string {
    if (!title) return this.config.defaultTitle;
    return title.includes(this.config.siteName) 
      ? title 
      : `${title} | ${this.config.siteName}`;
  }

  /**
   * Generate meta tags for a page
   */
  generateMetaTags(seo: PageSEO): string {
    const title = this.getPageTitle(seo.title);
    const description = seo.description || this.config.defaultDescription;
    const image = seo.image || this.config.defaultImage;
    const url = seo.canonical || this.config.siteUrl;

    const tags = [
      `<title>${title}</title>`,
      `<meta name="description" content="${description}" />`,
      seo.keywords && `<meta name="keywords" content="${seo.keywords.join(', ')}" />`,
      seo.author && `<meta name="author" content="${seo.author}" />`,
      seo.noindex && `<meta name="robots" content="noindex, nofollow" />`,
      seo.canonical && `<link rel="canonical" href="${seo.canonical}" />`,
      
      // Open Graph tags
      `<meta property="og:title" content="${title}" />`,
      `<meta property="og:description" content="${description}" />`,
      `<meta property="og:image" content="${image}" />`,
      `<meta property="og:url" content="${url}" />`,
      `<meta property="og:type" content="${seo.type || 'website'}" />`,
      `<meta property="og:site_name" content="${this.config.siteName}" />`,
      seo.locale && `<meta property="og:locale" content="${seo.locale}" />`,
      seo.publishedTime && `<meta property="article:published_time" content="${seo.publishedTime}" />`,
      seo.modifiedTime && `<meta property="article:modified_time" content="${seo.modifiedTime}" />`,
      
      // Twitter Card tags
      `<meta name="twitter:card" content="summary_large_image" />`,
      this.config.twitterHandle && `<meta name="twitter:site" content="${this.config.twitterHandle}" />`,
      `<meta name="twitter:title" content="${title}" />`,
      `<meta name="twitter:description" content="${description}" />`,
      `<meta name="twitter:image" content="${image}" />`,
      
      // Site verification
      this.config.googleSiteVerification && `<meta name="google-site-verification" content="${this.config.googleSiteVerification}" />`,
      this.config.bingSiteVerification && `<meta name="msvalidate.01" content="${this.config.bingSiteVerification}" />`,
      this.config.facebookAppId && `<meta property="fb:app_id" content="${this.config.facebookAppId}" />`,
    ];

    return tags.filter(Boolean).join('\n');
  }

  /**
   * Generate structured data for organization
   */
  generateOrganizationSchema(): StructuredData {
    return {
      '@context': 'https://schema.org',
      '@type': 'RealEstateAgent',
      name: this.config.siteName,
      url: this.config.siteUrl,
      logo: `${this.config.siteUrl}/logo.png`,
      description: this.config.defaultDescription,
      address: {
        '@type': 'PostalAddress',
        streetAddress: '123 Main Street',
        addressLocality: 'Vero Beach',
        addressRegion: 'FL',
        postalCode: '32963',
        addressCountry: 'US',
      },
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+1-772-555-0123',
        contactType: 'Customer Service',
        availableLanguage: 'English',
      },
      sameAs: [
        'https://www.facebook.com/atlante',
        'https://www.twitter.com/atlante',
        'https://www.linkedin.com/company/atlante',
      ],
    };
  }

  /**
   * Generate structured data for real estate listing
   */
  generateListingSchema(property: {
    id: string;
    title: string;
    description: string;
    price: number;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    bedrooms?: number;
    bathrooms?: number;
    sqft?: number;
    images?: string[];
  }): StructuredData {
    return {
      '@context': 'https://schema.org',
      '@type': 'RealEstateListing',
      name: property.title,
      description: property.description,
      url: `${this.config.siteUrl}/properties/${property.id}`,
      offers: {
        '@type': 'Offer',
        price: property.price,
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock',
      },
      address: {
        '@type': 'PostalAddress',
        streetAddress: property.address,
        addressLocality: property.city,
        addressRegion: property.state,
        postalCode: property.zipCode,
        addressCountry: 'US',
      },
      floorSize: property.sqft && {
        '@type': 'QuantitativeValue',
        value: property.sqft,
        unitText: 'square feet',
      },
      numberOfRooms: property.bedrooms,
      numberOfBathroomsTotal: property.bathrooms,
      image: property.images?.[0] || this.config.defaultImage,
    };
  }

  /**
   * Generate structured data for blog article
   */
  generateArticleSchema(article: {
    title: string;
    description: string;
    author: string;
    publishedTime: string;
    modifiedTime?: string;
    image?: string;
    url: string;
  }): StructuredData {
    return {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: article.title,
      description: article.description,
      author: {
        '@type': 'Person',
        name: article.author,
      },
      publisher: {
        '@type': 'Organization',
        name: this.config.siteName,
        logo: {
          '@type': 'ImageObject',
          url: `${this.config.siteUrl}/logo.png`,
        },
      },
      datePublished: article.publishedTime,
      dateModified: article.modifiedTime || article.publishedTime,
      image: article.image || this.config.defaultImage,
      url: article.url,
      mainEntityOfPage: article.url,
    };
  }

  /**
   * Generate structured data for person (agent)
   */
  generatePersonSchema(agent: {
    name: string;
    title: string;
    bio?: string;
    email?: string;
    phone?: string;
    image?: string;
  }): StructuredData {
    return {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: agent.name,
      jobTitle: agent.title,
      description: agent.bio,
      email: agent.email,
      telephone: agent.phone,
      image: agent.image,
      worksFor: {
        '@type': 'Organization',
        name: this.config.siteName,
      },
    };
  }

  /**
   * Generate breadcrumb structured data
   */
  generateBreadcrumbSchema(breadcrumbs: Array<{ name: string; url: string }>): StructuredData {
    return {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumbs.map((crumb, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: crumb.name,
        item: crumb.url,
      })),
    };
  }

  /**
   * Inject structured data into page
   */
  injectStructuredData(data: StructuredData | StructuredData[]): void {
    if (typeof document === 'undefined') return;

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(Array.isArray(data) ? data : [data]);
    
    // Remove existing structured data scripts
    const existingScripts = document.querySelectorAll('script[type="application/ld+json"]');
    existingScripts.forEach(script => script.remove());
    
    document.head.appendChild(script);
  }
}

// SEO utilities
export const seoUtils = {
  /**
   * Generate XML sitemap entry
   */
  generateSitemapEntry(url: string, lastmod?: string, priority?: number): string {
    return `
  <url>
    <loc>${url}</loc>
    ${lastmod ? `<lastmod>${lastmod}</lastmod>` : ''}
    ${priority ? `<priority>${priority}</priority>` : ''}
    <changefreq>weekly</changefreq>
  </url>`;
  },

  /**
   * Generate robots.txt content
   */
  generateRobotsTxt(siteUrl: string): string {
    return `User-agent: *
Allow: /

# Sitemap
Sitemap: ${siteUrl}/sitemap.xml

# Disallow admin and private areas
Disallow: /admin/
Disallow: /api/
Disallow: /_next/
Disallow: /private/`;
  },

  /**
   * Clean text for meta description
   */
  cleanDescription(text: string, maxLength: number = 160): string {
    return text
      .replace(/\s+/g, ' ')
      .trim()
      .substring(0, maxLength)
      .replace(/\s+\S*$/, '') + (text.length > maxLength ? '...' : '');
  },

  /**
   * Generate slug from text
   */
  generateSlug(text: string): string {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  },
};

// Create default SEO manager
export const seo = new SEOManager({
  siteName: 'Atlante Real Estate',
  siteUrl: import.meta.env.VITE_SITE_URL || 'https://atlante.com',
  defaultTitle: 'Atlante Real Estate - Comprehensive Real Estate Solutions',
  defaultDescription: 'Atlante provides comprehensive real estate services including brokerage, education, development consulting, and property management across the Treasure Coast.',
  defaultImage: '/og-image.jpg',
  twitterHandle: '@AtlanteRealEstate',
  facebookAppId: import.meta.env.VITE_FACEBOOK_APP_ID,
  googleSiteVerification: import.meta.env.VITE_GOOGLE_SITE_VERIFICATION,
  bingSiteVerification: import.meta.env.VITE_BING_SITE_VERIFICATION,
});

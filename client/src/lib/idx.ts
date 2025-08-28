export interface IDXConfig {
  partnerId: string;
  apiKey?: string;
  domain?: string;
  searchUrl?: string;
  showcaseUrl?: string;
  mapUrl?: string;
  wrapperUrl?: string;
}

export interface IDXSearchParams {
  propertyType?: string;
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: number;
  bathrooms?: number;
  city?: string;
  zipCode?: string;
  keywords?: string;
}

export interface IDXProperty {
  id: string;
  mlsNumber: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  propertyType: string;
  status: string;
  images: string[];
  description: string;
  listingAgent: {
    name: string;
    phone: string;
    email: string;
  };
  lastUpdated: string;
}

export class IDXBrokerAPI {
  private config: IDXConfig;

  constructor(config: IDXConfig) {
    this.config = config;
  }

  /**
   * Generate IDX search widget URL
   */
  getSearchWidgetUrl(params?: IDXSearchParams): string {
    const baseUrl = this.config.searchUrl || `https://widgets.idxbroker.com/search/${this.config.partnerId}`;
    
    if (!params) return baseUrl;

    const searchParams = new URLSearchParams();
    
    if (params.propertyType) searchParams.append('propertyType', params.propertyType);
    if (params.minPrice) searchParams.append('minPrice', params.minPrice.toString());
    if (params.maxPrice) searchParams.append('maxPrice', params.maxPrice.toString());
    if (params.bedrooms) searchParams.append('bedrooms', params.bedrooms.toString());
    if (params.bathrooms) searchParams.append('bathrooms', params.bathrooms.toString());
    if (params.city) searchParams.append('city', params.city);
    if (params.zipCode) searchParams.append('zipCode', params.zipCode);
    if (params.keywords) searchParams.append('keywords', params.keywords);

    return `${baseUrl}?${searchParams.toString()}`;
  }

  /**
   * Generate IDX showcase widget URL
   */
  getShowcaseWidgetUrl(): string {
    return this.config.showcaseUrl || `https://widgets.idxbroker.com/showcase/${this.config.partnerId}`;
  }

  /**
   * Generate IDX map widget URL
   */
  getMapWidgetUrl(): string {
    return this.config.mapUrl || `https://widgets.idxbroker.com/map/${this.config.partnerId}`;
  }

  /**
   * Generate IDX wrapper page URL
   */
  getWrapperPageUrl(): string {
    return this.config.wrapperUrl || `https://widgets.idxbroker.com/wrapper/${this.config.partnerId}`;
  }

  /**
   * Create IDX embed script element
   */
  createEmbedScript(widgetType: 'search' | 'showcase' | 'map' | 'wrapper'): HTMLScriptElement {
    const script = document.createElement('script');
    script.async = true;
    script.defer = true;
    
    switch (widgetType) {
      case 'search':
        script.src = this.getSearchWidgetUrl();
        break;
      case 'showcase':
        script.src = this.getShowcaseWidgetUrl();
        break;
      case 'map':
        script.src = this.getMapWidgetUrl();
        break;
      case 'wrapper':
        script.src = this.getWrapperPageUrl();
        break;
    }

    return script;
  }

  /**
   * Load IDX widget into container
   */
  loadWidget(containerId: string, widgetType: 'search' | 'showcase' | 'map' | 'wrapper'): void {
    const container = document.getElementById(containerId);
    if (!container) {
      console.error(`IDX container with id "${containerId}" not found`);
      return;
    }

    // Clear existing content
    container.innerHTML = '';

    // Create and append script
    const script = this.createEmbedScript(widgetType);
    container.appendChild(script);
  }

  /**
   * Search properties (if API access is available)
   */
  async searchProperties(params: IDXSearchParams): Promise<IDXProperty[]> {
    if (!this.config.apiKey) {
      throw new Error('IDX API key required for property search');
    }

    // This would typically make an API call to IDXBroker
    // For now, return empty array as this requires actual IDX API credentials
    console.warn('IDX API search not implemented - requires valid API credentials');
    return [];
  }

  /**
   * Get property details by MLS number
   */
  async getProperty(mlsNumber: string): Promise<IDXProperty | null> {
    if (!this.config.apiKey) {
      throw new Error('IDX API key required for property details');
    }

    // This would typically make an API call to IDXBroker
    console.warn('IDX API property lookup not implemented - requires valid API credentials');
    return null;
  }
}

// Create default IDX instance
export const idxBroker = new IDXBrokerAPI({
  partnerId: import.meta.env.VITE_IDX_PARTNER_ID || 'default',
  apiKey: import.meta.env.VITE_IDX_API_KEY,
  domain: import.meta.env.VITE_IDX_DOMAIN,
  searchUrl: import.meta.env.VITE_IDX_SEARCH_URL,
  showcaseUrl: import.meta.env.VITE_IDX_SHOWCASE_URL,
  mapUrl: import.meta.env.VITE_IDX_MAP_URL,
  wrapperUrl: import.meta.env.VITE_IDX_WRAPPER_URL,
});

// Utility functions for common IDX operations
export const idxUtils = {
  /**
   * Format price for display
   */
  formatPrice(price: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  },

  /**
   * Format square footage
   */
  formatSquareFootage(sqft: number): string {
    return `${sqft.toLocaleString()} sq ft`;
  },

  /**
   * Generate property URL slug
   */
  generatePropertySlug(property: Partial<IDXProperty>): string {
    const { address, city, mlsNumber } = property;
    const slug = `${address}-${city}-${mlsNumber}`
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
    return slug;
  },

  /**
   * Parse IDX property status
   */
  getStatusDisplay(status: string): { label: string; color: string } {
    switch (status.toLowerCase()) {
      case 'active':
      case 'for sale':
        return { label: 'For Sale', color: 'green' };
      case 'sold':
        return { label: 'Sold', color: 'red' };
      case 'pending':
        return { label: 'Pending', color: 'yellow' };
      case 'contingent':
        return { label: 'Contingent', color: 'orange' };
      default:
        return { label: status, color: 'gray' };
    }
  },
};

export interface AnalyticsConfig {
  googleAnalyticsId?: string;
  facebookPixelId?: string;
  hotjarId?: string;
  mixpanelToken?: string;
  segmentWriteKey?: string;
}

export interface AnalyticsEvent {
  name: string;
  properties?: Record<string, any>;
  userId?: string;
  timestamp?: Date;
}

export interface PageViewEvent {
  page: string;
  title?: string;
  referrer?: string;
  userId?: string;
}

export interface LeadEvent {
  leadId: string;
  source: string;
  agentId?: string;
  propertyId?: string;
  formType: string;
  email: string;
  phone?: string;
}

export interface PropertyViewEvent {
  propertyId: string;
  mlsNumber?: string;
  price: number;
  propertyType: string;
  source: string;
  userId?: string;
}

class GoogleAnalytics {
  private gaId: string;

  constructor(gaId: string) {
    this.gaId = gaId;
    this.initialize();
  }

  private initialize(): void {
    if (typeof window === 'undefined') return;

    // Load Google Analytics script
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${this.gaId}`;
    document.head.appendChild(script);

    // Initialize gtag
    window.dataLayer = window.dataLayer || [];
    function gtag(...args: any[]) {
      window.dataLayer.push(args);
    }
    window.gtag = gtag;

    gtag('js', new Date());
    gtag('config', this.gaId, {
      page_title: document.title,
      page_location: window.location.href,
    });
  }

  trackPageView(event: PageViewEvent): void {
    if (typeof window === 'undefined' || !window.gtag) return;

    window.gtag('config', this.gaId, {
      page_title: event.title || document.title,
      page_location: window.location.href,
      user_id: event.userId,
    });
  }

  trackEvent(event: AnalyticsEvent): void {
    if (typeof window === 'undefined' || !window.gtag) return;

    window.gtag('event', event.name, {
      ...event.properties,
      user_id: event.userId,
    });
  }

  trackLead(event: LeadEvent): void {
    this.trackEvent({
      name: 'generate_lead',
      properties: {
        lead_source: event.source,
        agent_id: event.agentId,
        property_id: event.propertyId,
        form_type: event.formType,
        value: 1,
      },
      userId: event.email,
    });
  }

  trackPropertyView(event: PropertyViewEvent): void {
    this.trackEvent({
      name: 'view_item',
      properties: {
        item_id: event.propertyId,
        item_name: event.mlsNumber,
        item_category: event.propertyType,
        value: event.price,
        currency: 'USD',
        source: event.source,
      },
      userId: event.userId,
    });
  }
}

class FacebookPixel {
  private pixelId: string;

  constructor(pixelId: string) {
    this.pixelId = pixelId;
    this.initialize();
  }

  private initialize(): void {
    if (typeof window === 'undefined') return;

    // Load Facebook Pixel script
    const script = document.createElement('script');
    script.innerHTML = `
      !function(f,b,e,v,n,t,s)
      {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
      n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s)}(window, document,'script',
      'https://connect.facebook.net/en_US/fbevents.js');
      fbq('init', '${this.pixelId}');
      fbq('track', 'PageView');
    `;
    document.head.appendChild(script);
  }

  trackEvent(event: AnalyticsEvent): void {
    if (typeof window === 'undefined' || !window.fbq) return;

    window.fbq('track', event.name, event.properties);
  }

  trackLead(event: LeadEvent): void {
    this.trackEvent({
      name: 'Lead',
      properties: {
        content_name: event.formType,
        content_category: event.source,
        value: 1,
        currency: 'USD',
      },
    });
  }
}

export class Analytics {
  private config: AnalyticsConfig;
  private googleAnalytics?: GoogleAnalytics;
  private facebookPixel?: FacebookPixel;

  constructor(config: AnalyticsConfig) {
    this.config = config;
    this.initialize();
  }

  private initialize(): void {
    if (this.config.googleAnalyticsId) {
      this.googleAnalytics = new GoogleAnalytics(this.config.googleAnalyticsId);
    }

    if (this.config.facebookPixelId) {
      this.facebookPixel = new FacebookPixel(this.config.facebookPixelId);
    }

    // Initialize other analytics services as needed
  }

  trackPageView(event: PageViewEvent): void {
    this.googleAnalytics?.trackPageView(event);
  }

  trackEvent(event: AnalyticsEvent): void {
    this.googleAnalytics?.trackEvent(event);
    this.facebookPixel?.trackEvent(event);
  }

  trackLead(event: LeadEvent): void {
    this.googleAnalytics?.trackLead(event);
    this.facebookPixel?.trackLead(event);

    // Track lead in all analytics platforms
    this.trackEvent({
      name: 'lead_generated',
      properties: {
        source: event.source,
        form_type: event.formType,
        agent_id: event.agentId,
        property_id: event.propertyId,
      },
    });
  }

  trackPropertyView(event: PropertyViewEvent): void {
    this.googleAnalytics?.trackPropertyView(event);

    this.trackEvent({
      name: 'property_viewed',
      properties: {
        property_id: event.propertyId,
        mls_number: event.mlsNumber,
        price: event.price,
        property_type: event.propertyType,
        source: event.source,
      },
      userId: event.userId,
    });
  }

  trackSearch(searchTerm: string, results: number): void {
    this.trackEvent({
      name: 'search',
      properties: {
        search_term: searchTerm,
        results_count: results,
      },
    });
  }

  trackAgentContact(agentId: string, contactMethod: string): void {
    this.trackEvent({
      name: 'agent_contact',
      properties: {
        agent_id: agentId,
        contact_method: contactMethod,
      },
    });
  }

  trackNewsletterSignup(email: string): void {
    this.trackEvent({
      name: 'newsletter_signup',
      properties: {
        email,
      },
    });
  }

  trackCalendlyBooking(agentId?: string, serviceType?: string): void {
    this.trackEvent({
      name: 'calendly_booking',
      properties: {
        agent_id: agentId,
        service_type: serviceType,
      },
    });
  }
}

// Create default analytics instance
export const analytics = new Analytics({
  googleAnalyticsId: import.meta.env.VITE_GA_ID || import.meta.env.VITE_GOOGLE_ANALYTICS_ID,
  facebookPixelId: import.meta.env.VITE_FACEBOOK_PIXEL_ID,
  hotjarId: import.meta.env.VITE_HOTJAR_ID,
  mixpanelToken: import.meta.env.VITE_MIXPANEL_TOKEN,
  segmentWriteKey: import.meta.env.VITE_SEGMENT_WRITE_KEY,
});

// Declare global types for TypeScript
declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
    fbq: (...args: any[]) => void;
  }
}

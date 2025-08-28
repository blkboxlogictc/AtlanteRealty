import type { Agent, Property, Project, Testimonial, BlogPost } from "@shared/schema";

export interface CMSConfig {
  type: 'file' | 'sanity' | 'strapi' | 'wordpress';
  apiUrl?: string;
  apiKey?: string;
  projectId?: string;
  dataset?: string;
}

export interface CMSAdapter {
  getAgents(): Promise<Agent[]>;
  getAgent(id: string): Promise<Agent | undefined>;
  getProperties(): Promise<Property[]>;
  getFeaturedProperties(): Promise<Property[]>;
  getProperty(id: string): Promise<Property | undefined>;
  getProjects(): Promise<Project[]>;
  getProject(id: string): Promise<Project | undefined>;
  getTestimonials(): Promise<Testimonial[]>;
  getBlogPosts(): Promise<BlogPost[]>;
  getBlogPost(slug: string): Promise<BlogPost | undefined>;
}

class FileCMSAdapter implements CMSAdapter {
  private async loadJsonData<T>(filename: string): Promise<T[]> {
    try {
      const response = await fetch(`/data/${filename}`);
      if (!response.ok) {
        throw new Error(`Failed to load ${filename}: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.warn(`Could not load ${filename}:`, error);
      return [];
    }
  }

  async getAgents(): Promise<Agent[]> {
    return this.loadJsonData<Agent>('agents.json');
  }

  async getAgent(id: string): Promise<Agent | undefined> {
    const agents = await this.getAgents();
    return agents.find(agent => agent.id === id);
  }

  async getProperties(): Promise<Property[]> {
    return this.loadJsonData<Property>('properties.json');
  }

  async getFeaturedProperties(): Promise<Property[]> {
    const properties = await this.getProperties();
    return properties.filter(property => property.isFeatured);
  }

  async getProperty(id: string): Promise<Property | undefined> {
    const properties = await this.getProperties();
    return properties.find(property => property.id === id);
  }

  async getProjects(): Promise<Project[]> {
    return this.loadJsonData<Project>('projects.json');
  }

  async getProject(id: string): Promise<Project | undefined> {
    const projects = await this.getProjects();
    return projects.find(project => project.id === id);
  }

  async getTestimonials(): Promise<Testimonial[]> {
    return this.loadJsonData<Testimonial>('testimonials.json');
  }

  async getBlogPosts(): Promise<BlogPost[]> {
    return this.loadJsonData<BlogPost>('blog-posts.json');
  }

  async getBlogPost(slug: string): Promise<BlogPost | undefined> {
    const posts = await this.getBlogPosts();
    return posts.find(post => post.slug === slug);
  }
}

class SanityCMSAdapter implements CMSAdapter {
  private config: CMSConfig;

  constructor(config: CMSConfig) {
    this.config = config;
  }

  async getAgents(): Promise<Agent[]> {
    // Implementation for Sanity CMS
    throw new Error('Sanity CMS adapter not implemented');
  }

  async getAgent(id: string): Promise<Agent | undefined> {
    throw new Error('Sanity CMS adapter not implemented');
  }

  async getProperties(): Promise<Property[]> {
    throw new Error('Sanity CMS adapter not implemented');
  }

  async getFeaturedProperties(): Promise<Property[]> {
    throw new Error('Sanity CMS adapter not implemented');
  }

  async getProperty(id: string): Promise<Property | undefined> {
    throw new Error('Sanity CMS adapter not implemented');
  }

  async getProjects(): Promise<Project[]> {
    throw new Error('Sanity CMS adapter not implemented');
  }

  async getProject(id: string): Promise<Project | undefined> {
    throw new Error('Sanity CMS adapter not implemented');
  }

  async getTestimonials(): Promise<Testimonial[]> {
    throw new Error('Sanity CMS adapter not implemented');
  }

  async getBlogPosts(): Promise<BlogPost[]> {
    throw new Error('Sanity CMS adapter not implemented');
  }

  async getBlogPost(slug: string): Promise<BlogPost | undefined> {
    throw new Error('Sanity CMS adapter not implemented');
  }
}

class StrapiCMSAdapter implements CMSAdapter {
  private config: CMSConfig;

  constructor(config: CMSConfig) {
    this.config = config;
  }

  async getAgents(): Promise<Agent[]> {
    // Implementation for Strapi CMS
    throw new Error('Strapi CMS adapter not implemented');
  }

  async getAgent(id: string): Promise<Agent | undefined> {
    throw new Error('Strapi CMS adapter not implemented');
  }

  async getProperties(): Promise<Property[]> {
    throw new Error('Strapi CMS adapter not implemented');
  }

  async getFeaturedProperties(): Promise<Property[]> {
    throw new Error('Strapi CMS adapter not implemented');
  }

  async getProperty(id: string): Promise<Property | undefined> {
    throw new Error('Strapi CMS adapter not implemented');
  }

  async getProjects(): Promise<Project[]> {
    throw new Error('Strapi CMS adapter not implemented');
  }

  async getProject(id: string): Promise<Project | undefined> {
    throw new Error('Strapi CMS adapter not implemented');
  }

  async getTestimonials(): Promise<Testimonial[]> {
    throw new Error('Strapi CMS adapter not implemented');
  }

  async getBlogPosts(): Promise<BlogPost[]> {
    throw new Error('Strapi CMS adapter not implemented');
  }

  async getBlogPost(slug: string): Promise<BlogPost | undefined> {
    throw new Error('Strapi CMS adapter not implemented');
  }
}

export function createCMSAdapter(config: CMSConfig): CMSAdapter {
  switch (config.type) {
    case 'file':
      return new FileCMSAdapter();
    case 'sanity':
      return new SanityCMSAdapter(config);
    case 'strapi':
      return new StrapiCMSAdapter(config);
    case 'wordpress':
      throw new Error('WordPress CMS adapter not implemented');
    default:
      return new FileCMSAdapter();
  }
}

// Default CMS instance
export const cms = createCMSAdapter({
  type: (import.meta.env.VITE_CMS_TYPE as CMSConfig['type']) || 'file',
  apiUrl: import.meta.env.VITE_CMS_API_URL,
  apiKey: import.meta.env.VITE_CMS_API_KEY,
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID,
  dataset: import.meta.env.VITE_SANITY_DATASET,
});

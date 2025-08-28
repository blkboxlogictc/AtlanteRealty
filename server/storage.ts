import { type User, type InsertUser, type Lead, type InsertLead, type EmailSubscription, type InsertEmailSubscription, type Agent, type Property, type Project, type Testimonial, type BlogPost } from "@shared/schema";
import { randomUUID } from "crypto";
import fs from "fs";
import path from "path";

export interface IStorage {
  // User methods
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Lead methods
  createLead(lead: InsertLead): Promise<Lead>;
  getLeads(): Promise<Lead[]>;
  
  // Email subscription methods
  createEmailSubscription(subscription: InsertEmailSubscription): Promise<EmailSubscription>;
  getEmailSubscriptions(): Promise<EmailSubscription[]>;
  
  // Data methods
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

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private leads: Map<string, Lead>;
  private emailSubscriptions: Map<string, EmailSubscription>;

  constructor() {
    this.users = new Map();
    this.leads = new Map();
    this.emailSubscriptions = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createLead(insertLead: InsertLead): Promise<Lead> {
    const id = randomUUID();
    const lead: Lead = { 
      ...insertLead, 
      id,
      createdAt: new Date()
    };
    this.leads.set(id, lead);
    return lead;
  }

  async getLeads(): Promise<Lead[]> {
    return Array.from(this.leads.values());
  }

  async createEmailSubscription(insertSubscription: InsertEmailSubscription): Promise<EmailSubscription> {
    const id = randomUUID();
    const subscription: EmailSubscription = {
      ...insertSubscription,
      id,
      isActive: true,
      createdAt: new Date()
    };
    this.emailSubscriptions.set(id, subscription);
    return subscription;
  }

  async getEmailSubscriptions(): Promise<EmailSubscription[]> {
    return Array.from(this.emailSubscriptions.values());
  }

  // File-based data methods
  private async loadJsonData<T>(filename: string): Promise<T[]> {
    try {
      const filePath = path.join(process.cwd(), 'data', filename);
      const data = await fs.promises.readFile(filePath, 'utf-8');
      return JSON.parse(data);
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

export const storage = new MemStorage();

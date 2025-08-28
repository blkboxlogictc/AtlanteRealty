import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const leads = pgTable("leads", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  message: text("message"),
  propertyInterest: text("property_interest"),
  source: text("source"),
  consent: boolean("consent").notNull().default(false),
  agentId: text("agent_id"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const emailSubscriptions = pgTable("email_subscriptions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: text("email").notNull().unique(),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

export const agents = pgTable("agents", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  title: text("title").notNull(),
  bio: text("bio"),
  specialties: text("specialties").array(),
  license: text("license"),
  email: text("email").notNull(),
  phone: text("phone"),
  image: text("image"),
  serviceArea: text("service_area"),
  yearsExperience: integer("years_experience"),
  totalSales: text("total_sales"),
  calendlyLink: text("calendly_link"),
  isActive: boolean("is_active").notNull().default(true),
});

export const properties = pgTable("properties", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  description: text("description"),
  price: integer("price").notNull(),
  address: text("address").notNull(),
  city: text("city").notNull(),
  state: text("state").notNull(),
  zipCode: text("zip_code").notNull(),
  bedrooms: integer("bedrooms"),
  bathrooms: integer("bathrooms"),
  sqft: integer("sqft"),
  lotSize: text("lot_size"),
  propertyType: text("property_type").notNull(),
  status: text("status").notNull(),
  images: text("images").array(),
  features: text("features").array(),
  mlsNumber: text("mls_number"),
  agentId: text("agent_id"),
  isFeatured: boolean("is_featured").notNull().default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

export const projects = pgTable("projects", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  description: text("description"),
  location: text("location").notNull(),
  projectType: text("project_type").notNull(),
  status: text("status").notNull(),
  images: text("images").array(),
  metrics: jsonb("metrics"),
  communityImpact: text("community_impact"),
  testimonial: text("testimonial"),
  completionDate: timestamp("completion_date"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const testimonials = pgTable("testimonials", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  location: text("location"),
  quote: text("quote").notNull(),
  rating: integer("rating").notNull(),
  image: text("image"),
  service: text("service").notNull(),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

export const blogPosts = pgTable("blog_posts", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  excerpt: text("excerpt"),
  content: text("content").notNull(),
  category: text("category").notNull(),
  image: text("image"),
  author: text("author").notNull(),
  isPublished: boolean("is_published").notNull().default(false),
  publishedAt: timestamp("published_at"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Insert schemas
export const insertLeadSchema = createInsertSchema(leads).omit({
  id: true,
  createdAt: true,
});

export const insertEmailSubscriptionSchema = createInsertSchema(emailSubscriptions).omit({
  id: true,
  isActive: true,
  createdAt: true,
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

// Types
export type InsertLead = z.infer<typeof insertLeadSchema>;
export type InsertEmailSubscription = z.infer<typeof insertEmailSubscriptionSchema>;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type User = typeof users.$inferSelect;
export type Lead = typeof leads.$inferSelect;
export type EmailSubscription = typeof emailSubscriptions.$inferSelect;
export type Agent = typeof agents.$inferSelect;
export type Property = typeof properties.$inferSelect;
export type Project = typeof projects.$inferSelect;
export type Testimonial = typeof testimonials.$inferSelect;
export type BlogPost = typeof blogPosts.$inferSelect;

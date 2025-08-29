"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertUserSchema = exports.insertEmailSubscriptionSchema = exports.insertLeadSchema = exports.blogPosts = exports.testimonials = exports.projects = exports.properties = exports.agents = exports.emailSubscriptions = exports.leads = exports.users = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const pg_core_1 = require("drizzle-orm/pg-core");
const drizzle_zod_1 = require("drizzle-zod");
exports.users = (0, pg_core_1.pgTable)("users", {
    id: (0, pg_core_1.varchar)("id").primaryKey().default((0, drizzle_orm_1.sql) `gen_random_uuid()`),
    username: (0, pg_core_1.text)("username").notNull().unique(),
    password: (0, pg_core_1.text)("password").notNull(),
});
exports.leads = (0, pg_core_1.pgTable)("leads", {
    id: (0, pg_core_1.varchar)("id").primaryKey().default((0, drizzle_orm_1.sql) `gen_random_uuid()`),
    name: (0, pg_core_1.text)("name").notNull(),
    email: (0, pg_core_1.text)("email").notNull(),
    phone: (0, pg_core_1.text)("phone"),
    message: (0, pg_core_1.text)("message"),
    propertyInterest: (0, pg_core_1.text)("property_interest"),
    source: (0, pg_core_1.text)("source"),
    consent: (0, pg_core_1.boolean)("consent").notNull().default(false),
    agentId: (0, pg_core_1.text)("agent_id"),
    createdAt: (0, pg_core_1.timestamp)("created_at").defaultNow(),
});
exports.emailSubscriptions = (0, pg_core_1.pgTable)("email_subscriptions", {
    id: (0, pg_core_1.varchar)("id").primaryKey().default((0, drizzle_orm_1.sql) `gen_random_uuid()`),
    email: (0, pg_core_1.text)("email").notNull().unique(),
    isActive: (0, pg_core_1.boolean)("is_active").notNull().default(true),
    createdAt: (0, pg_core_1.timestamp)("created_at").defaultNow(),
});
exports.agents = (0, pg_core_1.pgTable)("agents", {
    id: (0, pg_core_1.varchar)("id").primaryKey().default((0, drizzle_orm_1.sql) `gen_random_uuid()`),
    name: (0, pg_core_1.text)("name").notNull(),
    title: (0, pg_core_1.text)("title").notNull(),
    bio: (0, pg_core_1.text)("bio"),
    specialties: (0, pg_core_1.text)("specialties").array(),
    license: (0, pg_core_1.text)("license"),
    email: (0, pg_core_1.text)("email").notNull(),
    phone: (0, pg_core_1.text)("phone"),
    image: (0, pg_core_1.text)("image"),
    serviceArea: (0, pg_core_1.text)("service_area"),
    yearsExperience: (0, pg_core_1.integer)("years_experience"),
    totalSales: (0, pg_core_1.text)("total_sales"),
    calendlyLink: (0, pg_core_1.text)("calendly_link"),
    isActive: (0, pg_core_1.boolean)("is_active").notNull().default(true),
});
exports.properties = (0, pg_core_1.pgTable)("properties", {
    id: (0, pg_core_1.varchar)("id").primaryKey().default((0, drizzle_orm_1.sql) `gen_random_uuid()`),
    title: (0, pg_core_1.text)("title").notNull(),
    description: (0, pg_core_1.text)("description"),
    price: (0, pg_core_1.integer)("price").notNull(),
    address: (0, pg_core_1.text)("address").notNull(),
    city: (0, pg_core_1.text)("city").notNull(),
    state: (0, pg_core_1.text)("state").notNull(),
    zipCode: (0, pg_core_1.text)("zip_code").notNull(),
    bedrooms: (0, pg_core_1.integer)("bedrooms"),
    bathrooms: (0, pg_core_1.integer)("bathrooms"),
    sqft: (0, pg_core_1.integer)("sqft"),
    lotSize: (0, pg_core_1.text)("lot_size"),
    propertyType: (0, pg_core_1.text)("property_type").notNull(),
    status: (0, pg_core_1.text)("status").notNull(),
    images: (0, pg_core_1.text)("images").array(),
    features: (0, pg_core_1.text)("features").array(),
    mlsNumber: (0, pg_core_1.text)("mls_number"),
    agentId: (0, pg_core_1.text)("agent_id"),
    isFeatured: (0, pg_core_1.boolean)("is_featured").notNull().default(false),
    createdAt: (0, pg_core_1.timestamp)("created_at").defaultNow(),
});
exports.projects = (0, pg_core_1.pgTable)("projects", {
    id: (0, pg_core_1.varchar)("id").primaryKey().default((0, drizzle_orm_1.sql) `gen_random_uuid()`),
    title: (0, pg_core_1.text)("title").notNull(),
    description: (0, pg_core_1.text)("description"),
    location: (0, pg_core_1.text)("location").notNull(),
    projectType: (0, pg_core_1.text)("project_type").notNull(),
    status: (0, pg_core_1.text)("status").notNull(),
    images: (0, pg_core_1.text)("images").array(),
    metrics: (0, pg_core_1.jsonb)("metrics"),
    communityImpact: (0, pg_core_1.text)("community_impact"),
    testimonial: (0, pg_core_1.text)("testimonial"),
    completionDate: (0, pg_core_1.timestamp)("completion_date"),
    createdAt: (0, pg_core_1.timestamp)("created_at").defaultNow(),
});
exports.testimonials = (0, pg_core_1.pgTable)("testimonials", {
    id: (0, pg_core_1.varchar)("id").primaryKey().default((0, drizzle_orm_1.sql) `gen_random_uuid()`),
    name: (0, pg_core_1.text)("name").notNull(),
    location: (0, pg_core_1.text)("location"),
    quote: (0, pg_core_1.text)("quote").notNull(),
    rating: (0, pg_core_1.integer)("rating").notNull(),
    image: (0, pg_core_1.text)("image"),
    service: (0, pg_core_1.text)("service").notNull(),
    isActive: (0, pg_core_1.boolean)("is_active").notNull().default(true),
    createdAt: (0, pg_core_1.timestamp)("created_at").defaultNow(),
});
exports.blogPosts = (0, pg_core_1.pgTable)("blog_posts", {
    id: (0, pg_core_1.varchar)("id").primaryKey().default((0, drizzle_orm_1.sql) `gen_random_uuid()`),
    title: (0, pg_core_1.text)("title").notNull(),
    slug: (0, pg_core_1.text)("slug").notNull().unique(),
    excerpt: (0, pg_core_1.text)("excerpt"),
    content: (0, pg_core_1.text)("content").notNull(),
    category: (0, pg_core_1.text)("category").notNull(),
    image: (0, pg_core_1.text)("image"),
    author: (0, pg_core_1.text)("author").notNull(),
    isPublished: (0, pg_core_1.boolean)("is_published").notNull().default(false),
    publishedAt: (0, pg_core_1.timestamp)("published_at"),
    createdAt: (0, pg_core_1.timestamp)("created_at").defaultNow(),
});
// Insert schemas
exports.insertLeadSchema = (0, drizzle_zod_1.createInsertSchema)(exports.leads).omit({
    id: true,
    createdAt: true,
});
exports.insertEmailSubscriptionSchema = (0, drizzle_zod_1.createInsertSchema)(exports.emailSubscriptions).omit({
    id: true,
    isActive: true,
    createdAt: true,
});
exports.insertUserSchema = (0, drizzle_zod_1.createInsertSchema)(exports.users).pick({
    username: true,
    password: true,
});

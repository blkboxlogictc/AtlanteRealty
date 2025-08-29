"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerRoutes = registerRoutes;
const http_1 = require("http");
const storage_1 = require("./storage");
const schema_1 = require("@shared/schema");
const zod_1 = require("zod");
async function registerRoutes(app) {
    // Lead capture endpoint
    app.post("/api/lead", async (req, res) => {
        try {
            const leadData = schema_1.insertLeadSchema.parse(req.body);
            const lead = await storage_1.storage.createLead(leadData);
            // Forward to CRM webhook if configured
            const webhookUrl = process.env.CRM_WEBHOOK_URL;
            if (webhookUrl) {
                try {
                    const fetch = (await Promise.resolve().then(() => __importStar(require('node-fetch')))).default;
                    await fetch(webhookUrl, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(lead)
                    });
                }
                catch (webhookError) {
                    console.error('CRM webhook failed:', webhookError);
                    // Don't fail the request if webhook fails
                }
            }
            res.json({ success: true, leadId: lead.id });
        }
        catch (error) {
            if (error instanceof zod_1.z.ZodError) {
                res.status(400).json({ error: 'Validation failed', details: error.errors });
            }
            else {
                console.error('Lead creation failed:', error);
                res.status(500).json({ error: 'Failed to create lead' });
            }
        }
    });
    // Email subscription endpoint
    app.post("/api/subscribe", async (req, res) => {
        try {
            const subscriptionData = schema_1.insertEmailSubscriptionSchema.parse(req.body);
            // Check if already subscribed
            const existing = await storage_1.storage.getEmailSubscriptions();
            if (existing.some(sub => sub.email === subscriptionData.email && sub.isActive)) {
                res.status(409).json({ error: 'Email already subscribed' });
                return;
            }
            const subscription = await storage_1.storage.createEmailSubscription(subscriptionData);
            // Forward to email service webhook if configured
            const emailWebhookUrl = process.env.EMAIL_WEBHOOK_URL || process.env.MAILCHIMP_WEBHOOK_URL;
            if (emailWebhookUrl) {
                try {
                    const fetch = (await Promise.resolve().then(() => __importStar(require('node-fetch')))).default;
                    await fetch(emailWebhookUrl, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(subscription)
                    });
                }
                catch (webhookError) {
                    console.error('Email service webhook failed:', webhookError);
                }
            }
            res.json({ success: true, subscriptionId: subscription.id });
        }
        catch (error) {
            if (error instanceof zod_1.z.ZodError) {
                res.status(400).json({ error: 'Validation failed', details: error.errors });
            }
            else {
                console.error('Email subscription failed:', error);
                res.status(500).json({ error: 'Failed to subscribe email' });
            }
        }
    });
    // Data endpoints
    app.get("/api/agents", async (req, res) => {
        try {
            const agents = await storage_1.storage.getAgents();
            res.json(agents);
        }
        catch (error) {
            console.error('Failed to fetch agents:', error);
            res.status(500).json({ error: 'Failed to fetch agents' });
        }
    });
    app.get("/api/agents/:id", async (req, res) => {
        try {
            const agent = await storage_1.storage.getAgent(req.params.id);
            if (!agent) {
                res.status(404).json({ error: 'Agent not found' });
                return;
            }
            res.json(agent);
        }
        catch (error) {
            console.error('Failed to fetch agent:', error);
            res.status(500).json({ error: 'Failed to fetch agent' });
        }
    });
    app.get("/api/properties", async (req, res) => {
        try {
            const properties = await storage_1.storage.getProperties();
            res.json(properties);
        }
        catch (error) {
            console.error('Failed to fetch properties:', error);
            res.status(500).json({ error: 'Failed to fetch properties' });
        }
    });
    app.get("/api/properties/featured", async (req, res) => {
        try {
            const properties = await storage_1.storage.getFeaturedProperties();
            res.json(properties);
        }
        catch (error) {
            console.error('Failed to fetch featured properties:', error);
            res.status(500).json({ error: 'Failed to fetch featured properties' });
        }
    });
    app.get("/api/projects", async (req, res) => {
        try {
            const projects = await storage_1.storage.getProjects();
            res.json(projects);
        }
        catch (error) {
            console.error('Failed to fetch projects:', error);
            res.status(500).json({ error: 'Failed to fetch projects' });
        }
    });
    app.get("/api/testimonials", async (req, res) => {
        try {
            const testimonials = await storage_1.storage.getTestimonials();
            res.json(testimonials);
        }
        catch (error) {
            console.error('Failed to fetch testimonials:', error);
            res.status(500).json({ error: 'Failed to fetch testimonials' });
        }
    });
    app.get("/api/blog", async (req, res) => {
        try {
            const posts = await storage_1.storage.getBlogPosts();
            res.json(posts.filter(post => post.isPublished));
        }
        catch (error) {
            console.error('Failed to fetch blog posts:', error);
            res.status(500).json({ error: 'Failed to fetch blog posts' });
        }
    });
    app.get("/api/blog/:slug", async (req, res) => {
        try {
            const post = await storage_1.storage.getBlogPost(req.params.slug);
            if (!post || !post.isPublished) {
                res.status(404).json({ error: 'Blog post not found' });
                return;
            }
            res.json(post);
        }
        catch (error) {
            console.error('Failed to fetch blog post:', error);
            res.status(500).json({ error: 'Failed to fetch blog post' });
        }
    });
    const httpServer = (0, http_1.createServer)(app);
    return httpServer;
}

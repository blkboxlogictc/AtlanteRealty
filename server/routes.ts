import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertLeadSchema, insertEmailSubscriptionSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Lead capture endpoint
  app.post("/api/lead", async (req, res) => {
    try {
      const leadData = insertLeadSchema.parse(req.body);
      const lead = await storage.createLead(leadData);
      
      // Forward to CRM webhook if configured
      const webhookUrl = process.env.CRM_WEBHOOK_URL;
      if (webhookUrl) {
        try {
          const fetch = (await import('node-fetch')).default;
          await fetch(webhookUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(lead)
          });
        } catch (webhookError) {
          console.error('CRM webhook failed:', webhookError);
          // Don't fail the request if webhook fails
        }
      }
      
      res.json({ success: true, leadId: lead.id });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: 'Validation failed', details: error.errors });
      } else {
        console.error('Lead creation failed:', error);
        res.status(500).json({ error: 'Failed to create lead' });
      }
    }
  });

  // Email subscription endpoint
  app.post("/api/subscribe", async (req, res) => {
    try {
      const subscriptionData = insertEmailSubscriptionSchema.parse(req.body);
      
      // Check if already subscribed
      const existing = await storage.getEmailSubscriptions();
      if (existing.some(sub => sub.email === subscriptionData.email && sub.isActive)) {
        res.status(409).json({ error: 'Email already subscribed' });
        return;
      }
      
      const subscription = await storage.createEmailSubscription(subscriptionData);
      
      // Forward to email service webhook if configured
      const emailWebhookUrl = process.env.EMAIL_WEBHOOK_URL || process.env.MAILCHIMP_WEBHOOK_URL;
      if (emailWebhookUrl) {
        try {
          const fetch = (await import('node-fetch')).default;
          await fetch(emailWebhookUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(subscription)
          });
        } catch (webhookError) {
          console.error('Email service webhook failed:', webhookError);
        }
      }
      
      res.json({ success: true, subscriptionId: subscription.id });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: 'Validation failed', details: error.errors });
      } else {
        console.error('Email subscription failed:', error);
        res.status(500).json({ error: 'Failed to subscribe email' });
      }
    }
  });

  // Data endpoints
  app.get("/api/agents", async (req, res) => {
    try {
      const agents = await storage.getAgents();
      res.json(agents);
    } catch (error) {
      console.error('Failed to fetch agents:', error);
      res.status(500).json({ error: 'Failed to fetch agents' });
    }
  });

  app.get("/api/agents/:id", async (req, res) => {
    try {
      const agent = await storage.getAgent(req.params.id);
      if (!agent) {
        res.status(404).json({ error: 'Agent not found' });
        return;
      }
      res.json(agent);
    } catch (error) {
      console.error('Failed to fetch agent:', error);
      res.status(500).json({ error: 'Failed to fetch agent' });
    }
  });

  app.get("/api/properties", async (req, res) => {
    try {
      const properties = await storage.getProperties();
      res.json(properties);
    } catch (error) {
      console.error('Failed to fetch properties:', error);
      res.status(500).json({ error: 'Failed to fetch properties' });
    }
  });

  app.get("/api/properties/featured", async (req, res) => {
    try {
      const properties = await storage.getFeaturedProperties();
      res.json(properties);
    } catch (error) {
      console.error('Failed to fetch featured properties:', error);
      res.status(500).json({ error: 'Failed to fetch featured properties' });
    }
  });

  app.get("/api/projects", async (req, res) => {
    try {
      const projects = await storage.getProjects();
      res.json(projects);
    } catch (error) {
      console.error('Failed to fetch projects:', error);
      res.status(500).json({ error: 'Failed to fetch projects' });
    }
  });

  app.get("/api/testimonials", async (req, res) => {
    try {
      const testimonials = await storage.getTestimonials();
      res.json(testimonials);
    } catch (error) {
      console.error('Failed to fetch testimonials:', error);
      res.status(500).json({ error: 'Failed to fetch testimonials' });
    }
  });

  app.get("/api/blog", async (req, res) => {
    try {
      const posts = await storage.getBlogPosts();
      res.json(posts.filter(post => post.isPublished));
    } catch (error) {
      console.error('Failed to fetch blog posts:', error);
      res.status(500).json({ error: 'Failed to fetch blog posts' });
    }
  });

  app.get("/api/blog/:slug", async (req, res) => {
    try {
      const post = await storage.getBlogPost(req.params.slug);
      if (!post || !post.isPublished) {
        res.status(404).json({ error: 'Blog post not found' });
        return;
      }
      res.json(post);
    } catch (error) {
      console.error('Failed to fetch blog post:', error);
      res.status(500).json({ error: 'Failed to fetch blog post' });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

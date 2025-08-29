"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.storage = exports.MemStorage = void 0;
const crypto_1 = require("crypto");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
class MemStorage {
    constructor() {
        this.users = new Map();
        this.leads = new Map();
        this.emailSubscriptions = new Map();
    }
    async getUser(id) {
        return this.users.get(id);
    }
    async getUserByUsername(username) {
        return Array.from(this.users.values()).find((user) => user.username === username);
    }
    async createUser(insertUser) {
        const id = (0, crypto_1.randomUUID)();
        const user = { ...insertUser, id };
        this.users.set(id, user);
        return user;
    }
    async createLead(insertLead) {
        const id = (0, crypto_1.randomUUID)();
        const lead = {
            ...insertLead,
            id,
            createdAt: new Date()
        };
        this.leads.set(id, lead);
        return lead;
    }
    async getLeads() {
        return Array.from(this.leads.values());
    }
    async createEmailSubscription(insertSubscription) {
        const id = (0, crypto_1.randomUUID)();
        const subscription = {
            ...insertSubscription,
            id,
            isActive: true,
            createdAt: new Date()
        };
        this.emailSubscriptions.set(id, subscription);
        return subscription;
    }
    async getEmailSubscriptions() {
        return Array.from(this.emailSubscriptions.values());
    }
    // File-based data methods
    async loadJsonData(filename) {
        try {
            const filePath = path_1.default.join(process.cwd(), 'data', filename);
            const data = await fs_1.default.promises.readFile(filePath, 'utf-8');
            return JSON.parse(data);
        }
        catch (error) {
            console.warn(`Could not load ${filename}:`, error);
            return [];
        }
    }
    async getAgents() {
        return this.loadJsonData('agents.json');
    }
    async getAgent(id) {
        const agents = await this.getAgents();
        return agents.find(agent => agent.id === id);
    }
    async getProperties() {
        return this.loadJsonData('properties.json');
    }
    async getFeaturedProperties() {
        const properties = await this.getProperties();
        return properties.filter(property => property.isFeatured);
    }
    async getProperty(id) {
        const properties = await this.getProperties();
        return properties.find(property => property.id === id);
    }
    async getProjects() {
        return this.loadJsonData('projects.json');
    }
    async getProject(id) {
        const projects = await this.getProjects();
        return projects.find(project => project.id === id);
    }
    async getTestimonials() {
        return this.loadJsonData('testimonials.json');
    }
    async getBlogPosts() {
        return this.loadJsonData('blog-posts.json');
    }
    async getBlogPost(slug) {
        const posts = await this.getBlogPosts();
        return posts.find(post => post.slug === slug);
    }
}
exports.MemStorage = MemStorage;
exports.storage = new MemStorage();

var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// netlify/functions/properties-featured.ts
var properties_featured_exports = {};
__export(properties_featured_exports, {
  handler: () => handler
});
module.exports = __toCommonJS(properties_featured_exports);

// server/storage.ts
var import_crypto = require("crypto");
var import_fs = __toESM(require("fs"), 1);
var import_path = __toESM(require("path"), 1);
var MemStorage = class {
  users;
  leads;
  emailSubscriptions;
  constructor() {
    this.users = /* @__PURE__ */ new Map();
    this.leads = /* @__PURE__ */ new Map();
    this.emailSubscriptions = /* @__PURE__ */ new Map();
  }
  async getUser(id) {
    return this.users.get(id);
  }
  async getUserByUsername(username) {
    return Array.from(this.users.values()).find(
      (user) => user.username === username
    );
  }
  async createUser(insertUser) {
    const id = (0, import_crypto.randomUUID)();
    const user = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  async createLead(insertLead) {
    const id = (0, import_crypto.randomUUID)();
    const lead = {
      ...insertLead,
      id,
      createdAt: /* @__PURE__ */ new Date()
    };
    this.leads.set(id, lead);
    return lead;
  }
  async getLeads() {
    return Array.from(this.leads.values());
  }
  async createEmailSubscription(insertSubscription) {
    const id = (0, import_crypto.randomUUID)();
    const subscription = {
      ...insertSubscription,
      id,
      isActive: true,
      createdAt: /* @__PURE__ */ new Date()
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
      const filePath = import_path.default.join(process.cwd(), "data", filename);
      const data = await import_fs.default.promises.readFile(filePath, "utf-8");
      return JSON.parse(data);
    } catch (error) {
      console.warn(`Could not load ${filename}:`, error);
      return [];
    }
  }
  async getAgents() {
    return this.loadJsonData("agents.json");
  }
  async getAgent(id) {
    const agents = await this.getAgents();
    return agents.find((agent) => agent.id === id);
  }
  async getProperties() {
    return this.loadJsonData("properties.json");
  }
  async getFeaturedProperties() {
    const properties = await this.getProperties();
    return properties.filter((property) => property.isFeatured);
  }
  async getProperty(id) {
    const properties = await this.getProperties();
    return properties.find((property) => property.id === id);
  }
  async getProjects() {
    return this.loadJsonData("projects.json");
  }
  async getProject(id) {
    const projects = await this.getProjects();
    return projects.find((project) => project.id === id);
  }
  async getTestimonials() {
    return this.loadJsonData("testimonials.json");
  }
  async getBlogPosts() {
    return this.loadJsonData("blog-posts.json");
  }
  async getBlogPost(slug) {
    const posts = await this.getBlogPosts();
    return posts.find((post) => post.slug === slug);
  }
};
var storage = new MemStorage();

// netlify/functions/properties-featured.ts
var handler = async (event, context) => {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "GET, OPTIONS",
    "Content-Type": "application/json"
  };
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 200, headers, body: "" };
  }
  try {
    if (event.httpMethod === "GET") {
      const properties = await storage.getFeaturedProperties();
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(properties)
      };
    }
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: "Method not allowed" })
    };
  } catch (error) {
    console.error("Failed to fetch featured properties:", error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: "Failed to fetch featured properties" })
    };
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  handler
});

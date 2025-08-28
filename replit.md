# Atlante Real Estate Platform

## Overview

Atlante is a comprehensive real estate platform serving the Treasure Coast region with four unified lines of business: brokerage services, real estate education, development consulting, and property management. The platform is built with a modern full-stack architecture using React, TypeScript, Express.js, and PostgreSQL, providing a seamless experience for property buyers, sellers, students, and developers.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript for type safety and modern development practices
- **UI Components**: Shadcn/ui component library built on Radix UI primitives for accessible, customizable components
- **Styling**: Tailwind CSS with custom Atlante brand colors (gold, deep gold, charcoal, ivory) and responsive design patterns
- **State Management**: TanStack Query (React Query) for server state management and caching
- **Routing**: Wouter for lightweight client-side routing
- **Forms**: React Hook Form with Zod validation for type-safe form handling
- **Build Tool**: Vite for fast development and optimized production builds

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules for modern JavaScript features
- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **API Design**: RESTful endpoints with structured error handling and logging middleware
- **Session Management**: Express sessions with PostgreSQL storage via connect-pg-simple

### Data Storage Solutions
- **Primary Database**: PostgreSQL hosted on Neon Database for scalability and reliability
- **ORM**: Drizzle ORM with migrations support and schema-first approach
- **File Storage**: JSON-based content management for static data (agents, properties, blog posts)
- **Schema Design**: Modular table structure with users, leads, email subscriptions, agents, properties, and blog content

### Authentication and Authorization
- **Session-based Authentication**: Express sessions with PostgreSQL storage
- **User Management**: Basic user registration and login with password hashing
- **Lead Management**: Public lead capture forms with optional agent assignment
- **Email Subscriptions**: Separate subscription management with activation status

### Content Management
- **CMS Strategy**: Hybrid approach using JSON files for static content with database for dynamic data
- **Blog System**: Full blog functionality with categories, publishing status, and rich content support
- **Asset Management**: Image handling with fallback URLs and error handling
- **SEO Management**: Built-in SEO utilities for meta tags, structured data, and social sharing

## External Dependencies

### Third-Party Services
- **IDX Integration**: Property search and listing display through IDX Broker API
- **CRM Integration**: Webhook support for lead forwarding to external CRM systems
- **Email Marketing**: Mailchimp/Constant Contact integration for newsletter subscriptions
- **Analytics**: Google Analytics 4 support with environment-based configuration
- **Maps**: Google Maps integration for property locations and office directions
- **Calendar**: Calendly integration for agent appointment scheduling

### Development and Deployment
- **Hosting Platform**: Replit with development-specific tooling and error handling
- **Database Hosting**: Neon Database for production PostgreSQL
- **Build Process**: Vite for frontend bundling, esbuild for backend compilation
- **Environment Management**: Environment variables for API keys, database URLs, and webhook endpoints
- **Error Tracking**: Runtime error overlay for development debugging

### UI and Design System
- **Component Library**: Shadcn/ui for consistent, accessible components
- **Icons**: Lucide React for consistent iconography
- **Fonts**: Google Fonts (Inter for body text, Playfair Display for headings)
- **Animations**: CSS transitions with hover states and loading indicators
- **Responsive Design**: Mobile-first approach with breakpoint-based layouts

### Business Integrations
- **Lead Capture**: Form submissions routed to CRM via configurable webhooks
- **Property Search**: IDX Broker integration for MLS property data
- **Educational Content**: Course management and student tracking capabilities
- **Project Showcase**: Development project portfolio with metrics and testimonials
- **Agent Directory**: Comprehensive agent profiles with specialties and contact information
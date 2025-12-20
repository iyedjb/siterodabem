# Roda Bem Turismo - Travel Agency Platform

## Overview

Roda Bem Turismo is a luxury travel agency web application built with React and Express. The platform showcases exclusive destinations, provides AI-powered customer support, and enables seamless communication through WhatsApp integration. The application features a modern, mobile-first design inspired by leading travel platforms like Airbnb and Booking.com, with an emphasis on immersive imagery and smooth animations.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Technology Stack:**
- **Framework**: React 18 with TypeScript, using Vite as the build tool
- **Routing**: Wouter for client-side routing
- **State Management**: TanStack Query (React Query) for server state
- **Styling**: Tailwind CSS with custom design tokens and shadcn/ui component library
- **Animations**: Framer Motion for smooth transitions and gesture-based interactions
- **UI Components**: Radix UI primitives for accessible, unstyled components

**Design System:**
- Mobile-first responsive design with breakpoints at 768px (md) and 1024px (lg)
- Custom color palette ("Luminous Lagoon") with HSL-based theming
- Typography system using Montserrat for headings and Inter for body text
- Component-based architecture with reusable UI elements from shadcn/ui
- Parallax scrolling and gesture-based interactions optimized for mobile devices

**Key Features:**
- Destination gallery with horizontal scroll carousel
- AI chatbot for customer service
- WhatsApp multi-number integration
- Testimonials and feedback system
- SEO-optimized pages with metadata

### Backend Architecture

**Technology Stack:**
- **Runtime**: Node.js with Express.js
- **Type Safety**: TypeScript throughout
- **API Pattern**: RESTful endpoints with JSON responses
- **Development**: Hot module replacement via Vite middleware in development mode

**API Endpoints:**
- `POST /api/chat` - AI chatbot powered by Groq's LLaMA model
- `POST /api/feedback` - Customer feedback submission
- `GET /api/feedback` - Retrieve all feedback entries

**Server-Side Rendering:**
- Vite middleware integration for development
- Custom error handling and logging middleware
- Static file serving for production builds

### Data Storage

**Current Implementation:**
- In-memory storage via `MemStorage` class
- User and feedback data stored in JavaScript Map objects
- UUID-based entity identification

**Database Schema (Prepared for PostgreSQL):**
- Drizzle ORM configured for PostgreSQL migration
- Schema definitions for `users` and `feedback` tables
- Prepared for Neon Database serverless PostgreSQL

**Data Models:**
- Users: id, username, password
- Feedback: id, name, email, rating, message, createdAt timestamp
- Type-safe schema validation using Zod

**Migration Strategy:**
- The application currently uses in-memory storage but is architected to seamlessly migrate to PostgreSQL
- Drizzle ORM configuration and schema are already defined
- Storage interface (`IStorage`) abstracts the persistence layer for easy swapping

### External Dependencies

**AI Services:**
- **Groq API**: Fast, cost-effective LLaMA 3.3 70B model for chatbot functionality
- OpenAI-compatible API interface for easy provider switching
- Barbara AI chatbot with comprehensive Firebase RTDB data access (destinations, bookings, customers, packages, testimonials)
- Optimized for brevity and accuracy (max 300 tokens, temperature 0.3)
- Includes payment information: PIX, dinheiro, cartão de crédito com parcelamento
- Real-time data caching with 5-minute TTL for optimal performance

**Communication:**
- **WhatsApp Business API**: Multiple phone numbers for customer contact (+55 31 numbers)
- Direct integration via `wa.me` links for instant messaging

**Asset Management:**
- Custom generated images stored in `attached_assets/generated_images/`
- Destination photography featuring Caribbean, French Riviera, Costa Rica, Maldives, Bora Bora, Amalfi Coast, Hawaii, and Seychelles

**UI Libraries:**
- **shadcn/ui**: Pre-built accessible components
- **Radix UI**: Headless component primitives (dialogs, dropdowns, navigation, etc.)
- **Embla Carousel**: Touch-friendly carousel for destination galleries
- **Lucide React**: Icon library

**Development Tools:**
- **Replit Plugins**: Runtime error modal, cartographer, dev banner for development environment
- **ESBuild**: Server bundling for production
- **PostCSS**: CSS processing with Tailwind and Autoprefixer

**Font Resources:**
- Google Fonts: Architects Daughter, DM Sans, Fira Code, Geist Mono family
- Preconnected for optimal loading performance
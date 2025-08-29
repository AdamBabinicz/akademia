# Interaktywna Nauka - Polish Educational Web Application

## Overview

This is a comprehensive educational web application called "Interaktywna Nauka" (Interactive Learning) built for teaching physics concepts through interactive modules. The application focuses on making complex scientific topics accessible through visual simulations, 3D models, and hands-on experiments. It covers four main categories: electricity & magnetism, earth & space, microworld, and perception & human senses. The application is designed as a progressive web app (PWA) with multilingual support (Polish, English, Hungarian) and features adaptive quizzes, daily facts, and a unique scale explorer tool.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
The application uses a modern React 18+ architecture with TypeScript and Vite as the build tool. The frontend follows a component-based modular design with clear separation of concerns:

- **Routing**: Uses Wouter for lightweight client-side routing
- **State Management**: React Context API for global state (AppContext) with local component state
- **Styling**: Tailwind CSS with a custom brown/gold dark theme optimized for educational content
- **UI Components**: shadcn/ui component library adapted for React/Vite with extensive Radix UI primitives
- **Animations**: Framer Motion for smooth transitions and interactive elements
- **Internationalization**: react-intl for multi-language support (pl, en, hu)

### Interactive Module System
The application features a sophisticated interactive module architecture:

- **Simulation Components**: Physics simulations like electron drift, AC current visualization
- **3D Models**: React Three Fiber integration for 3D visualizations (planned)
- **Experiment Modules**: Virtual experiments like billiard ball analogies for electron movement
- **Circuit Builder**: Drag-and-drop circuit construction with real-time feedback
- **Scale Explorer**: Multi-scale visualization from atomic to cosmic levels
- **Adaptive Quiz System**: Dynamic difficulty adjustment based on user performance

### Content Management
The application uses a structured content system:

- **MDX Integration**: Planned for rich educational content with embedded interactive components
- **Educational Progress Tracking**: User progress monitoring across topics and categories
- **Daily Facts System**: Rotating educational content with multilingual support

### Backend Architecture
The backend follows a minimal Express.js approach:

- **RESTful API**: Express server with TypeScript
- **Modular Storage Interface**: Abstracted storage layer supporting both in-memory and database backends
- **Development Environment**: Vite integration for hot module replacement in development

### Theme and Design System
Custom design system optimized for educational content:

- **Dark-first Design**: Brown and gold color palette for reduced eye strain
- **Accessibility**: ARIA patterns and keyboard navigation support
- **Responsive Design**: Mobile-first approach with desktop enhancements
- **Typography**: Multi-font system (Inter, Fira Code, Source Sans Pro) for different content types

## External Dependencies

### Core Framework Dependencies
- **React 18+**: Frontend framework with modern hooks and concurrent features
- **TypeScript**: Type safety across the entire application stack
- **Vite**: Build tool and development server with HMR support
- **Express.js**: Backend web server framework

### UI and Styling
- **Tailwind CSS**: Utility-first CSS framework with custom configuration
- **shadcn/ui**: Component library built on Radix UI primitives
- **Radix UI**: Headless UI components for accessibility and functionality
- **Framer Motion**: Animation library for interactive elements
- **Lucide React**: Icon library for consistent iconography

### Database and ORM
- **Drizzle ORM**: Type-safe SQL ORM configured for PostgreSQL
- **PostgreSQL**: Primary database (configured but may be added later)
- **Neon Database**: Serverless PostgreSQL provider (@neondatabase/serverless)

### Development and Build Tools
- **ESLint & Prettier**: Code quality and formatting (configured)
- **PostCSS**: CSS processing with Tailwind integration
- **React Testing Library**: Component testing framework
- **Playwright**: End-to-end testing (planned)

### Form Handling and Validation
- **React Hook Form**: Form state management
- **Zod**: Schema validation library
- **@hookform/resolvers**: Integration between React Hook Form and Zod

### Internationalization and Data
- **react-intl**: Internationalization framework for multi-language support
- **date-fns**: Date manipulation and formatting
- **@tanstack/react-query**: Server state management and caching

### Interactive Content
- **KaTeX**: Mathematical notation rendering (planned via react-katex)
- **Recharts**: Data visualization and charting library
- **Embla Carousel**: Touch-friendly carousel component
- **React Three Fiber**: 3D graphics rendering (planned integration)

### PWA and Performance
- **Service Worker**: Offline functionality and caching (configured)
- **Web App Manifest**: PWA configuration for installable app experience
- **Replit Integration**: Development environment optimizations for Replit platform
# Kenneth Ajero - Portfolio Website

A modern, professional portfolio website built with Next.js 14, TypeScript, and CSS Modules. This portfolio showcases professional experience, technical skills, and projects for a .NET developer.

## Table of Contents

- [Overview](#overview)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Component Documentation](#component-documentation)
- [Styling Approach](#styling-approach)
- [Key Features](#key-features)
- [Installation](#installation)
- [Development](#development)
- [Building for Production](#building-for-production)
- [Deployment](#deployment)
- [Docker Support](#docker-support)
- [Configuration](#configuration)
- [Performance](#performance)

## Overview

This portfolio website is designed to present professional experience, technical capabilities, and project work in a clean, modern interface. The site features smooth animations, responsive design, and optimized performance for both desktop and mobile devices.

## Technology Stack

### Core Technologies
- **Next.js 14** - React framework with App Router
- **React 18** - UI library
- **TypeScript** - Type-safe JavaScript
- **CSS Modules** - Scoped styling

### Additional Libraries
- **React Icons** - Icon library for UI elements
- **Node 20 Alpine** - Runtime environment

### Development Tools
- **ESLint** - Code linting
- **Docker** - Containerization
- **Vercel** - Deployment platform

## Project Structure

```
portfolio/
├── app/
│   ├── layout.tsx              # Root layout component
│   ├── page.tsx                # Main portfolio page
│   ├── page.module.css         # Component-specific styles
│   └── globals.css             # Global styles and resets
├── public/                     # Static assets
├── .dockerignore              # Docker build exclusions
├── .gitignore                 # Git exclusions
├── docker-compose.yml         # Docker orchestration
├── Dockerfile                 # Docker build instructions
├── next.config.js             # Next.js configuration
├── package.json               # Project dependencies
├── package-lock.json          # Dependency lock file
└── tsconfig.json              # TypeScript configuration
```

## Component Documentation

### Layout Component (app/layout.tsx)

The root layout component that wraps all pages.

**Purpose:**
- Defines HTML structure
- Sets metadata for SEO
- Imports global styles
- Provides consistent layout across pages

**Key Features:**
- Meta tags for search engines
- Open Graph tags for social sharing
- Responsive viewport settings
- Font optimization

### Main Page Component (app/page.tsx)

The primary portfolio page containing all sections.

**Structure:**
```
Home (Hero Section)
├── Navigation
├── Hero Content
├── Tech Stack Marquee
├── About Section
│   ├── Statistics
│   ├── Personal Story
│   └── Skills with Progress Bars
├── Projects Section
│   └── Project Cards (6 featured projects)
├── Experience Section
│   └── Timeline (4 positions)
├── Hobbies Section
│   └── Hobby Cards (6 activities)
├── Contact Section
│   └── Contact Cards (4 methods)
└── Footer
```

**State Management:**
- `typedText` - Manages typing animation
- `textIndex` - Tracks current typing text
- `charIndex` - Tracks character position
- `isDeleting` - Controls typing/deleting state

**Key Functions:**
- `scrollToSection()` - Smooth scroll navigation
- Typing effect with useEffect hooks
- Intersection Observer for scroll animations
- Parallax scrolling effect

### Navigation System

**Fixed Navigation Bar:**
- Sticky positioning
- Smooth scroll to sections
- Active section highlighting
- Responsive design

**Sections:**
- Home
- About
- Projects
- Experience
- Hobbies
- Contact

### Hero Section

**Components:**
- Availability tag
- Name and title
- Animated typing effect (5 rotating titles)
- Tagline description
- Call-to-action buttons

**Animations:**
- Typing effect cycles through:
  - .NET Developer
  - IoT Specialist
  - Microservices Architect
  - Cloud Engineer
  - Problem Solver

### Tech Stack Marquee

**Purpose:**
Displays technical skills in a scrolling banner.

**Technologies Shown:**
- C# / .NET Core / Azure
- Docker / Kubernetes
- SQL Server / Microservices / ASP.NET Core

**Features:**
- Infinite horizontal scroll
- Pause on hover
- Icon + text display
- Duplicated content for seamless loop

### About Section

**Subsections:**

1. **Statistics Grid**
   - Years of experience (8+)
   - Projects delivered (15+)
   - Industries worked (4)
   - Client satisfaction (100%)

2. **Personal Story**
   - Career narrative
   - Key achievements
   - Professional journey
   - Career motivations

3. **Skills Categories**
   - Core Expertise (C#, .NET, Microservices)
   - Cloud & DevOps (Azure, Docker, Kubernetes)
   - Databases & Tools (SQL Server, Git)

**Skill Display:**
- Animated progress bars
- Proficiency levels (Expert, Advanced, Intermediate)
- Percentage indicators
- Triggered on scroll

### Projects Section

**Project Cards Include:**
- Icon representation
- Project title
- Company name
- Role description
- Detailed description
- Technology tags
- Project statistics
- Hover effects

**Featured Projects:**
1. Asset & Liability Management System (Security Bank)
2. IoT Notification & Firmware Service (Grundfos)
3. Bank Reconciliation System (Security Bank)
4. Data Collection Application (ISS)
5. FleetHQ Call Center Platform (Goodyear)
6. Issue Tracking System (Security Bank)

### Experience Timeline

**Timeline Structure:**
- Vertical gradient line
- Chronological order (newest first)
- Position markers
- Expandable descriptions

**Each Entry Contains:**
- Job title
- Company name
- Employment period
- Location
- Key responsibilities
- Notable achievements

**Positions Covered:**
- IoT Application Developer (Grundfos, 2022-Present)
- Digital Developer (Goodyear, 2022)
- Application Developer (ISS, 2019-2022)
- Programmer / System Analyst (Security Bank, 2015-2019)

### Hobbies Section

**Purpose:**
Humanizes the portfolio by showing personal interests and work-life balance.

**Categories:**
- Gaming (Strategy and teamwork)
- Basketball (Coordination and decision-making)
- Volleyball (Team synergy)
- Badminton (Reflexes and precision)
- Swimming (Endurance and meditation)
- Work-Life Balance (Philosophy)

**Design:**
- Card-based layout
- Professional icons
- Connection to professional skills
- Hover animations

### Contact Section

**Contact Methods:**
- Email
- Phone 
- Location 
- LinkedIn profile

**Features:**
- Clickable contact cards
- Icon-based representation
- Hover effects
- Direct action links

### Footer

**Contents:**
- Copyright information
- Social media links (GitHub, LinkedIn, Email)
- Technology credit
- Professional branding

## Styling Approach

### CSS Architecture

**Global Styles (globals.css):**
- CSS reset
- Base typography
- System font stack
- Smooth scrolling
- Custom scrollbar

**Component Styles (page.module.css):**
- Scoped to prevent conflicts
- BEM-inspired naming
- Responsive breakpoints
- Animation definitions

### Color Palette

**Primary Colors:**
- Primary Purple: #512bd4
- Primary Light: #6939e5
- Secondary Teal: #00d4aa

**Dark Theme:**
- Background Dark: #0d1117
- Background Card: #161b22
- Border Gray: #21262d
- Text Light: #e6edf3
- Text Muted: #8b949e

### Background Design

**Galaxy Theme:**
- Deep space gradient
- Animated nebula clouds
- Twinkling stars effect
- Smooth color transitions
- Performance-optimized animations

### Responsive Design

**Breakpoints:**
- Desktop: 1200px and above
- Tablet: 768px to 1199px
- Mobile: below 768px

**Responsive Features:**
- Fluid typography
- Flexible grid layouts
- Touch-optimized interactions
- Mobile navigation adjustments

## Key Features

### Performance Optimizations

1. **Static Site Generation (SSG)**
   - Pre-rendered at build time
   - Fast initial load
   - SEO-friendly

2. **Code Splitting**
   - Automatic by Next.js
   - Reduced bundle size
   - Faster page loads

3. **Image Optimization**
   - Next.js Image component ready
   - Format optimization (WebP, AVIF)
   - Lazy loading support

4. **Font Optimization**
   - System font stack (zero load time)
   - Font display swap
   - No external font requests

### Animations

1. **Typing Effect**
   - Cycles through job titles
   - Smooth character-by-character animation
   - Configurable speed and timing

2. **Scroll Animations**
   - Intersection Observer API
   - Fade-in effects
   - Triggered on viewport entry

3. **Hover Effects**
   - Card elevation
   - Icon transformations
   - Color transitions

4. **Progress Bars**
   - Animated skill levels
   - Triggered on scroll
   - Smooth fill animation

5. **Parallax Scrolling**
   - Hero section depth effect
   - Performance-optimized
   - Subtle movement

### Accessibility

- Semantic HTML structure
- ARIA labels where appropriate
- Keyboard navigation support
- Screen reader friendly
- Sufficient color contrast
- Focus indicators

## Installation

### Prerequisites

- Node.js 18 or higher
- npm or yarn package manager

### Steps

1. Clone the repository
```bash
git clone <repository-url>
cd portfolio
```

2. Install dependencies
```bash
npm install
```

3. Run development server
```bash
npm run dev
```

4. Open browser
```
http://localhost:3000
```

## Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm start           # Run production build
npm run lint        # Run ESLint
```

### Development Workflow

1. Make changes to files
2. Hot reload updates automatically
3. Check browser for results
4. Lint code before committing
5. Test production build before deployment

## Building for Production

### Standard Build

```bash
npm run build
npm start
```


## Docker Support

### Building Docker Image

```bash
docker build -t kenneth-portfolio .
```

### Running Container

```bash
docker run -p 3000:3000 kenneth-portfolio
```

### Using Docker Compose

```bash
# Build and start
docker-compose up --build

# Run in background
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

### Docker Configuration

**Multi-stage Build:**
1. Dependencies stage (installs packages)
2. Builder stage (builds application)
3. Runner stage (production runtime)

**Features:**
- Optimized image size (~100-150MB)
- Non-root user for security
- Health checks included
- Resource limits configured
- Logging configuration

### Next.js Configuration

**Key Settings (next.config.js):**
- `output: 'standalone'` - Optimized for Docker
- `reactStrictMode: true` - Development best practices
- `swcMinify: true` - Fast JavaScript minification
- `compress: true` - Enable gzip compression
- `poweredByHeader: false` - Security enhancement

### TypeScript Configuration

**Key Settings (tsconfig.json):**
- Strict type checking enabled
- Module resolution optimized
- Path aliases configured (@/*)
- JSX support for React

## Performance

### Lighthouse Scores (Target)

- Performance: 95+
- Accessibility: 95+
- Best Practices: 95+
- SEO: 95+

### Optimization Techniques

1. **Lazy Loading**
   - Images load on scroll
   - Components load on demand
   - Reduced initial bundle

2. **Code Splitting**
   - Automatic route-based splitting
   - Dynamic imports where applicable
   - Smaller JavaScript bundles

3. **Caching**
   - Static assets cached
   - Browser cache headers
   - CDN caching when deployed

4. **Compression**
   - Gzip enabled
   - Minified JavaScript/CSS
   - Optimized images

### Load Time Targets

- First Contentful Paint: < 1.5s
- Time to Interactive: < 3.0s
- Total Page Load: < 2.0s

## Browser Support

- Chrome (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Edge (latest 2 versions)
- Mobile browsers (iOS Safari, Chrome Mobile)

## License

This project is proprietary and confidential.

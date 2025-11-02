Kenneth Ajero - Next.js Portfolio
A modern, responsive portfolio website built with Next.js 13+ (App Router), TypeScript, and CSS Modules.

🚀 Features
Modern Next.js 13+ App Router - Uses the latest Next.js features
TypeScript - Full type safety
CSS Modules - Scoped styling for components
Responsive Design - Works perfectly on all devices
Smooth Scrolling - Beautiful navigation experience
Active Section Tracking - Navigation highlights current section
Performance Optimized - Fast loading and smooth animations
SEO Friendly - Proper metadata and semantic HTML
📁 Project Structure
portfolio/
├── app/
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx            # Main portfolio page component
│   ├── page.module.css     # Component-specific styles
│   └── globals.css         # Global styles
├── public/                 # Static assets (if needed)
├── package.json
├── tsconfig.json
└── next.config.js
🛠️ Setup Instructions
Prerequisites
Node.js 18+ installed
npm or yarn package manager
Installation
Create a new Next.js project:
bash
npx create-next-app@latest portfolio --typescript --app --no-src-dir
cd portfolio
Replace the default files with the portfolio code:
Copy app/page.tsx content
Copy app/page.module.css content
Copy app/globals.css content
Update app/layout.tsx with the provided layout code
Install dependencies (if any additional needed):
bash
npm install
Run the development server:
bash
npm run dev
Open your browser:
Navigate to http://localhost:3000

📝 File Contents
app/page.tsx
The main portfolio component containing:

Navigation with smooth scrolling
Hero section with introduction
Skills section with 4 categories
Projects section with 6 featured projects
Experience timeline
About section
Contact information
app/page.module.css
All component-specific styles including:

Responsive grid layouts
Hover effects and animations
Color scheme and typography
Mobile-responsive breakpoints
app/globals.css
Global CSS reset and base styles:

Box-sizing reset
Smooth scrolling behavior
Base font family
Default link and button transitions
app/layout.tsx
Root layout with:

Metadata for SEO
HTML structure
Global styles import
🎨 Customization
Colors
Main colors are defined in the CSS. To change them:

css
/* In page.module.css */
Primary: #0066cc
Primary Dark: #004999
Secondary: #2ecc71
Dark: #1a1a2e
Light: #f8f9fa
Content
Update content in app/page.tsx:

Skills: Modify the skills array
Projects: Update the projects array
Experience: Edit the experience array
Contact Info: Change email, phone, and address
Styling
Modify app/page.module.css to adjust:

Layout and spacing
Typography
Colors and shadows
Animations and transitions
📱 Responsive Breakpoints
Desktop: 1200px+
Tablet: 768px - 1199px
Mobile: < 768px
🚀 Deployment
Vercel (Recommended)
Push your code to GitHub
Import project in Vercel
Deploy automatically
Other Platforms
Build the production version:

bash
npm run build
npm start
🔧 Package.json Scripts
json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  }
}
📦 Dependencies
next: ^14.0.0
react: ^18.0.0
react-dom: ^18.0.0
typescript: ^5.0.0
@types/node: ^20.0.0
@types/react: ^18.0.0
@types/react-dom: ^18.0.0
💡 Tips
Add Images: Place images in the public/ folder and reference them in your components
Add New Sections: Create new section components and import them in page.tsx
Dark Mode: Add theme state and conditional classes for dark/light mode
Analytics: Integrate Google Analytics or similar in layout.tsx
Contact Form: Add a contact form with API route for email functionality
🎯 Next Steps
 Add a blog section
 Integrate GitHub API to show repositories
 Add contact form with email service
 Implement dark mode toggle
 Add more animations and interactions
 Add testimonials section
 Create a projects detail page
 Add downloadable resume PDF
📄 License
MIT License - feel free to use this portfolio template for your own projects!

🤝 Contact
Kenneth Ajero

Email: ajerokenn@gmail.com
Phone: 0995 881 9687
Location: Makati, Philippines
Built with ❤️ using Next.js and TypeScript


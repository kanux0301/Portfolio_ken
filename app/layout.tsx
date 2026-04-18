import type { Metadata, Viewport } from 'next';
import { JetBrains_Mono, IBM_Plex_Sans, Major_Mono_Display } from 'next/font/google';
import './globals.css';

const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

const sans = IBM_Plex_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: ['300', '400', '500', '600'],
  display: 'swap',
});

const display = Major_Mono_Display({
  subsets: ['latin'],
  variable: '--font-display',
  weight: '400',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'kenneth-ajero v9.2.0 — Software Engineer',
  description:
    'Live documentation for Kenneth Ajero — nine years of .NET, IoT, and cloud microservices. Running in production since 2015.',
  keywords:
    'Kenneth Ajero, .NET Developer, C#, ASP.NET Core, Azure, Microservices, IoT, Software Engineer, Philippines',
  authors: [{ name: 'Kenneth Ajero' }],
  openGraph: {
    title: 'kenneth-ajero v9.2.0',
    description: 'A software engineer, documented as a system.',
    type: 'website',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#0E1014',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${mono.variable} ${sans.variable} ${display.variable}`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(){try{var t=localStorage.getItem('theme');if(t==='light'||t==='dark')document.documentElement.setAttribute('data-theme',t);}catch(e){}})();",
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}

import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Kenneth Ajero - .NET Developer Portfolio',
  description: 'Portfolio of Kenneth Ajero - .NET Developer specializing in enterprise applications, IoT solutions, cloud microservices, and Azure. 8+ years of experience building scalable applications.',
  keywords: 'Kenneth Ajero, .NET Developer, C#, ASP.NET Core, Azure, Microservices, IoT, Software Engineer, Philippines',
  authors: [{ name: 'Kenneth Ajero' }],
  openGraph: {
    title: 'Kenneth Ajero - .NET Developer Portfolio',
    description: 'Building scalable enterprise applications with C#, ASP.NET Core, and Azure',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
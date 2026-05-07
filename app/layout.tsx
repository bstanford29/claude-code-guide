import type { Metadata } from 'next';
import { Inter, Space_Grotesk, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { SiteChrome } from '@/components/site-chrome';

const inter = Inter({
  variable: '--font-body',
  subsets: ['latin'],
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  variable: '--font-display',
  subsets: ['latin'],
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-mono',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'AI Coding Agent Guide',
    template: '%s - AI Coding Agent Guide',
  },
  description:
    "A practical guide to Claude Code and OpenAI Codex across CLI, desktop app, IDE, and cloud workflows.",
  openGraph: {
    title: 'AI Coding Agent Guide',
    description: 'Claude Code and Codex, from first install to power workflows.',
    type: 'website',
    images: [{ url: '/og-image.png' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Coding Agent Guide',
    description: 'Claude Code and Codex, from first install to power workflows.',
    images: ['/og-image.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`dark ${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} h-full`}
    >
      <body className="bg-[#0a0a0a] text-white antialiased min-h-full">
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}

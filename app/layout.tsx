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
    default: 'Claude Code Guide',
    template: '%s — Claude Code Guide',
  },
  description:
    "A training reference for Claude Code — Anthropic's AI coding assistant. Install, first session, power features, skills, hooks, subagents, worktrees.",
  openGraph: {
    title: 'Claude Code Guide',
    description: 'Everything you need to go from zero to productive with Claude Code.',
    type: 'website',
    images: [{ url: '/og-image.png' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Claude Code Guide',
    description: 'Everything you need to go from zero to productive with Claude Code.',
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

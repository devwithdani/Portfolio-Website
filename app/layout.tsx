import type { Metadata } from 'next';
import './globals.css';
import './portfolio.css';
export const metadata: Metadata = {
  title: 'Dani Roemgens | AI & Digital Developer',
  description: 'Dani Roemgens combineert AI, development en design om ideeën om te zetten in werkende digitale producten. Bekijk projecten, ervaring en achtergrond.',
  icons: { icon: '/favicon.svg' },
};
export default function RootLayout({ children }: { children: React.ReactNode }) { return <html lang="nl"><body>{children}</body></html>; }

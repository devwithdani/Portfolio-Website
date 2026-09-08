import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = {title: 'Dani Roemgens — AI & creatieve technologie', description: 'Het portfolio van Dani Roemgens. Vier jaar AI ontdekken, uitproberen en toepassen, met een groeiende passie voor code.'};
export default function RootLayout({children}:{children:React.ReactNode}) {return <html lang="nl"><body>{children}</body></html>;}

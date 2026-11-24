import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { SiteShell } from '@/components/site-shell'
import './globals.css'

export const metadata: Metadata = {
  title: { default: 'BachelorRent House | Find a place to belong', template: '%s | BachelorRent House' },
  description: 'Find thoughtfully reviewed bachelor rooms, shared flats, and sublets across Bangladesh. Compare locations, amenities, and monthly rent.',
  applicationName: 'BachelorRent House',
  keywords: ['bachelor room rent Dhaka', 'shared flat Bangladesh', 'room rental'],
  generator: 'v0.app',
}
export const viewport: Viewport = { colorScheme: 'light', themeColor: '#f7f9f8', width: 'device-width', initialScale: 1 }
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body className="antialiased"><SiteShell>{children}</SiteShell>{process.env.NODE_ENV === 'production' && <Analytics />}</body></html>
}

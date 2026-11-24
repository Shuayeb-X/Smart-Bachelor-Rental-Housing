import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = { title: 'About BachelorRent House' }

export default function AboutPage() {
  return <main className="mx-auto max-w-[920px] px-5 py-16 lg:px-8"><p className="text-[11px] font-extrabold uppercase tracking-[.17em] text-[#0c8a7a]">About us</p><h1 className="mt-3 text-4xl font-bold tracking-[-.045em] text-[#183330]">A clearer way to find a place in Bangladesh.</h1><p className="mt-5 max-w-[680px] text-base leading-8 text-[#73827e]">BachelorRent House helps renters discover rooms and flats with clear details, while giving owners a simple way to share homes with people looking for their next place.</p><p className="mt-4 max-w-[680px] text-base leading-8 text-[#73827e]">Listings are reviewed before they appear in renter search, so people can browse with more confidence and connect directly with owners.</p><Link href="/how-it-works" className="mt-7 inline-flex rounded-xl bg-[#087f73] px-5 py-3 text-sm font-bold text-white">How it works</Link></main>
}

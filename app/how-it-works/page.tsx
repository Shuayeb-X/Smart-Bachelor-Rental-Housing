import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = { title: 'How it works' }

const steps = [
  { number: '01', title: 'Create an account', text: 'Choose renter or owner to get the right tools for your search or listing.' },
  { number: '02', title: 'Review homes', text: 'Owners submit their home details for review before a listing appears in search.' },
  { number: '03', title: 'Connect directly', text: 'Renters can explore approved homes, save favorites, and contact owners.' },
]

export default function HowItWorksPage() {
  return <main className="mx-auto max-w-[1080px] px-5 py-16 lg:px-8"><p className="text-[11px] font-extrabold uppercase tracking-[.17em] text-[#0c8a7a]">Simple by design</p><h1 className="mt-3 max-w-[680px] text-4xl font-bold tracking-[-.045em] text-[#183330]">How BachelorRent House works</h1><p className="mt-4 max-w-[650px] text-base leading-7 text-[#73827e]">A straightforward path from a home search to a conversation with the owner.</p><ol className="mt-10 grid gap-4 md:grid-cols-3">{steps.map(step=><li key={step.number} className="rounded-2xl border border-[#e3ebe7] bg-white p-6"><span className="text-2xl font-extrabold text-[#147a6f]">{step.number}</span><h2 className="mt-4 text-lg font-bold text-[#183330]">{step.title}</h2><p className="mt-2 text-sm leading-6 text-[#73827e]">{step.text}</p></li>)}</ol><Link href="/login?next=%2F" className="mt-8 inline-flex rounded-xl bg-[#087f73] px-5 py-3 text-sm font-bold text-white">Find a home</Link></main>
}

'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { Role } from '@/lib/types'
import { ArrowUpRight, Heart, Home, Menu, MessageCircle, X } from 'lucide-react'

export function SiteShell({ children }: { children: React.ReactNode }) {
  const [role, setRole] = useState<Role | null>(null)
  const [open, setOpen] = useState(false)
  useEffect(() => {
    try {
      const supabase = createClient()
      void supabase.auth.getUser().then(async (result: {data: {user: {id: string} | null}}) => {
        if (!result.data.user) return
        const { data: profile } = await supabase.from('profiles').select('role').eq('id', result.data.user.id).maybeSingle()
        if (profile?.role) setRole(profile.role as Role)
      })
    } catch { /* Public pages remain usable while Supabase is being configured. */ }
  }, [])
  const accountHref = role === 'admin' ? '/admin' : role === 'owner' ? '/owner' : '/login'
  const links = [{ href: '/', label: 'Find a home' }, { href: '/map', label: 'Explore map' }, { href: '/#how-it-works', label: 'How it works' }]
  return <div className="min-h-screen bg-[#f7f9f8] text-[#172c2b]">
    <header className="sticky top-0 z-40 border-b border-[#e6edeb] bg-white/90 backdrop-blur-xl">
      <nav className="mx-auto flex h-[76px] max-w-[1240px] items-center justify-between px-5 lg:px-8" aria-label="Main navigation">
        <Link href="/" className="flex items-center gap-2.5" aria-label="Bachelor Rent House home"><span className="grid size-10 place-items-center rounded-xl bg-[#087f73] text-white"><Home size={19}/></span><span className="text-[15px] font-extrabold tracking-tight">Bachelor<span className="text-[#0d897c]">Rent</span><span className="block text-[10px] font-semibold uppercase tracking-[.19em] text-[#81928e]">House · Bangladesh</span></span></Link>
        <div className="hidden items-center gap-8 md:flex">{links.map(link => <Link key={link.href} href={link.href} className="text-sm font-medium text-[#596966] transition hover:text-[#087f73]">{link.label}</Link>)}</div>
        <div className="hidden items-center gap-3 md:flex"><Link className="nav-icon" href="/favorites" aria-label="Favorites"><Heart size={18}/></Link><Link className="nav-icon" href="/chat" aria-label="Messages"><MessageCircle size={18}/></Link>{role ? <Link href={accountHref} className="rounded-xl bg-[#087f73] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#066c62]">My dashboard</Link> : <><Link href="/login" className="px-3 py-3 text-sm font-bold text-[#405451]">Log in</Link><Link href="/signup" className="rounded-xl bg-[#087f73] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#066c62]">Get started <ArrowUpRight className="ml-1 inline" size={15}/></Link></>}</div>
        <button className="grid size-10 place-items-center rounded-xl border border-[#e2e9e7] md:hidden" onClick={() => setOpen(!open)} aria-label={open ? 'Close menu' : 'Open menu'}>{open ? <X size={19}/> : <Menu size={19}/>}</button>
      </nav>
      {open && <div className="border-t border-[#e6edeb] bg-white px-5 py-4 md:hidden"><div className="mx-auto flex max-w-[1240px] flex-col gap-3">{links.map(link => <Link onClick={() => setOpen(false)} key={link.href} href={link.href} className="py-2 text-sm font-semibold">{link.label}</Link>)}<div className="flex gap-3"><Link href="/login" className="flex-1 rounded-xl border border-[#dde8e5] py-3 text-center text-sm font-bold">Log in</Link><Link href="/signup" className="flex-1 rounded-xl bg-[#087f73] py-3 text-center text-sm font-bold text-white">Create account</Link></div></div></div>}
    </header>
    {children}
    <footer className="border-t border-[#e3ebe8] bg-white"><div className="mx-auto flex max-w-[1240px] flex-col justify-between gap-6 px-5 py-9 text-sm text-[#73827f] sm:flex-row sm:items-center lg:px-8"><Link href="/" className="font-extrabold text-[#18302e]">BachelorRent House</Link><p>Find a place that feels like yours. Built for Bangladesh.</p><div className="flex gap-5"><Link href="/map" className="hover:text-[#087f73]">Explore</Link><Link href="/owner" className="hover:text-[#087f73]">List a house</Link><Link href="/login" className="hover:text-[#087f73]">Support</Link></div></div></footer>
  </div>
}

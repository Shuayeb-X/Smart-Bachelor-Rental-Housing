'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import type { AuthChangeEvent, Session } from '@supabase/supabase-js'
import type { Role } from '@/lib/types'
import { ArrowUpRight, Heart, Home, LogOut, Menu, MessageCircle, X } from 'lucide-react'

export function SiteShell({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [role, setRole] = useState<Role | null>(null)
  const [userName, setUserName] = useState('')
  const [initialized, setInitialized] = useState(false)
  const [signingOut, setSigningOut] = useState(false)
  const [open, setOpen] = useState(false)
  useEffect(() => {
    let active = true
    try {
      const supabase = createClient()
      const loadAccount = async (user: { id: string; email?: string; user_metadata?: Record<string, unknown> } | null) => {
        if (!user) {
          if (active) { setRole(null); setUserName(''); setInitialized(true) }
          return
        }
        const { data: profile } = await supabase.from('profiles').select('role,name').eq('id', user.id).maybeSingle()
        const metadataRole = user.user_metadata?.role
        const resolvedRole = profile?.role ?? (metadataRole === 'owner' || metadataRole === 'renter' ? metadataRole : 'renter')
        if (active) {
          setRole((resolvedRole as Role | null) ?? null)
          setUserName(profile?.name || user.email?.split('@')[0] || '')
          setInitialized(true)
        }
      }
      void supabase.auth.getSession().then((result: { data: { session: Session | null } }) => loadAccount(result.data.session?.user ?? null)).catch(() => { if (active) setInitialized(true) })
      const { data: { subscription } } = supabase.auth.onAuthStateChange((_event: AuthChangeEvent, session: Session | null) => {
        queueMicrotask(() => { void loadAccount(session?.user ?? null) })
      })
      return () => { active = false; subscription.unsubscribe() }
    } catch {
      setInitialized(true)
    }
  }, [])
  const accountHref = role === 'admin' ? '/admin' : role === 'owner' ? '/owner' : '/'
  const links = [{ href: role ? '/' : '/login?next=%2F', label: 'Find a home' }, { href: '/map', label: 'Explore map' }, { href: '/how-it-works', label: 'How it works' }]
  async function signOut() {
    setSigningOut(true)
    try {
      const { error } = await createClient().auth.signOut()
      if (error) throw error
      setOpen(false)
      router.push('/')
      router.refresh()
    } catch {
      setSigningOut(false)
    }
  }
  const accountActions = role ? <><span className="rounded-full bg-[#e8f5ef] px-3 py-2 text-xs font-bold capitalize text-[#28675b]" aria-label={`Signed in as ${role}`}>{role}{userName ? ` · ${userName}` : ''}</span><Link href={accountHref} className="rounded-xl bg-[#087f73] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#066c62]">{role === 'owner' ? 'Your homes' : role === 'admin' ? 'Admin dashboard' : 'Renter dashboard'}</Link><button type="button" onClick={signOut} disabled={signingOut} className="inline-flex items-center gap-2 px-2 py-3 text-sm font-bold text-[#405451] disabled:opacity-60"><LogOut size={15}/>{signingOut ? 'Signing out…' : 'Sign out'}</button></> : initialized ? <><Link href="/login" className="px-3 py-3 text-sm font-bold text-[#405451]">Log in</Link><Link href="/signup" className="rounded-xl bg-[#087f73] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#066c62]">Get started <ArrowUpRight className="ml-1 inline" size={15}/></Link></> : <span className="h-10 w-24 animate-pulse rounded-xl bg-[#edf2f0]" aria-label="Checking account"/>
  return <div className="flex min-h-screen flex-col bg-[#f7f9f8] text-[#172c2b]">
    <header className="sticky top-0 z-40 border-b border-[#e6edeb] bg-white/90 backdrop-blur-xl">
      <nav className="mx-auto flex h-[76px] max-w-[1240px] items-center justify-between px-5 lg:px-8" aria-label="Main navigation">
        <Link href="/" className="flex items-center gap-2.5" aria-label="Bachelor Rent House home"><span className="grid size-10 place-items-center rounded-xl bg-[#087f73] text-white"><Home size={19}/></span><span className="text-[15px] font-extrabold tracking-tight">Bachelor<span className="text-[#0d897c]">Rent</span><span className="block text-[10px] font-semibold uppercase tracking-[.19em] text-[#81928e]">House · Bangladesh</span></span></Link>
        <div className="hidden items-center gap-8 md:flex">{links.map(link => <Link key={link.href} href={link.href} className="text-sm font-medium text-[#596966] transition hover:text-[#087f73]">{link.label}</Link>)}</div>
        <div className="hidden items-center gap-3 md:flex">{role&&<><Link className="nav-icon" href="/favorites" aria-label="Saved homes"><Heart size={18}/></Link><Link className="nav-icon" href="/chat" aria-label="Messages"><MessageCircle size={18}/></Link></>}{accountActions}</div>
        <button className="grid size-10 place-items-center rounded-xl border border-[#e2e9e7] md:hidden" onClick={() => setOpen(!open)} aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open}>{open ? <X size={19}/> : <Menu size={19}/>}</button>
      </nav>
      {open && <div className="border-t border-[#e6edeb] bg-white px-5 py-4 md:hidden"><div className="mx-auto flex max-w-[1240px] flex-col gap-3">{links.map(link => <Link onClick={() => setOpen(false)} key={link.href} href={link.href} className="py-2 text-sm font-semibold">{link.label}</Link>)}{role&&<div className="flex items-center gap-3 py-1"><Link className="nav-icon" href="/favorites" aria-label="Saved homes"><Heart size={18}/></Link><Link className="nav-icon" href="/chat" aria-label="Messages"><MessageCircle size={18}/></Link><span className="text-xs font-bold capitalize text-[#28675b]">{role}{userName ? ` · ${userName}` : ''}</span></div>}<div className="flex gap-3">{role ? <><Link href={accountHref} onClick={() => setOpen(false)} className="flex-1 rounded-xl bg-[#087f73] py-3 text-center text-sm font-bold text-white">{role === 'owner' ? 'Your homes' : role === 'admin' ? 'Admin dashboard' : 'Renter dashboard'}</Link><button type="button" onClick={signOut} disabled={signingOut} className="flex-1 rounded-xl border border-[#dde8e5] py-3 text-sm font-bold disabled:opacity-60">{signingOut ? 'Signing out…' : 'Sign out'}</button></> : initialized ? <><Link href="/login" onClick={() => setOpen(false)} className="flex-1 rounded-xl border border-[#dde8e5] py-3 text-center text-sm font-bold">Log in</Link><Link href="/signup" onClick={() => setOpen(false)} className="flex-1 rounded-xl bg-[#087f73] py-3 text-center text-sm font-bold text-white">Create account</Link></> : <span className="h-11 w-full animate-pulse rounded-xl bg-[#edf2f0]" aria-label="Checking account"/>}</div></div></div>}
    </header>
    <div className="flex-1">{children}</div>
    <footer className="border-t border-[#e3ebe8] bg-white"><div className="mx-auto flex max-w-[1240px] flex-col justify-between gap-3 px-5 py-5 text-sm text-[#73827f] sm:flex-row sm:items-center lg:px-8"><Link href="/" className="font-extrabold text-[#18302e]">BachelorRent House</Link><nav aria-label="Footer navigation" className="flex flex-wrap gap-x-5 gap-y-2"><Link href="/about" className="hover:text-[#087f73]">About</Link><Link href="/map" className="hover:text-[#087f73]">Explore map</Link><Link href="/owner" className="hover:text-[#087f73]">List a house</Link><a href="mailto:contact@bachelorrent.house" className="hover:text-[#087f73]">Contact us: contact@bachelorrent.house</a></nav></div></footer>
  </div>
}

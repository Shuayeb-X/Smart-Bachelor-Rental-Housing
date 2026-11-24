'use client'

import Link from 'next/link'
import { Heart, MapPin } from 'lucide-react'
import { useState } from 'react'
import type { House } from '@/lib/types'
import { categoryLabels, formatBDT } from '@/lib/types'
import { createClient } from '@/lib/supabase/client'

const fallback = '/dhaka-home.png'
export function HouseCard({ house, userId }: { house: House; userId?: string }) {
  const [saved, setSaved] = useState(false)
  const [busy, setBusy] = useState(false)
  async function toggleFavorite() {
    if (!userId) { window.location.href = '/login?next=/favorites'; return }
    if (busy) return
    setBusy(true)
    try {
      const supabase = createClient()
      const { data } = await supabase.from('favorites').select('id').eq('user_id', userId).eq('house_id', house.id).maybeSingle()
      if (data) { await supabase.from('favorites').delete().eq('id', data.id); setSaved(false) }
      else { await supabase.from('favorites').insert({ user_id: userId, house_id: house.id }); setSaved(true) }
    } finally { setBusy(false) }
  }
  return <article className="house-card group overflow-hidden rounded-[18px] border border-[#e5ece9] bg-white transition duration-300 hover:-translate-y-1 hover:border-[#c7dcd6] hover:shadow-[0_18px_48px_-30px_rgba(19,57,52,.34)]">
    <div className="relative h-[220px] overflow-hidden bg-[#e9efec]"><Link href={`/houses/${house.id}`} aria-label={`View ${house.title}`}><img src={house.images?.[0] || fallback} alt={house.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]" onError={e => { e.currentTarget.src = fallback }}/></Link><span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1.5 text-[11px] font-bold text-[#28534c] shadow-sm">{categoryLabels[house.category]}</span><button onClick={toggleFavorite} disabled={busy} className={`absolute right-4 top-4 grid size-9 place-items-center rounded-full bg-white/95 shadow-sm transition hover:scale-105 ${saved ? 'text-rose-500' : 'text-[#52716b]'}`} aria-label={saved ? 'Remove favorite' : 'Save to favorites'}><Heart size={17} fill={saved ? 'currentColor' : 'none'}/></button></div>
    <div className="p-5"><div className="mb-2 flex items-center justify-between gap-2"><span className="flex min-w-0 items-center gap-1 truncate text-xs font-medium text-[#788985]"><MapPin size={14} className="shrink-0 text-[#0b897a]"/>{house.location}</span><span className="shrink-0 text-[11px] font-semibold text-[#5a756e]">Approved</span></div><Link href={`/houses/${house.id}`} className="line-clamp-1 text-[17px] font-bold tracking-[-.025em] text-[#183330] hover:text-[#087f73]">{house.title}</Link><div className="mt-4 flex items-end justify-between border-t border-[#eef2f0] pt-4"><p className="text-xs text-[#879490]">Monthly rent<span className="mt-1 block text-[20px] font-extrabold tracking-tight text-[#087f73]">{formatBDT(house.price)}<span className="ml-1 text-xs font-medium text-[#879490]">/ month</span></span></p><Link href={`/houses/${house.id}`} className="rounded-lg border border-[#dce7e3] px-3 py-2 text-xs font-bold text-[#35534e] transition hover:border-[#087f73] hover:text-[#087f73]">View details</Link></div></div>
  </article>
}

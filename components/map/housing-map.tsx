'use client'

import dynamic from 'next/dynamic'
import type { House } from '@/lib/types'
const LeafletMap = dynamic(() => import('./leaflet-map'), { ssr: false, loading: () => <div className="grid h-[420px] place-items-center rounded-2xl bg-[#eaf2ec] text-sm text-[#6f827c]">Loading neighborhood map…</div> })
export function HousingMap({houses}:{houses:House[]}) { return <LeafletMap houses={houses}/> }

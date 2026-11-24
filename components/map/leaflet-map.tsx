'use client'

import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import Link from 'next/link'
import type { House } from '@/lib/types'
import { formatBDT } from '@/lib/types'
const housePin = L.divIcon({ className: 'house-pin', html: '<span>BDT</span>', iconSize: [38,38], iconAnchor: [19,19] })
export default function LeafletMap({houses}:{houses:House[]}) {
 const located=houses.filter(h=>h.latitude!==null&&h.longitude!==null)
 return <div className="overflow-hidden rounded-2xl border border-[#dce8e2]"><MapContainer center={[23.7806,90.407]} zoom={12} scrollWheelZoom={false} className="h-[420px] w-full"><TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>{located.map(house=><Marker key={house.id} position={[house.latitude as number,house.longitude as number]} icon={housePin}><Popup><div className="min-w-44"><b>{house.title}</b><p>{house.location} · {formatBDT(house.price)}/mo</p><Link href={`/houses/${house.id}`} className="font-bold text-teal-700">View details</Link></div></Popup></Marker>)}</MapContainer>{located.length===0&&<p className="bg-white px-4 py-2 text-xs text-slate-500">Homes will appear on the map once their owners add coordinates.</p>}</div>
}

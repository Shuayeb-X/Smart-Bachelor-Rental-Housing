'use client'

import { useEffect, useState } from 'react'
import { DiscoverHouses } from '@/components/discover-houses'
import { HousingMap } from '@/components/map/housing-map'
import { createClient } from '@/lib/supabase/client'
import type { House } from '@/lib/types'
export default function MapPage(){const[houses,setHouses]=useState<House[]>([]);useEffect(()=>{let active=true;try{void createClient().from('houses').select('id,owner_id,title,description,price,location,latitude,longitude,category,amenities,images,status,is_available,created_at').eq('status','approved').eq('is_available',true).then((result:{data:House[]|null})=>{if(active)setHouses(result.data??[])})}catch{}return()=>{active=false}},[]);return <main><section className="mx-auto max-w-[1240px] px-5 pt-8 lg:px-8"><p className="mb-2 text-[11px] font-extrabold uppercase tracking-[.17em] text-[#0c8a7a]">Explore by location</p><h1 className="text-3xl font-bold tracking-tight">Dhaka homes, on the map</h1><p className="mb-6 mt-2 text-sm text-[#73827e]">Choose a pin to see rent and listing details.</p><HousingMap houses={houses}/></section><DiscoverHouses mapOnly/></main>}

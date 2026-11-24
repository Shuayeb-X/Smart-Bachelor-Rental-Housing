import type { Metadata } from 'next'
import { HouseDetail } from '@/components/house-detail'
type Props = { params: Promise<{ id: string }> }
export async function generateMetadata({params}:Props):Promise<Metadata>{const{id}=await params;return{title:`Home ${id}`}}
export default async function HousePage({params}:Props){const{id}=await params;return <HouseDetail id={id}/>}

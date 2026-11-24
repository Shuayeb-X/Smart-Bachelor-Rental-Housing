import type { Metadata } from 'next'
import { Dashboard } from '@/components/dashboard'
export const metadata: Metadata = { title: 'Owner dashboard' }
export default function OwnerPage(){return <Dashboard mode="owner"/>}

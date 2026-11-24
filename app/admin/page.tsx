import type { Metadata } from 'next'
import { Dashboard } from '@/components/dashboard'
export const metadata: Metadata = { title: 'Admin dashboard' }
export default function AdminPage(){return <Dashboard mode="admin"/>}

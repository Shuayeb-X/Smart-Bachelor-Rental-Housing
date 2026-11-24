import { Suspense } from 'react'
import type { Metadata } from 'next'
import { AuthForm } from '@/components/auth-form'
export const metadata: Metadata = { title: 'Sign in' }
export default function LoginPage() { return <main><Suspense fallback={<div className="min-h-[60vh]"/>}><AuthForm mode="login"/></Suspense></main> }

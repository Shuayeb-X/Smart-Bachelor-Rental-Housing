import { Suspense } from 'react'
import type { Metadata } from 'next'
import { AuthForm } from '@/components/auth-form'
export const metadata: Metadata = { title: 'Create an account' }
export default function SignupPage() { return <main><Suspense fallback={<div className="min-h-[60vh]"/>}><AuthForm mode="signup"/></Suspense></main> }

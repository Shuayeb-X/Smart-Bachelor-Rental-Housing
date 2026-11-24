import { Suspense } from 'react'
import type { Metadata } from 'next'
import { AuthForm } from '@/components/auth-form'
export const metadata: Metadata = { title: 'Reset your password' }
export default function ForgotPasswordPage() { return <main><Suspense fallback={<div className="min-h-[60vh]"/>}><AuthForm mode="forgot"/></Suspense></main> }

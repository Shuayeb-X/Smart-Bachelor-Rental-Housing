import { Suspense } from 'react'
import type { Metadata } from 'next'
import { ChatWorkspace } from '@/components/chat-workspace'
export const metadata: Metadata = { title: 'Messages' }
export default function ChatPage(){return <Suspense fallback={<main className="mx-auto max-w-5xl px-5 py-16 text-sm text-[#73827e]">Loading messages…</main>}><ChatWorkspace/></Suspense>}

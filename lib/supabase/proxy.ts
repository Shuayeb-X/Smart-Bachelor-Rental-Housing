import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({ request })
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || !key) return response
  const supabase = createServerClient(url, key, {
    cookieOptions: { secure: process.env.NODE_ENV === 'production' },
    cookies: {
      getAll: () => request.cookies.getAll(),
      setAll: (cookiesToSet) => {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
        response = NextResponse.next({ request })
        cookiesToSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options))
      },
    },
  })
  const { data: { user } } = await supabase.auth.getUser()
  const path = request.nextUrl.pathname
  if (path.startsWith('/owner') || path.startsWith('/admin')) {
    const destination = request.nextUrl.clone()
    if (!user) {
      destination.pathname = '/login'
      destination.searchParams.set('next', path)
      return NextResponse.redirect(destination)
    }
    const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).maybeSingle()
    const allowed = path.startsWith('/admin') ? profile?.role === 'admin' : profile?.role === 'owner' || profile?.role === 'admin'
    if (!allowed) {
      destination.pathname = '/'
      destination.search = ''
      return NextResponse.redirect(destination)
    }
  }
  return response
}

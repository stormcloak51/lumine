import { NextRequest, NextResponse } from 'next/server'

export function middleware(req: NextRequest) {
	const token = req.cookies.get('session')?.value

  const isProtectedRoute = config.matcher.some(route => {
    const pattern = new RegExp(
      `^${route.replace(/:\w+\*/g, '.*').replace(/:\w+/g, '[^/]+')}$`
    )
    return pattern.test(req.nextUrl.pathname)
  })

	if (req.nextUrl.pathname.startsWith('/api/uploadthing')) {
		return NextResponse.next()
	}
	
	if (['/login', '/register', '/'].includes(req.nextUrl.pathname)) {
		if (token) {
			const url = req.nextUrl.clone()
			url.pathname = '/feed'
			return NextResponse.redirect(url)
		}

		return NextResponse.next()
	}
	if (!token && isProtectedRoute) {
		const url = req.nextUrl.clone()
		url.pathname = '/login'
		return NextResponse.redirect(url)
	}

	return NextResponse.next()
}

export const config = {
  matcher: [
    '/feed',
    '/profile/:path*',
    '/settings/profile',
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ]
}

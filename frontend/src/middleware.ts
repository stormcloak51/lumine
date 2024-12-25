import { NextRequest, NextResponse } from 'next/server'

export function middleware(req: NextRequest) {
	const token = req.cookies.get('session')?.value

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
	if (!token) {
		const url = req.nextUrl.clone()
		url.pathname = '/login'
		return NextResponse.redirect(url)
	}

	return NextResponse.next()
}

export const config = {
  matcher: [
    '/feed',
		'/login',
		'/register',
    '/profile/:path*',
    '/settings/profile',
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ]
}

import { NextRequest, NextResponse } from 'next/server'

export function middleware(req: NextRequest) {
	const token = req.cookies.get('session')?.value

	if (req.nextUrl.pathname.startsWith('/api/uploadthing')) {
		return NextResponse.next()
	}

	const isAuthPage = req.nextUrl.pathname.startsWith('/login') || req.nextUrl.pathname.startsWith('/register')
	
	if (isAuthPage) {
		if (token) {
			const url = req.nextUrl.clone()
			url.pathname = '/feed'
			return NextResponse.redirect(url)
		}

		return NextResponse.next()
	}

	if (!token && req.nextUrl.pathname !== '/') {
		const url = req.nextUrl.clone()
		url.pathname = '/login'
		return NextResponse.redirect(url)
	}

	if (req.nextUrl.pathname === '/api/uploadthing') {
    return NextResponse.next();
  }

	return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ]
}

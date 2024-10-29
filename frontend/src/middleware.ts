import { NextRequest, NextResponse } from 'next/server'

export function middleware(req: NextRequest) {
	const token = req.cookies.get('refresh_token')?.value
	const isAuthPage = req.nextUrl.pathname.startsWith('/auth')

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
		url.pathname = '/auth/login'
		return NextResponse.redirect(url)
	}

	return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ]
}

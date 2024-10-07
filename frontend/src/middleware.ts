// middleware.js
import { NextRequest, NextResponse } from 'next/server'

export function middleware(req: NextRequest) {
	const token = req.cookies.get('token')?.value

	if (token) {
		return NextResponse.next()
	}

	const url = req.nextUrl.clone()
  url.pathname = '/auth/login'
  return NextResponse.redirect(url)
}

export const config = {
	matcher: ['/feed'], // Routes to protect
}

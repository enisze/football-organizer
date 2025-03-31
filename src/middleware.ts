import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"

export function middleware(request: NextRequest) {
	const requestHeaders = new Headers(request.headers)
	requestHeaders.set("x-pathname", request.nextUrl.pathname)

	requestHeaders.set("x-params", request.nextUrl.searchParams.toString())

	return NextResponse.next({
		request: {
			headers: requestHeaders,
		},
	})
}

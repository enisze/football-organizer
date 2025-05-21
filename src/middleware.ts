import { Ratelimit } from '@upstash/ratelimit'
import { type NextRequest, NextResponse } from 'next/server'
import { upstashRedis } from './server/db/upstashRedis'

const rateLimit = new Ratelimit({
	redis: upstashRedis,
	limiter: Ratelimit.slidingWindow(5, '10 s'),
})

export default async function middleware(request: NextRequest) {
	const ip =
		request.headers.get('x-forwarded-for') ||
		request.headers.get('x-real-ip') ||
		''

	if (ip === '') {
		console.log('IP not found')
	}
	console.log('IP:', ip)
	const { success } = await rateLimit.limit(ip)
	return success
		? NextResponse.next()
		: NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/blocked`)
}

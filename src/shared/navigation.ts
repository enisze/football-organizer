import { createNavigationConfig } from 'next-safe-navigation'
import { z } from 'zod'

export const { routes, useSafeParams, useSafeSearchParams } =
	createNavigationConfig((defineRoute) => ({
		home: defineRoute('/'),
		pricing: defineRoute('/pricing'),
		agb: defineRoute('/agb'),
		group: defineRoute('/group'),
		groupDetails: defineRoute('/group/[groupId]', {
			params: z.object({
				groupId: z.string(),
			}),
			search: z
				.object({
					date: z.string().optional(),
					selectedDate: z.string().optional(),
					duration: z.enum(['60min', '90min', '120min']).optional(),
					minUsers: z.coerce.number().default(8),
					maxUsers: z.coerce.number().default(10),
					tab: z
						.enum(['events', 'myAvailability', 'groupAvailability'])
						.default('events'),
				})
				.optional(),
		}),
		groupSettings: defineRoute('/settings/groups'),
		groupSettingsDetails: defineRoute('/settings/groups/[groupId]', {
			params: z.object({
				groupId: z.string(),
			}),
		}),
		enterGroup: defineRoute('/group/enter', {
			search: z
				.object({
					code: z.string().optional(),
				})
				.optional(),
		}),
		addToGroup: defineRoute('/addToGroup/[JWT]', {
			params: z.object({
				JWT: z.string(),
			}),
		}),
		event: defineRoute('/events/[eventId]', {
			params: z.object({
				eventId: z.string(),
			}),
		}),
		userSettings: defineRoute('/settings/user'),
		signIn: defineRoute('/signIn', {
			search: z
				.object({
					callbackUrl: z.string().optional(),
				})
				.optional(),
		}),
		oauth2callback: defineRoute('/oauth2callback', {
			search: z.object({
				code: z.string(),
			}),
		}),
	}))

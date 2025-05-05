import { createNavigationConfig } from 'next-safe-navigation'
import { z } from 'zod'

export const { routes, useSafeParams, useSafeSearchParams } =
	createNavigationConfig((defineRoute) => ({
		home: defineRoute('/'),
		pricing: defineRoute('/pricing'),
		agb: defineRoute('/agb'),
		group: defineRoute('/group'),
		settings: defineRoute('/group/[groupId]/settings', {
			params: z.object({
				groupId: z.string(),
			}),
		}),
		groupDetails: defineRoute('/group/[groupId]', {
			params: z.object({
				groupId: z.string(),
			}),
			search: z
				.object({
					date: z.string().optional(),
					selectedDate: z.string().optional(),
					duration: z.enum(['60min', '90min', '120min']).optional(),
					minUsers: z.coerce.number().optional(),
					maxUsers: z.coerce.number().optional(),
				})
				.optional(),
		}),
		groupEvents: defineRoute('/group/[groupId]/events', {
			params: z.object({
				groupId: z.string(),
			}),
		}),
		groupMyAvailability: defineRoute('/group/[groupId]/myAvailability', {
			params: z.object({
				groupId: z.string(),
			}),
			search: z
				.object({
					selectedDate: z.string().optional(),
					tab: z
						.enum(['date', 'weekly', 'exception'])
						.optional()
						.default('weekly'),
				})
				.optional(),
		}),
		groupAvailability: defineRoute('/group/[groupId]/groupAvailability', {
			params: z.object({
				groupId: z.string(),
			}),
			search: z
				.object({
					duration: z.enum(['60min', '90min', '120min']).optional(),
					minUsers: z.coerce.number().default(8),
					maxUsers: z.coerce.number().default(10),
					date: z.string().optional(),
					startTime: z.string().optional(),
					endTime: z.string().optional(),
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

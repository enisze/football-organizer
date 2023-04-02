import { Inngest } from 'inngest'
import type { Events } from './__generated__/types'

export const inngest = new Inngest<Events>({
  name: 'Event-Wizard',
  eventKey: process.env.INNGEST_EVENT_KEY,
})

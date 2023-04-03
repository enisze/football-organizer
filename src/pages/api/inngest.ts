import { Inngest } from 'inngest'
import { serve } from 'inngest/next'

import functions from '../../../inngest'

// Create a client to send and receive events
export const inngest = new Inngest({ name: 'Event Wizard' })

// Create an API that hosts zero functions
export default serve(inngest, functions)

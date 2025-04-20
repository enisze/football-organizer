import functions from '@/inngest'
import { inngest } from '@/src/server/db/client'
import { serve } from 'inngest/next'

// Create an API that serves zero functions
export const { GET, POST, PUT } = serve({
	client: inngest,
	functions,
})

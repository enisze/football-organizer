import { serve } from 'inngest/next'

import functions from '../../../inngest'

import { inngest } from '@/src/server/db/client'

// Create an API that hosts zero functions
export default serve(inngest, functions)

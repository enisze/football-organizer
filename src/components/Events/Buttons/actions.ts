'use server'

import { inngest } from '@/src/server/db/client'

export const sendReminderEvent = async (id: string) => {
  await inngest.send({
    name: 'event/reminder',
    data: {
      id,
    },
  })
}

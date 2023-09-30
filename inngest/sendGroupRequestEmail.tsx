import { GroupRequestEmail } from '@/emails/GroupRequestEmail'
import { render } from '@react-email/components'

import { sign } from 'jsonwebtoken'
import { sendEmail } from './createSendEmail'

export const sendGroupRequestEmail = async ({
  requester,
}: {
  requester: string
}) => {
  const token = sign({ email: requester }, process.env.JWT_SECRET as string, {
    expiresIn: '1d',
  })

  const html = render(<GroupRequestEmail email={requester} token={token} />)

  const response = await sendEmail(
    'eniszej@gmail.com',
    html,
    'Neue Gruppenanfrage',
  )

  return { success: response?.id }
}

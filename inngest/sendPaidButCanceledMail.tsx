import { PaidButCanceled } from '@/emails/PaidButCanceled'
import { render } from '@react-email/render'
import type { Event, User } from '../prisma/generated/client'
import { sendEmail } from './createSendEmail'

export const sendPaidButCanceledMail = async (
  event: Event | null,
  user: User | null,
  owner: Pick<User, 'email' | 'name'> | null,
) => {
  const html = render(
    <PaidButCanceled
      event={{
        ...event,
        date: event?.date ? new Date(event.date) : new Date(),
      }}
      participantName={user?.name ?? ''}
      userName={owner?.name ?? ''}
    />,
  )

  if (!owner) return { success: false }

  const { statusCode } = await sendEmail(
    owner.email,
    html,
    'BEZAHLUNG TROTZ ABSAGE',
  )

  console.log(
    `Message sent to: ${JSON.stringify(owner.email)}, Code : ${statusCode}`,
  )

  return { success: statusCode === 201 }
}

import { Avatar, AvatarFallback } from '@/ui/avatar'
import type { UserEventStatus } from '@prisma/client'
import type { FunctionComponent } from 'react'

export const AvatarStatus: FunctionComponent<{
  shortName: string
  name: string
  userEventStatus: UserEventStatus | undefined
  comment: string | null
}> = ({ name, shortName, userEventStatus, comment }) => {
  const color =
    userEventStatus === 'JOINED'
      ? 'text-green-500 !border-green-500'
      : userEventStatus === 'MAYBE'
      ? 'text-yellow-500 !border-yellow-500'
      : 'text-red-500 !border-red-500'

  return (
    <div className={`flex items-center gap-x-2 ${color}`}>
      <Avatar
        className={`rounded-full h-10 w-10 justify-center border-[1px] border-slate-300 dark:border-white ${color}`}
      >
        <AvatarFallback>{shortName}</AvatarFallback>
      </Avatar>
      <span>{name}</span>
      <span>{comment}</span>
    </div>
  )
}

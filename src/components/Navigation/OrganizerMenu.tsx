import { api } from '@/src/server/trpc/api'
import { Avatar, AvatarFallback } from '@/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/ui/dropdown-menu'
import { Separator } from '@/ui/separator'
import { useAtomValue } from 'jotai'
import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import type { FunctionComponent } from 'react'
import { selectedGroupAtom } from '../Groups/GroupSelector'
import { NotificationBubble } from '../NotificationBubble'

export const OrganizerMenu: FunctionComponent = () => {
  const { data: userData } = useSession()

  const selectedGroupId = useAtomValue(selectedGroupAtom)

  const { data: balance } = api.payment.getUserBalance.useQuery(
    { groupId: selectedGroupId ?? '' },
    {
      enabled: Boolean(userData) && Boolean(selectedGroupId),
    },
  )

  if (!userData) return null

  const hasPaypalName = Boolean(userData?.user?.paypalName)

  const res = userData?.user?.name?.split(' ')

  const first = res ? res[0]?.charAt(0) ?? 'X' : 'X'
  const second = res ? res[1]?.charAt(0) ?? 'X' : 'X'

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center justify-between gap-x-2">
        <div className="relative flex">
          <Avatar className="flex items-center justify-center border-[1px]">
            <AvatarFallback className="bg-white dark:bg-slate-900">
              {first + second}
            </AvatarFallback>
          </Avatar>
          {!hasPaypalName && <NotificationBubble />}
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem>{userData?.user?.name}</DropdownMenuItem>
        <DropdownMenuItem>Kontostand: {balance}€</DropdownMenuItem>
        <Separator />

        <DropdownMenuItem>
          <div className="relative flex w-full">
            <Link href={'/settings'}>Einstellungen</Link>
            {!hasPaypalName && <NotificationBubble />}
          </div>
        </DropdownMenuItem>
        <Separator />
        <DropdownMenuItem
          onClick={async () => {
            await signOut({ callbackUrl: '/' })
          }}
        >
          Ausloggen
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

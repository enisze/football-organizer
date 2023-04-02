import { Avatar, AvatarFallback } from '@/ui/base/Avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/ui/base/DropDownMenu'
import { Separator } from '@/ui/base/Separator'
import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import type { FunctionComponent } from 'react'
import { useIsAdmin } from '../../hooks/useIsAdmin'
import { trpc } from '../../utils/trpc'
import { NotificationBubble } from '../NotificationBubble'

export const OrganizerMenu: FunctionComponent = () => {
  const isAdmin = useIsAdmin()
  const { data: userData } = useSession()

  const router = useRouter()

  const { data: link } = trpc.gmail.generateAuthLink.useQuery(undefined, {
    enabled: isAdmin,
  })

  const { data: balance } = trpc.payment.getUserBalance.useQuery(undefined, {
    enabled: Boolean(userData),
  })

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
          {!hasPaypalName && <NotificationBubble position="topRight" />}
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem>{userData?.user?.name}</DropdownMenuItem>
        <DropdownMenuItem>Kontostand: {balance}€</DropdownMenuItem>
        <Separator />
        {isAdmin && (
          <DropdownMenuItem hidden={!isAdmin}>
            {link ? (
              <Link href={link}>New gmail token</Link>
            ) : (
              <div>No link</div>
            )}
          </DropdownMenuItem>
        )}

        <DropdownMenuItem>
          <div className="relative flex w-full">
            <Link href={'/settings'}>Einstellungen</Link>
            {!hasPaypalName && <NotificationBubble position="topRight" />}
          </div>
        </DropdownMenuItem>
        <Separator />
        <DropdownMenuItem
          onClick={() => {
            signOut()
            router.push('/')
          }}
        >
          Ausloggen
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

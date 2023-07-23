import { Avatar, AvatarFallback } from '@/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/ui/dropdown-menu'
import { Label } from '@/ui/label'
import { Separator } from '@/ui/separator'
import { Switch } from '@/ui/switch'
import { atom, useAtom, useAtomValue } from 'jotai'
import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import type { FunctionComponent } from 'react'
import { trpc } from '../../utils/trpc'
import { selectedGroupAtom } from '../Groups/GroupSelector'
import { NotificationBubble } from '../NotificationBubble'

export const adminAtom = atom(false)

export const OrganizerMenu: FunctionComponent = () => {
  const { data: userData } = useSession()

  const selectedGroupId = useAtomValue(selectedGroupAtom)

  const isAdmin = userData?.user?.role === 'admin'

  const { data: balance } = trpc.payment.getUserBalance.useQuery(
    { groupId: selectedGroupId ?? '' },
    {
      enabled: Boolean(userData) && Boolean(selectedGroupId),
    },
  )

  const [isAdminView, setIsAdminView] = useAtom(adminAtom)

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
        <DropdownMenuItem>Kontostand: {balance ?? 0}€</DropdownMenuItem>
        <Separator />

        <DropdownMenuItem hidden={!isAdmin}>
          <div className="relative flex w-full items-center gap-x-1">
            <Label>Admin View</Label>
            <Switch
              id="admin-view"
              checked={isAdminView}
              onClick={() => {
                setIsAdminView(!isAdminView)
              }}
            />
          </div>
        </DropdownMenuItem>

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

'use client'
import { useIsAdmin } from '@/src/hooks/useIsAdmin'
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
import { atom, useAtom } from 'jotai'
import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, type FunctionComponent } from 'react'
import { GroupSelector } from '../Groups/GroupSelector'
import { NotificationBubble } from '../NotificationBubble'

export const adminAtom = atom(true)

export const OrganizerMenu: FunctionComponent<{
  balance: number | null | undefined
}> = ({ balance }) => {
  const isAdmin = useIsAdmin()
  const [open, setOpen] = useState(false)
  const { data } = useSession()
  const [isAdminView, setIsAdminView] = useAtom(adminAtom)

  const pathname = usePathname()

  const groupId = pathname?.split('/').at(-1)

  const isOnDashboard = pathname?.includes('/group/')

  if (!data?.user) return null

  const hasPaypalName = Boolean(data.user.paypalName)

  const name = data.user.name
  const res = name?.split(' ')
  const first = res ? res[0]?.charAt(0) ?? 'X' : 'X'
  const second = res ? res[1]?.charAt(0) ?? 'X' : 'X'

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
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
        <DropdownMenuItem>{name}</DropdownMenuItem>
        <GroupSelector />
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

        {isOnDashboard && (
          <DropdownMenuItem onClick={() => setOpen(!open)}>
            <div className="relative flex w-full">
              <Link href={`/settings/groups/${groupId}`}>
                Gruppeneinstellungen
              </Link>
            </div>
          </DropdownMenuItem>
        )}

        <Separator />

        <DropdownMenuItem onClick={() => setOpen(!open)}>
          <div className="relative flex w-full">
            <Link href={'/settings/user'}>Accounteinstellungen</Link>
            {!hasPaypalName && <NotificationBubble />}
          </div>
        </DropdownMenuItem>
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

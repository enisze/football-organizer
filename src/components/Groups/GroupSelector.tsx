'use client'
import { api } from '@/src/server/trpc/api'
import { OrganizerLink } from '@/ui/OrganizerLink'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/ui/select'
import { SelectGroup } from '@radix-ui/react-select'
import { atom } from 'jotai'
import { useParams, useRouter } from 'next/navigation'
import type { FunctionComponent } from 'react'

export const selectedGroupAtom = atom<string | undefined>(undefined)

export const GroupSelector: FunctionComponent<{ owned?: boolean }> = ({
  owned = false,
}) => {
  const { data: groups } = api.group.getGroupsOfUser.useQuery({
    owned: owned,
  })

  const params = useParams()
  const router = useRouter()

  const group = params?.groupId as string

  return (
    <>
      <Select
        value={group}
        onValueChange={(val) => {
          router.push(`/group/${val}`)
        }}
      >
        <SelectGroup>
          <SelectLabel>Gruppe auswählen</SelectLabel>
        </SelectGroup>
        <SelectTrigger className="w-[180px]" aria-label='group-selector'>
          <SelectValue placeholder="Gruppe auswählen" />
        </SelectTrigger>
        <SelectContent>
          {groups?.map((group) => (
            <SelectItem key={group.id} value={group.id}>
              {group.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {!group && (
        <div className="flex flex-col justify-center">
          <span>Du bist noch kein Mitglied einer Gruppe</span>

          <OrganizerLink href="/settings/groups" className="justify-center">
            Grupper erstellen
          </OrganizerLink>
        </div>
      )}
    </>
  )
}

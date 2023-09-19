'use client'
import type { UserOnGroups } from '@/prisma/generated/client'
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
import { useRouter } from 'next/navigation'
import type { FunctionComponent } from 'react'

export const selectedGroupAtom = atom<string | undefined>(undefined)

export const GroupSelector: FunctionComponent<{ groups?: UserOnGroups[] }> = ({
  groups,
}) => {
  const router = useRouter()

  return (
    <Select
      onValueChange={(val) => {
        router.push(`/group/${val}`)
      }}
    >
      <SelectGroup>
        <SelectLabel>Gruppe auswählen</SelectLabel>
      </SelectGroup>
      <SelectTrigger className="w-[180px]" aria-label="group-selector">
        <SelectValue placeholder="Gruppe auswählen" />
      </SelectTrigger>
      <SelectContent>
        {groups?.map((group) => (
          <SelectItem key={group.id} value={group.id}>
            {group.groupId}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

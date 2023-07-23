import { trpc } from '@/src/utils/trpc'
import { Label } from '@/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/ui/select'
import { atom } from 'jotai'
import { useRouter } from 'next/router'
import type { FunctionComponent } from 'react'
import { useEffect, useRef } from 'react'
import { LoadingWrapper } from '../LoadingWrapper'

export const selectedGroupAtom = atom<string | undefined>(undefined)

export const GroupSelector: FunctionComponent<{ owned?: boolean }> = ({
  owned = false,
}) => {
  const { data: groups, isLoading } = trpc.group.getGroupsOfUser.useQuery({
    owned: owned,
  })

  const router = useRouter()

  const group = router.query.groupId as string

  const isInitialGroupSet = useRef(false)

  useEffect(() => {
    if (isLoading || isInitialGroupSet.current) return
    isInitialGroupSet.current = true
    router.push(`/group/${groups?.at(0)?.id}`)
  }, [groups, isLoading, router])

  return (
    <LoadingWrapper isLoading={isLoading}>
      <Label>Gruppe</Label>
      <Select
        value={group}
        onValueChange={(val) => {
          router.push(`/group/${val}`)
        }}
      >
        <SelectTrigger className="w-[180px]" aria-label="group-selector">
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
    </LoadingWrapper>
  )
}

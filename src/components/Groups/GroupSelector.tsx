'use client'
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
import { SessionProvider, useSession } from 'next-auth/react'
import { useParams, useRouter } from 'next/navigation'
import type { FunctionComponent } from 'react'
import { useEffect, useRef } from 'react'
import { LoadingWrapper } from '../LoadingWrapper'

export const selectedGroupAtom = atom<string | undefined>(undefined)

const GroupSelectorRaw: FunctionComponent<{ owned?: boolean }> = ({
  owned = false,
}) => {
  const { data } = useSession()
  const { data: groups, isLoading } = trpc.group.getGroupsOfUser.useQuery({
    owned: owned,
    id: data?.user?.id,
  })

  const params = useParams()
  const router = useRouter()

  const group = params?.groupId as string

  const isInitialGroupSet = useRef(false)

  useEffect(() => {
    console.log(groups?.length)
    if (isLoading || isInitialGroupSet.current) return
    isInitialGroupSet.current = true
    if ((groups?.length ?? [].length) < 1) return
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
        <SelectTrigger className="w-[180px]">
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

export const GroupSelector = () => {
  return (
    <SessionProvider>
      <GroupSelectorRaw />
    </SessionProvider>
  )
}

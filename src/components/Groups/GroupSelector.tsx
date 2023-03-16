import { trpc } from '@/src/utils/trpc'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/ui/base/Select'
import { atom, useAtom } from 'jotai'
import type { FunctionComponent } from 'react'
import { LoadingWrapper } from '../LoadingWrapper'

export const selectedGroupAtom = atom<string | undefined>(undefined)

export const GroupSelector: FunctionComponent<{ owned?: boolean }> = ({
  owned = false,
}) => {
  const { data: groups, isLoading } = trpc.group.getGroupsOfUser.useQuery({
    owned: owned,
  })
  const [group, setSelectedGroup] = useAtom(selectedGroupAtom)

  return (
    <LoadingWrapper isLoading={isLoading}>
      <Select
        value={group}
        defaultValue={groups?.at(0)?.id}
        onValueChange={(val) => {
          setSelectedGroup(val)
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

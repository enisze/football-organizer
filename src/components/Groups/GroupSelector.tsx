import { trpc } from '@/src/utils/trpc'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/ui/base/Select'
import type { FunctionComponent } from 'react'
import { LoadingWrapper } from '../LoadingWrapper'

export const GroupSelector: FunctionComponent = () => {
  const { data: groups, isLoading } = trpc.group.getGroupsOfUser.useQuery()

  return (
    <LoadingWrapper isLoading={isLoading}>
      <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Theme" />
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

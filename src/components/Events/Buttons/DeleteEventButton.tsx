import { api } from '@/src/server/trpc/api'
import { Button } from '@/ui/button'
import type { FunctionComponent } from 'react'
import { LoadingWrapper } from '../../LoadingWrapper'

export const DeleteEventButton: FunctionComponent<{ id: string }> = ({
  id,
}) => {
  const trpcContext = api.useContext()
  const { mutate: deleteEvent, isLoading } = api.event.delete.useMutation({
    onSuccess: () => trpcContext.invalidate(),
  })
  return (
    <LoadingWrapper isLoading={isLoading}>
      <Button variant="outline" onClick={() => deleteEvent({ id })}>
        Delete
      </Button>
    </LoadingWrapper>
  )
}

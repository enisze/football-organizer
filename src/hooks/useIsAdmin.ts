import { useAtomValue } from 'jotai'
import { useSession } from 'next-auth/react'
import { useMemo } from 'react'
import { adminAtom } from '../components/Navigation/OrganizerMenu'

export const useIsAdmin = () => {
  const { data } = useSession()

  const adminView = useAtomValue(adminAtom)

  const isAdmin = useMemo(() => data?.user?.role === 'admin', [data])

  return isAdmin && adminView
}

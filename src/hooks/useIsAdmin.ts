import { useAtomValue } from 'jotai'
import { useSession } from 'next-auth/react'
import { adminAtom } from '../components/Navigation/OrganizerMenu'

export const useIsAdmin = () => {
  const { data } = useSession()

  const adminView = useAtomValue(adminAtom)

  return data?.user?.role === 'admin' && adminView
}

'use client'
import { NewGroup } from '@/src/components/Groups/NewGroup'
import { trpc } from '@/src/utils/trpc'
import { useSession } from 'next-auth/react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import type { FunctionComponent } from 'react'
import { useMemo } from 'react'

const NavBar = dynamic(() => import('@/src/components/Navigation/Navbar'), {
  ssr: false,
})

const AddToGroup: FunctionComponent = () => {
  const router = useRouter()

  const JWT = router.query.JWT as string

  const { data } = useSession()

  const {
    data: userData,
    isLoading,
    isFetching,
  } = trpc.user.getDataFromJWT.useQuery(
    { JWT },
    { enabled: Boolean(JWT) && Boolean(data?.user?.email) },
  )

  const isValid = useMemo(() => {
    const jwtEmail = userData?.email
    const sessionEmail = data?.user?.email
    return jwtEmail?.includes(sessionEmail ?? '')
  }, [data, userData])

  return (
    <>
      <NavBar />
      {isFetching && isLoading ? (
        <div className="flex flex-col w-full h-full p-2 gap-y-4 justify-center items-center">
          <div className="text-lg font-bold">Lade...</div>
        </div>
      ) : (
        <>
          {data?.user?.name && (
            <div className="flex flex-col items-center p-5 h-full">
              <div>
                Hallo {data.user.name}, du kannst nun eine Gruppe erstellen
                {isValid && <NewGroup />}
              </div>
            </div>
          )}
        </>
      )}
    </>
  )
}

export default AddToGroup

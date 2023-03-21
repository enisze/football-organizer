import { NewGroup } from '@/src/components/Groups/NewGroup'
import { SignUpForm } from '@/src/components/SignUpForm'
import { trpc } from '@/src/utils/trpc'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import type { FunctionComponent } from 'react'

const AddToGroup: FunctionComponent = () => {
  const router = useRouter()

  const JWT = router.query.JWT as string

  const { data } = useSession()

  const { data: userData } = trpc.user.getDataFromJWT.useQuery(
    { JWT },
    { enabled: Boolean(JWT) },
  )

  return (
    <div className="flex flex-col w-full h-full p-2 gap-y-4 justify-center items-center">
      <div className="text-lg font-bold">
        Um eine Gruppe zu erstellen, musst du dich zuerst registrieren:
      </div>
      {data?.user?.name ? (
        <div className="flex flex-col h-full">
          <div> {data.user.name}, du kannst nun eine Gruppe erstellen</div>
          <NewGroup />
        </div>
      ) : (
        <div>
          <SignUpForm email={userData?.email} />
        </div>
      )}
    </div>
  )
}

export default AddToGroup

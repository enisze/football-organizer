import { Dashboard } from '@/src/components/Dashboard/Dashboard'
import Navbar from '@/src/components/Navigation/Navbar'
import { useRouter } from 'next/router'
import type { FunctionComponent } from 'react'

const Group: FunctionComponent = () => {
  const router = useRouter()

  const groupId = router.query.groupId as string

  return (
    <div className="flex flex-col pb-2">
      <Navbar />
      <div className="p-8" />
      <Dashboard groupId={groupId} />
    </div>
  )
}

export default Group

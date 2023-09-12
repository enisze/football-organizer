'use client'
import { Dashboard } from '@/src/components/Dashboard/Dashboard'

const MainPage = async ({ params }: { params: { groupId: string } }) => {
  const groupId = params.groupId

  return (
    <div className="flex flex-col pb-2">
      <Dashboard params={{ groupId }} />{' '}
    </div>
  )
}

export default MainPage

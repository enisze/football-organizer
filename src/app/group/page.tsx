import { Dashboard } from '@/src/components/Dashboard/Dashboard'

const MainPage = async () => {
  return (
    <div className="flex flex-col pb-2">
      {/* @ts-expect-error Server Component */}
      <Dashboard />
    </div>
  )
}

export default MainPage

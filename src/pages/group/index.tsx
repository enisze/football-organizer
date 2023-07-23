import { Dashboard } from '@/src/components/Dashboard/Dashboard'
import Navbar from '@/src/components/Navigation/Navbar'
import type { FunctionComponent } from 'react'

const MainPage: FunctionComponent = ({}) => {
  return (
    <div className="flex flex-col pb-2">
      <Navbar />
      <div className="p-8" />
      <Dashboard />
    </div>
  )
}

export default MainPage

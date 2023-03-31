import { Navbar } from '@/src/components/Navigation/Navbar'
import { SettingsSidebar } from '@/src/components/SettingsSidebar'
import { useRouter } from 'next/router'
import type { FunctionComponent } from 'react'
import { useEffect } from 'react'

const Settings: FunctionComponent = () => {
  const router = useRouter()

  useEffect(() => {
    const handleResize = () => {
      if (window && window.innerWidth > 768) {
        router.push('/settings/user')
      }
    }
    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [router])

  return (
    <>
      <Navbar />
      <div className="md:hidden">
        <SettingsSidebar />
      </div>
    </>
  )
}

export default Settings

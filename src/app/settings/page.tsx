'use client'
import { useRouter } from 'next/navigation'
import { useEffect, type FunctionComponent } from 'react'

const Settings: FunctionComponent = () => {
  const router = useRouter()

  useEffect(() => {
    const handleResize = () => {
      if (window && window.innerWidth > 768) {
        router.push('/settings/user')
      }
    }

    handleResize()
    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [router])

  return (
    <>
      <div className="md:hidden"></div>
    </>
  )
}

export default Settings

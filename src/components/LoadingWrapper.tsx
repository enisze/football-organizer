'use client'
import { Progress } from '@/ui/progress'
import type { FunctionComponent, PropsWithChildren } from 'react'
import { useEffect, useState } from 'react'

export const LoadingWrapper: FunctionComponent<
  PropsWithChildren<{
    isLoading: boolean
  }>
> = ({ children, isLoading }) => {
  const [progress, setProgress] = useState(13)

  useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>{isLoading ? <Progress className="w-36" value={progress} /> : children}</>
  )
}

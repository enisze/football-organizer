import Link from 'next/link'
import type { FunctionComponent } from 'react'

export const Heading: FunctionComponent<{
  size?: 'sm' | 'md' | 'lg'
}> = ({ size = 'lg' }) => {
  const fontSize =
    size === 'lg'
      ? 'text-[80px]'
      : size === 'md'
      ? 'text-[48px]'
      : 'text-[20px]'
  return (
    <Link href={process.env.NEXT_PUBLIC_BASE_URL ?? ''}>
      <div className="text-center">
        <span
          className={`cursor-pointer font-extrabold leading-normal ${fontSize} bg-gradient-to-r from-blue-400 to-blue-200 bg-clip-text text-transparent dark:from-blue-800 dark:to-slate-800`}
        >
          Event
          <span className="text-slate-900 dark:text-slate-100"> Wizard</span>
        </span>
      </div>
    </Link>
  )
}

export const Hero: FunctionComponent = () => {
  return (
    <div className="text-center p-5 flex-col">
      <span className="text-3xl md:text-6xl text-slate-900 dark:text-slate-100 font-extrabold">
        Events organisieren wie von&nbsp;
        <span
          className={`leading-normal bg-gradient-to-r from-yellow-400 to-yellow-200 bg-clip-text text-transparent dark:from-yellow-200 dark:to-yellow-800/80`}
        >
          Zauberhand&nbsp;
        </span>
        🪄
      </span>
    </div>
  )
}

import type { LinkProps } from 'next/link'
import Link from 'next/link'
import type { FunctionComponent, PropsWithChildren } from 'react'

export const OrganizerLink: FunctionComponent<
  PropsWithChildren<LinkProps & { className?: string }>
> = ({ children, className, ...props }) => {
  return (
    <Link
      className={`group flex w-full items-center rounded-md py-1.5 px-2 hover:bg-slate-50 dark:hover:bg-slate-800 ${className}`}
      {...props}
    >
      {children}
    </Link>
  )
}

import { cx } from 'class-variance-authority'
import type { PropsWithChildren } from 'react'

type ContainerProps = {
  className?: string
}

export const Container: React.FC<PropsWithChildren<ContainerProps>> = ({
  children,
  className,
}) => {
  return (
    <div
      className={cx(
        'flex w-full rounded-md border border-slate-300 bg-transparent py-2 px-3 text-sm dark:border-slate-700 dark:text-slate-50',
        className,
      )}
    >
      {children}
    </div>
  )
}

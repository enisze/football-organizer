import { Button } from '@/ui/base/Button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/ui/base/Dialog'
import { ThemeToggle } from '@/ui/theme-toggle'
import { useSession } from 'next-auth/react'
import type { FunctionComponent } from 'react'
import { useState } from 'react'
import { LoginForm } from '../Authentication/LoginForm'
import { GroupSelector } from '../Groups/GroupSelector'
import { Heading } from '../Heading'
import { OrganizerMenu } from './OrganizerMenu'

export const Navbar: FunctionComponent = () => {
  const [open, setOpen] = useState(false)

  const { data } = useSession()

  return (
    <header className="sticky top-0 z-40 w-full border-b border-b-slate-200 bg-white dark:border-b-slate-700 dark:bg-slate-900">
      <nav className="flex items-center justify-between px-2 py-3">
        <Heading size="sm" />

        <GroupSelector />

        <div className="flex gap-x-1">
          <div className={`flex cursor-pointer items-center`}>
            {/* <Link href={'/pricing'}>Pricing</Link> */}
            <OrganizerMenu />

            <Dialog open={open} onOpenChange={(open) => setOpen(open)}>
              <DialogTrigger>
                {!data?.user && <Button>Login / Registrieren</Button>}
              </DialogTrigger>

              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Logge dich ein</DialogTitle>
                </DialogHeader>
                <LoginForm
                  onSubmit={() => {
                    setOpen(false)
                  }}
                />
              </DialogContent>
            </Dialog>

            <div className="pl-2">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Navbar

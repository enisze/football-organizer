'use client'
import { Laptop, Moon, SunMedium } from 'lucide-react'
import { useTheme } from 'next-themes'
import { Button } from './button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from './dropdown-menu'

export function ThemeToggle() {
	const { theme, setTheme } = useTheme()

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant='ghost' size='sm'>
					<SunMedium className='rotate-0 scale-100 transition-all hover:text-slate-900 dark:-rotate-90 dark:scale-0 dark:text-slate-400 dark:hover:text-slate-100' />
					<Moon className='absolute rotate-90 scale-0 transition-all hover:text-slate-900 dark:rotate-0 dark:scale-100 dark:text-slate-400 dark:hover:text-slate-100' />
					<span className='sr-only'>Toggle theme</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align='end' forceMount>
				<DropdownMenuItem
					onClick={() => setTheme('light')}
					className={theme === 'light' ? 'bg-accent' : ''}
				>
					<SunMedium className='mr-2 h-4 w-4' />
					<span>Light</span>
				</DropdownMenuItem>
				<DropdownMenuItem
					onClick={() => setTheme('dark')}
					className={theme === 'dark' ? 'bg-accent' : ''}
				>
					<Moon className='mr-2 h-4 w-4' />
					<span>Dark</span>
				</DropdownMenuItem>
				<DropdownMenuItem
					onClick={() => setTheme('system')}
					className={theme === 'system' ? 'bg-accent' : ''}
				>
					<Laptop className='mr-2 h-4 w-4' />
					<span>System</span>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

export const ThemeToggleArea = () => {
	const { theme, setTheme } = useTheme()

	return (
		<div className='flex flex-wrap items-center gap-2'>
			<Button
				variant={theme === 'light' ? 'default' : 'outline'}
				onClick={() => setTheme('light')}
			>
				<SunMedium className='h-4 w-4' />
			</Button>
			<Button
				variant={theme === 'dark' ? 'default' : 'outline'}
				onClick={() => setTheme('dark')}
			>
				<Moon className='h-4 w-4' />
			</Button>
			<Button
				variant={theme === 'system' ? 'default' : 'outline'}
				onClick={() => setTheme('system')}
			>
				<Laptop className='h-4 w-4' />
			</Button>
		</div>
	)
}

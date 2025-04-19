import { Slot } from '@radix-ui/react-slot'
import { type VariantProps, cva } from 'class-variance-authority'
import * as React from 'react'

import { cn } from '@/lib/utils/cn'

const buttonVariants = cva(
	'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
	{
		variants: {
			variant: {
				default: 'bg-primary text-primary-foreground hover:bg-primary/90',
				destructive:
					'bg-destructive text-destructive-foreground hover:bg-destructive/90',
				outline:
					'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
				secondary:
					'bg-secondary text-secondary-foreground hover:bg-secondary/80',
				ghost: 'hover:bg-accent hover:text-accent-foreground',
				link: 'text-primary underline-offset-4 hover:underline',
				purple:
					'inline-flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-white font-medium transition-colors duration-200 w-full sm:w-auto',
				dark: 'bg-slate-800/70 border-slate-700/50 text-slate-400 hover:bg-slate-800 hover:text-slate-300 border',
				'dark-primary':
					'bg-blue-500/10 border-blue-500/30 text-blue-400 hover:bg-blue-500/20 border',
				'dark-success':
					'bg-emerald-500/10 border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20 border',
				'dark-warning':
					'bg-amber-500/10 border-amber-500/30 text-amber-400 hover:bg-amber-500/20 border',
				'dark-danger':
					'bg-rose-500/10 border-rose-500/30 text-rose-400 hover:bg-rose-500/20 border',
				'status-default':
					'relative flex flex-col items-center justify-center p-3 rounded-xl border transition-all bg-slate-800/70 border-slate-700/50 text-slate-400 hover:bg-slate-800 hover:text-slate-300',
				'status-joined':
					'relative flex flex-col items-center justify-center p-3 rounded-xl border transition-all bg-emerald-500/10 border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20',
				'status-maybe':
					'relative flex flex-col items-center justify-center p-3 rounded-xl border transition-all bg-amber-500/10 border-amber-500/30 text-amber-400 hover:bg-amber-500/20',
				'status-canceled':
					'relative flex flex-col items-center justify-center p-3 rounded-xl border transition-all bg-rose-500/10 border-rose-500/30 text-rose-400 hover:bg-rose-500/20',
			},
			size: {
				default: 'h-10 px-4 py-2',
				sm: 'h-9 rounded-md px-3',
				lg: 'h-11 rounded-md px-8',
				icon: 'h-10 w-10',
				status: 'p-3',
			},
		},
		defaultVariants: {
			variant: 'default',
			size: 'default',
		},
	},
)

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {
	asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	({ className, variant, size, asChild = false, ...props }, ref) => {
		const Comp = asChild ? Slot : 'button'
		return (
			<Comp
				className={cn(buttonVariants({ variant, size, className }))}
				ref={ref}
				{...props}
			/>
		)
	},
)
Button.displayName = 'Button'

export { Button, buttonVariants }

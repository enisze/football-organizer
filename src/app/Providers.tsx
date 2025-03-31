"use client"
import { Toaster } from "@/ui/toaster"
import { SessionProvider } from "next-auth/react"
import { ThemeProvider } from "next-themes"
import { NuqsAdapter } from "nuqs/adapters/next/app"
import type { ReactNode } from "react"

const Providers = ({ children }: { children: ReactNode }) => {
	return (
		<SessionProvider>
			<ThemeProvider attribute="class">
				<Toaster />
				<NuqsAdapter>{children}</NuqsAdapter>
			</ThemeProvider>
		</SessionProvider>
	)
}

export default Providers

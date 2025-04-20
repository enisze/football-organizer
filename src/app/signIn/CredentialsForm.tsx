'use client'
import { authClient } from '@/src/lib/auth-client'
import { Button } from '@/ui/button'
import { Input } from '@/ui/input'
import { Label } from '@/ui/label'
import { useState } from 'react'

export default function CredentialsForm() {
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState('')

	async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault()
		setIsLoading(true)
		setError('')

		const formData = new FormData(e.currentTarget)
		const email = formData.get('email') as string
		const password = formData.get('password') as string

		try {
			await authClient.signIn.email({
				email,
				password,
			})
		} catch (err) {
			setError('Invalid email or password')
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<form onSubmit={handleSubmit} className="space-y-4">
			<div className="space-y-2">
				<Label htmlFor="email">Email</Label>
				<Input
					id="email"
					name="email"
					type="email"
					placeholder="john@example.com"
					required
					disabled={isLoading}
				/>
			</div>
			<div className="space-y-2">
				<Label htmlFor="password">Password</Label>
				<Input
					id="password"
					name="password"
					type="password"
					required
					disabled={isLoading}
				/>
			</div>
			{error && <p className="text-sm text-red-500">{error}</p>}
			<Button type="submit" className="w-full" disabled={isLoading}>
				{isLoading ? 'Signing in...' : 'Sign in'}
			</Button>
		</form>
	)
}

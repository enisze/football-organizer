import { serverAuth } from '@/src/server/auth/session'
import { prisma } from '@/src/server/db/client'
import { TextField } from '@/ui/TextField'
import { Button } from '@/ui/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/ui/card'
import { Label } from '@/ui/label'
import { DeleteUserForm } from './DeleteUserForm'
import { NotificationSwitch } from './NotificationSwitch'
import { updatePaypalName } from './actions'

const Settings = async () => {
	const session = await serverAuth()
	const userId = session?.user?.id ?? ''

	if (!userId) return null

	const userName = session?.user?.name
	const paypalName = session?.user?.paypalName

	const userInfo = await prisma.user.findUnique({
		where: { id: userId },
		select: { notificationsEnabled: true, paypalName: true },
	})

	const notificationsEnabled = userInfo?.notificationsEnabled
	const paypalNameDb = userInfo?.paypalName

	return (
		<div className="min-h-screen flex flex-col items-center p-8">
			<div className="w-full max-w-3xl space-y-6">
				<div className="flex items-center justify-between">
					<h1 className="text-2xl font-bold text-white">Nutzereinstellungen</h1>
				</div>

				<Card className="bg-white/5 backdrop-blur-sm border-white/10">
					<CardHeader>
						<CardTitle className="text-lg text-white">
							Benachrichtigungen
						</CardTitle>
						<CardDescription className="text-white/70">
							Verwalte deine Email-Benachrichtigungen
						</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="flex items-center gap-4">
							<Label className="text-white/70">Alle Benachrichtigungen</Label>
							<NotificationSwitch
								notificationsEnabled={Boolean(notificationsEnabled)}
							/>
						</div>
					</CardContent>
				</Card>

				<Card className="bg-white/5 backdrop-blur-sm border-white/10">
					<CardHeader>
						<CardTitle className="text-lg text-white">
							Paypal Einstellungen
						</CardTitle>
						<CardDescription className="text-white/70">
							Verwalte deine Paypal-Informationen
						</CardDescription>
					</CardHeader>
					<CardContent>
						<form className="space-y-4">
							<TextField
								id="user-name-input"
								type="text"
								label="Paypal Name"
								text=""
								name="paypalName"
								infoContent={
									<div>
										Du solltest deinen Paypal namen spezifizieren, damit dein
										Bezahlstatus korrekt angezeigt wird.
									</div>
								}
								placeholder="Paypal Name"
								defaultValue={paypalNameDb ?? undefined}
								withBubble={!paypalName}
							/>

							<Button
								type="submit"
								className="w-fit"
								formAction={async (formData) => {
									'use server'
									updatePaypalName(formData)
								}}
							>
								Speichern
							</Button>
						</form>
					</CardContent>
				</Card>

				<Card className="bg-white/5 backdrop-blur-sm border-white/10">
					<CardHeader>
						<CardTitle className="text-lg text-white">Konto löschen</CardTitle>
						<CardDescription className="text-white/70">
							Lösche dein Konto und alle zugehörigen Daten
						</CardDescription>
					</CardHeader>
					<CardContent>
						<DeleteUserForm userName={userName ?? ''} />
					</CardContent>
				</Card>
			</div>
		</div>
	)
}

export default Settings

import { Button } from '@/ui/button'
import { OrganizerLink } from '@/ui/OrganizerLink'

import { getServerComponentAuthSession } from '@/src/server/auth/authOptions'
import { prisma } from '@/src/server/db/client'
import { verifyJWT } from '@/src/server/verifyJWT'
import { decode } from 'jsonwebtoken'

export default async function AddToGroup({
	params
}: {
	params: { JWT: string }
}) {
	const JWT = params?.JWT

	const session = await getServerComponentAuthSession()

	const userId = session?.user?.id

	const data = await getDataFromJWT({ JWT })

	const isParticipating = await isParticipatingUser({
		groupId: data.id,
		userId: session?.user?.id
	})

	if (isParticipating) {
		return <div>Already member</div>
	}

	return (
		<>
			<div className='flex flex-col justify-center items-center w-full'>
				<div>{`${data?.ownerName} hat dich eingeladen seiner Gruppe ${data?.groupName} beizutreten.`}</div>
				<form>
					<Button
						formAction={async () => {
							'use server'
							addUser({ userId, JWT })
						}}
					>
						Beitreten
					</Button>
				</form>
				<OrganizerLink href={'/'} className='justify-center'>
					Zurück zu den Events
				</OrganizerLink>
			</div>
		</>
	)
}

const getDataFromJWT = async ({ JWT }: { JWT: string }) => {
	const isValid = verifyJWT(JWT)

	if (!isValid) throw new Error('BAD_REQUEST')

	const data = decode(JWT) as {
		id: string
		groupName: string
		ownerName: string
	}

	return data
}

const addUser = async ({
	userId,
	JWT
}: {
	userId: string | undefined
	JWT: string
}) => {
	if (!userId) throw new Error('BAD_REQUEST')
	const isValid = verifyJWT(JWT)

	if (!isValid) throw new Error('BAD_REQUEST')

	const res = decode(JWT) as {
		id: string
		groupName: string
		ownerName: string
	}

	await prisma.group.update({
		data: {
			users: { create: { id: userId } }
		},
		where: { id: res.id }
	})
}

const isParticipatingUser = async ({
	userId,
	groupId
}: {
	userId: string | undefined
	groupId: string
}) => {
	if (!userId) return false
	const res = await prisma.group.findUnique({
		where: { id: groupId, users: { some: { id: userId } } }
	})

	return res ? true : false
}

import {
	Body,
	Head,
	Heading,
	Html,
	Preview,
	Section,
	Tailwind,
	Text
} from '@react-email/components'
import { ContainerBox } from './components/ContainerBox'
import { CustomButton } from './components/CustomButton'
import { Footer } from './components/Footer'

interface VercelInviteUserEmailProps {
	username?: string
	userImage?: string
	invitedByUsername?: string
	invitedByEmail?: string
	teamName?: string
	teamImage?: string
	inviteLink?: string
	inviteFromIp?: string
	inviteFromLocation?: string
}

const baseUrl = process.env.VERCEL_URL
	? `https://${process.env.VERCEL_URL}`
	: ''

export const GroupAdminEmail = ({
	username = 'zenorocha',
	userImage = `${baseUrl}/static/vercel-user.png`,
	invitedByUsername = 'bukinoshita',
	invitedByEmail = 'bukinoshita@example.com',
	teamName: groupName = 'My Project',
	teamImage = `${baseUrl}/static/vercel-team.png`,
	inviteLink = 'https://vercel.com/teams/invite/foo',
	inviteFromIp = '204.13.186.218',
	inviteFromLocation = 'São Paulo, Brazil'
}: VercelInviteUserEmailProps) => {
	const previewText = `Get your own group ${invitedByUsername} on Event Wizard`

	const createGroupLink = process.env.NEXT_PUBLIC_BASE_URL + '/settings/groups'

	return (
		<Html>
			<Head />
			<Preview>{previewText}</Preview>
			<Tailwind>
				<Body className='bg-white text-black my-auto mx-auto font-sans'>
					<ContainerBox>
						<Heading className='text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0'>
							Du wurdest zugelassen, deine eigene Gruppe im&nbsp;
							<strong>Event Wizard</strong> zu erstellen
						</Heading>
						<Text className='text-[14px] leading-[24px]'>Hi {username},</Text>

						<Section className='text-center'>
							<CustomButton href=''>Erstelle deine Gruppe</CustomButton>
						</Section>
						<Footer />
					</ContainerBox>
				</Body>
			</Tailwind>
		</Html>
	)
}

export default GroupAdminEmail

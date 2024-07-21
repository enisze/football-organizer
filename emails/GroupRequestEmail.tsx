import {
	Body,
	Head,
	Heading,
	Html,
	Preview,
	Section,
	Tailwind
} from '@react-email/components'
import { ContainerBox } from './components/ContainerBox'
import { CustomButton } from './components/CustomButton'
import { Footer } from './components/Footer'

interface GroupRequestEmail {
	email: string
	token: string
}

export const GroupRequestEmail = ({ email, token }: GroupRequestEmail) => {
	const previewText = `${email} wants to create a group on Event Wizard`

	const createGroupLink =
		process.env.NEXT_PUBLIC_BASE_URL + '/group/allow/' + token

	//TODO: Adjust UserSchema: allowedNumberOfGroups, paypalName

	return (
		<Html>
			<Head />
			<Preview>{previewText}</Preview>
			<Tailwind>
				<Body className='bg-white text-black my-auto mx-auto font-sans'>
					<ContainerBox>
						<Heading className='text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0'></Heading>

						<Section className='text-center'>
							<CustomButton href={createGroupLink}>
								Nutzer hinzufügen
							</CustomButton>
						</Section>
						<Footer />
					</ContainerBox>
				</Body>
			</Tailwind>
		</Html>
	)
}

export default GroupRequestEmail

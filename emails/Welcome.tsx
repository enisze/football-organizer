import { Body, Head, Preview, Section, Text } from "@react-email/components"
import { Tailwind } from "@react-email/tailwind"
import { ContainerBox } from "./components/ContainerBox"
import { CustomButton } from "./components/CustomButton"
import { FAQArea } from "./components/FAQArea"
import { Footer } from "./components/Footer"

type WelcomeEmailProps = {
	userFirstname: string
}

const url = process.env.NEXT_PUBLIC_BASE_URL ?? ""

export const WelcomeEmail = ({ userFirstname = "Zeno" }: WelcomeEmailProps) => (
	<Tailwind>
		<Head />
		<Preview>The platform to organize your events magically.</Preview>
		<Body className="bg-white text-black font-sans">
			<ContainerBox>
				<Text>Hi {userFirstname},</Text>
				<Text>Willkommen beim Event Wizard.</Text>

				<span>Kurz ein Überblick über die Funktionalitäten:</span>

				<FAQArea />
				<Section className="text-center">
					<CustomButton href={url}>Los gehts</CustomButton>
				</Section>
				<Footer />
			</ContainerBox>
		</Body>
	</Tailwind>
)

export default WelcomeEmail

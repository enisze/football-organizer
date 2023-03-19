import {
  Body,
  Container,
  Head,
  Preview,
  Section,
  Text,
} from '@react-email/components'
import { Tailwind } from '@react-email/tailwind'
import { CustomButton } from './components/CustomButton'
import { FAQArea } from './components/FAQArea'
import { Footer } from './components/Footer'

interface KoalaWelcomeEmailProps {
  userFirstname: string
}

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : ''

export const WelcomeEmail = ({
  userFirstname = 'Zeno',
}: KoalaWelcomeEmailProps) => (
  <Tailwind>
    <Head />
    <Preview>The platform to organize your events magically.</Preview>
    <Body className="bg-white text-black font-serif">
      <Container>
        <Text>Hi {userFirstname},</Text>
        <Text>Willkommen beim Event Wizard.</Text>

        <span>Kurz ein Überblick über die Funktionalitäten:</span>

        <FAQArea />
        <Section className="text-center">
          <CustomButton href="https://getkoala.com">Get started</CustomButton>
        </Section>
        <Footer />
      </Container>
    </Body>
  </Tailwind>
)

export default WelcomeEmail

import { Body, Head, Preview, Section, Text } from '@react-email/components'
import { Tailwind } from '@react-email/tailwind'
import { ContainerBox } from './components/ContainerBox'
import { CustomButton } from './components/CustomButton'
import { Footer } from './components/Footer'

export const NewRefreshToken = ({
  link,
  userName,
}: {
  link: string
  userName: string
}) => {
  return (
    <Tailwind>
      <Head />
      <Preview>The platform to organize your events magically.</Preview>
      <Body className="bg-white text-black font-sans">
        <ContainerBox>
          <Text>Hi {userName},</Text>

          <Text>Du brauchst ein neues Refresh token</Text>
          <Section className="text-center">
            <CustomButton href={link} className="justify-center">
              Neues Token beantragen
            </CustomButton>
          </Section>
          <Footer />
        </ContainerBox>
      </Body>
    </Tailwind>
  )
}

export default NewRefreshToken

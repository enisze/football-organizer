import {
  Body,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Tailwind,
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
    process.env.NEXT_PUBLIC_BASE_URL + '/groups/allow/' + token

  //TODO: button should lead to /api/groups/allow
  //TODO: Send email with jwt token to me including user email and that the user is allowed to create a group
  //TODO: the button should be a link to /api/groups/allow?token=jwtToken
  //TODO: the api should check if the token is valid and if the user is allowed to create a group
  //TODO: if so the user gets a mail with a link to register and after registration is lead to the group creation page
  //TODO: Adjust UserSchema: allowedNumberOfGroups, paypalName

  console.log(token)

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="bg-white text-black my-auto mx-auto font-sans">
          <ContainerBox>
            <Heading className="text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0"></Heading>

            <Section className="text-center">
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

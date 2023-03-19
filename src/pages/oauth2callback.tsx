import { trpc } from '@/src/utils/trpc'
import { useRouter } from 'next/router'
import type { FunctionComponent } from 'react'

const Oauth2Callback: FunctionComponent = () => {
  const router = useRouter()

  const { code } = router.query

  const { data } = trpc.gmail.setToken.useQuery(
    { code: code as string },
    { enabled: Boolean(code) },
  )

  return <div>Tokens were set: {data?.refresh_token}</div>
}

export default Oauth2Callback

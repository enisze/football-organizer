import type { EventEnvironemnt } from '@prisma/client'
import { HomeIcon, TreePineIcon } from 'lucide-react'
import type { FunctionComponent } from 'react'

type EnvironmentInfoProps = { environment: EventEnvironemnt }

export const EnvironmentInfo: FunctionComponent<EnvironmentInfoProps> = ({
  environment: environemnt,
}) => {
  return (
    <div className="flex flex-col items-center">
      {environemnt === 'INDOOR' ? <HomeIcon /> : <TreePineIcon />}
    </div>
  )
}

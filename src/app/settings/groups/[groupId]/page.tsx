import { Button } from '@/ui/button'
import { Separator } from '@/ui/separator'

import type { Group } from '@/prisma/generated/client'
import { getServerComponentAuthSession } from '@/src/server/auth/authOptions'
import { Container } from '@/ui/container'
import { Copy, XIcon } from 'lucide-react'
import { DeleteGroupForm } from './DeleteGroupForm'

import { prisma } from '@/src/server/db/client'

const GroupSettings = async ({
  params: { groupId },
}: {
  params: {
    groupId: string
  }
}) => {
  const session = await getServerComponentAuthSession()
  const userId = session?.user?.id

  const groupData = await prisma.group.findFirst({
    where: { id: groupId, ownerId: userId },
    include: { users: true },
  })

  const groupName = groupData?.name

  // const trpcContext = api.useContext()

  // const { data: token } = api.group.getJWT.useQuery(
  //   {
  //     id: groupId,
  //     groupName,
  //     ownerName: data?.user?.name ?? '',
  //   },
  //   { enabled: Boolean(groupId) },
  // )

  // const [groupNameEdit, setGroupnameEdit] = useState<string>()

  // const { mutate: updateGroupname } = api.group.updateName.useMutation({
  //   onSuccess: () => {
  //     trpcContext.invalidate()
  //   },
  // })

  // const { mutate: deleteUser } = api.group.deleteUser.useMutation({
  //   onSuccess: () => {
  //     trpcContext.invalidate()
  //   },
  // })

  if (!userId || !groupId) {
    // window.location.replace('/')
    // window.location.reload()
    return null
  }

  return (
    <>
      <div className="flex">
        <Separator orientation="vertical" />

        <div className="flex flex-col gap-y-2 p-2">
          <h3 className="font-bold">Einstellungen für Gruppe {groupName}</h3>

          {/* <TextField
            id="group-name-input"
            label="Gruppenname bearbeiten"
            value={groupNameEdit}
            placeholder="Gruppenname..."
            text=""
            onChange={(name) => setGroupnameEdit(name.target.value)}
          />
          <Button
            onClick={() => {
              if (!groupNameEdit) return
              updateGroupname({
                id: groupId,
                name: groupNameEdit,
              })
            }}
            variant="outline"
            className="w-fit"
          >
            Speichern
          </Button> */}

          <div className="flex items-center justify-between gap-x-2">
            <p>{`Mitglieder ${groupData?.users.length}/${getPricingInfos(
              groupData,
            )?.maximalMembers}`}</p>
            <Button
              // onClick={() => {
              //   navigator.clipboard.writeText(
              //     process.env.NEXT_PUBLIC_BASE_URL + '/addToGroup/', //+ token,
              //   )
              // }}
              className="w-fit"
            >
              Einladungslink&nbsp;
              <Copy />
            </Button>
          </div>

          <Container className="flex-col">
            {groupData?.users?.map(async (userInGroup, idx) => {
              const user = await prisma.user.findUnique({
                where: { id: userInGroup?.id },
                select: { name: true },
              })

              return (
                <div
                  key={idx}
                  className="grid grid-cols-3 w-full justify-between items-center"
                >
                  <div>{user?.name}</div>

                  <p className="justify-self-center">
                    {/* TODO: setup dropdown list to change user role */}
                    {
                      groupData.users.find((groupUser) => {
                        return groupUser.id === userInGroup?.id
                      })?.role
                    }
                  </p>
                  {userInGroup?.id === groupData.ownerId && (
                    <Button
                      // onClick={() => {
                      // deleteUser({
                      //   userId: user?.id ?? '',
                      //   groupId,
                      // })
                      // }}
                      variant="ghost"
                      className="w-fit justify-self-end"
                    >
                      <XIcon />
                    </Button>
                  )}
                </div>
              )
            })}
          </Container>

          <DeleteGroupForm groupName={groupName ?? ''} groupId={groupId} />
        </div>
      </div>
      <Separator />
    </>
  )
}

export default GroupSettings

const getPricingInfos = (group: Group | null | undefined) => {
  if (!group) return { maximalMembers: 0 }
  switch (group.pricingModel) {
    case 'FREE':
      return { maximalMembers: 15 }
    case 'SUPPORTER':
      return { maximalMembers: 30 }
    case 'FREE':
      return { maximalMembers: 100 }
  }
}

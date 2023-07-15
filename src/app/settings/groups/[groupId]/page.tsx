'use client'

import { SpecificSettings } from '@/src/components/SettingsSidebar'
import { TextField } from '@/ui/TextField'
import { Button } from '@/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/ui/dialog'
import { Label } from '@/ui/label'
import { Separator } from '@/ui/separator'
import { useSession } from 'next-auth/react'
import type { FunctionComponent } from 'react'
import { useEffect, useMemo, useState } from 'react'

import type { Group } from '@/prisma/generated/client'
import { AddEventForm } from '@/src/components/Events/AddEventForm'
import { selectedGroupAtom } from '@/src/components/Groups/GroupSelector'
import { Navbar } from '@/src/components/Navigation/Navbar'
import { trpc } from '@/src/utils/trpc'
import { Container } from '@/ui/container'
import { useToast } from '@/ui/use-toast'
import { useSetAtom } from 'jotai'
import { Copy, XIcon } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'

const GroupSettings: FunctionComponent = () => {
  const { data } = useSession()
  const userId = data?.user?.id

  const params = useParams()
  const router = useRouter()

  const groupId = params?.groupId as string

  const setAtom = useSetAtom(selectedGroupAtom)

  useEffect(() => {
    setAtom(groupId)
  }, [groupId, setAtom])

  const { data: groupData } = trpc.group.getGroupbyId.useQuery(
    { id: groupId },
    {
      enabled: Boolean(groupId),
    },
  )

  const groupName = groupData?.group?.name ?? ''

  useEffect(() => {
    if (groupName) {
      setGroupnameEdit(groupName)
    }
  }, [groupName])

  const [groupNameForDeletion, setGroupNameForDeletion] = useState('')
  const { toast } = useToast()

  const [open, setOpen] = useState(false)

  const trpcContext = trpc.useContext()

  const { data: token } = trpc.group.getJWT.useQuery(
    {
      id: groupId,
      groupName,
      ownerName: data?.user?.name ?? '',
    },
    { enabled: Boolean(groupId) },
  )

  const [groupNameEdit, setGroupnameEdit] = useState<string>()

  const groupCanBeDeleted = useMemo(() => {
    return groupNameForDeletion === groupName
  }, [groupNameForDeletion, groupName])

  const { mutate: updateGroupname } = trpc.group.updateName.useMutation({
    onSuccess: () => {
      trpcContext.invalidate()
    },
  })

  const { mutate: deleteUser } = trpc.group.deleteUser.useMutation({
    onSuccess: () => {
      trpcContext.invalidate()
    },
  })

  const { mutate: deleteGroup } = trpc.group.delete.useMutation({
    onSuccess: () => {
      trpcContext.invalidate()
    },
  })

  if (!userId || !groupId) {
    // window.location.replace('/')
    // window.location.reload()
    return null
  }

  return (
    <>
      <Navbar />
      <div className="flex flex-col md:grid grid-cols-[220px_8px_auto]">
        <SpecificSettings />

        <Separator orientation="vertical" />

        <Dialog open={open} onOpenChange={(open) => setOpen(open)}>
          <div className="flex flex-col gap-y-2 p-2">
            <h3 className="font-bold">Einstellungen für Gruppe {groupName}</h3>

            <TextField
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
                toast({
                  title: 'Gruppenname geändert',
                  description: `Der Gruppenname wurde erfolgreich zu ${groupNameEdit} geändert.`,
                })
              }}
              variant="outline"
              className="w-fit"
            >
              Speichern
            </Button>

            <DialogTrigger className="flex flex-col gap-y-2 justify-start">
              <Label>Neues Event</Label>
              <Button variant="outline" role="definition">
                Erstellen
              </Button>
            </DialogTrigger>

            <div className="flex items-center justify-between gap-x-2">
              <p>{`Mitglieder ${groupData?.users.length}/${
                getPricingInfos(groupData?.group)?.maximalMembers
              }`}</p>
              <Button
                onClick={() => {
                  navigator.clipboard.writeText(
                    process.env.NEXT_PUBLIC_BASE_URL +
                      '/group/addToGroup/' +
                      token,
                  )
                }}
                className="w-fit"
              >
                Einladungslink&nbsp;
                <Copy />
              </Button>
            </div>

            <Container className="flex-col">
              {groupData?.users?.map((user, idx) => {
                return (
                  <div
                    key={idx}
                    className="grid grid-cols-3 w-full justify-between items-center"
                  >
                    <div>{user?.name}</div>

                    <p className="justify-self-center">
                      {/* TODO: setup dropdown list to change user role */}
                      {
                        groupData.group?.users.find((groupUser) => {
                          return groupUser.id === user?.id
                        })?.role
                      }
                    </p>
                    {user?.id === groupData.group?.ownerId && (
                      <Button
                        onClick={() => {
                          deleteUser({
                            userId: user?.id ?? '',
                            groupId,
                          })
                        }}
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

            <TextField
              id="group-name-input"
              type="text"
              label={`Gruppenname ${groupName} eingeben um zu löschen`}
              text=""
              placeholder={groupName}
              onChange={(name) => setGroupNameForDeletion(name.target.value)}
              value={groupNameForDeletion}
            />
            <Button
              onClick={() => {
                if (groupCanBeDeleted) {
                  deleteGroup(
                    { id: groupId, ownerId: userId },
                    {
                      onSuccess: () => {
                        router.push('/settings/groups')
                      },
                    },
                  )
                  toast({
                    title: 'Gruppe gelöscht',
                    description: `Die Gruppe wurde erfolgreich gelöscht.`,
                  })
                }
              }}
              disabled={!groupCanBeDeleted}
              variant="destructive"
              className="w-fit"
            >
              Löschen
            </Button>
          </div>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add Event</DialogTitle>
              <DialogDescription>Add a new event</DialogDescription>
            </DialogHeader>
            <AddEventForm
              onSubmit={() => {
                setOpen(false)
                toast({
                  title: 'Event erstellt',
                  description: `Das Event wurde erfolgreich erstellt.`,
                })
              }}
            />
          </DialogContent>
        </Dialog>
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

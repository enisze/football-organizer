import { NewGroup } from '@/src/components/Groups/NewGroup'
import { SettingsSidebar } from '@/src/components/SettingsSidebar'
import { useToast } from '@/src/hooks/useToast'
import { Button } from '@/ui/base/Button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/ui/base/Dialog'
import { Label } from '@/ui/base/Label'
import { Separator } from '@/ui/base/Separator'
import { TextField } from '@/ui/base/TextField'
import { useAtomValue } from 'jotai'
import { useSession } from 'next-auth/react'
import type { FunctionComponent } from 'react'
import { useEffect, useMemo, useState } from 'react'

import { AddEventForm } from '../../components/Events/AddEventForm'
import {
  GroupSelector,
  selectedGroupAtom,
} from '../../components/Groups/GroupSelector'
import Navbar from '../../components/Navigation/Navbar'
import { trpc } from '../../utils/trpc'

const GroupSettings: FunctionComponent = () => {
  const { data } = useSession()
  const userId = data?.user?.id

  const [groupNameForDeletion, setGroupNameForDeletion] = useState('')
  const { toast } = useToast()

  const [open, setOpen] = useState(false)

  const trpcContext = trpc.useContext()
  const selectedGroup = useAtomValue(selectedGroupAtom)

  const { data: groups, isLoading: loadingGroups } =
    trpc.group.getGroupsOfUser.useQuery({ owned: true })

  const [groupNameEdit, setGroupnameEdit] = useState<string | undefined>()

  const groupCanBeDeleted = useMemo(() => {
    const groupName = groups?.find((group) => group.id === selectedGroup)?.name
    return groupNameForDeletion === groupName
  }, [groupNameForDeletion, selectedGroup, groups])

  useEffect(() => {
    setGroupnameEdit(groups?.find((group) => group.id === selectedGroup)?.name)
  }, [selectedGroup, groups])

  const { data: usersOfGroup, isLoading: loadingUsers } =
    trpc.group.getUsers.useQuery({ id: selectedGroup ?? '' })

  const { mutate: updateGroupname } = trpc.group.updateName.useMutation({
    onSuccess: () => {
      trpcContext.invalidate()
    },
  })

  const { mutate: deleteGroup } = trpc.group.delete.useMutation({
    onSuccess: () => {
      trpcContext.invalidate()
    },
  })

  if (!userId) {
    // window.location.replace('/')
    // window.location.reload()
    return null
  }

  return (
    <>
      <Navbar />
      <div className="grid grid-cols-[220px_8px_auto]">
        <SettingsSidebar />

        <Separator orientation="vertical" />

        <Dialog open={open} onOpenChange={(open) => setOpen(open)}>
          <div className="flex flex-col gap-y-2 p-2">
            <h3 className="font-bold">Gruppeneinstellungen</h3>

            <TextField
              id="group-name-input"
              label="Gruppenname bearbeiten"
              value={groupNameEdit}
              text=""
              onChange={(name) => setGroupnameEdit(name.target.value)}
            />
            <Button
              onClick={() => {
                if (!selectedGroup || !groupNameEdit) return
                updateGroupname({ id: selectedGroup, name: groupNameEdit })
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

            <GroupSelector owned />

            <DialogTrigger className="flex flex-col gap-y-2 justify-start">
              <Label>Neues Event</Label>
              <Button variant="outline">Erstellen</Button>
            </DialogTrigger>

            <div>TODO: Nutzer management</div>
            {usersOfGroup?.map((user, idx) => {
              return <div key={idx}>{user?.name}</div>
            })}

            <NewGroup />

            <TextField
              id="group-name-input"
              type="text"
              label="Gruppenname eingeben um zu löschen"
              text=""
              onChange={(name) => setGroupNameForDeletion(name.target.value)}
              value={groupNameForDeletion}
            />
            <Button
              onClick={() => {
                if (groupCanBeDeleted && selectedGroup) {
                  deleteGroup({ id: selectedGroup })
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

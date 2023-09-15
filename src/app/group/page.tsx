import { redirect } from 'next/navigation'

const MainPage = async () => {
  const groups = await prisma?.group.findMany()

  if (groups && groups?.length > 0) {
    redirect(`/group/${groups.at(0)?.id}`)
  }
  return <div className="flex flex-col pb-2"></div>
}

export default MainPage

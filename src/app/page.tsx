import { prisma } from '../../prisma/prisma'

const Test = async () => {
  const res = await prisma.user.findMany()

  return (
    <div>
      {res.map((x) => {
        return <div key={x.id}>{x.email}</div>
      })}

      <>
        <div className="font-thin">
          Playground for Next.js 13 new App Directory.
        </div>
        <ul className="text-sm mt-4 self-start">
          <li>• React Server Components</li>
          <li>• Edge Runtime</li>
          <li>• tRPC</li>
          <li>• Kysely + Planetscale + Prisma</li>
          <li>• Clerk</li>
        </ul>
      </>
    </div>
  )
}

export default Test

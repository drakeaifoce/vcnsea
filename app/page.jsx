import { prisma } from "./prisma"

export default async function Index() {
  const users = await prisma.user.findMany()
  return (
    <main className="bg-neutral-faded rounded-small p-x4 l:p-x6">
      <h1 className="text-2xl font-bold">Users</h1>
      <ul className="list-disc list-inside">
        {users.map((user) => (
          <li key={user.id}>{user.name}@{user.email}</li>
        ))}
      </ul>
    </main>
  )
}

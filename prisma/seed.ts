import {PrismaClient} from "@prisma/client"

const prisma = new PrismaClient();

const tickets = [
  {
    title:"Ticket 1",
    content:"This is ticket 1",
    status:"DONE" as const ,
  },
  {
    title:"Ticket 2",
    content:"This is ticket 2",
    status:"OPEN" as const,
  },
  {
    title:"Ticket 3",
    content:"This is ticket 3",
    status:"IN_PROGRESS" as const,
  },
  {
    title:"Ticket 4",
    content:"This is ticket 4",
    status:"DONE" as const,
  }
]

const seed = async()=>{
  const t0 = performance.now()
  console.log('DB Seed: Started...')
  const result = await prisma.ticket.deleteMany();
  console.log("🧹 Deleted tickets:", result); // { count: 0 } or { count: N }

  await prisma.ticket.createMany({
    data:tickets,
  })
  const t1 = performance.now()
  console.log(`DB Seed: Finished...(${t1-t0}ms)`)

}

seed();
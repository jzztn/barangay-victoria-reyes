import { Prisma } from '@prisma/client'

const user = Prisma.validator<Prisma.UserArgs>()({
  include: {
    profile: true,
    records: { include: { members: true } },
  },
})

const resident = Prisma.validator<Prisma.ResidentArgs>()({
  include: {
    members: true,
  },
})

export type User = Prisma.UserGetPayload<typeof user>
export type Record = Prisma.ResidentGetPayload<typeof resident>

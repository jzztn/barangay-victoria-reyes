import { Prisma } from '@prisma/client'

const user = Prisma.validator<Prisma.UserArgs>()({
  include: {
    profile: true,
    records: true,
  },
})

export type User = Prisma.UserGetPayload<typeof user>

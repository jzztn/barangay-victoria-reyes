import { Prisma } from '@prisma/client'

const resident = Prisma.validator<Prisma.ResidentArgs>()({
  include: {
    members: true,
  },
})

export type Record = Prisma.ResidentGetPayload<typeof resident>

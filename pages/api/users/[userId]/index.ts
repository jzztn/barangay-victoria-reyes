import type { User } from '@prisma/client'
import { NextApiHandler } from 'next'
import prisma from '../../../../adapters/prisma'

const handler: NextApiHandler = async (request, response) => {
  if (request.method !== 'GET') {
    response.status(500).json('Invalid request method')
  }
  console.log('hello')
  try {
    const id = String(request.query.userId)
    const user: User | null = await prisma.user.findUnique({
      where: { id },
      include: {
        profile: true,
        records: {
          where: { withId: null },
          include: { members: true },
        },
      },
    })
    response.status(200).json(user)
  } catch (error) {
    response.status(500).json(error)
  }
}

export default handler

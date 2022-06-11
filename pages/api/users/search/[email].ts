import { NextApiHandler } from 'next'
import prisma from '../../../../adapters/prisma'

const handler: NextApiHandler = async (request, response) => {
  if (request.method !== 'GET') {
    response.status(400).json('Invalid Request')
  }
  try {
    const user = await prisma.user.findUnique({
      where: { email: String(request.query.email) },
      select: { id: true },
    })
    response.status(200).json(user)
  } catch (error) {
    response.status(500).json(error)
  }
}

export default handler

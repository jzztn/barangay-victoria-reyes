import type { NextApiHandler } from 'next'
import prisma from '../../../../adapters/prisma'

const handler: NextApiHandler = async (request, response) => {
  if (request.method !== 'PUT') {
    response.status(500).json('Invalid request method')
  }
  try {
    const id = String(request.query.userId)
    const body = JSON.parse(request.body)
    console.log(body)
    const user = await prisma.user.update({
      where: { id: id },
      data: {
        [body.key]: body.value,
      },
    })
    response.status(201).json(user)
  } catch (error) {
    console.log(error)
    response.status(500).json(error)
  }
}

export default handler

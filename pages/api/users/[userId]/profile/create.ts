import type { Prisma } from '@prisma/client'
import type { NextApiHandler } from 'next'
import prisma from '../../../../../adapters/prisma'

type Body = Prisma.ProfileCreateInput
type Profile = Prisma.ProfileCreateWithoutUserInput

const handler: NextApiHandler = async (request, response) => {
  if (request.method !== 'POST') {
    response.status(500).json('Invalid request method')
  }
  try {
    const id = String(request.query.userId)
    const body: Body = JSON.parse(request.body)
    const profile: Profile = await prisma.profile.create({
      data: {
        userId: id,
        firstName: body.firstName,
        middleName: body.middleName,
        lastName: body.lastName,
        gender: body.gender,
        birthdate: body.birthdate,
        contact: body.contact,
      },
    })
    response.status(201).json(profile)
  } catch (error) {
    response.status(500).json(error)
  }
}

export default handler

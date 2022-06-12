import type { NextApiHandler } from 'next'
import prisma from '../../../../../adapters/prisma'
import type { Resident } from '@prisma/client'
import { Resident as Body } from '../../../../../prisma/definition'

const handler: NextApiHandler = async (request, response) => {
  if (request.method !== 'POST') {
    response.status(500).json('Invalid request method')
  }
  try {
    const id = String(request.query.userId)
    const body: Body = JSON.parse(request.body)
    const record: Resident = await prisma.resident.create({
      data: {
        authorId: id,
        verified: body.verified,
        firstName: body.firstName,
        middleName: body.middleName,
        lastName: body.lastName,
        gender: body.gender,
        birthdate: body.birthdate,
        birthplace: body.birthplace,
        address: body.address,
        occupation: body.occupation,
        contact: body.contact,
        homeowner: body.homeowner,
        voter: body.voter,
        relationship: body.relationship,
        startedAt: body.startedAt,
        members: {
          createMany: {
            data: body.members!,
          },
        },
      },
    })
    response.status(201).json(record)
  } catch (error) {
    console.log(error)
    response.status(500).json(error)
  }
}

export default handler

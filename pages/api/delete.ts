import type { NextApiHandler } from "next";
import prisma from "../../adapters/prisma";

const handler: NextApiHandler = async (request, response) => {
  await prisma.ticket.deleteMany();
  await prisma.resident.deleteMany();
  await prisma.profile.deleteMany();
  await prisma.user.deleteMany();
  response.send({ deleted: true });
};

export default handler;

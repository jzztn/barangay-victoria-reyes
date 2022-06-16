import type { NextApiHandler } from "next";
import prisma from "../../../../../adapters/prisma";
import type { Prisma, Ticket } from "@prisma/client";

const handler: NextApiHandler = async (request, response) => {
  if (request.method !== "POST") {
    response.status(500).json("Invalid request method");
  }
  try {
    const id = String(request.query.userId);
    const body = JSON.parse(request.body);
    console.log(body);
    const ticket = await prisma.ticket.update({
      where: { id: body.id },
      data: {
        [body.key]: body.value,
      },
    });
    response.status(201).json(ticket);
  } catch (error) {
    console.log(error);
    response.status(500).json(error);
  }
};

export default handler;

import type { NextApiHandler } from "next";
import prisma from "../../../../../adapters/prisma";
import type { Prisma, Ticket } from "@prisma/client";

const handler: NextApiHandler = async (request, response) => {
  if (request.method !== "POST") {
    response.status(500).json("Invalid request method");
  }
  try {
    const id = String(request.query.userId);
    const body: Prisma.TicketUncheckedCreateInput = JSON.parse(request.body);
    console.log(body);
    const ticket: Ticket = await prisma.ticket.create({
      data: {
        type: body.type,
        userId: id,
      },
    });
    response.status(201).json(ticket);
  } catch (error) {
    console.log(error);
    response.status(500).json(error);
  }
};

export default handler;

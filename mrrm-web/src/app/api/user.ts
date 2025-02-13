import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    const requestMethod = req.method;
    const body = JSON.parse(req.body);
  if (req.method === 'GET') {
      const users = await prisma.user.findMany();
      res.status(200).json(users)
  }
   
}
import { prisma } from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

export async function DELETE(req: NextApiRequest, context: { params: { id: string } }) {
    const { id } = await context.params; 
console.log(id)

  await prisma.user.delete({
      where: { UserId: parseInt(id)  }
  });
  //res.status(200).json(user)
  console.log("User deleted successfully")
  return NextResponse.json({message: 'User deleted successfully'}, { status: 200
  })
}
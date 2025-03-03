import { prisma } from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

export async function DELETE(req: NextApiRequest, context: { params: { id: string } }) {
    const { id } = await context.params; 


  await prisma.room.delete({
      where: { RoomId: parseInt(id)  }
  });

  
  return NextResponse.json({message: 'User deleted successfully'}, { status: 200
  })
}
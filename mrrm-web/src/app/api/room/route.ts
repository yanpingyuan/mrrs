import { NextApiRequest, NextApiResponse } from "next";
import { prisma, Room } from "@/lib/prisma";
import bcrypt from 'bcrypt';
import validator from 'validator';
import { NextResponse } from "next/server";

export async function GET(req: NextApiRequest, res: NextApiResponse) {
    const requestMethod = req.method;
    const body = JSON.parse(req.body);
  if (req.method === 'GET') {
      const rooms = await prisma.room.findMany();
      return NextResponse.json(rooms, { status: 200 });
  }
}

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  var data = await new Response(req.body).json();
  
    var { name, capacity, des} =data;
  console.log(data);

  if (!validator.isEmpty(name) ) { //validate email
    return NextResponse.json({ message: 'name is required' }, { status: 400 })
    //return res.status(400).json({ message: 'Invalid email' })
    
  }
  let isExist = await prisma.room.findUnique({ where: { Name: name }})
  if (isExist){
    //res.status(400).json({ message: 'User already exists with this email' })
    return NextResponse.json({ message: 'Room already exists with this name' }, { status: 400 })
  }

  const room = await prisma.room.create({

    data: {
      Name: name,
      Capacity: capacity,
      Description: des
    }
  });
  //res.status(200).json(user)
  return NextResponse.json(room, { status: 200 })
}


export async function PUT(req: NextApiRequest, res: NextApiResponse) {
  var data = await new Response(req.body).json();

    var { name, capacity, des, id} = data;
 
  var currentRoom = await prisma.room.findUnique({ where: { RoomId: id }
  })

    if (!currentRoom) {
    return NextResponse.json({ message: 'Room not found' }, { status: 400 })
  }

  if (validator.isEmpty(name) === false) { //validate email
    return NextResponse.json({ message: 'Name is required' }, { status: 400 })
  }
   await prisma.room.update({
    where: { RoomId: id },
    data: {
      Name: name,
        Capacity: capacity,
      Description: des
    }
  });
  //res.status(200).json(user)
  return NextResponse.json(currentRoom, { status: 200 })
}
import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";
import bcrypt from 'bcrypt';
import validator from 'validator';
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(req: NextApiRequest, res: NextApiResponse) {

    const { searchParams } = new URL(req.url === undefined ? '' : req.url)
    const date = searchParams.get('date');
    const cookieStore = await cookies()
    const userStr = cookieStore.get('loginUser');
    const userInfo = userStr==undefined ? null : JSON.parse(userStr?.value as string) || null;
    console.log(userInfo);
    console.log(date);
    const body = JSON.parse(req.body);
  if (req.method === 'GET') {
    const reservations = await prisma.reservations.findMany( );
      return NextResponse.json(reservations, { status: 200 });
  }
}

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  var data = await new Response(req.body).json();
  
  var {startTime, endTime, note, roomId, name} =data;
  
  if(roomId<= 0) {
    return NextResponse.json({ message: 'Invalid room id' }, { status: 400 })
  }

  const cookieStore = await cookies()
  const userStr = cookieStore.get('loginUser');
  const userInfo = userStr == undefined ? null : JSON.parse(userStr?.value as string) || null;
  const user = await prisma.reservations.create({
    data: {
      StartTime: startTime,
      EndTime: endTime,
      RoomId: roomId,
      UserId: userInfo?.UserId,
      Note: note,
      Name: name,
    }
  });
  //res.status(200).json(user)
  return NextResponse.json(user, { status: 200 })
}


export async function PUT(req: NextApiRequest, res: NextApiResponse) {
  var data = await new Response(req.body).json();

  var { name, email, phone, password, isAdmin, id} = data;
 
  var currentUser = await prisma.user.findUnique({ where: { UserId: id }
  })

  if (!currentUser) {
    return NextResponse.json({ message: 'User not found' }, { status: 400 })
  }

  if (validator.isEmail(email) === false) { //validate email
    return NextResponse.json({ message: 'Invalid email' }, { status: 400 })
    //return res.status(400).json({ message: 'Invalid email' })
  }
 
   await prisma.user.update({
    where: { UserId: id },
    data: {
      Name: name,
      Email: email,
      Phone: phone,
      IsAdmin: isAdmin,
    }
  });
  //res.status(200).json(user)
  return NextResponse.json(currentUser, { status: 200 })
}
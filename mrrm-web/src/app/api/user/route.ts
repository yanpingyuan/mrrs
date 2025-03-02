import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";
import bcrypt from 'bcrypt';
import validator from 'validator';
import { NextResponse } from "next/server";

export async function GET(req: NextApiRequest, res: NextApiResponse) {
    const requestMethod = req.method;
    const body = JSON.parse(req.body);
  if (req.method === 'GET') {
      const users = await prisma.user.findMany();
      return NextResponse.json(users, { status: 200 });
  }
}

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  var data = await new Response(req.body).json();
  
  var {Name, Email, Phone, Password, IsAdmin} =data;

  if (validator.isEmail(Email) === false) { //validate email
    return NextResponse.json({ message: 'Invalid email' }, { status: 400 })
    //return res.status(400).json({ message: 'Invalid email' })
    
  }
  let isExist = await prisma.user.findUnique({ where: { Email: Email}})
  if (isExist){
    //res.status(400).json({ message: 'User already exists with this email' })
    return NextResponse.json({ message: 'User already exists with this email' }, { status: 400 })
  }

  if (!validator.isStrongPassword(Password, { minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1 })) { //validate password
    //res.status(400).json({ message: 'Password is too weak' })
    return NextResponse.json({ message: 'Password is too weak' }, { status: 400 })
  }

  var pwd = await bcrypt.hash(Password, 10); //hash password
  const user = await prisma.user.create({

    data: {
      Name: Name,
      Email: Email,
      Phone: Phone,
      Password: pwd,
      IsAdmin: IsAdmin,
    }
  });
  //res.status(200).json(user)
  return NextResponse.json(user, { status: 200 })
}
import { prisma } from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next"
import { NextResponse } from "next/server"
import validator from "validator";
import bcrypt from 'bcrypt';
import { generateToken } from "@/lib/utils";
import { request } from "http";
import LoginForm from "@/app/component/auth/login";
import { json } from "stream/consumers";

// export default async function handler(
//     req: NextApiRequest,
//     res: NextApiResponse
// ) {
//     const requestMethod = req.method;
//     const { action } = req.query
//     if(action === 'login') {
//         if(requestMethod === 'POST') {
//             res.status(200).json({message: 'Login successful'})
//         } else {
//             res.status(406).json({message: 'Method Not Allowed'})
//         }
//      } else if(action === 'logout') {
//          res.status(200).json({message: 'Logout successful'})
//      }
// }

export async function POST(req: NextApiRequest,  context: { params: { action: string } }) {
    //const { action } = req.query
  const { action } = await context.params; 
  if (action === 'login') {
    var data = await new Response(req.body).json();

    if (validator.isEmail(data.email) === false) { //validate email
      return NextResponse.json({ message: 'Invalid email' }, { status: 400 })

    }
    let loginUser = await prisma.user.findUnique({ where: { Email: data.email } })
    if (loginUser == null) {
      return NextResponse.json({ message: 'User not found' }, { status: 400 })
    }
    console.log(loginUser)

    if (bcrypt.compareSync(data.password, loginUser.Password) == false) { //compare password
      return NextResponse.json({ message: 'Invalid password' }, { status: 400 })
    }

    var token = await generateToken({ email: loginUser.Email, userId: loginUser.UserId, IsAdmin: loginUser.IsAdmin });
    //res.status(200).json(user)
    var response = NextResponse.json(loginUser, { status: 200 });
    response.cookies.set('token', token, { httpOnly: true, sameSite: 'strict', path: '/', maxAge: 60 * 60 * 24 * 3, secure: process.env.NODE_ENV === 'development' });
    response.cookies.set('loginUser', JSON.stringify(loginUser),  { httpOnly: true, sameSite: 'strict', path: '/', maxAge: 60 * 60 * 24 * 3, secure: process.env.NODE_ENV === 'development' });
    return response;
  } else if(action === 'logout') {
    var res = NextResponse.json({ message: 'Logout successful' }, { status: 200 });
    res.cookies.delete('token');
    return res
    }
  }

    
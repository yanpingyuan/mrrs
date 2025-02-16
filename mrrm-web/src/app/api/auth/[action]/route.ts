import { NextApiRequest, NextApiResponse } from "next"

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const requestMethod = req.method;
    const { action } = req.query
    if(action === 'login') {
        if(requestMethod === 'POST') {
            res.status(200).json({message: 'Login successful'})
        } else {
            res.status(406).json({message: 'Method Not Allowed'})
        }
     } else if(action === 'logout') {
         res.status(200).json({message: 'Logout successful'})
     }
}
import { SignJWT, jwtVerify } from "jose";

const secretKey = process.env.NEXT_PUBLIC_JWT_SECRET || "your-secret-key";
const secret = new TextEncoder().encode(secretKey);

export async function generateToken(payload: {
    email: string;
    userId: number;
    IsAdmin: boolean;
}): Promise<string> {
    return new SignJWT(payload)
        .setProtectedHeader({ alg: "HS256" })
        .setExpirationTime("3d")
        .sign(secret);
}

export async function verifyToken(
    token: string
): Promise<{ email: string } | null> {
    try {
        const { payload } = await jwtVerify(token, secret);
        return payload as { email: string };
    } catch (error) {
        return null;
    }
}
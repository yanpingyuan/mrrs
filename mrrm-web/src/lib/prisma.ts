import { PrismaClient } from '@prisma/client';

class prismaInstance {
    private static instance: PrismaClient | undefined;

    private constructor() {}

    public static getInstance(): PrismaClient {
        if (!prismaInstance.instance) {
            prismaInstance.instance = new PrismaClient();
        }

        return prismaInstance.instance;
    }
}

export const prisma = prismaInstance.getInstance();
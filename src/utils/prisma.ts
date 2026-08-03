import { PrismaClient } from "@/generated/prisma/client";

// API呼び出すたびに、新しいDB接続を作らせないようにPrisma Clientのインスタンスを使い回す。
// 不要なDB接続をなくすため。

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma = globalForPrisma.prisma || new PrismaClient({} as any);

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

import { PrismaClient } from "@/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
// API呼び出すたびに、新しいDB接続を作らせないようにPrisma Clientのインスタンスを使い回す。
// 不要なDB接続をなくすため。

const globalForPrisma = global as unknown as {
  prisma: PrismaClient | undefined;
};

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

export const prisma = globalForPrisma.prisma || new PrismaClient({ adapter});

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

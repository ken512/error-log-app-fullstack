import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/utils/prisma";

export const POST = async (req: NextRequest, res: NextResponse) => {

  const user = prisma.
}
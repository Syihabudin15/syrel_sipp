import prisma from "@/libs/Prisma";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  return NextResponse.json(
    { msg: "OK", status: 200, data: [] },
    { status: 200 },
  );
};

export async function generatePelunasanId() {
  const prefix = `PAID`;
  const padLength = 5;
  const lastRecord = await prisma.pelunasan.count({});
  return `${prefix}${String(lastRecord + 1).padStart(padLength, "0")}`;
}

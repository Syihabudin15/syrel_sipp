import { serializeForApi } from "@/components/utils/PembiayaanUtil";
import prisma from "@/libs/Prisma";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  const backdate = request.nextUrl.searchParams.get("backdate");
  const [asset, kewajiban, modal] = await prisma.$transaction([
    prisma.categoryOfAccount.findMany({
      where: {
        type: "ASSET",
        parentId: null,
        Children: { some: {} },
      },
      include: { Parent: true, Children: true, JournalDetails: true },
    }),
    prisma.categoryOfAccount.findMany({
      where: {
        type: "KEWAJIBAN",
        parentId: null,
        Children: { some: {} },
      },
      include: { Parent: true, Children: true, JournalDetails: true },
    }),
    prisma.categoryOfAccount.findMany({
      where: {
        type: "MODAL",
        parentId: null,
        Children: { some: {} },
      },
      include: { Parent: true, Children: true, JournalDetails: true },
    }),
  ]);
  return NextResponse.json(
    { data: serializeForApi({ asset, kewajiban, modal }), status: 200 },
    { status: 200 },
  );
};

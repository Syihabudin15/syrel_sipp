import { getSession } from "@/libs/Auth";
import prisma from "@/libs/Prisma";
import moment from "moment";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const page = req.nextUrl.searchParams.get("page") || "1";
  const limit = req.nextUrl.searchParams.get("limit") || "50";
  const search = req.nextUrl.searchParams.get("search") || "";
  const sumdanId = req.nextUrl.searchParams.get("sumdanId") || "";
  const status = req.nextUrl.searchParams.get("status");
  const backdate = req.nextUrl.searchParams.get("backdate");
  const skip = (parseInt(page) - 1) * parseInt(limit);

  const session = await getSession();
  if (!session)
    return NextResponse.json(
      { data: [], total: 0, status: 200 },
      { status: 200 },
    );
  const user = await prisma.user.findFirst({ where: { id: session.user.id } });
  if (!user)
    return NextResponse.json(
      { data: [], total: 0, status: 200 },
      { status: 200 },
    );

  const find = await prisma.dropping.findMany({
    where: {
      ...(search && {
        OR: [
          { id: { contains: search } },
          {
            Dapem: {
              some: {
                Debitur: {
                  OR: [
                    { fullname: { contains: search } },
                    { nopen: { contains: search } },
                    { no_skep: { contains: search } },
                  ],
                },
              },
            },
          },
        ],
      }),
      ...(sumdanId && { sumdanId: sumdanId }),
      ...(backdate && {
        created_at: {
          gte: moment(backdate.split(",")[0]).toDate(),
          lte: moment(backdate.split(",")[1]).toDate(),
        },
      }),
      ...(user.sumdanId && { sumdanId: user.sumdanId }),
      ...(status && { status: status === "true" ? true : false }),
    },
    skip: skip,
    take: parseInt(limit),
    orderBy: {
      created_at: "desc",
    },
    include: {
      Sumdan: true,
      Dapem: {
        include: {
          Debitur: true,
          ProdukPembiayaan: true,
          JenisPembiayaan: true,
        },
      },
    },
  });

  const total = await prisma.dropping.count({
    where: {
      ...(search && {
        OR: [
          { id: { contains: search } },
          {
            Dapem: {
              some: {
                Debitur: {
                  OR: [
                    { fullname: { contains: search } },
                    { nopen: { contains: search } },
                    { no_skep: { contains: search } },
                  ],
                },
              },
            },
          },
        ],
      }),
      ...(sumdanId && { sumdanId: sumdanId }),
      ...(backdate && {
        created_at: {
          gte: moment(backdate.split(",")[0]).toDate(),
          lte: moment(backdate.split(",")[1]).toDate(),
        },
      }),
      ...(user.sumdanId && { sumdanId: user.sumdanId }),
      ...(status && { status: status === "true" ? true : false }),
    },
  });

  return NextResponse.json({
    status: 200,
    data: find,
    total: total,
  });
};

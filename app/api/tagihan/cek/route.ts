import { NextRequest, NextResponse } from "next/server";
import * as XLSX from "xlsx";

export const POST = async (req: NextRequest) => {
  const formData = await req.formData();
  const file = formData.get("file") as File;

  try {
    const buffer = Buffer.from(await file.arrayBuffer());
    const workbook = XLSX.read(buffer, { type: "buffer" });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];

    const data = XLSX.utils.sheet_to_json(sheet);
    console.log({ file, data });

    if (data.length === 0) {
      return NextResponse.json(
        {
          status: 400,
          msg: ["File Excel kosong"],
        },
        { status: 400 },
      );
    }

    for (const col of data) {
      console.log(col);
    }

    return NextResponse.json(
      {
        status: 200,
        msg: ["File Excel berhasil diunggah", data.length + " data ditemukan"],
        data: data,
      },
      { status: 200 },
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      {
        status: 500,
        msg: ["Internal Server Error"],
      },
      { status: 500 },
    );
  }
};

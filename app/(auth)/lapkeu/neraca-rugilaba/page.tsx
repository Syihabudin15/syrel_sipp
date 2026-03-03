"use client";

import { GetAngsuran, IDRFormat } from "@/components/utils/PembiayaanUtil";
import { ICategoryOfAccount, IDapem, IPageProps } from "@/libs/IInterfaces";
import { DatePicker, Spin } from "antd";
import { useEffect, useState } from "react";
const { RangePicker } = DatePicker;

export default function Page() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<{
    pendapatan: ICategoryOfAccount[];
    beban: ICategoryOfAccount[];
  }>({ pendapatan: [], beban: [] });
  const [backdate, setBackdate] = useState<string | null>(null);

  const getData = async () => {
    setLoading(true);
    const params = new URLSearchParams();

    if (backdate) params.append("backdate", backdate);

    const res = await fetch(`/api/neraca?${params.toString()}`, {
      method: "POST",
    });
    const json = await res.json();
    setData(json.data);
    setLoading(false);
  };

  useEffect(() => {
    const timeout = setTimeout(async () => {
      await getData();
    }, 200);
    return () => clearTimeout(timeout);
  }, [backdate]);

  return (
    <Spin spinning={loading}>
      <div className="bg-white p-4">
        <div className="flex flex-col font-bold items-center text-center">
          <p className="text-2xl">LAPORAN RUGI/LABA</p>
          <p className="text-xl ">{process.env.NEXT_PUBLIC_APP_FULLNAME}</p>
          <div>
            Periode :{" "}
            <RangePicker
              size="small"
              onChange={(date, dateStr) =>
                setBackdate((dateStr || "").toString())
              }
              style={{ width: 170 }}
            />
          </div>
        </div>
        <div className="flex gap-8 sm:flex-row flex-col">
          <div className="flex-1 ">
            <p className="font-bold text-lg my-2">PENDAPATAN</p>
            {data.pendapatan.map((d) => (
              <div
                className="flex gap-2 border-b border-dashed border-gray-300"
                key={d.id}
              >
                <p className="w-52">{d.name}</p>
                <p className="w-4">:</p>
                <p className="flex-1 text-right">
                  {IDRFormat(
                    d.JournalDetail.reduce(
                      (acc, curr) => acc + (curr.credit - curr.debit),
                      0,
                    ),
                  )}
                </p>
              </div>
            ))}

            <div className="flex gap-2 border-b border-dashed border-gray-300 font-bold my-2">
              <p className="w-52">TOTAL PENDAPATAN</p>
              <p className="w-4">:</p>
              <p className="flex-1 text-right">
                {IDRFormat(
                  data.pendapatan
                    .flatMap((d) => d.JournalDetail)
                    .reduce((acc, curr) => acc + (curr.credit - curr.debit), 0),
                )}
              </p>
            </div>
          </div>
          <div className="flex-1 ">
            <p className="font-bold text-lg my-2">BEBAN</p>
            {data.beban.map((d) => (
              <div
                className="flex gap-2 border-b border-dashed border-gray-300"
                key={d.id}
              >
                <p className="w-52">{d.name}</p>
                <p className="w-4">:</p>
                <p className="flex-1 text-right">
                  {IDRFormat(
                    d.JournalDetail.reduce(
                      (acc, curr) => acc + (curr.debit - curr.credit),
                      0,
                    ),
                  )}
                </p>
              </div>
            ))}
            <div className="flex gap-2 border-b border-dashed border-gray-300 font-bold my-2">
              <p className="w-52">TOTAL BEBAN</p>
              <p className="w-4">:</p>
              <p className="flex-1 text-right">
                {IDRFormat(
                  data.beban
                    .flatMap((d) => d.JournalDetail)
                    .reduce((acc, curr) => acc + (curr.debit - curr.credit), 0),
                )}
              </p>
            </div>
          </div>
        </div>
        <div className="text-center font-bold text-lg my-2">
          TOTAL :{" "}
          {IDRFormat(
            (() => {
              const pend = data.pendapatan
                .flatMap((d) => d.JournalDetail)
                .reduce((acc, curr) => acc + (curr.credit - curr.debit), 0);
              const beb = data.beban
                .flatMap((d) => d.JournalDetail)
                .reduce((acc, curr) => acc + (curr.debit - curr.credit), 0);
              return pend - beb;
            })(),
          )}
        </div>
      </div>
    </Spin>
  );
}

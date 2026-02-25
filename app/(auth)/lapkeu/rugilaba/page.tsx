"use client";

import { IDRFormat } from "@/components/utils/PembiayaanUtil";
import { IDapem, IPageProps } from "@/libs/IInterfaces";
import { DatePicker } from "antd";
import { useEffect, useState } from "react";
const { RangePicker } = DatePicker;

export default function Page() {
  const [loading, setLoading] = useState(false);
  const [pageProps, setPageProps] = useState<IPageProps<IDapem>>({
    page: 1,
    limit: 500,
    total: 0,
    data: [],
    search: "",
    backdate: "",
  });

  const getData = async () => {
    setLoading(true);
    const params = new URLSearchParams();
    params.append("page", pageProps.page.toString());
    params.append("limit", pageProps.limit.toString());
    params.append("dropping_status", "APPROVED");

    if (pageProps.backdate) params.append("backdate", pageProps.backdate);

    const res = await fetch(`/api/dapem?${params.toString()}`);
    const json = await res.json();
    setPageProps((prev) => ({
      ...prev,
      data: json.data,
      total: json.total,
    }));
    setLoading(false);
  };

  useEffect(() => {
    const timeout = setTimeout(async () => {
      await getData();
    }, 200);
    return () => clearTimeout(timeout);
  }, [pageProps.page, pageProps.limit, pageProps.search, pageProps.backdate]);

  return (
    <div className="bg-white p-4">
      <div className="flex gap-8 items-center">
        <p className="text-2xl font-bold">LAPORAN RUGI/LABA</p>
        <RangePicker
          size="small"
          onChange={(date, dateStr) =>
            setPageProps({ ...pageProps, backdate: dateStr })
          }
          style={{ width: 170 }}
        />
      </div>
      <div className="flex gap-8 sm:flex-row flex-col">
        <div className="flex-1 ">
          <p className="font-bold text-lg my-2">PENDAPATAN</p>
          <div className="flex gap-2 border-b border-dashed border-gray-300">
            <p className="w-52">Administrasi</p>
            <p className="w-4">:</p>
            <p className="flex-1 text-right">
              {IDRFormat(
                pageProps.data.reduce(
                  (acc, curr) => acc + curr.plafond * (curr.c_adm / 100),
                  0,
                ),
              )}
            </p>
          </div>
          <div className="flex gap-2 border-b border-dashed border-gray-300">
            <p className="w-52">Selisih Asuransi</p>
            <p className="w-4">:</p>
            <p className="flex-1 text-right">0</p>
          </div>
          <div className="flex gap-2 border-b border-dashed border-gray-300">
            <p className="w-52">Tatalaksana</p>
            <p className="w-4">:</p>
            <p className="flex-1 text-right">
              {IDRFormat(
                pageProps.data.reduce((acc, curr) => acc + curr.c_gov, 0),
              )}
            </p>
          </div>
          <div className="flex gap-2 border-b border-dashed border-gray-300">
            <p className="w-52">Materai</p>
            <p className="w-4">:</p>
            <p className="flex-1 text-right">
              {IDRFormat(
                pageProps.data.reduce((acc, curr) => acc + curr.c_stamp, 0),
              )}
            </p>
          </div>
          <div className="flex gap-2 border-b border-dashed border-gray-300">
            <p className="w-52">Data Informasi</p>
            <p className="w-4">:</p>
            <p className="flex-1 text-right">10.000.000</p>
          </div>
          <div className="flex gap-2 border-b border-dashed border-gray-300 font-bold my-2">
            <p className="w-52">TOTAL PENDAPATAN</p>
            <p className="w-4">:</p>
            <p className="flex-1 text-right">10.000.000</p>
          </div>
        </div>
        <div className="flex-1 ">
          <p className="font-bold text-lg my-2">BEBAN</p>
          <div className="flex gap-2 border-b border-dashed border-gray-300">
            <p className="w-52">Administrasi</p>
            <p className="w-4">:</p>
            <p className="flex-1 text-right">10.000.000</p>
          </div>
          <div className="flex gap-2 border-b border-dashed border-gray-300">
            <p className="w-52">Selisih Asuransi</p>
            <p className="w-4">:</p>
            <p className="flex-1 text-right">10.000.000</p>
          </div>
          <div className="flex gap-2 border-b border-dashed border-gray-300">
            <p className="w-52">Tatalaksana</p>
            <p className="w-4">:</p>
            <p className="flex-1 text-right">10.000.000</p>
          </div>
          <div className="flex gap-2 border-b border-dashed border-gray-300">
            <p className="w-52">Materai</p>
            <p className="w-4">:</p>
            <p className="flex-1 text-right">10.000.000</p>
          </div>
          <div className="flex gap-2 border-b border-dashed border-gray-300">
            <p className="w-52">Data Informasi</p>
            <p className="w-4">:</p>
            <p className="flex-1 text-right">10.000.000</p>
          </div>
          <div className="flex gap-2 border-b border-dashed border-gray-300 font-bold my-2">
            <p className="w-52">TOTAL BEBAN</p>
            <p className="w-4">:</p>
            <p className="flex-1 text-right">10.000.000</p>
          </div>
        </div>
      </div>
      <div className="text-center font-bold text-lg my-2">20.000.000</div>
    </div>
  );
}

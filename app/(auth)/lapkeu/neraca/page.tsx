"use client";

import { IDRFormat } from "@/components/utils/PembiayaanUtil";
import { ICategoryOfAccount } from "@/libs/IInterfaces";
import { useEffect, useState } from "react";

interface INeraca {
  asset: ICategoryOfAccount[];
  kewajiban: ICategoryOfAccount[];
  modal: ICategoryOfAccount[];
}

export default function Page() {
  const [backdate, setBackdate] = useState<string | null>("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<INeraca>({
    asset: [],
    kewajiban: [],
    modal: [],
  });

  const getData = async () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (backdate) params.append("backdate", backdate);

    const res = await fetch(`/api/neraca?${params.toString()}`);
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
    <div className="flex gap-4 border border-gray-300 rounded m-2 p-2  bg-gray-50">
      <div className="flex-1 flex flex-col justify-between">
        <p className="font-bold text-lg">ASSET</p>
        {data.asset.map((d) => (
          <div key={d.id} className="border border-gray-300 border-dashed my-1">
            <p className="font-bold">{d.name}</p>
            <div className="ml-4">
              {d.Children.map((dc) => (
                <div key={dc.id}>
                  <div className="flex justify-between">
                    <p>{dc.name}</p>
                    <p className="text-right">{IDRFormat(0)}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="font-bold border-t border-dashed border-gray-300">
              Total {d.name}
            </p>
          </div>
        ))}
        <p className="font-bold text-lg">JUMLAH ASSET</p>
      </div>
      <div className="flex-1 flex flex-col justify-between">
        <p className="font-bold text-lg">KEWAJIBAN DAN MODAL</p>
        {data.kewajiban.map((d) => (
          <div key={d.id} className="border border-gray-300 border-dashed my-1">
            <p className="font-bold">{d.name}</p>
            <div className="ml-4 mr-2">
              {d.Children.map((dc) => (
                <div key={dc.id}>
                  <div className="flex justify-between">
                    <p>{dc.name}</p>
                    <p className="text-right">{IDRFormat(0)}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="font-bold border-t border-dashed border-gray-300">
              Total {d.name}
            </p>
          </div>
        ))}
        {data.modal.map((d) => (
          <div key={d.id} className="border border-gray-300 border-dashed my-1">
            <p className="font-bold">{d.name}</p>
            <div className="ml-4">
              {d.Children.map((dc) => (
                <div key={dc.id}>
                  <div className="flex justify-between">
                    <p>{dc.name}</p>
                    <p className="text-right">{IDRFormat(0)}</p>
                  </div>
                </div>
              ))}
              <div>
                <p>SHU Tahun Berjalan</p>
              </div>
            </div>
            <p className="font-bold border-t border-dashed border-gray-300">
              Total {d.name}
            </p>
          </div>
        ))}
        <p className="font-bold text-lg">JUMLAH KEWAJIBAN DAN MODAL</p>
      </div>
    </div>
  );
}

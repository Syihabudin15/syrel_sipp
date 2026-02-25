"use client";

import { IDRFormat } from "@/components/utils/PembiayaanUtil";
import { IPageProps } from "@/libs/IInterfaces";
import {
  Area,
  Cabang,
  Dapem,
  ProdukPembiayaan,
  Sumdan,
  User,
} from "@prisma/client";
import { DatePicker, Spin, Table, TableProps } from "antd";
import { useEffect, useState } from "react";
const { RangePicker } = DatePicker;

interface UserDapem extends User {
  AODapem: Dapem[];
}
interface ICabang extends Cabang {
  User: UserDapem[];
}

interface IArea extends Area {
  Cabang: ICabang[];
}

interface IProduk extends ProdukPembiayaan {
  Dapem: Dapem[];
}
interface ISumdan extends Sumdan {
  ProdukPembiayaan: IProduk[];
}

export default function Page() {
  const [loading, setLoading] = useState(false);
  const [pageProps, setPageProps] = useState<IPageProps<IArea>>({
    page: 1,
    limit: 1000,
    total: 0,
    data: [],
    search: "",
    backdate: "",
  });
  const [sumdan, setSumdan] = useState<ISumdan[]>([]);

  const getData = async () => {
    setLoading(true);
    const params = new URLSearchParams();
    params.append("ao", "ao");
    params.append("include", "true");
    params.append("limit", String(pageProps.limit));
    if (pageProps.backdate) params.append("backdate", pageProps.backdate);

    const res = await fetch(`/api/area?${params.toString()}`);
    const json = await res.json();
    setPageProps((prev) => ({
      ...prev,
      data: json.data,
      total: json.total,
    }));
    await fetch(`/api/sumdan?${params.toString()}`)
      .then((res) => res.json())
      .then((res) => setSumdan(res.data));
    setLoading(false);
  };

  useEffect(() => {
    const timeout = setTimeout(async () => {
      await getData();
    }, 200);
    return () => clearTimeout(timeout);
  }, [pageProps.backdate]);

  const columns: TableProps<ISumdan>["columns"] = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Nama Mitra",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
      render(value, record, index) {
        return (
          <div>
            <p>
              {record.name}{" "}
              <span className="text-xs italic text-blue-500">
                {record.code}
              </span>
            </p>
          </div>
        );
      },
    },
    {
      title: "Pencapaian",
      dataIndex: "limit",
      key: "limit",
      sorter: (a, b) =>
        a.ProdukPembiayaan.flatMap((aa) => aa.Dapem).reduce(
          (acc, curr) => acc + curr.plafond,
          0,
        ) -
        b.ProdukPembiayaan.flatMap((ab) => ab.Dapem).reduce(
          (acc, curr) => acc + curr.plafond,
          0,
        ),
      render(value, record, index) {
        const total = record.ProdukPembiayaan.flatMap((d) => d.Dapem).reduce(
          (acc, curr) => acc + curr.plafond,
          0,
        );
        const all = sumdan
          .flatMap((s) => s.ProdukPembiayaan)
          .flatMap((s) => s.Dapem)
          .reduce((acc, curr) => acc + curr.plafond, 0);
        return (
          <div>
            {IDRFormat(total)} (
            {record.ProdukPembiayaan.flatMap((r) => r.Dapem).length} NOA)
            <span className="italic opacity-70">
              ({((total / all) * 100).toFixed(2)}%)
            </span>
          </div>
        );
      },
    },
  ];

  return (
    <Spin spinning={loading}>
      <div className="p-2 bg-white">
        <div className="flex gap-4 font-bold text-2xl m-2 items-end">
          <p>Data Pencapaian By Area</p>
          <RangePicker
            size="small"
            onChange={(date, dateStr) =>
              setPageProps({ ...pageProps, backdate: dateStr })
            }
            style={{ width: 200 }}
          />
        </div>
        <div className="flex flex-col mt-5 gap-4 overflow-auto">
          {pageProps.data &&
            pageProps.data.map((a) => (
              <div key={a.id} className="flex border items-center">
                <div className="border-r h-full font-bold text-2xl p-2 w-60 ">
                  {(() => {
                    const noa = a.Cabang.flatMap((ac) =>
                      ac.User.flatMap((acu) => acu.AODapem),
                    );
                    const pencapaian = noa.reduce(
                      (acc, curr) => acc + curr.plafond,
                      0,
                    );
                    const target = a.Cabang.flatMap((ac) => ac.User).reduce(
                      (acc, curr) => acc + curr.target,
                      0,
                    );
                    return (
                      <div className="italic flex flex-col gap-1 items-center justify-center text-center">
                        <p>{a.name}</p>
                        <p className="text-sm opacity-70">
                          {IDRFormat(pencapaian)}/{IDRFormat(target)}
                        </p>
                        <p className="text-sm opacity-70">
                          ({noa.length} NOA) (
                          {((pencapaian / target) * 100).toFixed(2)}%)
                        </p>
                      </div>
                    );
                  })()}
                </div>
                <div className="flex flex-col flex-1 gap-4">
                  {a.Cabang.map((c) => (
                    <div className={`flex items-center border`} key={c.id}>
                      <div className="border-r h-full font-semibold text-lg p-2 w-48 text-center">
                        <p>{c.name}</p>
                      </div>
                      <div className="flex-1 flex flex-col">
                        {c.User.map((u) => (
                          <div
                            className="flex justify-between gap-2 border-b border-gray-400"
                            key={u.id}
                          >
                            <div className="border-r px-1 w-54">
                              {u.fullname} ({u.position})
                            </div>
                            <div className="border-r px-1 flex-1 text-right">
                              {IDRFormat(
                                u.AODapem.reduce(
                                  (acc, curr) => acc + curr.plafond,
                                  0,
                                ),
                              )}{" "}
                              ({u.AODapem.length})
                            </div>
                            <div className="border-r px-1 flex-1 text-right">
                              {IDRFormat(u.target)}
                            </div>
                            <div
                              className={`border-r px-1 w-26 text-right ${
                                (u.AODapem.reduce(
                                  (acc, curr) => acc + curr.plafond,
                                  0,
                                ) /
                                  u.target) *
                                  100 >=
                                100
                                  ? "text-green-500"
                                  : "text-red-500"
                              }`}
                            >
                              {(
                                (u.AODapem.reduce(
                                  (acc, curr) => acc + curr.plafond,
                                  0,
                                ) /
                                  u.target) *
                                100
                              ).toFixed(2)}
                              %
                            </div>
                          </div>
                        ))}
                        <div className="flex justify-between gap-2 font-bold text-right">
                          <div className="border-r px-1 w-54">TOTAL</div>
                          <div className="border-r px-1 flex-1">
                            {IDRFormat(
                              c.User.flatMap((cdp) => cdp.AODapem).reduce(
                                (acc, curr) => acc + curr.plafond,
                                0,
                              ),
                            )}{" "}
                            ({c.User.flatMap((cdp) => cdp.AODapem).length})
                          </div>
                          <div className="border-r px-1 flex-1">
                            {IDRFormat(
                              c.User.reduce(
                                (acc, curr) => acc + curr.target,
                                0,
                              ),
                            )}
                          </div>

                          <div className="border-r px-1 w-26">
                            {(
                              (c.User.flatMap((cdp) => cdp.AODapem).reduce(
                                (acc, curr) => acc + curr.plafond,
                                0,
                              ) /
                                c.User.reduce(
                                  (acc, curr) => acc + curr.target,
                                  0,
                                )) *
                              100
                            ).toFixed(2)}
                            %
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
        </div>
      </div>
      <div className="p-2 bg-white ">
        <Table
          columns={columns}
          dataSource={sumdan}
          size="small"
          loading={loading}
          rowKey={"id"}
          bordered
          scroll={{ x: "max-content" }}
          pagination={false}
        />
      </div>
    </Spin>
  );
}

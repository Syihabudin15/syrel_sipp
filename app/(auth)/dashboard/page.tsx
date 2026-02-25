"use client";

import { useUser } from "@/components/UserContext";
import {
  BarChart,
  PencapaianChart,
  StatusDapemChart,
} from "@/components/utils/ChartUtils";
import {
  GetAngsuran,
  GetBiaya,
  IDRFormat,
} from "@/components/utils/PembiayaanUtil";
import { ICashDesc, IDapem } from "@/libs/IInterfaces";
import {
  DollarOutlined,
  FolderOpenOutlined,
  KeyOutlined,
  MoneyCollectOutlined,
  PayCircleOutlined,
  SwapOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import {
  Angsuran,
  Dapem,
  Debitur,
  Dropping,
  JenisPembiayaan,
  Sumdan,
} from "@prisma/client";
import { Col, Divider, Row, Spin } from "antd";
import React, { useEffect, useState } from "react";

interface IDapemDashboard extends Dapem {
  Dropping: Dropping;
  Debitur: Debitur;
  Angsuran: Angsuran[];
}
interface IJenisDapem extends JenisPembiayaan {
  Dapem: Dapem[];
}
interface iSumdanDapem extends Sumdan {
  Dapem: Dapem[];
}

interface IDashboard {
  alldata: Dapem[];
  droppingall: IDapemDashboard[];
  droppingmonthly: IDapemDashboard[];
  prevmonth: { month: string; data: IDapemDashboard[] }[];
  byjepem: IJenisDapem[];
  bysumdan: iSumdanDapem[];
}

export default function Page() {
  const [data, setData] = useState<IDashboard>({
    alldata: [],
    droppingall: [],
    droppingmonthly: [],
    prevmonth: [],
    byjepem: [],
    bysumdan: [],
  });
  const user = useUser();

  useEffect(() => {
    (async () => {
      await fetch("/api")
        .then((res) => res.json())
        .then((res) => setData(res));
    })();
  }, []);

  return (
    <Spin spinning={false}>
      <div className="p-2">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          <StaticticItem
            name="Data Pencairan"
            all={`Rp. ${IDRFormat(
              data.droppingall.reduce((acc, curr) => acc + curr.plafond, 0),
            )}`}
            month={`+ Rp. ${IDRFormat(
              data.droppingmonthly.reduce((acc, curr) => acc + curr.plafond, 0),
            )}`}
          />
          <StaticticItem
            name="Number Of Account"
            all={data.droppingall.length.toString() + " NOA"}
            month={"+ " + data.droppingmonthly.length.toString() + " NOA"}
            color="text-blue-500"
            icon={<TeamOutlined />}
          />
          <StaticticItemCustom
            name="Data Instansi"
            all={
              <div className="flex flex-col text-sm">
                <div className="flex gap-2">
                  <span className="w-30">Taspen</span>
                  <span className="w-4">:</span>
                  <span>
                    {
                      data.droppingall.filter(
                        (f) => f.Debitur.group_skep === "TASPEN",
                      ).length
                    }{" "}
                    NOA
                  </span>
                </div>
                <div className="flex gap-2">
                  <span className="w-30">Asabri</span>
                  <span className="w-4">:</span>
                  <span>
                    {
                      data.droppingall.filter(
                        (f) => f.Debitur.group_skep === "ASABRI",
                      ).length
                    }{" "}
                    NOA
                  </span>
                </div>
                <div className="flex gap-2">
                  <span className="w-30">Lainnya</span>
                  <span className="w-4">:</span>
                  <span>
                    {
                      data.droppingall.filter(
                        (f) =>
                          f.Debitur.group_skep &&
                          !["TASPEN", "ASABRI"].includes(f.Debitur.group_skep),
                      ).length
                    }{" "}
                    NOA
                  </span>
                </div>
              </div>
            }
            color="text-gray-900"
          />
          <StaticticItem
            name="Outstanding"
            all={`Rp. ${IDRFormat(
              data.droppingall
                .filter((f) => f.dropping_status === "APPROVED")
                .reduce(
                  (acc, curr) =>
                    acc +
                    curr.Angsuran.reduce(
                      (acca, curra) => acca + curra.principal,
                      0,
                    ),
                  0,
                ),
            )}`}
            month={`Lunas : ${data.droppingall.filter((d) => d.dropping_status === "PAID_OFF").length} NOA`}
            color="text-blue-500"
            icon={<MoneyCollectOutlined />}
          />
          <StaticticItem
            name="Pending Takeover"
            all={`Rp. ${IDRFormat(
              data.droppingall
                .filter((f) => f.takeover_status !== "APPROVED")
                .reduce((acc, curr) => acc + curr.c_takeover, 0),
            )}`}
            month={`${data.droppingall.filter((d) => d.takeover_status !== "APPROVED").length} NOA`}
            color="text-red-500"
            icon={<PayCircleOutlined />}
          />
          <StaticticItem
            name="Pending Mutasi & Flagging"
            all={`Rp. ${IDRFormat(
              data.droppingall
                .filter((f) => f.mutasi_status !== "APPROVED")
                .reduce((acc, curr) => acc + curr.c_mutasi, 0),
            )}`}
            month={`Mutasi ${data.droppingall.filter((d) => d.mutasi_status !== "APPROVED").length} | Flagging ${data.droppingall.filter((d) => d.flagging_status !== "APPROVED").length}`}
            color="text-red-500"
            icon={<SwapOutlined />}
          />
          <StaticticItem
            name="Pending TB"
            all={`Rp. ${IDRFormat(
              (() => {
                const dataTb = data.droppingall.filter(
                  (d) => d.cash_status !== "APPROVED",
                );
                const totalTB = dataTb.reduce((acc, curr) => {
                  const angs = GetAngsuran(
                    curr.plafond,
                    curr.tenor,
                    curr.c_margin + curr.c_margin_sumdan,
                    curr.margin_type,
                    curr.rounded,
                  ).angsuran;
                  const biaya =
                    GetBiaya(curr as IDapem) +
                    curr.c_takeover +
                    curr.c_blokir * angs;
                  const tbDiberikan = curr.cash_desc
                    ? (JSON.parse(curr.cash_desc) as ICashDesc[])
                    : [];
                  const tb = curr.plafond - biaya;

                  return (
                    acc +
                    (tb -
                      tbDiberikan.reduce(
                        (accu, curru) => accu + curru.amount,
                        0,
                      ))
                  );
                }, 0);
                return totalTB;
              })(),
            )}`}
            month={`${data.droppingall.filter((d) => d.cash_status !== "APPROVED").length} NOA`}
            color="text-red-500"
            icon={<KeyOutlined />}
          />
          <StaticticItem
            name="Pending Berkas & Jaminan"
            all={`Jaminan ${data.droppingall.filter((d) => d.guarantee_status !== "MITRA").length} NOA`}
            month={`Berkas ${data.droppingall.filter((d) => d.document_status !== "MITRA").length} NOA`}
            color="text-red-500"
            icon={<FolderOpenOutlined />}
          />
        </div>
        <Row gutter={[12, 12]}>
          <Col xs={24} sm={12}>
            <div className="bg-white p-3 rounded shadow">
              <p className="font-bold text-lg">Grafik Pembiayaan Perbulan</p>
              <div className="h-64 rounded-lg flex items-center justify-center mt-2">
                <PencapaianChart data={data.prevmonth} />
              </div>
            </div>
          </Col>
          <Col xs={24} sm={12}>
            <div className="bg-white p-3 rounded shadow">
              <p className="font-bold text-lg">Status Pembiayaan</p>
              <div className="h-64 rounded-lg flex items-center justify-center mt-2">
                <StatusDapemChart
                  data={[
                    {
                      name: "APPROVED",
                      value: data.alldata
                        .filter((d) => d.dropping_status === "APPROVED")
                        .reduce((acc, curr) => acc + curr.plafond, 0),
                    },
                    {
                      name: "PAID OFF",
                      value: data.alldata
                        .filter((d) => d.dropping_status === "PAID_OFF")
                        .reduce((acc, curr) => acc + curr.plafond, 0),
                    },
                    {
                      name: "PENDING",
                      value: data.alldata
                        .filter((d) => d.dropping_status === "PENDING")
                        .reduce((acc, curr) => acc + curr.plafond, 0),
                    },
                    {
                      name: "PROCCESS",
                      value: data.alldata
                        .filter((d) => d.dropping_status === "PROCCESS")
                        .reduce((acc, curr) => acc + curr.plafond, 0),
                    },
                    {
                      name: "REJECTED",
                      value: data.alldata
                        .filter((d) => d.dropping_status === "REJECTED")
                        .reduce((acc, curr) => acc + curr.plafond, 0),
                    },
                    {
                      name: "CANCELED",
                      value: data.alldata
                        .filter((d) => d.dropping_status === "CANCEL")
                        .reduce((acc, curr) => acc + curr.plafond, 0),
                    },
                  ]}
                />
              </div>
            </div>
          </Col>
          {user && !user.sumdanId && (
            <Col xs={24} sm={12}>
              <div className="bg-white p-3 rounded shadow">
                <p className="font-bold text-lg">Grafik Pembiayaan By Sumdan</p>
                <div className="h-64 rounded-lg flex items-center justify-center mt-2">
                  <BarChart
                    data={data.bysumdan.map((j) => ({
                      name: j.code,
                      value: j.Dapem.reduce(
                        (acc, curr) => acc + curr.plafond,
                        0,
                      ),
                    }))}
                  />
                </div>
              </div>
            </Col>
          )}
          <Col xs={24} sm={12}>
            <div className="bg-white p-3 rounded shadow">
              <p className="font-bold text-lg">Grafik By Jenis Pembiayaan</p>
              <div className="h-64 rounded-lg flex items-center justify-center mt-2">
                <StatusDapemChart
                  data={data.byjepem.map((j) => ({
                    name: j.name,
                    value: j.Dapem.reduce((acc, curr) => acc + curr.plafond, 0),
                  }))}
                />
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </Spin>
  );
}

const StaticticItem = ({
  name,
  all,
  month,
  color,
  icon,
}: {
  name: string;
  all: string;
  month?: string;
  color?: string;
  icon?: React.ReactNode;
}) => {
  return (
    <div className="bg-white rounded-lg p-3 card-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600 mb-1 font-bold">
            {icon ? icon : <DollarOutlined />} {name}
          </p>
          <p
            className={`text-xl font-bold ${color ? color : "text-green-500"}`}
          >
            {all}
          </p>
          <Divider style={{ margin: 8, padding: 0 }} />
          <p className="text-sm font-bold text-green-500">{month}</p>
        </div>
      </div>
    </div>
  );
};
const StaticticItemCustom = ({
  name,
  all,
  month,
  color,
}: {
  name: string;
  all: string | React.ReactNode;
  month?: string | React.ReactNode;
  color?: string;
}) => {
  return (
    <div className="bg-white rounded-lg p-3 card-shadow">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm text-gray-600 mb-1 font-bold">{name}</div>
          <div
            className={`text-xl font-bold ${color ? color : "text-green-500"}`}
          >
            {all}
          </div>
          <Divider style={{ margin: 8, padding: 0 }} />
          <p className="text-sm font-bold text-green-500">{month}</p>
        </div>
      </div>
    </div>
  );
};

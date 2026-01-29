"use client";

import { IDapem, IDesc } from "@/libs/IInterfaces";
import { EDapemStatus, ESubmissionStatus } from "@prisma/client";
import { Divider, Modal, Tag } from "antd";
import { HookAPI } from "antd/es/modal/useModal";
import { useState } from "react";
import { FormInput } from "./FormUtils";
import { GetAngsuran, IDRFormat } from "./PembiayaanUtil";

export const GetStatusTag = (status: ESubmissionStatus | undefined | null) => {
  if (status) {
    return (
      <Tag
        color={
          status === "APPROVED"
            ? "green"
            : status === "PENDING"
              ? "orange"
              : "red"
        }
        variant="solid"
      >
        {status}
      </Tag>
    );
  }
  return <div></div>;
};

export const GetDroppingStatusTag = (
  status: EDapemStatus | undefined | null,
) => {
  if (status) {
    return (
      <Tag
        color={
          status === "APPROVED" || status === "PAID_OFF"
            ? "green"
            : status === "DRAFT"
              ? "black"
              : status === "PENDING"
                ? "orange"
                : status === "PROCCESS"
                  ? "blue"
                  : "red"
        }
        variant="solid"
      >
        {status}
      </Tag>
    );
  }
  return <div></div>;
};

export const ProsesPembiayaan = ({
  data,
  open,
  setOpen,
  getData,
  hook,
  name,
  nextname,
  nextnameValue,
  user,
}: {
  data: IDapem;
  open: boolean;
  setOpen: Function;
  getData: Function;
  hook: HookAPI;
  name: string;
  nextname: string;
  nextnameValue?: string;
  user: string;
}) => {
  const [loading, setLoading] = useState(false);
  const [temp, setTemp] = useState<IDapem>(data);
  const [desc, setDesc] = useState<IDesc>(
    data[(name + "_desc") as keyof IDapem]
      ? (JSON.parse(data[(name + "_desc") as keyof IDapem] as string) as IDesc)
      : defaultDesc,
  );

  const handleSubmit = async () => {
    setLoading(true);
    desc.name = user;
    desc.date = new Date();
    await fetch("/api/dapem?id=" + data.id, {
      method: "PUT",
      body: JSON.stringify({
        ...temp,
        [name + "_desc"]: JSON.stringify(desc),
      }),
    })
      .then((res) => res.json())
      .then(async (res) => {
        if (res.status === 200) {
          setOpen(false);
          hook.success({
            title: "BERHASIL",
            content: "Data pembiayaan berhasil di proses!",
          });
          await getData();
        } else {
          hook.error({ title: "ERROR!!", content: res.msg });
        }
      });
    setLoading(false);
  };

  return (
    <Modal
      onOk={() => handleSubmit()}
      open={open}
      onCancel={() => setOpen(false)}
      loading={loading}
      title={"Proses Pembiayaan " + data.id}
      style={{ top: 20 }}
      okText="Submit"
    >
      <div className="flex my-4 flex-col gap-2">
        <FormInput
          data={{
            label: "Nama Pemohon",
            type: "text",
            value: data.Debitur.fullname,
            disabled: true,
          }}
        />
        <FormInput
          data={{
            label: "Nomor Pensiun",
            type: "text",
            value: data.Debitur.nopen,
            disabled: true,
          }}
        />
        <FormInput
          data={{
            label: "Jenis Pembiayaan",
            type: "text",
            value: data.JenisPembiayaan.name,
            disabled: true,
          }}
        />
        <FormInput
          data={{
            label: "Produk Pembiayaan",
            type: "text",
            value: `${data.ProdukPembiayaan.id} ${data.ProdukPembiayaan.name}`,
            disabled: true,
          }}
        />
        <FormInput
          data={{
            label: "Pembiayaan",
            type: "text",
            value: `${IDRFormat(data.plafond)} | ${data.tenor} Bulan`,
            disabled: true,
          }}
        />
        <FormInput
          data={{
            label: "Angsuran",
            type: "text",
            value: IDRFormat(
              GetAngsuran(
                data.plafond,
                data.tenor,
                data.c_margin + data.c_margin_sumdan,
                data.margin_type,
                data.rounded,
              ).angsuran,
            ),
            disabled: true,
          }}
        />
        <Divider style={{ fontSize: 12 }}>Proses Pembiayaan</Divider>
        <FormInput
          data={{
            label: "Status Pembiayaan",
            required: true,
            type: "select",
            options: [
              { label: "PENDING", value: "PENDING" },
              { label: "APPROVED", value: "APPROVED" },
              { label: "REJECTED", value: "REJECTED" },
            ],
            value: temp[(name + "_status") as keyof IDapem],
            onChange: (e: string) =>
              setTemp({
                ...temp,
                [(name + "_status") as keyof IDapem]: e,
                ...(e === "APPROVED" && {
                  [nextname]: nextnameValue || "PENDING",
                }),
                ...(e === "REJECTED" && {
                  dropping_status: "REJECTED",
                }),
              }),
          }}
        />
        <FormInput
          data={{
            label: "Keterangan",
            type: "textarea",
            required: true,
            value: desc.desc,
            onChange: (e: string) => setDesc({ ...desc, desc: e }),
          }}
        />
      </div>
    </Modal>
  );
};

const defaultDesc: IDesc = {
  name: "",
  date: new Date(),
  desc: "",
};

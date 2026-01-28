"use client";

import { Divider, Modal, Tabs } from "antd";
import Link from "next/link";
import { IDapem, IViewFiles } from "@/libs/IInterfaces";
import { FormInput } from "..";
import moment from "moment";

export const NotifItem = ({
  name,
  count,
  link,
}: {
  name: string;
  count: number;
  link: string;
}) => {
  return (
    <Link href={link}>
      <div className="border px-2 py-1 text-xs rounded flex justify-between gap-2 hover:bg-gray-200">
        <span className="text-gray-700">{name}</span>
        <span className="text-red-500">{count}</span>
      </div>
    </Link>
  );
};

export const ViewFiles = ({
  data,
  setOpen,
}: {
  data: IViewFiles;
  setOpen: Function;
}) => {
  const items = data.data.map((d, i) => ({
    key: d.url + i,
    label: d.name,
    children: (
      <div style={{ width: "100%", height: "76vh" }}>
        {d.url ? (
          <iframe
            width={"100%"}
            height={"100%"}
            src={
              d.name.toLocaleLowerCase().includes("video")
                ? d.url
                : `/api/upload?url=${encodeURIComponent(d.url)}`
            }
          />
        ) : (
          <div className="flex justify-center items-center h-full">
            <span className="text-gray-500 italic">
              Tidak ada berkas untuk ditampilkan.
            </span>
          </div>
        )}
      </div>
    ),
  }));
  return (
    <Modal
      open={data.open}
      onCancel={() => setOpen(false)}
      style={{ top: 10 }}
      width={1200}
      footer={[]}
    >
      <Tabs items={items} />
    </Modal>
  );
};

export const TabsFiles = ({ data }: { data: IViewFiles }) => {
  const items = data.data.map((d, i) => ({
    key: d.url + i,
    label: d.name,
    children: (
      <div style={{ width: "100%", height: "76vh" }}>
        {d.url ? (
          <iframe
            width={"100%"}
            height={"100%"}
            src={
              d.name.toLocaleLowerCase().includes("video")
                ? d.url
                : `/api/upload?url=${encodeURIComponent(d.url)}`
            }
          />
        ) : (
          <div className="flex justify-center items-center h-full">
            <span className="text-gray-500 italic">
              Tidak ada berkas untuk ditampilkan.
            </span>
          </div>
        )}
      </div>
    ),
  }));
  return <Tabs items={items} />;
};

export const DetailDapem = ({
  open,
  setOpen,
  data,
}: {
  open: boolean;
  setOpen: Function;
  data: IDapem;
}) => {
  return (
    <Modal
      open={open}
      onCancel={() => setOpen(false)}
      title={"Detail Data Pembiayaan " + data.id}
      footer={[]}
      width={1300}
      style={{ top: 10 }}
    >
      <div className="flex gap-4 h-[80vh]">
        <div className="w-[42%] h-full overflow-auto">
          <div className="p-2 rounded bg-gray-800 text-gray-50 font-bold my-2">
            Data Debitur
          </div>
          <div className="flex gap-2 flex-wrap">
            <FormInput
              data={{
                mode: "vertical",
                type: "text",
                class: "flex-1",
                label: "Nama Pemohon",
                disabled: true,
                value: data.Debitur.fullname,
              }}
            />
            <FormInput
              data={{
                label: "Nomor NIK",
                mode: "vertical",
                type: "text",
                class: "flex-1",
                disabled: true,
                value: data.Debitur.nik,
              }}
            />
            <FormInput
              data={{
                label: "Tempat, Tgl Lahir",
                mode: "vertical",
                type: "text",
                class: "flex-1",
                disabled: true,
                value: `${data.Debitur.birthplace}, ${moment(data.Debitur.birthdate).format("DD-MM-YYYY")}`,
              }}
            />
            <FormInput
              data={{
                label: "Jenis Kelamin",
                mode: "vertical",
                type: "text",
                class: "flex-1",
                disabled: true,
                value: data.Debitur.gender,
              }}
            />
            <FormInput
              data={{
                label: "Agama",
                mode: "vertical",
                type: "text",
                class: "flex-1",
                disabled: true,
                value: data.Debitur.religion,
              }}
            />
            <FormInput
              data={{
                label: "Pendidikan Terakhir",
                mode: "vertical",
                type: "text",
                class: "flex-1",
                disabled: true,
                value: data.Debitur.education,
              }}
            />
            <FormInput
              data={{
                label: "Nomor Telepon",
                mode: "vertical",
                type: "text",
                class: "flex-1",
                disabled: true,
                value: data.Debitur.phone,
              }}
            />
            <FormInput
              data={{
                label: "Nomor NPWP",
                mode: "vertical",
                type: "text",
                class: "flex-1",
                disabled: true,
                value: data.Debitur.npwp,
              }}
            />
            <FormInput
              data={{
                label: "Ibu Kandung",
                mode: "vertical",
                type: "text",
                class: "flex-1",
                disabled: true,
                value: data.Debitur.mother_name,
              }}
            />
            <Divider>Alamat Lengkap</Divider>
            <FormInput
              data={{
                label: "Alamat",
                mode: "vertical",
                type: "textarea",
                class: "flex-1",
                disabled: true,
                value: data.Debitur.address,
              }}
            />
            <FormInput
              data={{
                label: "Kelurahan",
                mode: "vertical",
                type: "text",
                class: "flex-1",
                disabled: true,
                value: data.Debitur.ward,
              }}
            />
            <FormInput
              data={{
                label: "Kecamatan",
                mode: "vertical",
                type: "text",
                class: "flex-1",
                disabled: true,
                value: data.Debitur.district,
              }}
            />
            <FormInput
              data={{
                label: "Kota/Kab.",
                mode: "vertical",
                type: "text",
                class: "flex-1",
                disabled: true,
                value: data.Debitur.city,
              }}
            />
            <FormInput
              data={{
                label: "Provinsi",
                mode: "vertical",
                type: "text",
                class: "flex-1",
                disabled: true,
                value: data.Debitur.province,
              }}
            />
            <FormInput
              data={{
                label: "Kode Pos",
                mode: "vertical",
                type: "text",
                class: "flex-1",
                disabled: true,
                value: data.Debitur.pos_code,
              }}
            />
            <div className="w-full flex justify-between italic font-bold">
              <span>Status Alamat Domisili</span> <span>:</span>{" "}
              <span>
                {data.dom_status ? "Sama Dengan KTP" : "Berbeda Dengan KTP"}
              </span>
            </div>
            {!data.dom_status && (
              <Divider style={{ fontSize: 12 }} titlePlacement="left">
                Alamat Domisili
              </Divider>
            )}
            {!data.dom_status && (
              <FormInput
                data={{
                  label: "Alamat",
                  mode: "vertical",
                  type: "textarea",
                  class: "flex-1",
                  disabled: true,
                  value: data.address,
                }}
              />
            )}
            {!data.dom_status && (
              <FormInput
                data={{
                  label: "Kelurahan",
                  mode: "vertical",
                  type: "text",
                  class: "flex-1",
                  disabled: true,
                  value: data.ward,
                }}
              />
            )}
            {!data.dom_status && (
              <FormInput
                data={{
                  label: "Kecamatan",
                  mode: "vertical",
                  type: "text",
                  class: "flex-1",
                  disabled: true,
                  value: data.district,
                }}
              />
            )}
            {!data.dom_status && (
              <FormInput
                data={{
                  label: "Kota/Kab.",
                  mode: "vertical",
                  type: "text",
                  class: "flex-1",
                  disabled: true,
                  value: data.city,
                }}
              />
            )}
            {!data.dom_status && (
              <FormInput
                data={{
                  label: "Provinsi",
                  mode: "vertical",
                  type: "text",
                  class: "flex-1",
                  disabled: true,
                  value: data.province,
                }}
              />
            )}
            {!data.dom_status && (
              <FormInput
                data={{
                  label: "Kode Pos",
                  mode: "vertical",
                  type: "text",
                  class: "flex-1",
                  disabled: true,
                  value: data.pos_code,
                }}
              />
            )}
          </div>
          <div className="p-2 rounded bg-gray-800 text-gray-50 font-bold my-2">
            Data Rumah & Pekerjaan
          </div>
          <div className="flex gap-2 flex-wrap">
            <FormInput
              data={{
                label: "Status Rumah",
                mode: "vertical",
                type: "text",
                class: "flex-1",
                disabled: true,
                value: data.house_status,
              }}
            />
            <FormInput
              data={{
                label: "Tahun Menempati",
                mode: "vertical",
                type: "text",
                class: "flex-1",
                disabled: true,
                value: data.house_year,
              }}
            />
            <FormInput
              data={{
                label: "Lama Menempati",
                mode: "vertical",
                type: "text",
                class: "flex-1",
                disabled: true,
                value:
                  new Date().getFullYear() -
                  new Date(
                    data.house_year ? `${data.house_year}-11-11` : new Date(),
                  ).getFullYear(),
              }}
            />
            <FormInput
              data={{
                label: "Pekerjaan",
                mode: "vertical",
                type: "text",
                class: "flex-1",
                disabled: true,
                value: data.job,
              }}
            />
            <FormInput
              data={{
                label: "Alamat Pekerjaan",
                mode: "vertical",
                type: "textarea",
                class: "flex-1",
                disabled: true,
                value: data.job_address,
              }}
            />
            <FormInput
              data={{
                label: "Jenis Usaha",
                mode: "vertical",
                type: "text",
                class: "flex-1",
                disabled: true,
                value: data.business,
              }}
            />
          </div>

          <div className="p-2 rounded bg-gray-800 text-gray-50 font-bold my-2">
            Data Keluarga
          </div>
          <div className="flex gap-2 flex-wrap">
            <FormInput
              data={{
                label: "Status Perkawinan",
                mode: "vertical",
                type: "text",
                class: "flex-1",
                disabled: true,
                value: data.marriage_status,
              }}
            />
            <Divider style={{ fontSize: 12 }}>Ahli Waris</Divider>
            <FormInput
              data={{
                label: "Nama Lengkap",
                mode: "vertical",
                type: "text",
                class: "flex-1",
                disabled: true,
                value: data.aw_name,
              }}
            />
            <Divider style={{ fontSize: 12 }}>Keluarga Tidak Serumah</Divider>
            <FormInput
              data={{
                label: "Nama Lengkap",
                mode: "vertical",
                type: "text",
                class: "flex-1",
                disabled: true,
                value: data.f_name,
              }}
            />
          </div>

          <div className="p-2 rounded bg-gray-800 text-gray-50 font-bold my-2">
            Data Pensiun
          </div>
          <div className="flex gap-2 flex-wrap"></div>
          <div className="p-2 rounded bg-gray-800 text-gray-50 font-bold my-2">
            Data Pembiayaan
          </div>
          <div className="flex gap-2 flex-wrap"></div>
          <div className="p-2 rounded bg-gray-800 text-gray-50 font-bold my-2">
            Data Unit Pelayanan
          </div>
          <div className="flex gap-2 flex-wrap"></div>
        </div>
        <div className="flex-1">
          <TabsFiles
            data={{
              open: true,
              data: [
                { name: "SLIK", url: data.file_slik || "" },
                { name: "PENGAJUAN", url: data.file_submission || "" },
                { name: "WAWANCARA", url: data.video_interview || "" },
                { name: "ASURANSI", url: data.video_insurance || "" },
                { name: "AKAD", url: data.file_contract || "" },
              ],
            }}
          />
        </div>
      </div>
    </Modal>
  );
};

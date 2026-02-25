"use client";

import { FormInput } from "@/components";
import { useUser } from "@/components/UserContext";
import { FilterData } from "@/components/utils/CompUtils";
import {
  GetAngsuran,
  IDRFormat,
  IDRToNumber,
} from "@/components/utils/PembiayaanUtil";
import {
  IActionTable,
  IDapem,
  IPageProps,
  IPelunasan,
} from "@/libs/IInterfaces";
import { useAccess } from "@/libs/Permission";
import {
  CalendarOutlined,
  CheckCircleOutlined,
  CloudUploadOutlined,
  DollarCircleOutlined,
  EditOutlined,
  FormOutlined,
  HistoryOutlined,
  MoneyCollectOutlined,
  PayCircleOutlined,
} from "@ant-design/icons";
import { Angsuran, ESettleStatus, Sumdan } from "@prisma/client";
import {
  App,
  Button,
  Card,
  DatePicker,
  Divider,
  Input,
  Modal,
  Progress,
  Select,
  Table,
  TableProps,
  Tag,
  Tooltip,
  Upload,
  UploadProps,
} from "antd";
import { HookAPI } from "antd/es/modal/useModal";
import moment from "moment";
import { useEffect, useState } from "react";

export default function Page() {
  const [pageProps, setPageProps] = useState<IPageProps<IDapem>>({
    page: 1,
    limit: 50,
    total: 0,
    data: [],
    search: "",
    sumdanId: "",
    paid_status: "",
    backdate: "",
  });
  const [action, setAction] = useState<IActionTable<IDapem>>({
    upsert: false,
    delete: false,
    proses: false,
    selected: undefined,
  });
  const [cek, setCek] = useState({
    open: false,
    msg: [],
  });
  const [loading, setLoading] = useState(false);
  const [sumdans, setSumdans] = useState<Sumdan[]>([]);
  const { modal } = App.useApp();
  const { hasAccess } = useAccess("/tagihan");
  const user = useUser();

  useEffect(() => {
    (async () => {
      await fetch("/api/sumdan?limit=1000")
        .then((res) => res.json())
        .then((res) => setSumdans(res.data));
    })();
  }, []);

  const getData = async () => {
    setLoading(true);
    const params = new URLSearchParams();
    params.append("page", pageProps.page.toString());
    params.append("limit", pageProps.limit.toString());
    if (pageProps.search) params.append("search", pageProps.search);

    if (pageProps.sumdanId) params.append("sumdanId", pageProps.sumdanId);
    if (pageProps.paid_status)
      params.append("paid_status", pageProps.paid_status);
    if (pageProps.backdate) params.append("backdate", pageProps.backdate);

    const res = await fetch(`/api/tagihan?${params.toString()}`);
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
  }, [
    pageProps.page,
    pageProps.limit,
    pageProps.search,
    pageProps.sumdanId,
    pageProps.paid_status,
    pageProps.backdate,
  ]);

  const columns: TableProps<IDapem>["columns"] = [
    {
      title: "No",
      dataIndex: "no",
      key: "no",
      className: "text-center",
      render(value, record, index) {
        return (
          <div>
            <div>{(pageProps.page - 1) * pageProps.limit + index + 1}</div>
            <div className="text-xs italic opacity-70">{record.id}</div>
          </div>
        );
      },
    },
    {
      title: "Pemohon",
      dataIndex: "pemohon",
      key: "pemohon",
      render(value, record, index) {
        return (
          <div>
            <div>{record.Debitur.fullname}</div>
            <div className="text-xs opacity-70">@{record.Debitur.nopen}</div>
          </div>
        );
      },
    },
    {
      title: "Pembiayaan",
      dataIndex: "pembiayaan",
      key: "pembiayaan",
      render(value, record, index) {
        return (
          <div>
            <div>
              <DollarCircleOutlined />{" "}
              <Tag color={"blue"}>{IDRFormat(record.plafond)}</Tag>
            </div>
            <div>
              <HistoryOutlined /> <Tag color={"blue"}>{record.tenor} Bulan</Tag>
            </div>
          </div>
        );
      },
    },
    {
      title: "Akad",
      dataIndex: "pemohon",
      key: "pemohon",
      render(value, record, index) {
        return (
          <div>
            <div>{record.no_contract}</div>
            <div className="text-xs opacity-70">
              {moment(record.date_contract).format("DD/MM/YYY")}
            </div>
          </div>
        );
      },
    },
    {
      title: "Angsuran",
      dataIndex: "angsuran",
      key: "angsuran",
      render(value, record, index) {
        const angs = GetAngsuran(
          record.plafond,
          record.tenor,
          record.c_margin + record.c_margin_sumdan,
          record.margin_type,
          record.rounded,
        ).angsuran;
        const angssumdan = GetAngsuran(
          record.plafond,
          record.tenor,
          record.c_margin_sumdan,
          record.margin_type,
          record.rounded,
        ).angsuran;
        const find = record.Angsuran.find((f) =>
          moment(f.date_pay).isSame(pageProps.backdate || new Date(), "month"),
        );
        return (
          <div className="flex flex-col gap-1">
            <div>
              <Tag color={"blue"}>{IDRFormat(angs)}</Tag>
              <Tag color={"blue"}>{IDRFormat(angssumdan)}</Tag>
            </div>
            <Tag color={"blue"} style={{ marginLeft: 2 }}>
              Ke {find ? find.counter : 0} |{" "}
              {IDRFormat(find ? find.remaining : 0)}
            </Tag>
          </div>
        );
      },
    },
    {
      title: "Status Tagih",
      dataIndex: "status",
      key: "status",
      render(value, record, index) {
        const find = record.Angsuran.find((f) =>
          moment(f.date_pay).isSame(pageProps.backdate || new Date(), "month"),
        );
        return (
          <>
            {find && (
              <div className="flex gap-1">
                <Tag color={find.date_paid ? "green" : "red"} variant="solid">
                  {find.date_paid ? "PAID" : "UNPAID"}
                </Tag>
                <div className="italic text-xs opacity-70">
                  <div>
                    <CalendarOutlined />{" "}
                    {moment(find.date_pay).format("DD/MM/YYYY")}
                  </div>
                  <div>
                    <PayCircleOutlined />{" "}
                    {moment(find.date_paid).format("DD/MM/YYYY")}
                  </div>
                </div>
              </div>
            )}
          </>
        );
      },
    },
    {
      title: "Progres",
      dataIndex: "progres",
      key: "progres",
      width: 150,
      render(value, record, index) {
        const filter = record.Angsuran.filter((f) => f.date_paid !== null);
        return (
          <Tooltip title={`${filter.length} / ${record.tenor}`}>
            <Progress
              percent={parseFloat(
                String(((filter.length / record.tenor) * 100).toFixed(2)),
              )}
            />
          </Tooltip>
        );
      },
    },
    {
      title: "Aksi",
      key: "action",
      render: (_, record) => (
        <div className="flex gap-2">
          {hasAccess("update") && (
            <Tooltip title="Update tagihan">
              <Button
                size="small"
                type="primary"
                icon={<EditOutlined />}
                onClick={() =>
                  setAction({ ...action, upsert: true, selected: record })
                }
              ></Button>
            </Tooltip>
          )}
          {hasAccess("update") && (
            <Tooltip title="Buat Pelunasan">
              <Button
                size="small"
                type="primary"
                icon={<FormOutlined />}
                onClick={() =>
                  setAction({ ...action, delete: true, selected: record })
                }
              ></Button>
            </Tooltip>
          )}
        </div>
      ),
    },
  ];

  const handleProses = async () => {
    setLoading(true);
    await fetch("/api/tagihan", {
      method: "POST",
      body: JSON.stringify(
        pageProps.data.flatMap((d) =>
          d.Angsuran.find((f) =>
            moment(f.date_pay).isSame(
              pageProps.backdate || new Date(),
              "month",
            ),
          ),
        ),
      ),
    })
      .then((res) => res.json())
      .then(async (res) => {
        if (res.status === 200) {
          modal.success({
            title: "BERHASIL",
            content: "Data berhasil di update!",
          });
          setAction({ ...action, proses: false });
          await getData();
        } else {
          modal.error({
            title: "ERROR",
            content: res.msg || "Internal server error!",
          });
        }
      })
      .catch((err) => {
        console.log(err);
        modal.error({ title: "ERROR!!", content: "Internal server Error" });
      });
    setLoading(false);
  };

  return (
    <Card
      title={
        <div className="flex gap-2 font-bold text-xl">
          <MoneyCollectOutlined /> Data Tagihan
        </div>
      }
      styles={{ body: { padding: 5 } }}
    >
      <div className="flex justify-between my-1 gap-2 overflow-auto">
        <div className="flex gap-2">
          {hasAccess("update") && (
            <Button
              size="small"
              icon={<FormOutlined />}
              type="primary"
              onClick={() => setAction({ ...action, proses: true })}
            >
              Proses
            </Button>
          )}
          {hasAccess("update") && (
            <Button
              icon={<CheckCircleOutlined />}
              type="primary"
              size="small"
              onClick={() => setCek({ open: true, msg: [] })}
            >
              Cek Tagihan
            </Button>
          )}
          <FilterData
            children={
              <>
                <div className="my-2">
                  <p>Periode :</p>
                  <DatePicker
                    size="small"
                    picker="month"
                    onChange={(date, dateStr) =>
                      setPageProps({ ...pageProps, backdate: dateStr })
                    }
                    style={{ width: "100%" }}
                  />
                </div>
                {user && !user.sumdanId && (
                  <div className="my-2">
                    <p>Mitra Pembiayaan : </p>
                    <Select
                      size="small"
                      placeholder="Pilih Mitra..."
                      options={sumdans.map((s) => ({
                        label: s.code,
                        value: s.id,
                      }))}
                      onChange={(e) =>
                        setPageProps({ ...pageProps, sumdanId: e })
                      }
                      allowClear
                      style={{ width: "100%" }}
                    />
                  </div>
                )}
                <div>
                  <p>Status Tagihan :</p>
                  <Select
                    size="small"
                    placeholder="Pilih Status..."
                    options={[
                      { label: "Tertagih", value: "paid" },
                      { label: "Tidak Tertagih", value: "unpaid" },
                    ]}
                    onChange={(e) =>
                      setPageProps({ ...pageProps, paid_status: e })
                    }
                    allowClear
                    style={{ width: "100%" }}
                  />
                </div>
              </>
            }
          />
        </div>
        <Input.Search
          size="small"
          style={{ width: 170 }}
          placeholder="Cari nama..."
          onChange={(e) =>
            setPageProps({ ...pageProps, search: e.target.value })
          }
        />
      </div>
      <Table
        columns={columns}
        dataSource={pageProps.data}
        size="small"
        loading={loading}
        rowKey={"id"}
        bordered
        scroll={{ x: "max-content", y: "60vh" }}
        pagination={{
          current: pageProps.page,
          pageSize: pageProps.limit,
          total: pageProps.total,
          onChange: (page, pageSize) => {
            setPageProps((prev) => ({
              ...prev,
              page,
              limit: pageSize,
            }));
          },
          pageSizeOptions: [50, 100, 500, 1000],
        }}
        summary={(pageData) => {
          return (
            <Table.Summary.Row className="text-xs bg-blue-400">
              <Table.Summary.Cell index={0} colSpan={2} className="text-center">
                <b>SUMMARY</b>
              </Table.Summary.Cell>
              <Table.Summary.Cell index={3} className="text-center">
                <b>
                  {IDRFormat(
                    pageData.reduce((acc, item) => acc + item.plafond, 0),
                  )}{" "}
                </b>
              </Table.Summary.Cell>
            </Table.Summary.Row>
          );
        }}
      />
      {action.selected && (
        <UpdateTagihan
          open={action.upsert}
          record={
            action.selected.Angsuran.find((a) =>
              moment(a.date_pay).isSame(
                pageProps.backdate || new Date(),
                "month",
              ),
            ) as Angsuran
          }
          rootrecord={action.selected}
          getData={getData}
          setOpen={(val: boolean) =>
            setAction({ ...action, upsert: val, selected: undefined })
          }
          hook={modal}
          key={"upsert" + action.selected?.id || "upsert"}
        />
      )}
      {action.selected && action.delete && (
        <CreatePelunasan
          open={action.delete}
          record={
            action.selected.Angsuran.find((a) =>
              moment(a.date_pay).isSame(
                pageProps.backdate || new Date(),
                "month",
              ),
            ) as Angsuran
          }
          rootrecord={action.selected}
          getData={getData}
          setOpen={(val: boolean) =>
            setAction({ ...action, delete: val, selected: undefined })
          }
          hook={modal}
          key={"pelunasan" + action.selected?.id || "pelunasan"}
        />
      )}
      {cek.open && (
        <CekTagihan
          open={cek.open}
          setOpen={(open) => setCek({ ...cek, open })}
        />
      )}
      <Modal
        title={"PROSES TAGIHAN"}
        open={action.proses}
        onCancel={() => setAction({ ...action, proses: false })}
        onOk={handleProses}
        loading={loading}
      >
        <p className="m-4">
          Konfirmasi proses tagihan untuk data yg ditampilkan?
        </p>
      </Modal>
    </Card>
  );
}

const UpdateTagihan = ({
  record,
  rootrecord,
  open,
  setOpen,
  getData,
  hook,
}: {
  record: Angsuran;
  rootrecord: IDapem;
  open: boolean;
  setOpen: Function;
  getData: Function;
  hook: HookAPI;
}) => {
  const [data, setData] = useState(record);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    await fetch("/api/tagihan", { method: "PUT", body: JSON.stringify(data) })
      .then((res) => res.json())
      .then(async (res) => {
        if (res.status === 200) {
          hook.success({
            title: "BERHASIL",
            content: "Tagihan berhasil di update",
          });
          setOpen(false);
          await getData();
        } else {
          hook.error({
            title: "ERROR!",
            content: res.msg || "Internal Server Error!",
          });
        }
      })
      .catch((err) => {
        console.log(err);
        hook.error({ title: "ERROR!", content: "Internal Server Error!" });
      });
    setLoading(false);
  };

  return (
    <Modal
      style={{ top: 30 }}
      title={"Update Data Tagihan " + rootrecord.id}
      open={open}
      onCancel={() => setOpen(false)}
      onOk={handleSubmit}
      loading={loading}
    >
      <div className="flex flex-col gap-2">
        <FormInput
          data={{
            label: "Pemohon",
            disabled: true,
            type: "text",
            value: rootrecord.Debitur.fullname,
          }}
        />
        <FormInput
          data={{
            label: "Angsuran",
            disabled: true,
            type: "text",
            value: `${IDRFormat(record.margin + record.principal)} | ke ${record.counter}`,
          }}
        />
        <FormInput
          data={{
            label: "Jadwal Tagih",
            disabled: true,
            type: "text",
            value: `${moment(record.date_pay).format("DD/MM/YYYY")} | Periode ${moment(record.date_pay).format("MMM YYYY")}`,
          }}
        />
        <FormInput
          data={{
            label: "Tanggal Bayar",
            type: "date",
            value: moment(data.date_paid).format("YYYY-MM-DD"),
            onChange: (e: string) =>
              setData({ ...data, date_paid: new Date(e) }),
          }}
        />
        <div className="italic text-xs text-blue-500">
          Isi tanggal bayar untuk update status menjadi tertagih, kosongkan jika
          tidak tertagih!
        </div>
        <FormInput
          data={{
            label: "Sisa Pokok",
            disabled: true,
            type: "text",
            value: IDRFormat(record.remaining),
          }}
        />
      </div>
    </Modal>
  );
};
const CreatePelunasan = ({
  record,
  rootrecord,
  open,
  setOpen,
  getData,
  hook,
}: {
  record: Angsuran;
  rootrecord: IDapem;
  open: boolean;
  setOpen: Function;
  getData: Function;
  hook: HookAPI;
}) => {
  const [data, setData] = useState<IPelunasan>({
    id: "",
    amount:
      rootrecord.Angsuran.filter((a) => a.date_paid !== null).length <= 1
        ? 0
        : rootrecord.Angsuran.filter((a) => a.date_paid === null).reduce(
            (acc, curr) => acc + curr.principal,
            0,
          ),
    amount_sumdan: 0,
    penalty:
      rootrecord.Angsuran.filter((a) => a.date_paid !== null).length <= 1
        ? 0
        : rootrecord.Angsuran.filter((a) => a.date_paid === null).reduce(
            (acc, curr) => acc + curr.principal,
            0,
          ) *
          (5 / 100),
    type: "JATUHTEMPO",
    desc: "Permohonan pelunasan karna sudah jatuh tempo lunas",
    desc_sumdan: "",
    created_at: new Date(),
    file_sub: null,
    status_paid: "PENDING",
    process_at: null,
    guarantee_status: "MITRA",
    Dapem: rootrecord,
    dapemId: rootrecord.id,
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    await fetch("/api/pelunasan", {
      method: "POST",
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then(async (res) => {
        if (res.status === 200) {
          hook.success({
            title: "BERHASIL",
            content:
              "Pelunasan berhasil ditagihkan. mohon cek di menu pelunasan",
          });
          setOpen(false);
          await getData();
        } else {
          hook.error({
            title: "ERROR!",
            content: res.msg || "Internal Server Error!",
          });
        }
      })
      .catch((err) => {
        console.log(err);
        hook.error({ title: "ERROR!", content: "Internal Server Error!" });
      });
    setLoading(false);
  };

  return (
    <Modal
      style={{ top: 30 }}
      title={"Permohonan Pelunasan " + rootrecord.id}
      open={open}
      onCancel={() => setOpen(false)}
      onOk={handleSubmit}
      loading={loading}
      width={1300}
      okButtonProps={{
        disabled:
          rootrecord.dropping_status === "PAID_OFF" ||
          (rootrecord.Pelunasan &&
            rootrecord.Pelunasan.status_paid !== "REJECTED"),
      }}
    >
      <div className="flex flex-col sm:flex-row gap-2">
        <div className="flex-1 sm:w-[40%] flex flex-col gap-2">
          <FormInput
            data={{
              label: "Pemohon",
              type: "text",
              required: true,
              value: `${rootrecord.Debitur.fullname} (${rootrecord.Debitur.nopen})`,
              disabled: true,
            }}
          />
          <FormInput
            data={{
              label: "Nomor Akad",
              type: "text",
              required: true,
              disabled: true,
              value: data.Dapem?.no_contract,
            }}
          />
          <FormInput
            data={{
              label: "Alasan",
              type: "select",
              required: true,
              value: data.type,
              onChange: (e: string) =>
                setData({ ...data, type: e as ESettleStatus }),
              options: [
                { label: "LEPAS", value: "LEPAS" },
                { label: "TOPUP", value: "TOPUP" },
                { label: "MENINGGAL", value: "MENINGGAL" },
                { label: "JATUHTEMPO", value: "JATUHTEMPO" },
              ],
            }}
          />
          <FormInput
            data={{
              label: "Nominal Pelunasan",
              type: "text",
              required: true,
              value: IDRFormat(data.amount),
              onChange: (e: string) =>
                setData({ ...data, amount: IDRToNumber(e || "0") }),
            }}
          />
          <FormInput
            data={{
              label: "Penalty Pelunasan",
              type: "text",
              required: true,
              value: IDRFormat(data.penalty),
              onChange: (e: string) =>
                setData({ ...data, penalty: IDRToNumber(e || "0") }),
            }}
          />
          <FormInput
            data={{
              label: "Keterangan",
              type: "textarea",
              required: true,
              value: data.desc,
              onChange: (e: string) => setData({ ...data, desc: e }),
            }}
          />
          <FormInput
            data={{
              label: "Upload Berkas",
              type: "upload",
              required: true,
              value: data.file_sub,
              onChange: (e: string) => setData({ ...data, file_sub: e }),
            }}
          />
          {rootrecord.dropping_status === "PAID_OFF" ||
            (rootrecord.Pelunasan &&
              rootrecord.Pelunasan.status_paid !== "REJECTED" && (
                <p className="italic text-blue-500 my-2 p-1 border rounded">
                  Data ini sudah lunas atau sedang diajukan pelunasan!!. Mohon
                  tunggu proses selesai atau hapus proses sebelumnya di menu
                  Pelunasan Debitur!
                </p>
              ))}
        </div>
        <div className="flex-1 w-full">
          <p className="my-2 font-bold text-lg">Table Angsuran</p>
          <Table
            columns={columnsangsuran}
            dataSource={rootrecord.Angsuran}
            size="small"
            loading={loading}
            rowKey={"id"}
            bordered
            scroll={{ x: "max-content", y: "50vh" }}
            pagination={{ pageSize: 12 }}
          />
        </div>
      </div>
    </Modal>
  );
};

const CekTagihan = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) => {
  const [msg, setMsg] = useState<string[]>([]);

  const props: UploadProps = {
    name: "file",
    action: "/api/tagihan/cek",
    accept: ".xlsx,.xls",
    maxCount: 1,

    onChange(info) {
      if (info.file.status === "uploading") {
        return;
      }

      if (info.file.status === "done") {
        const res = info.file.response;

        if (res.status === 200) {
          setMsg(res.msg || ["Internal server Error"]);
        } else {
          setMsg(res.msg || ["Internal server Error"]);
        }
      }

      if (info.file.status === "error") {
        setMsg(["Upload gagal"]);
      }
    },
  };

  return (
    <Modal
      title={"CEK TAGIHAN"}
      open={open}
      onCancel={() => setOpen(false)}
      footer={null}
      width={1000}
      style={{ top: 20 }}
    >
      <div className="min-h-32">
        <div className="flex justify-between gap-5">
          <span>Upload File Excel Tagihan</span>
          <Upload {...props}>
            <Button type="primary" icon={<CloudUploadOutlined />}>
              Browse
            </Button>
          </Upload>
        </div>
        {msg.length > 0 && (
          <div className="mt-4">
            <Divider />
            <p className="font-bold mb-2">Hasil Cek Tagihan:</p>
            <ul className="list-disc list-inside">
              {msg.map((m, i) => (
                <li key={i}>{m}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </Modal>
  );
};

const columnsangsuran: TableProps<Angsuran>["columns"] = [
  {
    title: "Ke",
    dataIndex: "counter",
    key: "counter",
    width: 50,
  },
  {
    title: "Jadwal Bayar",
    dataIndex: "date_pay",
    key: "datepay",
    render(value, record, index) {
      return <>{moment(value).format("DD/MM/YYYY")}</>;
    },
  },
  {
    title: "Pokok",
    dataIndex: "principal",
    key: "principal",
    render(value, record, index) {
      return <>{IDRFormat(value)}</>;
    },
  },
  {
    title: "Margin",
    dataIndex: "margin",
    key: "margin",
    render(value, record, index) {
      return <>{IDRFormat(value)}</>;
    },
  },
  {
    title: "Tanggal Bayar",
    dataIndex: "date_paid",
    key: "datepaid",
    render(value, record, index) {
      return <>{value && moment(value).format("DD/MM/YYYY")}</>;
    },
  },
  {
    title: "Sisa Pokok",
    dataIndex: "remaining",
    key: "remaining",
    render(value, record, index) {
      return <>{IDRFormat(value)}</>;
    },
  },
];

"use client";

import { FormInput } from "@/components";
import { IActionTable, IJournalEntry, IPageProps } from "@/libs/IInterfaces";
import { AccountBookOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { Table, DatePicker, Input, Button, Select, Card, Modal } from "antd";
import { useState } from "react";
const { RangePicker } = DatePicker;

export default function Page() {
  const [pageProps, setPageProps] = useState<IPageProps<IJournalEntry>>({
    page: 1,
    limit: 50,
    total: 0,
    data: [],
    search: "",
    backdate: "",
  });
  const [action, setAction] = useState<IActionTable<IJournalEntry>>({
    upsert: false,
    delete: false,
    proses: false,
    selected: undefined,
  });

  const getData = () => {};

  return (
    <Card
      title={
        <div className="flex gap-2 font-bold text-xl">
          <AccountBookOutlined /> JournalEntry
        </div>
      }
      styles={{ body: { padding: 5 } }}
    >
      <div className="flex justify-between my-1 gap-2 overflow-auto">
        <div className="flex gap-2">
          <Button
            size="small"
            type="primary"
            icon={<PlusCircleOutlined />}
            onClick={() => setAction({ ...action, upsert: true })}
          >
            Add New
          </Button>
          <RangePicker style={{ width: 170 }} size="small" />
          <Select
            style={{ width: 170 }}
            placeholder="pilih akun..."
            size="small"
          />
        </div>
        <Input.Search size="small" style={{ width: 170 }} />
      </div>
      <Table />
      <UpsertData
        open={action.upsert}
        setOpen={(val: boolean) => setAction({ ...action, upsert: val })}
        getData={getData}
        record={action.selected}
        key={action.selected ? "upsert" + action.selected.id : "create"}
      />
    </Card>
  );
}

const UpsertData = ({
  open,
  setOpen,
  getData,
  record,
}: {
  open: boolean;
  setOpen: Function;
  getData: Function;
  record?: IJournalEntry;
}) => {
  const [loading, setLoading] = useState(false);

  return (
    <div>
      <Modal
        open={open}
        onCancel={() => setOpen(false)}
        title="Buat Journal Entry"
        width={1000}
        loading={loading}
        style={{ top: 20 }}
      >
        <div className="flex gap-4">
          <FormInput
            data={{
              label: "Tanggal Transaksi",
              type: "date",
              class: "flex-1",
            }}
          />
          <FormInput
            data={{
              label: "Keterangan",
              type: "textarea",
              class: "flex-1",
            }}
          />
        </div>
      </Modal>
    </div>
  );
};

const defaultData: IJournalEntry = {
  id: "",
  date: new Date(),
  description: "",
  JournalDetail: [],
};

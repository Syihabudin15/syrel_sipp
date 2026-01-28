import { DollarOutlined } from "@ant-design/icons";
import { Col, Divider, Row, Spin } from "antd";

export default function Page() {
  return (
    <Spin spinning={false}>
      <div className="p-2">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          <StaticticItem />
          <StaticticItem />
          <StaticticItem />
          <StaticticItem />
        </div>
        <Row gutter={[12, 12]}>
          <Col xs={24} sm={12}>
            <div className="bg-white p-3 rounded shadow">
              <p className="font-bold text-lg">Grafik Pencairan 6 Bulan</p>
              <div className="h-64 rounded-lg flex items-center justify-center mt-2">
                {/* <TagihanChart data={data.charts} /> */}
              </div>
            </div>
          </Col>
          <Col xs={24} sm={12}>
            <div className="bg-white p-3 rounded shadow">
              <p className="font-bold text-lg">Total Status Pembiayaan</p>
              <div className="h-64 rounded-lg flex items-center justify-center mt-2">
                {/* <StatusDebetChart data={data.charts} /> */}
              </div>
            </div>
          </Col>
          <Col xs={24} sm={12}>
            <div className="bg-white p-3 rounded shadow">
              <p className="font-bold text-lg">Grafik Pembiayaan By Sumdan</p>
              <div className="h-64 rounded-lg flex items-center justify-center mt-2">
                {/* <StatusDebetChart data={data.charts} /> */}
              </div>
            </div>
          </Col>
          <Col xs={24} sm={12}>
            <div className="bg-white p-3 rounded shadow">
              <p className="font-bold text-lg">Grafik Pembiayaan By Produk</p>
              <div className="h-64 rounded-lg flex items-center justify-center mt-2">
                {/* <StatusDebetChart data={data.charts} /> */}
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </Spin>
  );
}

const StaticticItem = () => {
  return (
    <div className="bg-white rounded-lg p-3 card-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600 mb-1 font-bold">
            <DollarOutlined /> Total Pencairan
          </p>
          <p className="text-xl font-bold text-green-500">Rp. 100.000.000</p>
          <Divider style={{ margin: 8, padding: 0 }} />
          <p className="text-sm font-bold text-green-500">+ Rp. 1.000.000</p>
        </div>
      </div>
    </div>
  );
};

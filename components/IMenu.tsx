import {
  DashboardOutlined,
  KeyOutlined,
  MoneyCollectOutlined,
  RobotOutlined,
  SettingOutlined,
  TableOutlined,
  TeamOutlined,
  VerifiedOutlined,
} from "@ant-design/icons";

interface IMenu {
  label: string | React.ReactNode;
  key: string;
  icon: string | React.ReactNode;
  needaccess: boolean;
}
export interface IMenuType extends IMenu {
  children?: IMenu[];
}

export const listMenuUI: IMenuType[] = [
  {
    label: "Dashboard",
    key: "/dashboard",
    icon: <DashboardOutlined />,
    needaccess: false,
  },
  {
    label: "Rekap Tagihan",
    key: "/rekap",
    icon: <TableOutlined />,
    needaccess: true,
  },
  {
    label: "Tagihan",
    key: "/tagihan",
    icon: <MoneyCollectOutlined />,
    needaccess: true,
  },
  {
    label: "Manajemen User",
    key: "/users",
    icon: <TeamOutlined />,
    needaccess: true,
  },
  {
    label: "Profile Setting",
    key: "/profile",
    icon: <SettingOutlined />,
    needaccess: false,
  },
  {
    label: "Master Data",
    key: "/master",
    icon: <RobotOutlined />,
    needaccess: true,
    children: [
      {
        label: "Manajemen Role",
        key: "/master/roles",
        icon: <KeyOutlined />,
        needaccess: true,
      },
      {
        label: "Manajemen Mitra",
        key: "/master/mitra",
        icon: <VerifiedOutlined />,
        needaccess: true,
      },
    ],
  },
];
export const listMenuServer: { key: string; needaccess: boolean }[] = [
  {
    key: "/dashboard",
    needaccess: false,
  },
  {
    key: "/rekap",
    needaccess: true,
  },
  {
    key: "/tagihan",
    needaccess: true,
  },
  {
    key: "/users",
    needaccess: true,
  },
  {
    key: "/profile",
    needaccess: false,
  },

  {
    key: "/master/roles",
    needaccess: true,
  },
  {
    key: "/master/mitra",
    needaccess: true,
  },
];

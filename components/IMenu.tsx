import {
  BankOutlined,
  BorderOuterOutlined,
  BranchesOutlined,
  CalculatorOutlined,
  DashboardOutlined,
  FileProtectOutlined,
  KeyOutlined,
  MoneyCollectOutlined,
  ReadOutlined,
  RobotOutlined,
  SettingOutlined,
  TableOutlined,
  TeamOutlined,
  VerifiedOutlined,
} from "@ant-design/icons";

export interface IMenu {
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
    label: "Simulasi Pembiayaan",
    key: "/simulasi",
    icon: <CalculatorOutlined />,
    needaccess: true,
  },
  {
    label: "Monitoring Pembiayaan",
    key: "/monitoring",
    icon: <ReadOutlined />,
    needaccess: true,
  },
  {
    label: "Proses Pembiayaan",
    key: "/proses",
    icon: <FileProtectOutlined />,
    needaccess: true,
    children: [
      {
        label: "Verifikasi Pembiayaan",
        key: "/proses/verif",
        icon: <FileProtectOutlined />,
        needaccess: true,
      },
      {
        label: "Verifikasi SLIK",
        key: "/proses/slik",
        icon: <FileProtectOutlined />,
        needaccess: true,
      },
      {
        label: "Approval Pembiayaan",
        key: "/proses/approv",
        icon: <FileProtectOutlined />,
        needaccess: true,
      },
    ],
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
        label: "Manajemen User",
        key: "/master/users",
        icon: <TeamOutlined />,
        needaccess: true,
      },
      {
        label: "Manajemen Unit",
        key: "/master/area",
        icon: <BranchesOutlined />,
        needaccess: true,
      },
      {
        label: "Manajemen Mitra",
        key: "/master/mitra",
        icon: <BankOutlined />,
        needaccess: true,
      },
      {
        label: "Jenis Pembiayaan",
        key: "/master/jenis",
        icon: <BorderOuterOutlined />,
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
    key: "/simulasi",
    needaccess: true,
  },
  {
    key: "/monitoring",
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
  {
    key: "/master/user",
    needaccess: true,
  },
  {
    key: "/master/area",
    needaccess: true,
  },
  {
    key: "/master/jenis",
    needaccess: true,
  },
];

export const MenuPermission = (
  items: IMenuType[],
  allowedKeys: string[],
): any[] => {
  return items
    .map((item) => {
      if (item.children && item.children.length > 0) {
        const filteredChildren = MenuPermission(item.children, allowedKeys);
        const { needaccess, ...c } = item;

        if (filteredChildren.length > 0) {
          return {
            ...c,
            children: filteredChildren,
          };
        }
      }
      const { needaccess, ...rt } = item;
      const isAllowed = !item.needaccess
        ? true
        : allowedKeys.includes(item.key);
      if (isAllowed) {
        return rt;
      }

      return null;
    })
    .filter(Boolean) as any[];
};

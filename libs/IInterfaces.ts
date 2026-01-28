import {
  Angsuran,
  Area,
  Berkas,
  Cabang,
  Dapem,
  Debitur,
  Dropping,
  Jaminan,
  JenisPembiayaan,
  ProdukPembiayaan,
  Role,
  Sumdan,
  User,
} from "@prisma/client";

export interface IUser extends User {
  sumdan: string | null;
  cabang: string;
  area: string;
  Role: Role;
}

export interface IPermission {
  name: string;
  path: string;
  access: string[];
}

export interface IActionTable<T> {
  upsert: boolean;
  delete: boolean;
  proses: boolean;
  selected: T | undefined;
}

export interface IPageProps<T> {
  page: number;
  limit: number;
  search: string;
  total: number;
  data: T[];
  [key: string]: any;
}

export interface IViewFiles {
  open: boolean;
  data: { name: string; url: string }[];
}

export interface IDesc {
  name: string;
  date: Date;
  desc: string;
}
// Models
export interface ISumdan extends Sumdan {
  ProdukPembiayaan: ProdukPembiayaan[];
}

export interface IArea extends Area {
  Cabang: Cabang[];
}
export interface IProdukPembiayaan extends ProdukPembiayaan {
  Sumdan: Sumdan;
}
export interface ISumdanDapem extends Sumdan {
  ProdukPembiayaan: IProdukPembiayaan[];
}
export interface ICabang extends Cabang {
  Area: Area;
}
export interface IUserDapem extends User {
  Cabang: ICabang;
}
export interface IDapem extends Dapem {
  Debitur: Debitur;
  ProdukPembiayaan: IProdukPembiayaan;
  CreatedBy: IUserDapem;
  AO: IUserDapem;
  Dropping: Dropping | null;
  Berkas: Berkas | null;
  Jaminan: Jaminan | null;
  JenisPembiayaan: JenisPembiayaan;
  Angsuran: Angsuran[];
}
// End Models

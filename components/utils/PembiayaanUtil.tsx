import moment from "moment";
import { PV } from "@formulajs/formulajs";
import { EMarginType } from "@prisma/client";
import { IDapem } from "@/libs/IInterfaces";

export const IDRFormat = (number: number) => {
  const temp = new Intl.NumberFormat("de-DE", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
    style: "decimal",
    currency: "IDR",
  }).format(number);
  return temp;
};

export const IDRToNumber = (str: string) => {
  return parseInt(str.replace(/\D/g, ""));
};

export function GetFullAge(startDate: Date, endDate: Date) {
  const momentBirthdate = moment(startDate);
  const dateNow = moment(endDate);

  const durasi = moment.duration(dateNow.diff(momentBirthdate));

  const year = durasi.years();
  const month = durasi.months();
  const day = durasi.days();

  return { year, month, day };
}

export function GetMaxTenor(
  max_usia: number,
  usia_tahun: number,
  usia_bulan: number,
) {
  const tmp = max_usia - usia_tahun;
  const max_tenor = usia_tahun <= max_usia ? tmp * 12 - (usia_bulan + 1) : 0;
  return max_tenor;
}

export function GetMaxPlafond(
  mg_bunga: number,
  tenor: number,
  max_angsuran: number,
) {
  const maxPlafond =
    Number(PV(mg_bunga / 100 / 12, tenor, max_angsuran, 0, 0)) * -1;
  return maxPlafond;
}

export const GetAngsuran = (
  plafond: number,
  tenor: number,
  bunga: number,
  type: EMarginType,
  rounded: number,
) => {
  if (type === "FLAT") {
    const pokok = plafond / tenor;
    const margin = (plafond * (bunga / 100)) / 12;
    const angsuran = pokok + margin;
    return {
      pokok,
      margin,
      angsuran: Math.ceil(angsuran / rounded) * rounded,
    };
  } else if (type === "ANUITAS") {
    const r = bunga / 12 / 100;

    const angsuran =
      (plafond * (r * Math.pow(1 + r, tenor))) / (Math.pow(1 + r, tenor) - 1);
    const pokok = plafond / tenor;
    const margin = angsuran - pokok;

    return {
      angsuran: Math.ceil(angsuran / rounded) * rounded,
      pokok,
      margin,
    };
  } else {
    return {
      pokok: 0,
      margin: 0,
      angsuran: 0,
    };
  }
};

export const GetBiaya = (data: IDapem) => {
  const adm = data.plafond * ((data.c_adm + data.c_adm_sumdan) / 100);
  const asuransi = data.plafond * (data.c_insurance / 100);
  return (
    adm + asuransi + data.c_gov + data.c_account + data.c_stamp + data.c_mutasi
  );
};

export function GetRoman(number: number): string {
  const romawi = [
    "I",
    "II",
    "III",
    "IV",
    "V",
    "VI",
    "VII",
    "VIII",
    "IX",
    "X",
    "XI",
    "XII",
  ];
  return romawi[number - 1] || "";
}

export function serializeForApi<T>(data: T): T {
  return JSON.parse(
    JSON.stringify(data, (_, v) => (typeof v === "bigint" ? v.toString() : v)),
  );
}

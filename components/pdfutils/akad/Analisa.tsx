import {
  GetAngsuran,
  GetFullAge,
  IDRFormat,
} from "@/components/utils/PembiayaanUtil";
import { IDapem } from "@/libs/IInterfaces";
import moment from "moment";
import { Header } from "../utils";

export const AnalisaPerhitungan = (record: IDapem) => {
  const age = GetFullAge(
    record.Debitur.birthdate,
    record.date_contract || record.created_at,
  );
  const ageLunas = GetFullAge(
    record.Debitur.birthdate,
    moment(record.date_contract || record.created_at)
      .add(record.tenor, "month")
      .toDate(),
  );
  const angsuran = GetAngsuran(
    record.plafond,
    record.tenor,
    record.c_margin + record.c_margin_sumdan,
    record.margin_type,
    record.rounded,
  ).angsuran;

  const biayaAdm =
    record.plafond * ((record.c_adm + record.c_adm_sumdan) / 100);
  const biayaAsuransi = record.plafond * (record.c_insurance / 100);
  const blokir = angsuran * record.c_blokir;

  const biayaTotal =
    biayaAdm +
    biayaAsuransi +
    record.c_gov +
    record.c_account +
    record.c_stamp +
    record.c_mutasi;

  return `
  ${Header("ANALISA PEMBIAYAAN", record.no_contract, undefined, process.env.NEXT_PUBLIC_APP_LOGO, record.ProdukPembiayaan.Sumdan.logo)}
  
  <div class="mt-4 flex gap-4">
    <div class="flex-1">
      <div class="flex gap-2">
        <div class="w-32">Nama Pemohon</div>
        <div class="w-4">:</div>
        <div>${record.Debitur.fullname}</div>
      </div>
      <div class="flex gap-2">
        <div class="w-32">Nomor Pensiun</div>
        <div class="w-4">:</div>
        <div>${record.Debitur.nopen}</div>
      </div>
      <div class="flex gap-2">
        <div class="w-32">Tanggal Lahir</div>
        <div class="w-4">:</div>
        <div>${moment(record.Debitur.birthdate).format("DD/MM/YYYY")}</div>
      </div>
      <div class="flex gap-2">
        <div class="w-32">Jenis Pembiayaan</div>
        <div class="w-4">:</div>
        <div>${record.JenisPembiayaan.name}</div>
      </div>
      <div class="flex gap-2">
        <div class="w-32">Produk Pembiayaan</div>
        <div class="w-4">:</div>
        <div>${record.ProdukPembiayaan.name}</div>
      </div>
      <div class="flex gap-2">
        <div class="w-32">Gaji Pensiun</div>
        <div class="w-4">:</div>
        <div>${IDRFormat(record.Debitur.salary)}</div>
      </div>
    </div>
    <div class="flex-1">
      <div class="flex gap-2">
        <div class="w-32">Tanggal Akad</div>
        <div class="w-4">:</div>
        <div>${moment(record.date_contract).format("DD/MM/YYYY")}</div>
      </div>
      <div class="flex gap-2">
        <div class="w-32">Usia Pemohon</div>
        <div class="w-4">:</div>
        <div>${age.year} Tahun ${age.month} Bulan ${age.day} Hari</div>
      </div>
      <div class="flex gap-2">
        <div class="w-32">Est Tanggal Lunas</div>
        <div class="w-4">:</div>
        <div>${moment(record.date_contract).add(record.tenor, "month").format("DD/MM/YYYY")}</div>
      </div>
      <div class="flex gap-2">
        <div class="w-32">Est Usia Lunas</div>
        <div class="w-4">:</div>
        <div>${ageLunas.year} Tahun ${ageLunas.month} Bulan ${ageLunas.day} Hari</div>
      </div>
      <div class="flex gap-2">
        <div class="w-32">Plafond</div>
        <div class="w-4">:</div>
        <div>${IDRFormat(record.plafond)}</div>
      </div>
      <div class="flex gap-2">
        <div class="w-32">Jangka Waktu</div>
        <div class="w-4">:</div>
        <div>${record.tenor} Bulan</div>
      </div>
    </div>
  </div>

  <div class="my-4 flex gap-4">
    <div class="flex-1">
      <div class="flex gap-2">
        <div class="w-32">Suku Bunga</div>
        <div class="w-4">:</div>
        <div>${(record.c_margin + record.c_margin_sumdan).toFixed(2)}% /Tahun</div>
      </div>
      <div class="flex gap-2">
        <div class="w-32">Angsuran Perbulan</div>
        <div class="w-4">:</div>
        <div>${IDRFormat(angsuran)}</div>
      </div>
      <div class="flex gap-2">
        <div class="w-32">Sisa Gaji</div>
        <div class="w-4">:</div>
        <div>${IDRFormat(record.Debitur.salary - angsuran)}</div>
      </div>
      <div class="flex gap-2">
        <div class="w-32">Debt Service Ratio</div>
        <div class="w-4">:</div>
        <div>${((angsuran / record.Debitur.salary) * 100).toFixed(2)}% / ${record.ProdukPembiayaan.Sumdan.dsr.toFixed(2)}%</div>
      </div>
    </div>
    <div class="flex-1">
      <div class="flex gap-2">
        <div class="w-32">Petugas</div>
        <div class="w-4">:</div>
        <div>${record.AO.fullname} (${record.AO.nip})</div>
      </div>
      <div class="flex gap-2">
        <div class="w-32">Unit Pelayanan</div>
        <div class="w-4">:</div>
        <div>${record.AO.Cabang.name} - ${record.AO.Cabang.Area.name}</div>
      </div>
    </div>
  </div>
  

  <div class="my-10">
    <p class="font-bold text-lg mb-2">Rincian Pembiayaan :</p>
    <div class="flex gap-4 items-end">
      <div class="flex-1">
        <div class="flex gap-4">
          <div class="w-52">Biaya Administrasi</div>
          <div class="w-4">:</div>
          <div class="flex-1 text-right">${IDRFormat(biayaAdm)}</div>
        </div>
        <div class="flex gap-4">
          <div class="w-52">Biaya Asuransi</div>
          <div class="w-4">:</div>
          <div class="flex-1 text-right">${IDRFormat(biayaAsuransi)}</div>
        </div>
        <div class="flex gap-4">
          <div class="w-52">Biaya Tatalaksana</div>
          <div class="w-4">:</div>
          <div class="flex-1 text-right">${IDRFormat(record.c_gov)}</div>
        </div>
        <div class="flex gap-4">
          <div class="w-52">Biaya Materai</div>
          <div class="w-4">:</div>
          <div class="flex-1 text-right">${IDRFormat(record.c_stamp)}</div>
        </div>
        <div class="flex gap-4">
          <div class="w-52">Biaya Buka Rekening</div>
          <div class="w-4">:</div>
          <div class="flex-1 text-right">${IDRFormat(record.c_account)}</div>
        </div>
        <div class="flex gap-4">
          <div class="w-52">Biaya Mutasi</div>
          <div class="w-4">:</div>
          <div class="flex-1 text-right">${IDRFormat(record.c_mutasi)}</div>
        </div>
        <div class="flex gap-4 text-red-500 border-t font-bold">
          <div class="w-52">TOTAL BIAYA</div>
          <div class="w-4">:</div>
          <div class="flex-1 text-right">${IDRFormat(biayaTotal)}</div>
        </div>
      </div>

      <div class="flex-1 font-bold">
        <div class="flex gap-4 text-blue-500">
          <div class="w-52">Terima Kotor</div>
          <div class="w-4">:</div>
          <div class="flex-1 text-right">${IDRFormat(record.plafond - biayaTotal)}</div>
        </div>
        <div class="flex gap-4 text-red-500">
          <div class="w-52">Nominal Takeover</div>
          <div class="w-4">:</div>
          <div class="flex-1 text-right">${IDRFormat(record.c_takeover)}</div>
        </div>
        <div class="flex gap-4 text-red-500">
          <div class="w-52">Blokir Angsuran ${record.c_blokir}x</div>
          <div class="w-4">:</div>
          <div class="flex-1 text-right">${IDRFormat(blokir)}</div>
        </div>
        <div class="flex gap-4 text-green-500 border-t font-bold">
          <div class="w-52">TERIMA BERSIH</div>
          <div class="w-4">:</div>
          <div class="flex-1 text-right">${IDRFormat(record.plafond - (biayaTotal + record.c_takeover + blokir))}</div>
        </div>
      </div>
    </div>
  </div>
  
  <div class="mt-5 italic">
    <p>Informasi Lainnya : </p>
    <ul style="list-style-type: disc;">
      ${record.JenisPembiayaan.status_takeover ? `<li>Instansi takeover ke <span class="font-bold">${record.takeover_from}</span> dengan estimasi pelaksanaan tanggal <span class="font-bold">${moment(record.takeover_date).format("DD MMMM YYYY")}</span></li>` : ""}
      ${record.JenisPembiayaan.c_mutasi ? `<li>Akan dilakukan mutasi kantor bayar gaji pensiun dari <span class="font-bold">${record.mutasi_from} ke ${record.mutasi_to}</span>` : ""}
    </ul>
  </div>
`;
};

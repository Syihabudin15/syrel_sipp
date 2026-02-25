import moment from "moment";
import { UserType } from "@/libs/IInterfaces";
import { Header, ListStyle, NumberToWordsID } from "../utils";
import { GetRoman, IDRFormat } from "@/components/utils/PembiayaanUtil";

moment.locale("id");

const generatePKWTHtml = (record: UserType) => {
  const jk =
    moment(record.end_pkwt).diff(moment(record.start_pkwt), "months") + 1;

  const html = `
  <!doctype html>
  <html>
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width,initial-scale=1" />
      <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
      <style>
        @page {
          size: A4;
          margin: 15mm;
        }

        html, body {
          height: 100%;
          font-family: Cambria, Georgia, 'Times New Roman', Times, serif;
          font-size: 14px;
          text-align: justify;
        }

        /* Pemisah halaman */
        .page-break {
          page-break-before: always;
          break-before: page;
          display: block;
          height: 0;
          border: none;
        }
          @media print {
            .page {
              position: relative;
              min-height: 95vh;    /* atau height A4 jika untuk print */
              padding-top: 80px;    /* ruang untuk header */
              page-break-after: always;
            }
    
            .page .page-header {
              position: absolute;
              top: 0;
              left: 0;
              right: 0;
              padding: 10px;
              text-align: center;
              background: white;
              border-bottom: 1px solid #ccc;
            }
          }
      </style>
    </head>
    <body class="bg-white text-gray-800 leading-relaxed p-4 max-w-200">

    <div class="page" style="font-size: 12px;">
      ${Header("PERJANJIAN KERJA WAKTU TERTENTU", `Nomor : ${record.nip}/DIR-HRD/FAS/${GetRoman(moment(record.start_pkwt).month() + 1)}/${moment(record.start_pkwt).format("YYYY")}` || "", undefined, process.env.NEXT_PUBLIC_APP_LOGO, process.env.NEXT_PUBLIC_APP_LOGO)}
      <p class="mt-5">Pada hari ini ${moment(record.start_pkwt).format("dddd, DD MMMM YYYY")}, kami yang bertanda tangan dibawah ini:</p>

      <div class="mt-3 ml-6">
        <div class="flex gap-2">
          <div class="w-4">I. </div>
          <div class="flex-1">
            <div class="flex gap-2">
              <span class="w-24">Nama</span>
              <span class="w-5">:</span>
              <span class="flex-1">${process.env.NEXT_PUBLIC_APP_PKWT_NAME || "_____________________"}</span>
            </div>
            <div class="flex gap-2">
              <span class="w-24">NIK</span>
              <span class="w-5">:</span>
              <span class="flex-1">${process.env.NEXT_PUBLIC_APP_PKWT_NIK || "_____________________"}</span>
            </div>
            <div class="flex gap-2">
              <span class="w-24">Jabatan</span>
              <span class="w-5">:</span>
              <span class="flex-1">${process.env.NEXT_PUBLIC_APP_PKWT_POSITION || "_____________________"}</span>
            </div>
            <p>Dalam hal ini bertindak untuk dan atas nama ${process.env.NEXT_PUBLIC_APP_COMPANY_NAME || "_____________________"} yang berkedudukan di ${process.env.NEXT_PUBLIC_APP_COMPANY_ADDRESS || "_____________________"}, untuk selanjutnya disebut sebagai <span class="font-bold">PIHAK PERTAMA</span></p>
          </div>
        </div>
      </div>
      <div class="mt-3 ml-6">
        <div class="flex gap-2">
          <div class="w-4">II. </div>
          <div class="flex-1">
            <div class="flex gap-2">
              <span class="w-24">Nama</span>
              <span class="w-5">:</span>
              <span class="flex-1">${record.fullname || "_____________________"}</span>
            </div>
            <div class="flex gap-2">
              <span class="w-24">NIK</span>
              <span class="w-5">:</span>
              <span class="flex-1">${record.nik || "_____________________"}</span>
            </div>
            <div class="flex gap-2">
              <span class="w-24">Jabatan</span>
              <span class="w-5">:</span>
              <span class="flex-1">${record.position || "_____________________"}</span>
            </div>
            <p>Dalam hal ini bertindak untuk dan atas nama dirinya sendiri, untuk selanjutnya disebut sebagai <span class="font-bold">PIHAK KEDUA</span></p>
          </div>
        </div>
      </div>
      <p class="mt-3">Dengan ini menerangkan bahwa, kedua belah pihak telah menyetujui untuk mengadakan perjanjian kontrak kerja untuk kurun waktu yang ditentukan dengan syarat-syarat dan ketentuan-ketentuan sebagai berikut :</p>

      <div class="my-3">
        <div class="font-bold text-center my-2">
          <p>PASAL 1</p>
          <p>Penempatan Tugas</p>
        </div>
        ${ListStyle(
          [
            `PIHAK KEDUA bersedia dipekerjakan oleh PIHAK PERTAMA sebagai ${record.position} ${record.Cabang.name} pada ${process.env.NEXT_PUBLIC_APP_COMPANY_NAME} selanjutnya PIHAK KEDUA dengan ini mengikatkan diri dan berjanji akan taat dan patuh terhadap Perjanjian Kontrak Kerja serta peraturan yang berlaku di ${process.env.NEXT_PUBLIC_APP_COMPANY_NAME}.`,
            `Bila dipandang perlu PIHAK PERTAMA dapat memberikan tugas tambahan kepada PIHAK KEDUA sesuai tuntutan tugas dan memperhatikan kemampuan PIHAK KEDUA.`,
          ],
          "number-alpha",
        )}
      </div>

      <div class="my-3">
        <div class="font-bold text-center my-2">
          <p>PASAL 2</p>
          <p>Jangka Waktu</p>
        </div>
        <p>
          PIHAK KEDUA mengikat diri sebagai Tenaga Kerja Kontrak dalam jangka waktu ${jk} (${NumberToWordsID(jk)}) Bulan terhitung mulai tanggal ${moment(record.start_pkwt).format("DD MMMM YYYY")} dan dengan demikian secara hukum akan berakhir pada tanggal ${moment(record.end_pkwt).format("DD MMMM YYYY")}, dan apabila diperlukan Perjanjian ini dapat diperpanjang dengan diterbitkannya perjanjian baru sesuai ketententuan yang berlaku
        </p>
      </div>

      <div class="my-3">
        <div class="font-bold text-center my-2">
          <p>PASAL 3</p>
          <p>Waktu Kerja</p>
        </div>
        <p>
          Selama bekerja pada Pihak Pertama, Pihak Kedua dipekerjakan untuk waktu 8 Jam sehari dan 40 jam seminggu adalah sebagai berikut:
        </p>
        <div class="ml-6">
          <div class="flex gap-2">
            <span class="w-24">Hari Kerja</span>
            <span class="w-5">:</span>
            <span class="flex-1">Senin - Jumat</span>
          </div>
          <div class="flex gap-2">
            <span class="w-24">Jam Kerja</span>
            <span class="w-5">:</span>
            <span class="flex-1">08.00 - 17.00 WIB</span>
          </div>
        </div>
        <p>Selama bekerja pada Pihak Pertama, Pihak Kedua dipekerjakan untuk waktu 8 Jam sehari dan 40 jam seminggu adalah sebagai berikut:</p>
      </div>

      <div class="my-3">
        <div class="font-bold text-center my-2">
          <p>PASAL 4</p>
          <p>Cuti dan Izin</p>
        </div>
        ${ListStyle(
          [
            `Dalam masa Perjanjian Kerja ini PIHAK KEDUA tidak berhak mengajukan cuti tetapi mendapatkan hak izin kepada PIHAK PERTAMA`,
            `Dalam hal PIHAK KEDUA berhalangan hadir karena sakit maka PIHAK KEDUA harus menunjukan Surat Keterangan Dokter kepada PIHAK PERTAMA`,
          ],
          "number-alpha",
        )}
      </div>

      <div class="my-3">
        <div class="font-bold text-center my-2">
          <p>PASAL 5</p>
          <p>Hak dan Kewajiban</p>
        </div>
        <div class="ml-6 flex gap-2">
          <div class="w-5">(1)</div>
          <div class="flex-1">
            <div class="font-bold">Pihak Pertama</div>
            <div class="ml-3 flex gap-2">
              <div class="w-5">(a)</div>
              <div class="flex-1">
                <div>Hak</div>
                <div class="ml-3">
                ${ListStyle(
                  [
                    `Memberikan tugas kepada PIHAK KEDUA secara langsung maupun melalui Kepala bagian Operasional ${process.env.NEXT_PUBLIC_APP_COMPANY_NAME}`,
                    `Menegur setiap saat bilamana PIHAK KEDUA tidak memenuhi Perjanjian Kontrak Kerja atau melakukan hal-hal yang tidak sesuai dengan etika/norma dan/atau melanggar hukum.`,
                    ` Pihak Pertama berhak untuk menerima hasil pelaksaan pekerjaan dari Pihak Kedua dengan Ruang Lingkup Pekerjaan sebagaimana diatur dalam Perjanjian.`,
                    `Perusahaan berhak untuk melakukan penempatan, pemindahan dan evaluasi Pihak Pertama dengan ketentuan sebagaimana diatur dalam Peraturan Perusahaan.`,
                    `Pihak Pertama berhak untuk melakukan Pemutusan Hubungan Kerja dengan Pihak Kedua dengan ketentuan sebagaimana diatur dalam peraturan ${process.env.NEXT_PUBLIC_APP_COMPANY_NAME}.`,
                  ],
                  "number",
                )}
                </div>
              </div>
            </div>
            <div class="ml-3 flex gap-2">
              <div class="w-5">(b)</div>
              <div class="flex-1">
                <div>Kewajiban</div>
                <div>Memberikan Upah sesuai kesepakatan yang dibayarkan terhitung sesuai dengan Perjanjian ini.</div>
              </div>
            </div>
          </div>
        </div>
        <div class="ml-6 flex gap-2">
          <div class="w-5">(2)</div>
          <div class="flex-1">
            <div class="font-bold">Pihak Kedua</div>
            <div class="ml-3 flex gap-2">
              <div class="w-5">(a)</div>
              <div class="flex-1">
                <div>Hak</div>
                <div class="ml-3">
                Menerima Upah dari PIHAK PERTAMA sesuai kesepakatan setiap tanggal 30 (Tiga Puluh) apabila tanggal tersebut jatuh pada hari berikutnya, maka dibayarkan pada hari kerja berikutnya/sebelumnya.
                </div>
              </div>
            </div>
            <div class="ml-3 flex gap-2">
              <div class="w-5">(b)</div>
              <div class="flex-1">
                <div>Kewajiban</div>
                <div class="ml-3">
                ${KewajibanPKWT(record)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="my-3">
        <div class="font-bold text-center my-2">
          <p>PASAL 6</p>
          <p>Upah</p>
        </div>
        <div class="ml-6">
          <div class="flex gap-2">
            <div class="w-5">(1)</div>
            <div class="flex-1">
              <p>PIHAK KEDUA menerima upah yang dibayarkan pada tanggal sesuai Pasal 5 Ayat (2) dari PIHAK PERTAMA. Dengan ketentuan :</p>
              ${ListStyle(
                [
                  `Bilamana setelah berlakunya PKWT ini tidak ada berkas pengajuan yang masuk maka gaji akan ditangguhkan ke bulan selanjutnya sampai ada berkas masuk.`,
                  `Bilamana selama 2 (Dua ) bulan berturut-turut tidak ada berkas pengajuan maka PIHAK PERTAMA berhak untuk membatalkan PKWT ini.`,
                ],
                "lower-alpha",
              )}
            </div>
          </div>
          <div class="flex gap-2">
            <div class="w-5">(2)</div>
            <div class="flex-1">
              <p>Besaran nilai Upah dimaksud pada Pasal 6 Ayat (1) Untuk Gaji Pokok sebesar Rp. ${IDRFormat(record.salary)},- (${NumberToWordsID(record.salary)} Rupiah) dan untuk Tunjangan Transportasi sebesar Rp. ${IDRFormat(record.t_transport)},- (${NumberToWordsID(record.t_transport)} Rupiah). </p>
            </div>
          </div>
        </div>
      </div>

      <div class="my-3">
        <div class="font-bold text-center my-2">
          <p>PASAL 7</p>
          <p>Tanggung Jawab</p>
        </div>
        ${ListStyle(
          [
            `${record.position === "SPV" ? "Apabila selama pihak kedua bekerja dengan pihak pertama ditemukan adanya suatu Fraud yang dilakukan oleh karyawan yang dibina oleh supervisor dicabang yang ditempatkan, maka suvervisor bertanggungjawab atas Tindakan yang dilakukan oleh karyawan yang dibina oleh supervisor." : "Apabila selama PIHAK KEDUA bekerja dengan PIHAK PERTAMA ditemukan adanya suatu fraud yang dilakukan oleh PIHAK KEDUA, maka PIHAK KEDUA wajib bertanggung jawab atas apa yang telah dilakukan."}`,
            `${record.position === "SPV" ? "Apabila selama pihak kedua bekerja dengan pihak pertama ditemukan adanya suatu Fraud yang dilakukan oleh pihak kedua, maka pihak kedua wajib bertanggung jawab atas apa yang telah dilakukan." : "PIHAK KEDUA wajib membereskan perihal tagiha manual apabila terdapat tagihan yang perlu dilakukan secara manual di setiap cabang terkait dengan koordinasi Bersama staff audit pusat."}`,
          ],
          "number-alpha",
        )}
      </div>

      <div class="my-3">
        <div class="font-bold text-center my-2">
          <p>PASAL 8</p>
          <p>Sanksi</p>
        </div>
        <p>Selama masa berlaku Perjanjian, PIHAK PERTAMA dapat memberikan sanksi teguran secara lisan, teguran tertulis apabila terbukti tidak memenuhi isi kesepakatan Perjanjian Kontrak Kerja tanpa tuntutan ganti rugi.</p>
      </div>

      <div class="my-3">
        <div class="font-bold text-center my-2">
          <p>PASAL 9</p>
          <p>Mangkir</p>
        </div>
        ${ListStyle(
          [
            `Dalam hal Pihak Kedua tidak masuk bekerja tanpa alasan yang sah atau hal-hal yang tidak dapat diterima alasannya oleh Pihak Pertama, maka dianggap mangkir (tidak masuk kerja)`,
            `Selama mangkir tersebut pada Ayat (1), upah tidak dibayar.`,
          ],
          "number-alpha",
        )}
      </div>

      <div class="my-3">
        <div class="font-bold text-center my-2">
          <p>PASAL 10</p>
          <p>Pemutusan Hubungan Kerja</p>
        </div>
        <div>
        <p>Pemutusan Hubungan Kerja (PHK) terhadap PIHAK KEDUA dapat dilaksanakan PIHAK PERTAMA apabila:</p>
        ${ListStyle(
          [
            `PIHAK KEDUA tidak memenuhi kewajibannya sebagai Pekerja Waktu Tertentu (Kontrak) sesuai tugas dan tanggung jawabnya.`,
            `PIHAK KEDUA melakukan Tindakan atau perbuatan melawan hukum sebagaimana disebutkan dalam KUHP dan Peraturan Perundangan lainnya.`,
            `Pemutusan hubungan kontrak kerja oleh PIHAK PERTAMA karena kesalahan PIHAK KEDUA berlaku sanksi sesuai dengan pasal 7 surat perjanjian kontrak kerja ini.`,
          ],
          "lower-alpha",
        )}
        </div>
      </div>

      <div class="my-3">
        <div class="font-bold text-center my-2">
          <p>PASAL 11</p>
          <p>Penyelesaian Masalah Hukum</p>
        </div>
        <div>
        ${ListStyle(
          [
            `Apabila terjadi ketidaksepahaman antara PIHAK PERTAMA dengan PIHAK KEDUA dalam kerangka perjanjian kontrak kerja ini maka akan diselesaikan secara musyawarah mufakat antara kedua belah pihak.`,
            `Apabila musyawarah mufakat tidak dapat memberikan penyelesaian maka permasalahan akan diproses sesuai dengan ketentuan hukum.`,
          ],
          "number-alpha",
        )}
        </div>
      </div>

      <div class="my-3">
        <div class="font-bold text-center my-2">
          <p>PASAL 12</p>
          <p>Penutup</p>
        </div>
        <div>
        ${ListStyle(
          [
            `Perjanjian ini berakhir pada waktu jatuh tempo yang telah ditentukan dalam Perjanjian Kontrak Kerja ini.`,
            `Hal-hal yang mungkin timbul sehubungan dengan pelaksanaan Perjanjian ini akan disesuaikan dan diatur bersama dan merupakan bagian yang mengikat serta tidak terpisahkan dari Perjanjian ini.`,
            `Demikian Surat Perjanjian Kerja ini dibuat dalam rangkap dua untuk kedua belah pihak dan memiliki kekuatan hukum yang sama serta disetujui dan ditandatangani diatas meterai oleh kedua belah pihak setelah dibaca dan dimengerti isinya untuk dilaksanakan sebagaimana mestinya tanpa ada paksaan dari pihak manapun.`,
          ],
          "number-alpha",
        )}
        </div>
      </div>


      <div class="mt-16">
        <div class="ml-24">Bandung, ${moment(record.start_pkwt).format("DD MMMM YYYY")}</div>
        <div class="flex justify-around font-bold">
          <div class="text-center">
            <p>PIHAK PERTAMA</p>
            <div class="h-36"></div>
            <div>
              <p class="underline font-bold">${process.env.NEXT_PUBLIC_APP_PKWT_NAME || "_____________________"}</p>
              <p>${process.env.NEXT_PUBLIC_APP_PKWT_POSITION || "_____________________"}<p>
            </div>
          </div>
          <div class="text-center">
            <p>PIHAK KEDUA</p>
            <div class="h-36"></div>
            <div>
              <p class="underline font-bold">${record.fullname || "_____________________"}</p>
              <p style={{margin-top: -5px}}>Karyawan</p>
            </div>
          </div>
      </div>
      </div>
      
    </div>

    </body>
  </html>
  `;

  return html;
};

export const printPKWT = (record: UserType) => {
  const htmlContent = generatePKWTHtml(record);

  const w = window.open("", "_blank", "width=900,height=1000");
  if (!w) {
    alert("Popup diblokir. Mohon izinkan popup dari situs ini.");
    return;
  }

  w.document.open();
  w.document.write(htmlContent);
  w.document.close();
  w.onload = function () {
    setTimeout(() => {
      w.print();
    }, 200);
  };
};

const KewajibanPKWT = (record: UserType) => {
  const data = {
    admin: [
      `Melaksanakan tugas yang dibebankan oleh PIHAK PERTAMA pada ${process.env.NEXT_PUBLIC_APP_COMPANY_NAME || "Perusahaan"}.`,
      `Mengikuti dan mentaati segala aturan yang berlaku di ${process.env.NEXT_PUBLIC_APP_COMPANY_NAME || "Perusahaan"}.`,
      `Melakukan Penginputan data pada sejumlah dokumen yang diajukan.`,
      `Bertanggung jawab Terkait Data yang akan diajukan ke setiap sumber dana yang ber PKS Dengan Koperasi Jasa Fadillah Aqila Sejahtra.`,
      `Melakukan Pengiriman Berkas ke sumber dana yang ber PKS dengan ${process.env.NEXT_PUBLIC_APP_COMPANY_NAME || "Perusahaan"}.`,
      `Melakukan cross cek pada setiap data pengajuan.`,
      `Melakukan perhitungan pembiayaan dari setiap cabang.`,
    ],
    moc: [
      `Melaksanakan tugas yang dibebankan oleh PIHAK PERTAMA pada ${process.env.NEXT_PUBLIC_APP_COMPANY_NAME || "Perusahaan"}.`,
      `Mengikuti dan mentaati segala aturan yang berlaku di ${process.env.NEXT_PUBLIC_APP_COMPANY_NAME || "Perusahaan"}.`,
      `Bertanggung jawab terkait data nasabah yang akan diajukan pada setiap sumber dana yang memiliki Perjanjian Kerja Sama dengan ${process.env.NEXT_PUBLIC_APP_COMPANY_NAME || "Perusahaan"}.`,
      `Melakukan kunjungan Bersama manajernya setiap Hari Kerja`,
    ],
    spv: [
      `Melaksanakan tugas yang dibebankan oleh PIHAK PERTAMA pada ${process.env.NEXT_PUBLIC_APP_COMPANY_NAME || "Perusahaan"}.`,
      `Mengikuti dan mentaati segala aturan yang berlaku di ${process.env.NEXT_PUBLIC_APP_COMPANY_NAME || "Perusahaan"}.`,
      `Memonitor Pengajuan Dari Cabang.`,
      `Bertanggung jawab Terkait Data yang akan diajukan ke setiap sumber dana yang ber PKS Dengan Koperasi Jasa Fadillah Aqila Sejahtra.`,
      `Mencari Calon Debitur`,
      `Melaksanakan transaksi pelunasan pencairan terkait dengan pengajuan Debitur`,
      `Mengejar Target yang telah ditetapkan manajemen ${process.env.NEXT_PUBLIC_APP_COMPANY_NAME || "Perusahaan"} Rp. ${IDRFormat(record.target)},- / bulan. `,
      `Memonitor Tagihan yang ada di wilayah cabang tempat ditugaskan.`,
    ],
  };
  return ListStyle(
    data[record.position?.toLowerCase() as keyof typeof data] || [],
    "number",
  );
};

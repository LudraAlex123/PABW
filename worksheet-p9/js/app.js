const profil = {
  nama: "Ludra Meyfano Sumarno",
  nim: "25523096",
  tahun: 2026,
  judul: "Jadwal dan Target Olahraga Saya",
  peran: "Saya adalah seorang atlet yang sedang berlatih untuk meningkatkan kemampuan fisik saya.",
  keahlian: ["Badminton", "Renang", "Basket"],
  hariLatihan: 4,
};

const kalimat = `Nama saya ${profil.nama}, dan saya punya ${profil.keahlian.length} keahlian.`;
console.log(kalimat);

console.log(profil.alamat?.kota ?? "belum diisi");

// 1. Menyusun kalimat perkenalan dari satu object
function buatPerkenalan({ nama, peran }) {
  return `${nama} — ${peran}`;
}

// 2. Merapikan daftar keahlian menjadi satu baris teks
const formatKeahlian = (daftar) => daftar.join(" · ");

console.log(buatPerkenalan(profil));
console.log(formatKeahlian(profil.keahlian));

const jadwalLatihan = [
  { hari: "Senin", jenis: "Berlari", durasi: 30, kalori: 300, selesai: true },
  { hari: "Selasa", jenis: "Angkat Beban", durasi: 45, kalori: 250, selesai: true },
  { hari: "Rabu", jenis: "Bersepeda", durasi: 60, kalori: 400, selesai: false },
  { hari: "Kamis", jenis: "Renang", durasi: 30, kalori: 350, selesai: false },
];
console.table(profil.keahlian);
console.table(jadwalLatihan);

const sudahSelesai = jadwalLatihan.filter((sesi) => sesi.selesai);
console.table(sudahSelesai);

const sesiRenang = jadwalLatihan.find((sesi) => sesi.jenis === "Renang");
console.log(sesiRenang);

const namaHari = jadwalLatihan.map((sesi) => sesi.hari);
console.log(namaHari);

const urut = [...jadwalLatihan].sort((a, b) => b.kalori - a.kalori);
console.table(urut);
console.table(jadwalLatihan);

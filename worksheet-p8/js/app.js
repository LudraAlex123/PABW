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
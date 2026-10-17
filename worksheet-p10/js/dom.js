import { jadwalLatihan } from "./app.js";

// ---------- A. Ambil elemen ----------
const container = document.querySelector("#daftar-jadwal");
const filterRow = document.querySelector("#filter");
const empty = document.querySelector("#pesan-kosong");
const form = document.querySelector("#form-target");
const namaInput = document.querySelector("#nama-kolom");
const durasiInput = document.querySelector("#durasi-kolom");
const kaloriInput = document.querySelector("#kalori-kolom");
const tombolSimpan = form.querySelector('button[type="submit"]');

// ---------- B. Bangun satu baris tabel dari satu sesi ----------
function buildRow(sesi) {
  const tr = document.createElement("tr");

  const hari = document.createElement("th");
  hari.scope = "row";
  hari.textContent = sesi.hari;

  const jenis = document.createElement("td");
  jenis.textContent = sesi.jenis;

  const durasi = document.createElement("td");
  durasi.textContent = `${sesi.durasi} menit`;

  const kalori = document.createElement("td");
  kalori.textContent = `${sesi.kalori} kalori`;

  tr.append(hari, jenis, durasi, kalori);
  return tr;
}

// ---------- D.1 Satu fungsi render untuk tabel ----------
function render(list) {
  container.textContent = "";            // 1. kosongkan dulu

  if (list.length === 0) {               // 2. cek kondisi kosong
    empty.hidden = false;
    return;
  }
  empty.hidden = true;

  const fragment = document.createDocumentFragment();   // 3. isi ulang
  list.forEach((sesi) => fragment.append(buildRow(sesi)));
  container.append(fragment);
}

render(jadwalLatihan);

// ---------- C. Filter kategori (satu listener di induk) ----------
function markActiveButton(activeButton) {
  document.querySelectorAll("#filter button").forEach((button) => {
    button.classList.toggle("active", button === activeButton);
  });
}

filterRow.addEventListener("click", (event) => {
  const button = event.target.closest("button");
  if (!button) return;

  const category = button.dataset.category;
  const terpilih = jadwalLatihan.filter(
    (sesi) => category === "all" || sesi.kategori === category
  );

  markActiveButton(button);
  render(terpilih);
});

// ---------- D.2 Form ----------
document.querySelectorAll(".pesan-galat").forEach((pesan) => {
  pesan.hidden = true;                          // semua pesan tersembunyi dulu
});

const aturan = [
  { input: namaInput,   valid: (v) => v.trim() !== "" },
  { input: durasiInput, valid: (v) => v.trim() !== "" && Number(v) > 0 },
  { input: kaloriInput, valid: (v) => v.trim() !== "" && Number(v) > 0 },
];

function tandai(input, valid) {
  const pesan = input.parentElement.querySelector(".pesan-galat");
  pesan.hidden = valid;
  input.setAttribute("aria-invalid", String(!valid));
}

function semuaValid() {
  return aturan.every(({ input, valid }) => valid(input.value));
}

function perbaruiTombol() {
  tombolSimpan.disabled = !semuaValid();
}

function validasiSemua() {
  let pertamaGagal = null;

  aturan.forEach(({ input, valid }) => {
    const ok = valid(input.value);
    tandai(input, ok);
    if (!ok && !pertamaGagal) pertamaGagal = input;
  });

  if (pertamaGagal) pertamaGagal.focus();
  perbaruiTombol();
  return pertamaGagal === null;
}

// Validasi langsung saat mengetik: satu listener di form, di luar fungsi lain
form.addEventListener("input", (event) => {
  const kolom = aturan.find(({ input }) => input === event.target);
  if (!kolom) return;

  tandai(kolom.input, kolom.valid(kolom.input.value));
  perbaruiTombol();
});

form.addEventListener("submit", (event) => {
  event.preventDefault();                       // tetap baris pertama
  if (!validasiSemua()) return;
  console.log("Form valid:", namaInput.value.trim(), durasiInput.value, kaloriInput.value);
});
import { jadwalLatihan } from "./app.js";
console.log(jadwalLatihan);

const container = document.querySelector("#daftar-jadwal");
const filterRow = document.querySelector("#filter");
const empty = document.querySelector("#pesan-kosong");
const form = document.querySelector("#form-target");
const namaInput = document.querySelector("#nama-kolom");
const durasiInput = document.querySelector("#durasi-kolom");
const kaloriInput = document.querySelector("#kalori-kolom");

console.log(container, filterRow, empty, form, namaInput, durasiInput, kaloriInput);

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

function renderJadwal(data) {
  container.textContent = "";

  const fragment = document.createDocumentFragment();
  data.forEach((sesi) => fragment.append(buildRow(sesi)));
  container.append(fragment);

  empty.hidden = data.length > 0;
}

renderJadwal(jadwalLatihan);

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
  renderJadwal(terpilih);

  renderJadwal(terpilih);
});
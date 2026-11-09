import { readFile } from "node:fs/promises";
import path from "node:path";

type Fitur = boolean | string;
type Produk = {
  id: string;
  nama: string;
  ringkas: string;
  cocokUntuk: string;
  label: string;
  manfaat: string[];
  fitur: Record<string, Fitur>;
};
type Data = {
  catatan: string;
  perluasan: string[];
  produk: Produk[];
  baris: { key: string; label: string }[];
};

function Cell({ v }: { v: Fitur }) {
  if (v === true)
    return (
      <span className="inline-flex items-center gap-1.5 font-semibold text-emerald-700">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 6L9 17l-5-5" /></svg>
        Ya
      </span>
    );
  if (v === false)
    return (
      <span className="inline-flex items-center gap-1.5 text-slate-400">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" /></svg>
        Tidak
      </span>
    );
  return <span className="text-sm text-slate-600">{v}</span>;
}

export default async function ProdukSection() {
  const data: Data = JSON.parse(
    await readFile(path.join(process.cwd(), "public", "data", "produk-asuransi.json"), "utf8"),
  );

  return (
    <section id="produk" className="scroll-mt-16 px-4 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <p className="text-sm font-bold uppercase tracking-wider text-brand-600">Produk Asuransi</p>
        <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900">Pilih Perlindungan yang Sesuai</h2>
        <p className="mt-3 max-w-2xl text-slate-600">
          Bandingkan manfaat dan cakupan, lalu konsultasikan pilihan terbaik untuk kendaraan Anda.
        </p>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          {data.produk.map((p) => (
            <article key={p.id} className="flex flex-col rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
              <span className="w-fit rounded-full bg-brand-100 px-3 py-1 text-xs font-bold text-brand-800">{p.label}</span>
              <h3 className="mt-3 text-xl font-extrabold text-slate-900">{p.nama}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-slate-500">{p.ringkas}</p>
              <p className="mt-3 text-sm text-slate-600"><strong className="text-slate-800">Cocok untuk:</strong> {p.cocokUntuk}</p>
              <h4 className="mt-5 text-sm font-bold uppercase tracking-wide text-brand-800">Manfaat &amp; Cakupan</h4>
              <ul className="mt-3 space-y-2.5">
                {p.manfaat.map((m) => (
                  <li key={m} className="flex gap-2.5 text-[15px] leading-snug text-slate-700">
                    <svg className="mt-0.5 shrink-0 text-brand-600" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 6L9 17l-5-5" /></svg>
                    {m}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <div className="mt-6 rounded-2xl bg-brand-50 p-6">
          <h3 className="font-extrabold text-slate-900">Perluasan Jaminan (Opsional)</h3>
          <ul className="mt-3 grid gap-x-8 gap-y-2 text-sm text-slate-700 sm:grid-cols-2">
            {data.perluasan.map((x) => (
              <li key={x} className="flex gap-2"><span className="text-brand-600">+</span>{x}</li>
            ))}
          </ul>
        </div>

        <h3 className="mt-14 text-xl font-extrabold text-slate-900">Bandingkan Produk</h3>
        <div className="mt-6 overflow-x-auto rounded-2xl border border-slate-200 bg-white">
          <table className="w-full min-w-[520px] text-left">
            <thead className="bg-brand-50 text-brand-900">
              <tr>
                <th className="px-4 py-4 text-xs font-bold uppercase tracking-wide sm:px-6">Cakupan</th>
                {data.produk.map((p) => (
                  <th key={p.id} className="px-4 py-4 text-sm font-extrabold sm:px-6">{p.nama}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {data.baris.map((b) => (
                <tr key={b.key} className="even:bg-slate-50/50">
                  <th scope="row" className="px-4 py-3.5 text-sm font-semibold text-slate-700 sm:px-6">{b.label}</th>
                  {data.produk.map((p) => (
                    <td key={p.id} className="px-4 py-3.5 sm:px-6"><Cell v={p.fitur[b.key]} /></td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-sm leading-relaxed text-slate-500">{data.catatan}</p>
      </div>
    </section>
  );
}

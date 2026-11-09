"use client";

import { useState } from "react";
import { SITE, buildDokuUrl, formatRupiah, waLink } from "@/lib/site";

const MIN_NOMINAL = 10000;
const QUICK = [500000, 1000000, 2500000, 5000000];

type Errors = Partial<Record<"nama" | "hp" | "email" | "nominal", string>>;

export default function PaymentForm() {
  const [nama, setNama] = useState("");
  const [hp, setHp] = useState("");
  const [email, setEmail] = useState("");
  const [keterangan, setKeterangan] = useState("");
  const [nominalRaw, setNominalRaw] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [notice, setNotice] = useState<string | null>(null);

  const nominal = Number(nominalRaw) || 0;
  const nominalDisplay = nominalRaw ? new Intl.NumberFormat("id-ID").format(nominal) : "";

  function validate(): Errors {
    const e: Errors = {};
    if (nama.trim().length < 3) e.nama = "Masukkan nama lengkap.";
    if (!/^(\+62|62|0)8\d{7,12}$/.test(hp.replace(/[\s-]/g, ""))) e.hp = "Nomor HP tidak valid (contoh: 081234567890).";
    if (email && !/^\S+@\S+\.\S+$/.test(email)) e.email = "Format email tidak valid.";
    if (nominal < MIN_NOMINAL) e.nominal = `Nominal minimal ${formatRupiah(MIN_NOMINAL)}.`;
    return e;
  }

  function onSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    setNotice(null);
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) return;

    const url = buildDokuUrl({ nama: nama.trim(), nominal });
    if (!url) {
      setNotice("Pembayaran online belum diaktifkan. Silakan hubungi kami untuk bantuan pembayaran.");
      return;
    }
    window.location.assign(url);
  }

  const help = waLink(`Halo ${SITE.name}, saya ingin bertanya tentang pembayaran.`);
  const field = (err?: string) =>
    `mt-1.5 w-full rounded-xl border bg-white px-4 py-3 text-[15px] outline-none transition focus:ring-4 ${
      err ? "border-red-400 focus:border-red-500 focus:ring-red-100" : "border-slate-200 focus:border-brand-500 focus:ring-brand-100"
    }`;

  return (
    <section className="mx-auto max-w-xl px-4 py-10 sm:px-6 sm:py-14">
      <form onSubmit={onSubmit} noValidate className="space-y-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <div>
          <label htmlFor="nama" className="text-sm font-semibold text-slate-700">Nama Lengkap</label>
          <input id="nama" value={nama} onChange={(e) => setNama(e.target.value)} autoComplete="name" className={field(errors.nama)} />
          {errors.nama && <p className="mt-1 text-sm text-red-600">{errors.nama}</p>}
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="hp" className="text-sm font-semibold text-slate-700">Nomor HP</label>
            <input id="hp" type="tel" inputMode="tel" value={hp} onChange={(e) => setHp(e.target.value)} autoComplete="tel" className={field(errors.hp)} />
            {errors.hp && <p className="mt-1 text-sm text-red-600">{errors.hp}</p>}
          </div>
          <div>
            <label htmlFor="email" className="text-sm font-semibold text-slate-700">Email <span className="font-normal text-slate-400">(opsional)</span></label>
            <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" className={field(errors.email)} />
            {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
          </div>
        </div>

        <div>
          <label htmlFor="ket" className="text-sm font-semibold text-slate-700">Keterangan <span className="font-normal text-slate-400">(opsional, mis. nomor polis)</span></label>
          <input id="ket" value={keterangan} onChange={(e) => setKeterangan(e.target.value)} className={field()} />
        </div>

        <div>
          <label htmlFor="nominal" className="text-sm font-semibold text-slate-700">Nominal Pembayaran</label>
          <div className="relative">
            <span className="pointer-events-none absolute left-4 top-1/2 mt-0.5 -translate-y-1/2 font-semibold text-slate-500">Rp</span>
            <input
              id="nominal"
              inputMode="numeric"
              value={nominalDisplay}
              onChange={(e) => setNominalRaw(e.target.value.replace(/\D/g, "").slice(0, 12))}
              placeholder="0"
              className={`${field(errors.nominal)} pl-11 text-lg font-bold`}
            />
          </div>
          {errors.nominal && <p className="mt-1 text-sm text-red-600">{errors.nominal}</p>}
          <div className="mt-3 flex flex-wrap gap-2">
            {QUICK.map((q) => (
              <button type="button" key={q} onClick={() => setNominalRaw(String(q))} className="rounded-full border border-slate-200 px-3 py-1.5 text-sm font-semibold text-slate-600 hover:border-brand-300 hover:bg-brand-50">
                {formatRupiah(q)}
              </button>
            ))}
          </div>
        </div>

        {notice && (
          <p role="alert" className="rounded-xl border border-amber-200 bg-amber-50 p-3.5 text-sm text-amber-900">{notice}</p>
        )}

        <button type="submit" className="w-full rounded-xl bg-brand-600 px-6 py-4 font-bold text-white shadow-lg shadow-brand-600/25 transition hover:bg-brand-700">
          Lanjut ke Pembayaran DOKU
        </button>
        <p className="text-center text-xs text-slate-400">
          Anda akan diarahkan ke halaman pembayaran DOKU. Data kartu/rekening tidak diproses di website ini.
        </p>
      </form>

      {help && (
        <p className="mt-6 text-center text-sm text-slate-500">
          Butuh bantuan?{" "}
          <a href={help} target="_blank" rel="noopener noreferrer" className="font-bold text-brand-600 hover:underline">
            Chat kami di WhatsApp
          </a>
        </p>
      )}
    </section>
  );
}

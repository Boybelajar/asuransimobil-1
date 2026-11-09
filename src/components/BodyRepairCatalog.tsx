"use client";

import { useEffect, useMemo, useState } from "react";
import { formatRupiah, SITE } from "@/lib/site";
import WaLink from "./WaLink";
import { WA_ICON } from "./WhatsAppFloat";

type Item = { id: number; nama: string; kategori: string; biaya: number };
type Payload = { judul: string; catatan?: string[]; items: Item[] };
type Sort = "default" | "termurah" | "termahal" | "nama";

const PAGE_SIZE = 20;
const ALL = "Semua";

function pageList(current: number, total: number): (number | "…")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const sorted = [...new Set([1, total, current - 1, current, current + 1])]
    .filter((p) => p >= 1 && p <= total)
    .sort((a, b) => a - b);
  const out: (number | "…")[] = [];
  sorted.forEach((p, i) => {
    if (i > 0 && p - sorted[i - 1] > 1) out.push("…");
    out.push(p);
  });
  return out;
}

const escapeRe = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

function Highlight({ text, tokens }: { text: string; tokens: string[] }) {
  if (tokens.length === 0) return <>{text}</>;
  const re = new RegExp(`(${tokens.map(escapeRe).join("|")})`, "gi");
  return (
    <>
      {text.split(re).map((part, i) =>
        i % 2 === 1 ? (
          <mark key={i} className="rounded bg-yellow-200 px-0.5 text-inherit">
            {part}
          </mark>
        ) : (
          part
        ),
      )}
    </>
  );
}

export default function BodyRepairCatalog() {
  const [data, setData] = useState<Payload | null>(null);
  const [error, setError] = useState(false);
  const [query, setQuery] = useState("");
  const [kategori, setKategori] = useState(ALL);
  const [sort, setSort] = useState<Sort>("default");
  const [page, setPage] = useState(1);

  useEffect(() => {
    let cancelled = false;
    fetch("/data/katalog-body-repair.json")
      .then((r) => {
        if (!r.ok) throw new Error(String(r.status));
        return r.json() as Promise<Payload>;
      })
      .then((d) => !cancelled && setData(d))
      .catch(() => !cancelled && setError(true));
    return () => {
      cancelled = true;
    };
  }, []);

  const items = data?.items;

  const categories = useMemo(() => {
    const counts = new Map<string, number>();
    (items ?? []).forEach((i) => counts.set(i.kategori, (counts.get(i.kategori) ?? 0) + 1));
    return [
      { name: ALL, count: items?.length ?? 0 },
      ...[...counts.entries()].map(([name, count]) => ({ name, count })),
    ];
  }, [items]);

  const tokens = useMemo(() => query.trim().toLowerCase().split(/\s+/).filter(Boolean), [query]);

  const filtered = useMemo(() => {
    const list = (items ?? []).filter((i) => {
      if (kategori !== ALL && i.kategori !== kategori) return false;
      const n = i.nama.toLowerCase();
      return tokens.every((t) => n.includes(t));
    });
    if (sort === "termurah") list.sort((a, b) => a.biaya - b.biaya || a.nama.localeCompare(b.nama));
    else if (sort === "termahal") list.sort((a, b) => b.biaya - a.biaya || a.nama.localeCompare(b.nama));
    else if (sort === "nama") list.sort((a, b) => a.nama.localeCompare(b.nama));
    return list;
  }, [items, kategori, tokens, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const current = Math.min(page, totalPages);
  const start = (current - 1) * PAGE_SIZE;
  const rows = filtered.slice(start, start + PAGE_SIZE);
  const isFiltered = query !== "" || kategori !== ALL || sort !== "default";

  const goto = (p: number) => {
    setPage(p);
    document.getElementById("katalog")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  const reset = () => {
    setQuery("");
    setKategori(ALL);
    setSort("default");
    setPage(1);
  };

  return (
    <section id="katalog" className="mx-auto max-w-5xl scroll-mt-20 px-4 py-8 sm:px-6 sm:py-12">
      {/* Catatan penting */}
      {data?.catatan && data.catatan.length > 0 && (
        <aside className="mb-6 rounded-2xl border border-amber-200 bg-amber-50 p-4 sm:p-5">
          <h2 className="flex items-center gap-2 text-sm font-bold text-amber-900">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 16v-4M12 8h.01" />
            </svg>
            Catatan Penting
          </h2>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-relaxed text-amber-900/90">
            {data.catatan.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </aside>
      )}

      {/* Pencarian + urutan */}
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <svg className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            <circle cx="11" cy="11" r="7" />
            <path d="M21 21l-4.3-4.3" />
          </svg>
          <input
            type="text"
            inputMode="search"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setPage(1);
            }}
            placeholder="Cari panel, mis. “pintu depan kanan”"
            aria-label="Cari nama panel"
            className="w-full rounded-xl border border-slate-200 bg-white py-3.5 pl-11 pr-11 text-[15px] shadow-sm outline-none transition focus:border-brand-500 focus:ring-4 focus:ring-brand-100"
          />
          {query && (
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setPage(1);
              }}
              aria-label="Hapus pencarian"
              className="absolute right-2.5 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-600"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
          )}
        </div>
        <select
          value={sort}
          onChange={(e) => {
            setSort(e.target.value as Sort);
            setPage(1);
          }}
          aria-label="Urutkan"
          className="rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm font-semibold text-slate-700 shadow-sm outline-none transition focus:border-brand-500 focus:ring-4 focus:ring-brand-100 sm:w-52"
        >
          <option value="default">Urutan daftar</option>
          <option value="termurah">Harga terendah</option>
          <option value="termahal">Harga tertinggi</option>
          <option value="nama">Nama A–Z</option>
        </select>
      </div>

      {/* Chip kategori */}
      <div className="-mx-4 mt-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:px-0" role="tablist" aria-label="Filter kategori">
        <div className="flex gap-2 sm:flex-wrap">
          {categories.map((c) => {
            const active = kategori === c.name;
            return (
              <button
                key={c.name}
                role="tab"
                aria-selected={active}
                onClick={() => {
                  setKategori(c.name);
                  setPage(1);
                }}
                className={`shrink-0 whitespace-nowrap rounded-full border px-3.5 py-1.5 text-sm font-semibold transition ${
                  active
                    ? "border-brand-600 bg-brand-600 text-white shadow-sm"
                    : "border-slate-200 bg-white text-slate-600 hover:border-brand-300 hover:bg-brand-50"
                }`}
              >
                {c.name === ALL ? "Semua Kategori" : c.name}
                <span className={`ml-1.5 text-xs ${active ? "text-brand-100" : "text-slate-400"}`}>{c.count}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Ringkasan hasil */}
      <div className="mt-3 flex items-center justify-between text-sm text-slate-500" aria-live="polite">
        <span>
          {items ? (
            <>
              <strong className="text-slate-700">{filtered.length}</strong> jasa ditemukan
            </>
          ) : (
            " "
          )}
        </span>
        {isFiltered && (
          <button onClick={reset} className="font-semibold text-brand-600 hover:underline">
            Reset filter
          </button>
        )}
      </div>

      {/* Tabel */}
      <div className="mt-3 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <table className="w-full text-left">
          <thead className="bg-brand-50 text-xs uppercase tracking-wide text-brand-800">
            <tr>
              <th className="w-12 px-3 py-3 font-bold sm:w-16 sm:px-6">No</th>
              <th className="px-3 py-3 font-bold sm:px-6">Nama Panel</th>
              <th className="whitespace-nowrap px-3 py-3 text-right font-bold sm:px-6">Biaya Perbaikan</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {!items && !error &&
              Array.from({ length: 8 }).map((_, i) => (
                <tr key={i} aria-hidden="true">
                  <td colSpan={3} className="px-6 py-4">
                    <div className="h-5 animate-pulse rounded bg-slate-100" />
                  </td>
                </tr>
              ))}
            {error && (
              <tr>
                <td colSpan={3} className="px-6 py-12 text-center text-red-600">
                  Data harga gagal dimuat. Silakan muat ulang halaman.
                </td>
              </tr>
            )}
            {items && rows.length === 0 && (
              <tr>
                <td colSpan={3} className="px-6 py-14 text-center">
                  <p className="font-semibold text-slate-700">Tidak ada jasa yang cocok.</p>
                  <p className="mt-1 text-sm text-slate-500">Coba kata kunci lain atau pilih kategori berbeda.</p>
                  <button onClick={reset} className="mt-4 rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700">
                    Reset filter
                  </button>
                </td>
              </tr>
            )}
            {rows.map((it, idx) => (
              <tr key={it.id} className="transition-colors even:bg-slate-50/50 hover:bg-brand-50">
                <td className="px-3 py-3.5 align-top text-sm text-slate-400 sm:px-6">{start + idx + 1}</td>
                <td className="px-3 py-3.5 sm:px-6">
                  <div className="text-[15px] font-semibold leading-snug text-slate-800">
                    <Highlight text={it.nama} tokens={tokens} />
                  </div>
                  <div className="mt-0.5 text-xs text-slate-400">{it.kategori}</div>
                </td>
                <td className="whitespace-nowrap px-3 py-3.5 text-right align-top text-[15px] font-bold text-brand-700 sm:px-6">
                  {formatRupiah(it.biaya)}
                  <WaLink
                    message={`Halo ${SITE.name}, saya ingin bertanya tentang jasa body repair "${it.nama}" (${formatRupiah(it.biaya)}).`}
                    label={`Tanya via WhatsApp: ${it.nama}`}
                    className="mt-1 flex items-center justify-end gap-1 text-xs font-semibold text-emerald-600 hover:underline"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d={WA_ICON} /></svg>
                    Tanya
                  </WaLink>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {items && filtered.length > 0 && (
        <div className="mt-5 flex flex-col items-center justify-between gap-3 sm:flex-row">
          <p className="text-sm text-slate-500">
            Menampilkan {start + 1}–{start + rows.length} dari {filtered.length}
          </p>
          <nav aria-label="Pagination" className="flex flex-wrap items-center justify-center gap-1.5">
            <button
              onClick={() => goto(current - 1)}
              disabled={current === 1}
              className="h-10 rounded-lg border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-600 enabled:hover:bg-brand-50 disabled:opacity-40"
            >
              ‹<span className="hidden sm:inline"> Sebelumnya</span>
            </button>
            {pageList(current, totalPages).map((p, i) =>
              p === "…" ? (
                <span key={`e${i}`} className="px-1 text-slate-400">…</span>
              ) : (
                <button
                  key={p}
                  onClick={() => goto(p)}
                  aria-current={p === current ? "page" : undefined}
                  className={`h-10 min-w-10 rounded-lg border px-2 text-sm font-semibold ${
                    p === current
                      ? "border-brand-600 bg-brand-600 text-white"
                      : "border-slate-200 bg-white text-slate-600 hover:bg-brand-50"
                  }`}
                >
                  {p}
                </button>
              ),
            )}
            <button
              onClick={() => goto(current + 1)}
              disabled={current === totalPages}
              className="h-10 rounded-lg border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-600 enabled:hover:bg-brand-50 disabled:opacity-40"
            >
              <span className="hidden sm:inline">Berikutnya </span>›
            </button>
          </nav>
        </div>
      )}
    </section>
  );
}

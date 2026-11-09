import Link from "next/link";
import HeroSlideshow from "@/components/home/HeroSlideshow";
import ProfilSection from "@/components/home/ProfilSection";
import ProdukSection from "@/components/home/ProdukSection";
import { SITE } from "@/lib/site";

const SHORTCUTS = [
  {
    href: "/katalog-body-repair",
    title: "Katalog Body Repair",
    desc: "Cek biaya perbaikan 235 jenis panel kendaraan. Cari dan filter dengan mudah.",
    cta: "Lihat Katalog",
    icon: "M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z",
  },
  {
    href: "/pembayaran",
    title: "Pembayaran",
    desc: "Bayar asuransi atau biaya body repair secara online dengan aman melalui DOKU.",
    cta: "Bayar Sekarang",
    icon: "M2 6h20v12H2zM2 10h20",
  },
];

export default function Home() {
  return (
    <>
      {/* HERO: gambar slideshow memenuhi lebar, gradasi putih transparan di sisi teks (seperti mockup) */}
      <section id="beranda" className="px-4 pt-5 sm:px-6 sm:pt-8">
       <div className="relative mx-auto flex min-h-[480px] max-w-6xl items-center overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm md:min-h-[560px]">
        <HeroSlideshow />
        <div className="relative z-10 w-full px-6 py-12 sm:px-10 md:px-14 md:py-16">
          <div className="max-w-xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-brand-600/10 px-4 py-1.5 text-[13px] font-bold text-brand-600 backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-600" />
              {SITE.tagline} Terpercaya
            </span>
            <h1 className="mt-5 text-4xl font-extrabold leading-[1.1] tracking-tight text-slate-900 sm:text-5xl lg:text-[3.4rem]">
              Perlindungan terbaik untuk kendaraan Anda.
            </h1>
            <p className="mt-5 max-w-md text-base leading-relaxed text-slate-700 sm:text-[17px]">
              Asuransi mobil dan layanan body repair yang transparan, dengan proses jelas dan konsultasi yang mudah.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#profil" className="rounded-xl bg-brand-600 px-7 py-3.5 text-[15px] font-bold text-white shadow-lg shadow-brand-600/30 transition hover:bg-brand-700">
                Kenali Kami
              </a>
              <a href="#produk" className="rounded-xl border-[1.5px] border-brand-600 bg-white/90 px-7 py-3.5 text-[15px] font-bold text-brand-600 backdrop-blur-sm transition hover:bg-brand-50">
                Produk Asuransi
              </a>
            </div>
          </div>
        </div>
       </div>
      </section>

      <ProfilSection />
      <ProdukSection />

      {/* Bagian bawah: pintasan + gambar hiasan */}
      <section id="layanan-lain" aria-labelledby="layanan-lain-title" className="scroll-mt-16 bg-white px-4 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-4xl">
          <div>
            <h2 id="layanan-lain-title" className="text-3xl font-extrabold tracking-tight text-slate-900">
              Butuh Perbaikan atau Ingin Membayar?
            </h2>
            <p className="mt-3 max-w-lg text-slate-600">
              Lihat estimasi biaya body repair atau lakukan pembayaran secara online.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {SHORTCUTS.map((s) => (
                <Link key={s.href} href={s.href} className="group flex gap-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-lg shadow-slate-900/5 transition hover:-translate-y-0.5 hover:border-brand-300">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[14px] bg-brand-200">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d={s.icon} />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-extrabold text-slate-900">{s.title}</h3>
                    <p className="mt-1 text-[15px] leading-relaxed text-slate-500">{s.desc}</p>
                    <span className="mt-3 inline-block text-sm font-bold text-brand-600 group-hover:underline">{s.cta} →</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

        </div>
      </section>
    </>
  );
}

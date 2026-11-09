import Image from "next/image";
import { SITE } from "@/lib/site";

const LAYANAN = [
  { t: "Asuransi Mobil", d: "Proteksi kendaraan Anda dari risiko kecelakaan, kehilangan, dan kerusakan dengan pilihan produk yang fleksibel.", icon: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" },
  { t: "Klaim & Body Repair", d: "Pendampingan klaim dan perbaikan bodi kendaraan di jaringan bengkel rekanan di seluruh Indonesia.", icon: "M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" },
  { t: "Katalog Harga Transparan", d: "Biaya jasa body repair per panel dapat dilihat terbuka, sehingga Anda tahu estimasi sebelum perbaikan dimulai.", icon: "M9 12h6M9 16h6M9 8h6M5 3h14v18H5z" },
  { t: "Konsultasi", d: "Tim kami siap membantu memilih produk dan menjawab pertanyaan seputar proteksi kendaraan Anda.", icon: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" },
];

const KEUNGGULAN = [
  { t: "Harga Terbuka", d: "Daftar harga body repair dipublikasikan dan mudah dicari." },
  { t: "Bengkel Rekanan Luas", d: "Harga berlaku untuk bengkel rekanan di seluruh wilayah Indonesia." },
  { t: "Proses Jelas", d: "Alur klaim dan perbaikan yang mudah dipahami dari awal hingga selesai." },
  { t: "Mudah Dihubungi", d: "Konsultasi langsung dengan tim kami kapan pun Anda butuh bantuan." },
];

export default function ProfilSection() {
  return (
    <section id="profil" className="scroll-mt-16 bg-white px-4 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="relative mx-auto w-full max-w-md lg:max-w-none">
            <div className="absolute -bottom-3 -left-3 h-full w-full rounded-[20px] bg-brand-200" aria-hidden="true" />
            <div className="relative aspect-[4/5] overflow-hidden rounded-[20px]">
              <Image
                src="/images/keluarga.jpg"
                alt="Keluarga berkendara dengan tenang dan aman"
                fill
                sizes="(min-width: 1024px) 560px, 90vw"
                className="object-cover"
                style={{ objectPosition: "center 40%" }}
              />
            </div>
          </div>
          <div>
            <p className="text-sm font-bold uppercase tracking-wider text-brand-600">Profil</p>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900">Tentang {SITE.name}</h2>
            <div className="mt-4 space-y-4 text-base leading-relaxed text-slate-600">
              <p>
                {SITE.name} hadir untuk membantu pemilik kendaraan mendapatkan perlindungan asuransi mobil dan layanan
                perbaikan bodi yang dapat diandalkan.
              </p>
              <p>
                Kami percaya proteksi kendaraan seharusnya mudah dipahami. Karena itu kami membuka daftar harga body
                repair secara terang, menjelaskan cakupan produk dengan bahasa sederhana, dan siap mendampingi Anda saat
                membutuhkan klaim.
              </p>
            </div>
          </div>
        </div>

        <h3 className="mt-14 text-xl font-extrabold text-slate-900">Layanan Kami</h3>
        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          {LAYANAN.map((l) => (
            <div key={l.t} className="rounded-2xl border border-slate-200 bg-white p-7">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-[14px] bg-brand-200">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d={l.icon} />
                </svg>
              </div>
              <h4 className="text-lg font-extrabold text-slate-900">{l.t}</h4>
              <p className="mt-2 text-[15px] leading-relaxed text-slate-500">{l.d}</p>
            </div>
          ))}
        </div>

        <h3 className="mt-14 text-xl font-extrabold text-slate-900">Keunggulan Kami</h3>
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {KEUNGGULAN.map((k) => (
            <div key={k.t} className="rounded-2xl bg-brand-50 p-6">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M20 6L9 17l-5-5" />
              </svg>
              <h4 className="mt-3 font-extrabold text-slate-900">{k.t}</h4>
              <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{k.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

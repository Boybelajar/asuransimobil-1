export const SITE = {
  name: "Sahabat Proteksi Mobil",
  tagline: "Jasa Asuransi Mobil",

  // ============================================================
  // ISI DI SINI (menyusul dari client)
  // ============================================================

  // Nomor WhatsApp resmi: format internasional, tanpa "+" dan tanpa spasi.
  // Contoh: "6281234567890". Kosongkan ("") = tombol tampil dengan pemberitahuan "belum diatur" (mode demo).
  whatsapp: "",

  // Link pembayaran DOKU (Payment Link). Kosongkan ("") = form menampilkan
  // pesan "pembayaran online belum aktif" dan tidak melakukan redirect.
  dokuPaymentUrl: "",
};

// Menu utama. Item ber-"#" menggulir ke bagian di halaman depan.
export const NAV_LINKS = [
  { href: "/", label: "Beranda" },
  { href: "/#profil", label: "Profil" },
  { href: "/#produk", label: "Produk Asuransi" },
  { href: "/katalog-body-repair", label: "Katalog Body Repair" },
];

export const formatRupiah = (n: number) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(n);

/** Link chat WhatsApp dengan pesan awal otomatis. null jika nomor belum diisi. */
export function waLink(message: string): string | null {
  if (!SITE.whatsapp) return null;
  return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(message)}`;
}

/** Pesan awal otomatis per halaman untuk tombol WhatsApp melayang. */
export function waMessageForPath(pathname: string): string {
  const hi = `Halo ${SITE.name}, `;
  if (pathname.startsWith("/katalog-body-repair")) return hi + "saya ingin bertanya tentang jasa body repair.";
  if (pathname.startsWith("/pembayaran")) return hi + "saya ingin bertanya tentang pembayaran.";
  return hi + "saya ingin konsultasi tentang asuransi mobil.";
}

/**
 * Membuat URL tujuan DOKU. Saat ini hanya mengarah ke link pembayaran apa adanya
 * (data pembayar & nominal diinput ulang di halaman DOKU). Jika nanti DOKU
 * mendukung parameter (mis. nominal), sesuaikan di sini.
 */
export function buildDokuUrl(_data: { nama: string; nominal: number }): string | null {
  return SITE.dokuPaymentUrl || null;
}

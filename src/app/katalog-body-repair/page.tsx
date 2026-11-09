import type { Metadata } from "next";
import BodyRepairCatalog from "@/components/BodyRepairCatalog";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Katalog Body Repair",
  description: "Daftar harga jasa perbaikan bodi kendaraan PT Asuransi Sahabat Artha Proteksi, lengkap dengan pencarian dan filter kategori.",
};

export default function KatalogBodyRepairPage() {
  return (
    <>
      <PageHero
        badge="Katalog Body Repair"
        title="Daftar Harga Jasa Body Repair"
        subtitle="PT Asuransi Sahabat Artha Proteksi"
      />
      <BodyRepairCatalog />
    </>
  );
}

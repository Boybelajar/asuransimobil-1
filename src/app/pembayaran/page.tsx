import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import PaymentForm from "@/components/PaymentForm";

export const metadata: Metadata = {
  title: "Pembayaran",
  description: "Pembayaran asuransi dan biaya body repair secara online melalui DOKU.",
};

export default function PembayaranPage() {
  return (
    <>
      <PageHero badge="Pembayaran" title="Pembayaran Asuransi & Body Repair" subtitle="Isi data Anda, tentukan nominal, lalu selesaikan pembayaran dengan aman melalui DOKU." />
      <PaymentForm />
    </>
  );
}

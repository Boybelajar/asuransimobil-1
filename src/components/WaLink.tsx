"use client";

import { waLink } from "@/lib/site";

/** Tautan WhatsApp. Jika nomor belum diisi di src/lib/site.ts, tampil pemberitahuan (mode demo). */
export default function WaLink({
  message,
  className,
  label,
  children,
}: {
  message: string;
  className?: string;
  label?: string;
  children: React.ReactNode;
}) {
  const href = waLink(message);
  if (href)
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className={className}>
        {children}
      </a>
    );
  return (
    <button
      type="button"
      aria-label={label}
      className={className}
      onClick={() => window.alert("Nomor WhatsApp belum diatur (mode demo).")}
    >
      {children}
    </button>
  );
}

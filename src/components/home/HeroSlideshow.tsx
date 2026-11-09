"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

// flip: dibalik horizontal agar subjek berada di sisi kanan (teks ada di kiri).
const SLIDES = [
  { src: "/images/hero-1.jpg", alt: "Pelanggan menerima kunci mobil dengan senyum puas", position: "center 40%", flip: true },
  { src: "/images/hero-2.jpg", alt: "Pemilik mobil tersenyum bahagia memeluk kendaraannya", position: "center 35%", flip: false },
];
const INTERVAL_MS = 5000;

/** Latar hero berupa slideshow. Letakkan di dalam container `relative`; mengisi seluruh area. */
export default function HeroSlideshow() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setActive((i) => (i + 1) % SLIDES.length), INTERVAL_MS);
    return () => clearInterval(t);
  }, [paused]);

  return (
    <>
      <div className="absolute inset-0" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
        {SLIDES.map((s, i) => (
          <Image
            key={s.src}
            src={s.src}
            alt={s.alt}
            fill
            priority={i === 0}
            sizes="100vw"
            style={{ objectPosition: s.position }}
            className={`object-cover transition-opacity duration-1000 ${s.flip ? "-scale-x-100" : ""} ${i === active ? "opacity-100" : "opacity-0"}`}
            aria-hidden={i !== active}
          />
        ))}
        {/* Gradasi putih transparan seperti mockup: pekat di sisi teks, hilang di sisi gambar */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, rgba(255,255,255,0.94) 0%, rgba(255,255,255,0.8) 35%, rgba(255,255,255,0.25) 60%, transparent 85%)",
          }}
        />
        <div className="absolute inset-0 bg-white/60 md:hidden" aria-hidden="true" />
      </div>

      <div className="absolute bottom-5 left-1/2 z-10 flex -translate-x-1/2 gap-2 md:left-auto md:right-8 md:translate-x-0" role="tablist" aria-label="Pilih gambar">
        {SLIDES.map((s, i) => (
          <button
            key={s.src}
            role="tab"
            aria-selected={i === active}
            aria-label={`Gambar ${i + 1}`}
            onClick={() => setActive(i)}
            className={`h-2.5 rounded-full transition-all ${i === active ? "w-7 bg-brand-600" : "w-2.5 bg-white/90 ring-1 ring-slate-300 hover:bg-white"}`}
          />
        ))}
      </div>
    </>
  );
}

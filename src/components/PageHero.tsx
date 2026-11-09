export default function PageHero({
  badge,
  title,
  subtitle,
}: {
  badge: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <section className="bg-gradient-to-br from-brand-200 via-brand-300 to-brand-400 px-4 py-12 text-center sm:py-16">
      <span className="inline-block rounded-full bg-brand-600/10 px-4 py-1.5 text-[13px] font-bold text-brand-800">
        {badge}
      </span>
      <h1 className="mx-auto mt-4 max-w-4xl text-2xl font-extrabold leading-snug tracking-tight text-brand-900 sm:text-4xl">
        {title}
      </h1>
      {subtitle && (
        <p className="mx-auto mt-3 max-w-2xl text-base leading-relaxed text-brand-800 sm:text-lg">{subtitle}</p>
      )}
    </section>
  );
}

import { SITE } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="border-t border-brand-200 bg-brand-50 px-4 py-10 text-center">
      <p className="text-sm text-slate-400">
        © {new Date().getFullYear()} {SITE.name}. All rights reserved.
      </p>
    </footer>
  );
}

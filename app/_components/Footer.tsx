"use client";

import { useLanguage } from "./LanguageProvider";

export default function Footer() {
  const { t } = useLanguage();

  const countryNames = t.countries.list.map((country) => country.name);

  const FOOTER_LINKS = [
    {
      heading: t.footer.productHeading,
      links: [
        { label: t.footer.productLinks[0], href: "#how-it-works" },
        { label: t.footer.productLinks[1], href: "#features" },
        { label: t.footer.productLinks[2], href: "#pricing" },
      ],
    },
    {
      heading: t.footer.countriesHeading,
      links: countryNames.map((name) => ({ label: name, href: "#countries" })),
    },
    {
      heading: t.footer.companyHeading,
      links: [
        { label: t.footer.companyLinks[0], href: "#reviews" },
        { label: t.footer.companyLinks[1], href: "#contact" },
      ],
    },
  ];

  return (
    <footer className="relative border-t border-white/10">
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent"
      />
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[2fr_1fr_1fr_1fr]">
          <div>
            <a href="#" className="group flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-accent to-accent-bright text-white font-bold transition-transform duration-200 ease-[var(--ease-out-strong)] [@media(hover:hover)_and_(pointer:fine)]:group-hover:scale-105">
                R
              </span>
              <span className="text-lg font-semibold tracking-tight text-white">
                ReloAI
              </span>
            </a>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-500">
              {t.footer.description}
            </p>
            <div className="mt-6 flex gap-4 text-slate-500">
              <a
                href="#"
                aria-label="X (Twitter)"
                className="transition-colors duration-150 hover:text-accent-bright"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href="#"
                aria-label="LinkedIn"
                className="transition-colors duration-150 hover:text-accent-bright"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.3V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.61 0 4.28 2.38 4.28 5.47zM5.34 7.43a2.07 2.07 0 110-4.13 2.07 2.07 0 010 4.13zM3.55 20.45h3.56V9H3.55z" />
                </svg>
              </a>
            </div>
          </div>

          {FOOTER_LINKS.map((column) => (
            <div key={column.heading}>
              <h3 className="text-sm font-semibold text-white">{column.heading}</h3>
              <ul className="mt-4 space-y-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-slate-500 transition-colors duration-150 hover:text-accent-bright"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 border-t border-white/10 pt-6 text-center text-sm text-slate-500">
          © {new Date().getFullYear()} ReloAI. {t.footer.rights}
        </div>
        <p className="mt-4 text-center text-xs leading-relaxed text-slate-600">{t.footer.disclaimer}</p>
      </div>
    </footer>
  );
}

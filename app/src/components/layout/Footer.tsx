import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[var(--color-surface-lowest)] border-t border-white/5 mt-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center py-10 md:py-12 px-6 md:px-16 w-full max-w-[1440px] mx-auto gap-10 md:gap-8">
        {/* Brand */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-white px-3 py-1.5 rounded-lg flex items-center justify-center">
              <img src="/assets/cardekho_newlogo.svg" alt="CarDekho" className="h-5 w-auto object-contain" />
            </div>
            <span className="font-[var(--font-headline)] text-xl font-bold text-[var(--color-on-surface)] tracking-tighter">
              MatchMyCar AI
            </span>
          </div>
          <div className="text-sm text-[var(--color-on-surface-variant)] max-w-xs">
            India's leading car search venture, helping users buy cars that are right for them since 2008.
          </div>
        </div>

        {/* Nav Links */}
        <div className="flex flex-col md:flex-row gap-10 md:gap-16">
          <nav className="flex flex-col gap-3">
            <span className="font-[var(--font-headline)] text-xs font-bold tracking-[0.1em] uppercase text-[var(--color-primary-action)]">Features</span>
            {["Technology", "Inventory", "Comparison", "Feel The Car 360"].map((item) => (
              <Link
                key={item}
                href="#"
                className="text-sm text-[var(--color-on-secondary-variant)] hover:text-[var(--color-primary)] transition-colors opacity-80 hover:opacity-100"
              >
                {item}
              </Link>
            ))}
          </nav>

          <nav className="flex flex-col gap-3">
            <span className="font-[var(--font-headline)] text-xs font-bold tracking-[0.1em] uppercase text-[var(--color-primary-action)]">Group Companies</span>
            {[
              { name: "Zigwheels", url: "https://www.zigwheels.com" },
              { name: "Oto.com", url: "https://www.oto.com" },
              { name: "InsuranceDekho", url: "https://www.insurancedekho.com" },
              { name: "BikeDekho", url: "https://www.bikedekho.com" }
            ].map((company) => (
              <a
                key={company.name}
                href={company.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-[var(--color-on-secondary-variant)] hover:text-[var(--color-primary)] transition-colors opacity-80 hover:opacity-100"
              >
                {company.name}
              </a>
            ))}
          </nav>
        </div>

        {/* Copyright & Investors */}
        <div className="flex flex-col gap-2 text-sm text-[var(--color-on-surface-variant)] text-left md:text-right">
          <div className="flex items-center gap-2 md:justify-end">
            Backed by <span className="font-semibold text-[var(--color-on-surface)]">Google Capital</span>, <span className="font-semibold text-[var(--color-on-surface)]">Sequoia</span> & <span className="font-semibold text-[var(--color-on-surface)]">Ratan Tata</span>
          </div>
          <div className="opacity-60">
            © 2024 CarDekho Group. MatchMyCar AI Precision Engineered.
          </div>
        </div>
      </div>
    </footer>
  );
}

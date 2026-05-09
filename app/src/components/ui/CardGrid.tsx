"use client";

interface CardOption {
  value: string;
  label: string;
  icon: string;
}

interface CardGridProps {
  options: CardOption[];
  selected: string;
  onChange: (value: string) => void;
  columns?: number;
}

export default function CardGrid({
  options,
  selected,
  onChange,
  columns = 3,
}: CardGridProps) {
  return (
    <div
      className={`grid gap-4 ${
        columns === 3
          ? "grid-cols-2 md:grid-cols-3"
          : columns === 2
            ? "grid-cols-2"
            : "grid-cols-2 md:grid-cols-4"
      }`}
    >
      {options.map((option) => {
        const active = selected === option.value;
        return (
          <button
            key={option.value}
            onClick={() => onChange(option.value)}
            className={`glass-card rounded-xl p-5 md:p-6 flex flex-col items-center justify-center gap-3 md:gap-4 transition-all duration-200 group relative overflow-hidden ${
              active
                ? "border-[var(--color-primary-container)]/50 bg-[var(--color-primary-container)]/5"
                : "hover:border-white/20 hover:bg-white/5"
            }`}
          >
            {active && (
              <div className="absolute inset-0 bg-[var(--color-primary-container)]/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            )}
            <span
              className={`material-symbols-outlined text-3xl md:text-4xl transition-colors ${
                active
                  ? "text-[var(--color-primary-container)] icon-fill"
                  : "text-[var(--color-on-surface-variant)] group-hover:text-[var(--color-on-surface)]"
              }`}
              style={active ? { fontVariationSettings: "'FILL' 1" } : undefined}
              aria-hidden="true"
            >
              {option.icon}
            </span>
            <span
              className={`font-[var(--font-body)] text-xs font-semibold tracking-[0.1em] uppercase transition-colors ${
                active
                  ? "text-[var(--color-primary-container)]"
                  : "text-[var(--color-on-surface-variant)] group-hover:text-[var(--color-on-surface)]"
              }`}
            >
              {option.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}

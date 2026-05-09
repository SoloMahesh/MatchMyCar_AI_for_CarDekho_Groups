"use client";

interface PillOption {
  value: string | number;
  label: string;
  icon?: string;
}

interface PillSelectorProps {
  options: PillOption[];
  selected: string | number | (string | number)[];
  onChange: (value: string | number) => void;
  multiSelect?: boolean;
}

export default function PillSelector({
  options,
  selected,
  onChange,
  multiSelect = false,
}: PillSelectorProps) {
  const isSelected = (value: string | number) => {
    if (multiSelect && Array.isArray(selected)) {
      return selected.includes(value);
    }
    return selected === value;
  };

  return (
    <div className="flex flex-wrap gap-3">
      {options.map((option) => {
        const active = isSelected(option.value);
        return (
          <button
            key={String(option.value)}
            onClick={() => onChange(option.value)}
            className={`px-5 py-3 rounded-full font-[var(--font-body)] text-xs font-semibold tracking-[0.08em] uppercase flex items-center gap-2 transition-all duration-200 ${
              active
                ? "border border-[var(--color-primary-container)] bg-[var(--color-primary-container)]/10 text-[var(--color-primary-container)] shadow-[0_0_15px_rgba(248,94,53,0.15)]"
                : "border border-white/10 bg-white/5 text-[var(--color-on-surface-variant)] hover:bg-white/10 hover:text-[var(--color-on-surface)] hover:border-white/20"
            }`}
          >
            {option.icon && (
              <span className="material-symbols-outlined text-sm" aria-hidden="true">
                {option.icon}
              </span>
            )}
            {option.label}
          </button>
        );
      })}
    </div>
  );
}

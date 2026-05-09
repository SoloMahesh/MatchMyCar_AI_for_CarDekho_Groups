"use client";

interface NumberSelectorProps {
  options: { value: string; label: string }[];
  selected: string;
  onChange: (value: string) => void;
}

export default function NumberSelector({
  options,
  selected,
  onChange,
}: NumberSelectorProps) {
  return (
    <div className="flex gap-3 w-full">
      {options.map((option) => {
        const active = selected === option.value;
        return (
          <button
            key={option.value}
            onClick={() => onChange(option.value)}
            className={`flex-1 h-14 rounded-lg flex items-center justify-center font-[var(--font-headline)] text-2xl font-medium transition-all duration-200 ${
              active
                ? "border border-[var(--color-primary)]/50 bg-[var(--color-primary)]/10 text-[var(--color-primary)] shadow-[inset_0_0_10px_rgba(247,93,52,0.1)]"
                : "border border-white/10 bg-[var(--color-surface-container)] text-[var(--color-on-surface)] hover:bg-[var(--color-surface-bright)]"
            }`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}

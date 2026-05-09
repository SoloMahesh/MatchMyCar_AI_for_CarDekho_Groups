"use client";

interface SegmentedControlProps {
  options: { value: string; label: string }[];
  selected: string;
  onChange: (value: string) => void;
}

export default function SegmentedControl({
  options,
  selected,
  onChange,
}: SegmentedControlProps) {
  return (
    <div className="flex p-1 bg-[var(--color-surface-highest)] rounded-lg w-full max-w-sm">
      {options.map((option) => {
        const active = selected === option.value;
        return (
          <button
            key={option.value}
            onClick={() => onChange(option.value)}
            className={`flex-1 py-2.5 text-center rounded-md font-[var(--font-body)] text-xs font-semibold tracking-[0.1em] uppercase transition-all duration-200 ${
              active
                ? "bg-[var(--color-surface)] text-[var(--color-on-surface)] shadow-sm border border-white/5"
                : "text-[var(--color-on-surface-variant)] hover:text-[var(--color-on-surface)]"
            }`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}

interface MatchBadgeProps {
  percentage: number;
  variant?: "primary" | "secondary";
}

export default function MatchBadge({ percentage, variant = "primary" }: MatchBadgeProps) {
  const isPrimary = variant === "primary";

  return (
    <div
      className={`font-[var(--font-body)] text-xs font-semibold tracking-[0.1em] uppercase px-4 py-2 rounded-full flex items-center gap-2 ${
        isPrimary
          ? "bg-[var(--color-primary-container)] text-[var(--color-surface-base)] shadow-[0_0_15px_rgba(248,94,53,0.4)]"
          : "bg-[var(--color-surface-high)] border border-white/10 text-[var(--color-on-surface)]"
      }`}
    >
      <span
        className={`material-symbols-outlined text-[16px] ${isPrimary ? "icon-fill" : "text-[var(--color-primary)]"}`}
        aria-hidden="true"
      >
        {isPrimary ? "bolt" : "check_circle"}
      </span>
      {percentage}% Match
    </div>
  );
}

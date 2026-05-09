interface SectionLabelProps {
  children: React.ReactNode;
  className?: string;
}

export default function SectionLabel({ children, className = "" }: SectionLabelProps) {
  return (
    <h2
      className={`font-[var(--font-body)] text-xs font-semibold tracking-[0.1em] uppercase text-[var(--color-on-surface)] border-b border-white/10 pb-2 ${className}`}
    >
      {children}
    </h2>
  );
}

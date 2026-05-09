interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export default function GlassCard({ children, className = "", hover = false }: GlassCardProps) {
  return (
    <div
      className={`glass-card rounded-xl ${
        hover ? "transition-all duration-300 hover:bg-white/10 hover:-translate-y-1" : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}

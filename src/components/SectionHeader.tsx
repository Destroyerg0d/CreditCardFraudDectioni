export default function SectionHeader({
  badge,
  title,
  subtitle,
}: {
  badge?: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="text-center mb-12">
      {badge && (
        <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-blue-500/10 text-blue-400 border border-blue-500/20 mb-4">
          {badge}
        </span>
      )}
      <h2 className="text-3xl sm:text-4xl font-bold mb-4">{title}</h2>
      {subtitle && (
        <p className="text-slate-400 max-w-2xl mx-auto">{subtitle}</p>
      )}
    </div>
  );
}

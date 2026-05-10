export default function Header() {
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Bom dia";
    if (hour < 18) return "Boa tarde";
    return "Boa noite";
  };

  return (
    <header className="h-16 border-b border-[var(--border-glass)] flex items-center justify-between px-8 bg-[var(--bg-primary)]">
      <div className="flex items-center gap-4">
        <h2 className="text-lg font-medium text-white">
          {getGreeting()}, Visitante
        </h2>
      </div>
      <div className="flex items-center gap-4">
        <div className="hidden md:block text-xs text-[var(--text-muted)] font-mono select-all">
          ...celpfehcald.supabase.co
        </div>
        <button className="px-4 py-1.5 bg-[var(--bg-secondary)] border border-[var(--border-glass)] rounded-md text-xs hover:border-[var(--text-muted)] text-white transition-colors">
          Sincronizar
        </button>
      </div>
    </header>
  );
}

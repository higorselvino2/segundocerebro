'use client';

import { useState } from 'react';

export default function Header() {
  const [isSyncing, setIsSyncing] = useState(false);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Bom dia";
    if (hour < 18) return "Boa tarde";
    return "Boa noite";
  };

  const handleSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      alert('Sincronização concluída com sucesso!');
    }, 1500);
  };

  return (
    <header className="h-16 border-b border-[var(--border-glass)] flex items-center justify-between px-8 bg-[var(--bg-primary)]">
      <div className="flex items-center gap-4">
        <h2 className="text-lg font-medium text-white" suppressHydrationWarning>
          {getGreeting()}, Visitante
        </h2>
      </div>
      <div className="flex items-center gap-4">
        <div className="hidden md:block text-xs text-[var(--text-muted)] font-mono select-all">
          ...celpfehcald.supabase.co
        </div>
        <button 
          onClick={handleSync}
          disabled={isSyncing}
          className="px-4 py-1.5 bg-[var(--bg-secondary)] border border-[var(--border-glass)] rounded-md text-xs hover:border-[var(--text-muted)] text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSyncing ? 'Sincronizando...' : 'Sincronizar'}
        </button>
      </div>
    </header>
  );
}

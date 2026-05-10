'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Calendar,
  CheckSquare,
  BookOpen,
  PenTool,
  BarChart2,
  User,
  Settings,
  Database,
  Code,
} from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();
  
  const links = [
    { name: "Dashboard", href: "/" },
    { name: "Agenda", href: "/agenda" },
    { name: "Hábitos", href: "/habitos" },
    { name: "Livros", href: "/livros" },
    { name: "Diário", href: "/diario" },
    { name: "Stats", href: "/estatisticas" },
    { name: "Perfil", href: "/perfil" },
    { name: "Config", href: "/configuracoes" },
  ];

  const getIcon = (name: string) => {
    switch (name) {
      case "Dashboard": return Home;
      case "Agenda": return Calendar;
      case "Hábitos": return CheckSquare;
      case "Livros": return BookOpen;
      case "Diário": return PenTool;
      case "Stats": return BarChart2;
      case "Perfil": return User;
      case "Config": return Settings;
      default: return Home;
    }
  };

  return (
    <aside className="fixed inset-y-0 left-0 w-64 bg-[var(--bg-secondary)] border-r border-[var(--border-glass)] hidden md:flex flex-col z-10">
      <div className="p-6 flex items-center gap-3">
        <div className="w-8 h-8 bg-[var(--accent-primary)] rounded-lg flex items-center justify-center">
          <svg
            className="w-5 h-5 text-black"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
            />
          </svg>
        </div>
        <span className="font-bold text-lg tracking-tight">
          CÉREBRO{" "}
          <span className="text-[var(--accent-primary)] font-light">
            DIGITAL
          </span>
        </span>
      </div>

      <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
        <div className="py-4 text-[10px] uppercase tracking-widest text-[var(--text-muted)] font-semibold px-2">
          Núcleo Central
        </div>
        {links.map((link) => {
          const isActive = pathname === link.href;
          const Icon = getIcon(link.name);
          return (
            <Link
              key={link.name}
              href={link.href}
              className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${isActive ? "bg-[var(--accent-primary)]/10 text-[var(--accent-primary)] border border-[var(--accent-primary)]/20" : "text-[var(--text-secondary)] hover:text-white"}`}
            >
              <Icon className="w-4 h-4" />
              <span className="text-sm">{link.name}</span>
            </Link>
          );
        })}

        <div className="py-6 text-[10px] uppercase tracking-widest text-[var(--text-muted)] font-semibold px-2">
          Integrações
        </div>
        <div className="space-y-3">
          <div className="flex items-center justify-between px-3">
            <span className="text-xs text-[var(--text-secondary)] flex items-center gap-2">
              <Database className="w-3 h-3" /> Supabase
            </span>
            <div className="w-2 h-2 rounded-full bg-[var(--accent-primary)] shadow-[0_0_8px_var(--accent-primary)]"></div>
          </div>
          <div className="flex items-center justify-between px-3">
            <span className="text-xs text-[var(--text-secondary)] flex items-center gap-2">
              <Code className="w-3 h-3" /> n8n Workflow
            </span>
            <div className="w-2 h-2 rounded-full bg-[var(--accent-secondary)] shadow-[0_0_8px_var(--accent-secondary)]"></div>
          </div>
        </div>
      </nav>

      <div className="p-6 mt-auto border-t border-[var(--border-glass)]">
        <div className="bg-[var(--bg-primary)] border border-[var(--border-glass)] rounded-lg p-4">
          <div className="text-[10px] text-[var(--text-muted)] uppercase mb-1">
            Usuário
          </div>
          <div className="text-sm font-medium text-white">Higor Selvino</div>
        </div>
      </div>
    </aside>
  );
}

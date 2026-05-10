'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Calendar, CheckSquare, Settings, Mic } from "lucide-react";

export default function MobileNav() {
  const pathname = usePathname();

  const links = [
    { name: "Home", href: "/", icon: Home },
    { name: "Agenda", href: "/agenda", icon: Calendar },
    { name: "Hábitos", href: "/habitos", icon: CheckSquare },
    { name: "Config", href: "/configuracoes", icon: Settings },
  ];

  return (
    <nav className="fixed bottom-0 inset-x-0 bg-[var(--bg-secondary)] border-t border-[var(--border-glass)] md:hidden z-40 pb-safe">
      <div className="flex items-center justify-around p-2">
        {links.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.name}
              href={link.href}
              className={`flex flex-col items-center justify-center w-16 h-12 transition-colors ${isActive ? 'text-[var(--accent-primary)]' : 'text-[var(--text-secondary)] hover:text-[var(--accent-primary)]'}`}
            >
              <link.icon className="w-6 h-6 mb-1" />
              <span className="text-[10px] font-medium">{link.name}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

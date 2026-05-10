'use client';

import { useState } from 'react';

export default function DashboardHome() {
  const [ideaText, setIdeaText] = useState('');
  const [isSending, setIsSending] = useState(false);

  const handleSendIdea = async () => {
    if (!ideaText.trim()) return;
    
    setIsSending(true);
    try {
      const res = await fetch('/api/voice', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: ideaText,
          source: 'manual',
          user_id: 'guest_user'
        })
      });

      if (res.ok) {
        setIdeaText('');
        alert('Ideia enviada com sucesso para o n8n!');
      } else {
        const errorData = await res.json().catch(() => ({}));
        alert(`Erro ao enviar ideia para o n8n: ${errorData.error || res.status}`);
      }
    } catch (error) {
      console.error(error);
      alert('Erro na comunicação com o servidor.');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out h-full">
      {/* Top Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 shrink-0">
        <div className="bg-[var(--bg-secondary)] border border-[var(--border-glass)] p-5 rounded-xl transition-all hover:border-[var(--accent-primary)]/50">
          <div className="text-[var(--text-muted)] text-xs font-semibold uppercase tracking-wider mb-2">
            Memória Total
          </div>
          <div className="text-3xl font-bold">
            1.284{" "}
            <span className="text-sm font-normal text-[var(--text-muted)]">
              itens
            </span>
          </div>
        </div>
        <div className="bg-[var(--bg-secondary)] border border-[var(--border-glass)] p-5 rounded-xl transition-all hover:border-[var(--accent-secondary)]/50">
          <div className="text-[var(--text-muted)] text-xs font-semibold uppercase tracking-wider mb-2">
            n8n Webhook
          </div>
          <div className="text-sm font-mono text-[var(--accent-secondary)] bg-[var(--accent-secondary)]/10 px-2 py-1 rounded truncate">
            /segundo-cerebro
          </div>
        </div>
        <div className="bg-[var(--bg-secondary)] border border-[var(--border-glass)] p-5 rounded-xl transition-all hover:border-[var(--accent-primary)]/50">
          <div className="text-[var(--text-muted)] text-xs font-semibold uppercase tracking-wider mb-2">
            Última Atividade
          </div>
          <div className="text-sm">
            Sincronização realizada{" "}
            <span className="text-[var(--accent-primary)]">há 2 min</span>
          </div>
        </div>
      </div>

      {/* Main Interaction Area */}
      <div className="flex-1 flex flex-col lg:flex-row gap-6">
        {/* Knowledge Feed */}
        <div className="flex-[2] bg-[var(--bg-secondary)] border border-[var(--border-glass)] rounded-xl flex flex-col min-h-[400px]">
          <div className="p-4 border-b border-[var(--border-glass)] flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-widest text-[var(--text-muted)]">
              Feed de Pensamentos
            </span>
            <span className="text-[10px] text-[var(--accent-primary)] bg-[var(--accent-primary)]/10 px-2 py-0.5 rounded-full font-bold">
              AO VIVO
            </span>
          </div>
          <div className="flex-1 p-4 space-y-4 overflow-y-auto">
            <div className="p-4 bg-[var(--bg-primary)] border border-[var(--border-glass)] rounded-lg transition-transform hover:-translate-y-0.5 hover:shadow-lg cursor-pointer">
              <div className="flex justify-between mb-2">
                <span className="text-xs text-[var(--accent-primary)] font-semibold">
                  Insights de Negócios
                </span>
                <span className="text-[10px] text-[var(--text-muted)]">
                  Hoje, 14:22
                </span>
              </div>
              <p className="text-sm text-[var(--text-primary)]">
                Análise do workflow de automação: reduzir latência entre o
                trigger do webhook e o armazenamento no Supabase...
              </p>
            </div>

            <div className="p-4 bg-[var(--bg-primary)] border border-[var(--border-glass)] rounded-lg opacity-80 transition-transform hover:-translate-y-0.5 hover:opacity-100 hover:shadow-lg cursor-pointer">
              <div className="flex justify-between mb-2">
                <span className="text-xs text-[var(--accent-secondary)] font-semibold">
                  Referência Técnica
                </span>
                <span className="text-[10px] text-[var(--text-muted)]">
                  Ontem, 18:05
                </span>
              </div>
              <p className="text-sm text-[var(--text-primary)]">
                Documentação da API do Supabase atualizada. Revisar as políticas
                de Row Level Security para o bucket de arquivos.
              </p>
            </div>

            <div className="p-4 bg-[var(--bg-primary)] border border-[var(--border-glass)] rounded-lg opacity-60 transition-transform hover:-translate-y-0.5 hover:opacity-100 hover:shadow-lg cursor-pointer">
              <div className="flex justify-between mb-2">
                <span className="text-xs text-[var(--accent-spiritual)] font-semibold">
                  Idea Dump
                </span>
                <span className="text-[10px] text-[var(--text-muted)]">
                  12 Out, 09:15
                </span>
              </div>
              <p className="text-sm text-[var(--text-primary)]">
                Explorar o uso de LangChain para criar uma interface de chat
                sobre a minha base de conhecimento no Supabase.
              </p>
            </div>
          </div>
        </div>

        {/* Quick Capture & Status */}
        <div className="flex-1 flex flex-col gap-6">
          <div className="bg-[var(--accent-primary)] rounded-xl p-6 text-[var(--bg-primary)] flex flex-col justify-between shrink-0">
            <h3 className="font-bold mb-4 text-white">Capture sua ideia agora</h3>
            <div className="relative">
              <textarea
                value={ideaText}
                onChange={(e) => setIdeaText(e.target.value)}
                className="w-full bg-white/10 border border-white/20 rounded-lg p-3 text-sm placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/40 h-24 resize-none text-white"
                placeholder="O que você está pensando?"
              ></textarea>
              <button 
                onClick={handleSendIdea}
                disabled={isSending || !ideaText.trim()}
                className="mt-3 w-full bg-white text-[var(--accent-primary)] font-bold py-2 rounded-lg text-sm transition-transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/90"
              >
                {isSending ? 'Enviando...' : 'Enviar para n8n'}
              </button>
            </div>
          </div>

          <div className="bg-[var(--bg-secondary)] border border-[var(--border-glass)] rounded-xl flex-1 p-6">
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-[var(--text-muted)] mb-4">
              Integridade do Sistema
            </h4>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 bg-[var(--accent-primary)] rounded-full shadow-[0_0_8px_var(--accent-primary)]"></div>
                <div className="flex-1">
                  <div className="text-xs font-medium">Supabase REST API</div>
                  <div className="text-[10px] text-[var(--text-muted)]">
                    Latência: 45ms
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 bg-[var(--accent-primary)] rounded-full shadow-[0_0_8px_var(--accent-primary)]"></div>
                <div className="flex-1">
                  <div className="text-xs font-medium">
                    Webhook higorselvino.art
                  </div>
                  <div className="text-[10px] text-[var(--text-muted)]">
                    Ativo e Escutando
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 bg-[var(--accent-secondary)] rounded-full shadow-[0_0_8px_var(--accent-secondary)]"></div>
                <div className="flex-1">
                  <div className="text-xs font-medium">Core Workflow</div>
                  <div className="text-[10px] text-[var(--text-muted)]">
                    Processados: 4.5k
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

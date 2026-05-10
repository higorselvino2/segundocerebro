"use client";

import { useState } from "react";
import { Mic, X, Check } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function VoiceFAB() {
  const [isOpen, setIsOpen] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const toggleOpen = () => {
    if (isOpen) {
      setIsOpen(false);
      setIsRecording(false);
      setTranscript("");
    } else {
      setIsOpen(true);
      // Simulate auto-recording start
      setTimeout(() => setIsRecording(true), 500);
      setTimeout(
        () =>
          setTranscript(
            "Lembrar de focar no projeto do Segundo Cérebro hoje...",
          ),
        3000,
      );
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const res = await fetch('/api/voice', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: transcript,
          source: 'voice',
          user_id: 'guest_user'
        })
      });

      if (res.ok) {
        alert('Áudio enviado e processado com sucesso!');
        toggleOpen();
      } else {
        alert('Erro ao enviar áudio.');
      }
    } catch(e) {
      console.error(e);
      alert('Erro de comunicação.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <>
      {/* The FAB button */}
      <button
        onClick={toggleOpen}
        className={`mic-fab ${isRecording && !isOpen ? "recording" : ""} ${isOpen ? "hidden md:flex" : ""}`}
        aria-label="Capturar voz"
      >
        {isOpen ? (
          <X className="w-8 h-8 text-white" />
        ) : (
          <Mic className="w-8 h-8 text-white" />
        )}
      </button>

      {/* The Bottom Sheet overlay / Modal */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 md:hidden"
              onClick={toggleOpen}
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed bottom-0 inset-x-0 h-96 bg-[var(--bg-secondary)] border-t border-[var(--border-glass)] rounded-t-3xl z-50 p-6 flex flex-col md:w-96 md:h-auto md:min-h-80 md:rounded-3xl md:bottom-28 md:right-8 md:top-auto md:left-auto md:border"
            >
              <div className="flex justify-between items-center mb-6 md:hidden">
                <h3 className="font-display font-medium text-white text-lg">
                  Captura Rápida
                </h3>
                <button
                  onClick={toggleOpen}
                  className="p-2 bg-[var(--bg-glass)] rounded-full text-[var(--text-secondary)]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 flex flex-col items-center justify-center">
                <div
                  className={`w-24 h-24 rounded-full flex items-center justify-center mb-8 transition-transform duration-300 ${isRecording && !transcript ? "bg-[var(--accent-primary)]/20 scale-110" : "bg-[var(--bg-glass)]"}`}
                >
                  <div
                    className={`w-16 h-16 rounded-full flex items-center justify-center transition-colors ${isRecording && !transcript ? "bg-[var(--accent-primary)] animate-pulse shadow-[0_0_20px_var(--accent-primary)]" : "bg-[var(--border-glass)]"}`}
                  >
                    <Mic className="w-8 h-8 text-white" />
                  </div>
                </div>

                <p className="text-center font-ui text-[var(--text-primary)] mb-4 h-12 flex items-center justify-center px-4">
                  {transcript ||
                    (isRecording ? "Ouvindo..." : "Pressione para falar")}
                </p>

                {transcript && (
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="flex gap-3"
                  >
                    <button
                      className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[var(--bg-glass)] border border-[var(--border-glass)] text-white hover:bg-[var(--border-glass)] font-medium shadow-lg transition-colors"
                      onClick={() => setTranscript("")}
                    >
                      Refazer
                    </button>
                    <button
                      className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[var(--accent-primary)] text-[var(--bg-primary)] font-bold shadow-[0_4px_12px_rgba(16,185,129,0.3)] hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                      onClick={handleSave}
                      disabled={isSaving}
                    >
                      <Check className="w-5 h-5" /> {isSaving ? 'Salvando...' : 'Salvar'}
                    </button>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

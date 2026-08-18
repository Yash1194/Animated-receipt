import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Command, Keyboard, Zap, Volume2, Scissors, RefreshCw } from 'lucide-react';
import { playButtonClick } from '../utils/audio';

export default function KeyboardShortcutsModal({ isOpen, onClose }) {
  const shortcuts = [
    { key: 'Space', desc: 'Trigger thermal paper print motor feed', icon: Zap },
    { key: 'T', desc: 'Tear paper receipt physics & archive to log', icon: Scissors },
    { key: 'R', desc: 'Reset printer viewport position', icon: RefreshCw },
    { key: 'M', desc: 'Toggle Web Audio API sound synthesis ON / OFF', icon: Volume2 }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/75 backdrop-blur-md z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md bg-card border border-border rounded-3xl p-6 shadow-2xl space-y-5"
            >
              <div className="flex items-center justify-between border-b border-border pb-3">
                <div className="flex items-center gap-2.5">
                  <Keyboard className="w-5 h-5 text-amber-400" />
                  <h3 className="font-bold text-lg font-heading text-foreground">
                    Keyboard Hotkeys & Controls
                  </h3>
                </div>
                <button
                  onClick={() => {
                    playButtonClick();
                    onClose();
                  }}
                  className="p-1.5 text-muted-foreground hover:text-foreground rounded-xl hover:bg-secondary transition-all"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-3">
                {shortcuts.map((s) => {
                  const Icon = s.icon;
                  return (
                    <div
                      key={s.key}
                      className="p-3 rounded-2xl bg-secondary/40 border border-border flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center justify-center">
                          <Icon className="w-4 h-4" />
                        </div>
                        <span className="text-xs text-foreground font-medium">
                          {s.desc}
                        </span>
                      </div>
                      <kbd className="px-2.5 py-1 rounded-lg bg-background border border-input text-xs font-mono font-bold text-amber-300 shadow-sm">
                        {s.key}
                      </kbd>
                    </div>
                  );
                })}
              </div>

              <div className="pt-2 text-center text-xs text-muted-foreground">
                Press <kbd className="px-1.5 py-0.5 rounded bg-secondary font-mono text-[10px]">Esc</kbd> anytime to close this dialog.
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

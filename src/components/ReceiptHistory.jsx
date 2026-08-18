import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, History, Trash2, Printer, Copy, Check, ExternalLink } from 'lucide-react';
import { playButtonClick } from '../utils/audio';

export default function ReceiptHistory({
  isOpen,
  onClose,
  history,
  onClearHistory,
  onRePrintReceipt
}) {
  const [copiedId, setCopiedId] = useState(null);

  const handleCopyText = (receipt) => {
    playButtonClick();
    const itemsText = receipt.items
      .map((i) => `${i.qty}x ${i.name} - $${(i.price * i.qty).toFixed(2)}`)
      .join('\n');
    const subtotal = receipt.items.reduce((acc, i) => acc + i.price * i.qty, 0);
    const tax = (subtotal * receipt.taxRate) / 100;
    const total = subtotal + tax;

    const fullText = `=== ${receipt.storeName} ===\n${receipt.tagline || ''}\nTime: ${receipt.tornAt}\nRef: ${receipt.transactionId}\n-----------------------\n${itemsText}\n-----------------------\nSubtotal: $${subtotal.toFixed(2)}\nTax (${receipt.taxRate}%): $${tax.toFixed(2)}\nTOTAL: $${total.toFixed(2)}\nStatus: ${receipt.stamp}`;

    navigator.clipboard.writeText(fullText);
    setCopiedId(receipt.transactionId);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
          />

          {/* Drawer Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-card border-l border-border z-50 p-6 flex flex-col shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-border">
              <div className="flex items-center gap-2">
                <History className="w-5 h-5 text-amber-400" />
                <h3 className="font-bold text-lg font-heading text-foreground">
                  Receipt Log Gallery ({history.length})
                </h3>
              </div>
              <div className="flex items-center gap-2">
                {history.length > 0 && (
                  <button
                    onClick={() => {
                      playButtonClick();
                      onClearHistory();
                    }}
                    className="p-2 text-muted-foreground hover:text-red-400 rounded-xl hover:bg-red-500/10 transition-all text-xs flex items-center gap-1"
                    title="Clear Log"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
                <button
                  onClick={() => {
                    playButtonClick();
                    onClose();
                  }}
                  className="p-2 text-muted-foreground hover:text-foreground rounded-xl hover:bg-secondary transition-all"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Content List */}
            <div className="flex-1 overflow-y-auto py-4 space-y-3.5 pr-1">
              {history.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center text-muted-foreground p-6">
                  <div className="w-16 h-16 rounded-full bg-secondary/60 flex items-center justify-center mb-3 text-2xl">
                    🧾
                  </div>
                  <p className="font-semibold text-foreground text-sm">No Saved Receipts</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Print and click "Tear Receipt" to archive transactions into your log.
                  </p>
                </div>
              ) : (
                history.map((item, idx) => {
                  const subtotal = item.items.reduce(
                    (acc, i) => acc + i.price * (i.qty || 1),
                    0
                  );
                  const total = subtotal + (subtotal * (item.taxRate || 0)) / 100;

                  return (
                    <div
                      key={item.transactionId || idx}
                      className="p-4 rounded-2xl bg-secondary/40 border border-border hover:border-amber-500/30 transition-all space-y-2.5"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-sm font-heading text-amber-300">
                          {item.storeName}
                        </span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-red-500/10 text-red-400 border border-red-500/20 font-bold">
                          {item.stamp || 'PAID'}
                        </span>
                      </div>

                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span className="font-mono">{item.tornAt}</span>
                        <span className="font-mono text-foreground font-bold">
                          {item.currency || '$'}
                          {total.toFixed(2)}
                        </span>
                      </div>

                      <div className="text-[11px] text-muted-foreground line-clamp-1 border-t border-border/40 pt-2">
                        {item.items.map((i) => i.name).join(', ')}
                      </div>

                      <div className="flex items-center justify-end gap-2 pt-1">
                        <button
                          onClick={() => handleCopyText(item)}
                          className="px-2.5 py-1 rounded-lg bg-secondary hover:bg-secondary/80 text-foreground text-xs flex items-center gap-1 border border-border transition-all"
                        >
                          {copiedId === item.transactionId ? (
                            <>
                              <Check className="w-3 h-3 text-emerald-400" />
                              <span className="text-emerald-400">Copied!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3" />
                              <span>Copy Text</span>
                            </>
                          )}
                        </button>

                        <button
                          onClick={() => {
                            playButtonClick();
                            onRePrintReceipt(item);
                            onClose();
                          }}
                          className="px-2.5 py-1 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 text-xs flex items-center gap-1 border border-amber-500/30 transition-all font-semibold"
                        >
                          <Printer className="w-3 h-3" />
                          <span>Re-Print</span>
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

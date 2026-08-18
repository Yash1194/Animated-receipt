import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import ThermalPrinter from './components/ThermalPrinter';
import ControlPanel from './components/ControlPanel';
import ReceiptHistory from './components/ReceiptHistory';
import KeyboardShortcutsModal from './components/KeyboardShortcutsModal';
import { RECEIPT_PRESETS, PAPER_SKINS } from './data/templates';
import { getMuted, setMuted, playButtonClick } from './utils/audio';

export default function App() {
  // Default receipt data loaded from preset 0 (Neo-Tokyo Cafe)
  const [receiptData, setReceiptData] = useState({
    storeName: RECEIPT_PRESETS[0].storeName,
    tagline: RECEIPT_PRESETS[0].tagline,
    address: RECEIPT_PRESETS[0].address,
    phone: RECEIPT_PRESETS[0].phone,
    taxRate: RECEIPT_PRESETS[0].taxRate,
    tipRate: 0,
    currency: RECEIPT_PRESETS[0].currency,
    items: [...RECEIPT_PRESETS[0].items],
    paymentMethod: RECEIPT_PRESETS[0].paymentMethod,
    cashier: RECEIPT_PRESETS[0].cashier,
    transactionId: `TXN-${Math.floor(1000000000 + Math.random() * 9000000000)}`
  });

  const [paperSkin, setPaperSkin] = useState('classic');
  const [customStamp, setCustomStamp] = useState('INVOICE PAID');
  const [printSpeed, setPrintSpeed] = useState(0.4);
  const [isMuted, setIsMuted] = useState(getMuted());
  const [history, setHistory] = useState([]);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [autoPrintCount, setAutoPrintCount] = useState(0);
  const [activeMobileTab, setActiveMobileTab] = useState('printer'); // 'printer' | 'controls'

  // Trigger automated print sequence
  const handleTriggerPrint = () => {
    setAutoPrintCount((prev) => prev + 1);
  };

  // Add receipt to history on tear action
  const handleReceiptTorn = (tornItem) => {
    setHistory((prev) => [tornItem, ...prev]);
  };

  // Re-print saved item from history
  const handleRePrintReceipt = (item) => {
    setReceiptData({
      storeName: item.storeName,
      tagline: item.tagline,
      address: item.address,
      phone: item.phone,
      taxRate: item.taxRate,
      tipRate: item.tipRate || 0,
      currency: item.currency || '$',
      items: [...item.items],
      paymentMethod: item.paymentMethod,
      cashier: item.cashier,
      transactionId: item.transactionId || `TXN-${Math.floor(1000000000 + Math.random() * 9000000000)}`
    });
    setPaperSkin(item.paperSkin || 'classic');
    setCustomStamp(item.stamp || 'INVOICE PAID');
    handleTriggerPrint();
  };

  // Global Keyboard Shortcuts Listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement?.tagName)) {
        return;
      }

      if (e.code === 'Space') {
        e.preventDefault();
        handleTriggerPrint();
      } else if (e.key === 'm' || e.key === 'M') {
        const next = !getMuted();
        setMuted(next);
        setIsMuted(next);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground relative selection:bg-amber-500 selection:text-background">
      {/* Background Ambient Glows */}
      <div className="fixed top-1/4 left-1/3 w-80 sm:w-96 h-80 sm:h-96 bg-amber-500/10 rounded-full blur-[120px] pointer-events-none animate-pulse-glow" />
      <div className="fixed bottom-10 right-10 w-80 sm:w-96 h-80 sm:h-96 bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none animate-pulse-glow" />

      {/* Main Navbar */}
      <Navbar
        isMuted={isMuted}
        setIsMuted={setIsMuted}
        onOpenHistory={() => setIsHistoryOpen(true)}
        historyCount={history.length}
        onOpenHelp={() => setIsHelpOpen(true)}
        selectedSkin={paperSkin}
        setSelectedSkin={setPaperSkin}
        PAPER_SKINS={PAPER_SKINS}
        activeMobileTab={activeMobileTab}
        setActiveMobileTab={setActiveMobileTab}
      />

      {/* Main Studio Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start relative z-10">
        
        {/* Printer Canvas Column */}
        <div className={`lg:col-span-7 flex flex-col items-center justify-center w-full ${activeMobileTab === 'printer' ? 'block' : 'hidden lg:block'}`}>
          <ThermalPrinter
            receiptData={receiptData}
            paperSkin={paperSkin}
            printSpeed={printSpeed}
            customStamp={customStamp}
            onReceiptTorn={handleReceiptTorn}
            autoPrintCount={autoPrintCount}
          />
        </div>

        {/* POS Studio Control Panel Column */}
        <div className={`lg:col-span-5 w-full h-full ${activeMobileTab === 'controls' ? 'block' : 'hidden lg:block'}`}>
          <ControlPanel
            receiptData={receiptData}
            setReceiptData={setReceiptData}
            paperSkin={paperSkin}
            setPaperSkin={setPaperSkin}
            customStamp={customStamp}
            setCustomStamp={setCustomStamp}
            printSpeed={printSpeed}
            setPrintSpeed={setPrintSpeed}
            onTriggerPrint={handleTriggerPrint}
          />
        </div>
      </main>

      {/* History Drawer */}
      <ReceiptHistory
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        history={history}
        onClearHistory={() => setHistory([])}
        onRePrintReceipt={handleRePrintReceipt}
      />

      {/* Keyboard Shortcuts Modal */}
      <KeyboardShortcutsModal
        isOpen={isHelpOpen}
        onClose={() => setIsHelpOpen(false)}
      />
    </div>
  );
}

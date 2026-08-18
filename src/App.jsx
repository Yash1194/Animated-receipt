import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import ThermalPrinter from './components/ThermalPrinter';
import ControlPanel from './components/ControlPanel';
import ReceiptHistory from './components/ReceiptHistory';
import KeyboardShortcutsModal from './components/KeyboardShortcutsModal';
import { RECEIPT_PRESETS, PAPER_SKINS } from './data/templates';
import { getMuted, setMuted } from './utils/audio';

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
  const [activeTab, setActiveTab] = useState('dashboard'); // 'dashboard' | 'printer' | 'pos' | 'history' | 'skins'

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
    <div className="min-h-screen flex bg-background text-foreground selection:bg-lime-400 selection:text-lime-950">
      {/* Left Navigation Sidebar */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        historyCount={history.length}
      />

      {/* Main Workspace Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <Navbar
          isMuted={isMuted}
          setIsMuted={setIsMuted}
          onOpenHistory={() => setIsHistoryOpen(true)}
          historyCount={history.length}
          onOpenHelp={() => setIsHelpOpen(true)}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />

        {/* Dashboard Content Container */}
        <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 md:p-8">
          
          {/* Main Grid: 3D Thermal Printer vs POS Studio Controls */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
            
            {/* Left Column: 3D Thermal Printer Canvas */}
            <div className={`lg:col-span-6 flex flex-col items-center justify-center w-full ${activeTab === 'pos' ? 'hidden lg:block' : 'block'}`}>
              <ThermalPrinter
                receiptData={receiptData}
                paperSkin={paperSkin}
                printSpeed={printSpeed}
                customStamp={customStamp}
                onReceiptTorn={handleReceiptTorn}
                autoPrintCount={autoPrintCount}
              />
            </div>

            {/* Right Column: POS Customizer & Preset Studio */}
            <div className={`lg:col-span-6 h-full ${activeTab === 'printer' ? 'hidden lg:block' : 'block'}`}>
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
          </div>
        </main>
      </div>

      {/* History Log Drawer */}
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

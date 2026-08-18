import React from 'react';
import { Volume2, VolumeX, Search, Bell, HelpCircle, History, Sparkles, Printer, Sliders } from 'lucide-react';
import { getMuted, setMuted, playButtonClick } from '../utils/audio';

export default function Navbar({
  isMuted,
  setIsMuted,
  onOpenHistory,
  historyCount,
  onOpenHelp,
  activeTab,
  setActiveTab
}) {
  const toggleAudio = () => {
    playButtonClick();
    const nextState = !isMuted;
    setMuted(nextState);
    setIsMuted(nextState);
  };

  return (
    <header className="w-full bg-card border-b border-border sticky top-0 z-40 px-4 sm:px-8 py-3.5 flex items-center justify-between shadow-xs">
      {/* Title & Mobile Brand */}
      <div className="flex items-center gap-4">
        <div className="xl:hidden flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-lime-500 text-lime-950 flex items-center justify-center font-bold text-sm shadow-md">
            🧾
          </div>
          <span className="font-bold text-base font-heading text-foreground">
            THERMO<span className="text-lime-600">POS</span>
          </span>
        </div>

        <div className="hidden xl:block">
          <h2 className="font-bold text-xl font-heading tracking-tight text-foreground">
            {activeTab === 'dashboard' ? 'Billing Dashboard' : activeTab === 'printer' ? '3D Thermal Printer' : activeTab === 'pos' ? 'POS Studio' : 'Transactions & Logs'}
          </h2>
          <p className="text-xs text-muted-foreground">
            Real-time motor feed & thermal billing physics engine
          </p>
        </div>
      </div>

      {/* Search Input Bar */}
      <div className="hidden md:flex items-center gap-2 bg-secondary/60 rounded-2xl px-3.5 py-1.5 border border-border w-64 focus-within:border-lime-500 transition-all">
        <Search className="w-4 h-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search transactions..."
          className="bg-transparent text-xs text-foreground placeholder:text-muted-foreground focus:outline-none w-full"
        />
      </div>

      {/* Mobile Tab Segment Control */}
      <div className="flex xl:hidden bg-secondary/80 rounded-xl p-1 border border-border text-xs font-semibold">
        <button
          onClick={() => {
            playButtonClick();
            setActiveTab('printer');
          }}
          className={`px-3 py-1 rounded-lg transition-all flex items-center gap-1.5 ${
            activeTab === 'printer'
              ? 'bg-lime-400 text-lime-950 font-bold shadow-sm'
              : 'text-muted-foreground'
          }`}
        >
          <Printer className="w-3.5 h-3.5" />
          <span>Printer</span>
        </button>
        <button
          onClick={() => {
            playButtonClick();
            setActiveTab('pos');
          }}
          className={`px-3 py-1 rounded-lg transition-all flex items-center gap-1.5 ${
            activeTab === 'pos'
              ? 'bg-lime-400 text-lime-950 font-bold shadow-sm'
              : 'text-muted-foreground'
          }`}
        >
          <Sliders className="w-3.5 h-3.5" />
          <span>POS</span>
        </button>
      </div>

      {/* User Avatar & Audio Actions */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* History Quick Trigger */}
        <button
          onClick={() => {
            playButtonClick();
            onOpenHistory();
          }}
          className="relative flex items-center gap-1.5 px-3 py-2 rounded-xl bg-secondary/80 hover:bg-secondary text-foreground text-xs font-semibold border border-border transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          <History className="w-4 h-4 text-lime-600" />
          <span className="hidden sm:inline">Log</span>
          {historyCount > 0 && (
            <span className="px-1.5 py-0.2 rounded-full bg-lime-500 text-lime-950 font-mono font-bold text-[10px]">
              {historyCount}
            </span>
          )}
        </button>

        {/* Audio Mute Switch */}
        <button
          onClick={toggleAudio}
          className={`p-2 rounded-xl border transition-all ${
            isMuted
              ? 'bg-secondary/40 text-muted-foreground border-border'
              : 'bg-lime-500/15 text-lime-700 border-lime-500/30 shadow-md shadow-lime-500/10'
          }`}
          title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
        >
          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </button>

        {/* Help Modal */}
        <button
          onClick={() => {
            playButtonClick();
            onOpenHelp();
          }}
          className="p-2 rounded-xl bg-secondary/60 text-muted-foreground hover:text-foreground border border-border hover:bg-secondary transition-all"
        >
          <HelpCircle className="w-4 h-4" />
        </button>

        {/* User Profile Badge */}
        <div className="hidden sm:flex items-center gap-2.5 pl-2 border-l border-border">
          <div className="w-8 h-8 rounded-full bg-lime-600 text-white font-bold flex items-center justify-center text-xs shadow-md">
            Y
          </div>
          <div className="text-left leading-tight hidden lg:block">
            <span className="font-bold text-xs text-foreground block">Yash Swarnkar</span>
            <span className="text-[10px] text-muted-foreground font-medium">Store Admin</span>
          </div>
        </div>
      </div>
    </header>
  );
}

import React from 'react';
import { Volume2, VolumeX, Printer, History, HelpCircle, Palette, Monitor, Sliders } from 'lucide-react';
import { getMuted, setMuted, playButtonClick } from '../utils/audio';

export default function Navbar({
  isMuted,
  setIsMuted,
  onOpenHistory,
  historyCount,
  onOpenHelp,
  selectedSkin,
  setSelectedSkin,
  PAPER_SKINS,
  activeMobileTab,
  setActiveMobileTab
}) {
  const toggleAudio = () => {
    playButtonClick();
    const nextState = !isMuted;
    setMuted(nextState);
    setIsMuted(nextState);
  };

  return (
    <header className="w-full border-b border-border bg-card/80 backdrop-blur-xl sticky top-0 z-40 px-3 sm:px-6 py-3 flex items-center justify-between shadow-sm">
      {/* Brand Title */}
      <div className="flex items-center gap-2.5">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 via-amber-400 to-yellow-300 p-0.5 shadow-md shadow-amber-500/10 flex-shrink-0">
          <div className="w-full h-full bg-background rounded-[10px] flex items-center justify-center">
            <Printer className="w-4.5 h-4.5 text-amber-400" />
          </div>
        </div>
        <div>
          <div className="flex items-center gap-1.5">
            <h1 className="font-bold text-base sm:text-lg font-heading tracking-tight text-foreground">
              ThermoPhysics <span className="text-amber-400 font-mono text-xs font-semibold">3D</span>
            </h1>
          </div>
          <p className="text-[11px] text-muted-foreground hidden md:block">
            Real-time Thermal Billing Motor & Physics Studio
          </p>
        </div>
      </div>

      {/* Center Segment Controller for Mobile View Switch */}
      <div className="flex lg:hidden bg-secondary/80 rounded-xl p-1 border border-border text-xs font-medium">
        <button
          onClick={() => {
            playButtonClick();
            setActiveMobileTab('printer');
          }}
          className={`px-3 py-1 rounded-lg transition-all flex items-center gap-1.5 ${
            activeMobileTab === 'printer'
              ? 'bg-amber-500/20 text-amber-300 font-semibold border border-amber-500/30'
              : 'text-muted-foreground'
          }`}
        >
          <Printer className="w-3.5 h-3.5" />
          <span>Printer</span>
        </button>
        <button
          onClick={() => {
            playButtonClick();
            setActiveMobileTab('controls');
          }}
          className={`px-3 py-1 rounded-lg transition-all flex items-center gap-1.5 ${
            activeMobileTab === 'controls'
              ? 'bg-amber-500/20 text-amber-300 font-semibold border border-amber-500/30'
              : 'text-muted-foreground'
          }`}
        >
          <Sliders className="w-3.5 h-3.5" />
          <span>POS</span>
        </button>
      </div>

      {/* Desktop Quick Actions */}
      <div className="flex items-center gap-2 sm:gap-2.5">
        {/* Paper Skin Selector Dropdown / Pills */}
        <div className="hidden xl:flex items-center bg-secondary/60 rounded-xl p-1 border border-border text-xs">
          <Palette className="w-3.5 h-3.5 text-muted-foreground ml-2 mr-1.5" />
          {PAPER_SKINS.map((skin) => (
            <button
              key={skin.id}
              onClick={() => {
                playButtonClick();
                setSelectedSkin(skin.id);
              }}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all ${
                selectedSkin === skin.id
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {skin.name.split(' ')[0]}
            </button>
          ))}
        </div>

        {/* History Log Button */}
        <button
          onClick={() => {
            playButtonClick();
            onOpenHistory();
          }}
          className="relative flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-secondary/80 hover:bg-secondary text-foreground text-xs font-semibold border border-border transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          <History className="w-3.5 h-3.5 text-amber-400" />
          <span className="hidden sm:inline">History</span>
          {historyCount > 0 && (
            <span className="px-1.5 py-0.2 rounded-full bg-amber-500 text-background font-mono font-bold text-[10px]">
              {historyCount}
            </span>
          )}
        </button>

        {/* Mute Toggle */}
        <button
          onClick={toggleAudio}
          className={`p-2 rounded-xl border transition-all ${
            isMuted
              ? 'bg-secondary/40 text-muted-foreground border-border'
              : 'bg-amber-500/10 text-amber-400 border-amber-500/30 shadow-md shadow-amber-500/10'
          }`}
          title={isMuted ? 'Unmute Sound Synthesis' : 'Mute Sound Synthesis'}
        >
          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </button>

        {/* Hotkey Help Dialog */}
        <button
          onClick={() => {
            playButtonClick();
            onOpenHelp();
          }}
          className="p-2 rounded-xl bg-secondary/60 text-muted-foreground hover:text-foreground border border-border hover:bg-secondary transition-all"
          title="Keyboard Shortcuts"
        >
          <HelpCircle className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
}

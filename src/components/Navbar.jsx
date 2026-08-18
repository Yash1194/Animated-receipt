import React from 'react';
import { Volume2, VolumeX, Printer, Sparkles, History, HelpCircle, Palette } from 'lucide-react';
import { getMuted, setMuted } from '../utils/audio';

export default function Navbar({
  isMuted,
  setIsMuted,
  onOpenHistory,
  historyCount,
  onOpenHelp,
  selectedSkin,
  setSelectedSkin,
  PAPER_SKINS
}) {
  const toggleAudio = () => {
    const nextState = !isMuted;
    setMuted(nextState);
    setIsMuted(nextState);
  };

  return (
    <header className="w-full border-b border-border bg-card/60 backdrop-blur-md sticky top-0 z-40 px-4 md:px-8 py-3.5 flex items-center justify-between">
      {/* Brand Title */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 via-yellow-400 to-emerald-400 p-0.5 shadow-lg shadow-amber-500/20">
          <div className="w-full h-full bg-background rounded-[10px] flex items-center justify-center">
            <Printer className="w-5 h-5 text-amber-400" />
          </div>
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-bold text-lg md:text-xl font-heading tracking-tight bg-gradient-to-r from-amber-200 via-yellow-400 to-emerald-400 bg-clip-text text-transparent">
              ThermoPhysics 3D
            </h1>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono uppercase bg-amber-500/10 text-amber-400 border border-amber-500/20">
              v2.5 Studio
            </span>
          </div>
          <p className="text-xs text-muted-foreground hidden sm:block">
            Real-time Thermal Receipt Motor & Physics Engine
          </p>
        </div>
      </div>

      {/* Control Actions */}
      <div className="flex items-center gap-2 md:gap-3">
        {/* Paper Skin Selector */}
        <div className="hidden lg:flex items-center bg-secondary/60 rounded-xl p-1 border border-border text-xs">
          <Palette className="w-3.5 h-3.5 text-muted-foreground ml-2 mr-1" />
          {PAPER_SKINS.map((skin) => (
            <button
              key={skin.id}
              onClick={() => setSelectedSkin(skin.id)}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                selectedSkin === skin.id
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {skin.name.split(' ')[0]}
            </button>
          ))}
        </div>

        {/* History Gallery Button */}
        <button
          onClick={onOpenHistory}
          className="relative flex items-center gap-2 px-3 py-2 rounded-xl bg-secondary/80 hover:bg-secondary text-foreground text-xs md:text-sm font-medium border border-border transition-all hover:scale-[1.02] active:scale-[0.98]"
          title="Saved Receipts History"
        >
          <History className="w-4 h-4 text-amber-400" />
          <span className="hidden sm:inline">Receipt Log</span>
          {historyCount > 0 && (
            <span className="w-5 h-5 rounded-full bg-amber-500 text-background font-mono font-bold text-[10px] flex items-center justify-center shadow-md">
              {historyCount}
            </span>
          )}
        </button>

        {/* Mute/Sound Toggle */}
        <button
          onClick={toggleAudio}
          className={`p-2.5 rounded-xl border transition-all ${
            isMuted
              ? 'bg-secondary/40 text-muted-foreground border-border'
              : 'bg-amber-500/10 text-amber-400 border-amber-500/30 shadow-lg shadow-amber-500/10'
          }`}
          title={isMuted ? 'Unmute Audio Synthesis' : 'Mute Audio Synthesis'}
        >
          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </button>

        {/* Help Modal Trigger */}
        <button
          onClick={onOpenHelp}
          className="p-2.5 rounded-xl bg-secondary/60 text-muted-foreground hover:text-foreground border border-border hover:bg-secondary transition-all"
          title="Keyboard Shortcuts & Physics Controls"
        >
          <HelpCircle className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
}

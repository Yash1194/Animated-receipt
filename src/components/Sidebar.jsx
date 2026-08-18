import React from 'react';
import {
  LayoutDashboard,
  Receipt,
  BarChart3,
  Sliders,
  Palette,
  Settings,
  Sparkles,
  CreditCard,
  Printer
} from 'lucide-react';
import { playButtonClick } from '../utils/audio';

export default function Sidebar({ activeTab, setActiveTab, historyCount }) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'printer', label: '3D Printer', icon: Printer },
    { id: 'pos', label: 'POS Studio', icon: Sliders },
    { id: 'history', label: 'Transactions', icon: Receipt, badge: historyCount },
    { id: 'skins', label: 'Paper Skins', icon: Palette },
  ];

  return (
    <aside className="w-64 bg-card border-r border-border min-h-screen p-5 hidden xl:flex flex-col justify-between flex-shrink-0 shadow-sm">
      <div className="space-y-6">
        {/* Logo */}
        <div className="flex items-center gap-3 px-2 py-1">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-600 via-lime-500 to-green-400 flex items-center justify-center shadow-lg shadow-lime-500/20 text-white font-bold text-lg">
            🧾
          </div>
          <div>
            <h1 className="font-bold text-lg font-heading text-foreground tracking-tight flex items-center gap-1.5">
              THERMO<span className="text-lime-600">POS</span>
            </h1>
            <p className="text-[11px] text-muted-foreground font-medium">Thermal Billing Studio</p>
          </div>
        </div>

        {/* Navigation Menu Links */}
        <nav className="space-y-1.5">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  playButtonClick();
                  setActiveTab(item.id);
                }}
                className={`w-full px-4 py-3 rounded-2xl text-xs font-semibold flex items-center justify-between transition-all duration-200 ${
                  isActive
                    ? 'bg-lime-400 text-lime-950 shadow-md shadow-lime-400/20 font-bold scale-[1.02]'
                    : 'text-muted-foreground hover:text-foreground hover:bg-secondary/60'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-lime-950' : 'text-muted-foreground'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge > 0 && (
                  <span
                    className={`px-2 py-0.5 rounded-full font-mono text-[10px] font-bold ${
                      isActive
                        ? 'bg-lime-950 text-lime-400'
                        : 'bg-lime-500/15 text-lime-700'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Forest Green Bottom Promo Card */}
      <div className="forest-card p-4 space-y-3 relative overflow-hidden">
        <div className="flex items-center justify-between">
          <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center text-lime-400">
            <Sparkles className="w-4 h-4" />
          </div>
          <span className="text-[10px] font-mono uppercase text-lime-300 font-bold bg-lime-400/10 px-2 py-0.5 rounded-full border border-lime-400/20">
            PRO ENGINE
          </span>
        </div>
        <div>
          <h4 className="font-bold text-xs text-white font-heading">Web Audio Synth</h4>
          <p className="text-[11px] text-emerald-100/70 mt-0.5">
            Physical motor step & paper sizzle audio engine.
          </p>
        </div>
      </div>
    </aside>
  );
}

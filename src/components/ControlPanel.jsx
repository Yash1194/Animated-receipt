import React, { useState } from 'react';
import { RECEIPT_PRESETS, STAMP_OPTIONS, PAPER_SKINS } from '../data/templates';
import {
  SlidersHorizontal,
  Store,
  Plus,
  Trash2,
  Zap,
  Tag,
  CreditCard,
  Gauge,
  Sparkles,
  FileText
} from 'lucide-react';
import { playButtonClick } from '../utils/audio';

export default function ControlPanel({
  receiptData,
  setReceiptData,
  paperSkin,
  setPaperSkin,
  customStamp,
  setCustomStamp,
  printSpeed,
  setPrintSpeed,
  onTriggerPrint
}) {
  const [activeTab, setActiveTab] = useState('preset'); // 'preset' | 'customizer' | 'appearance'

  // Load preset template
  const handleSelectPreset = (preset) => {
    playButtonClick();
    setReceiptData({
      storeName: preset.storeName,
      tagline: preset.tagline,
      address: preset.address,
      phone: preset.phone,
      taxRate: preset.taxRate,
      tipRate: 0,
      currency: preset.currency,
      items: [...preset.items],
      paymentMethod: preset.paymentMethod,
      cashier: preset.cashier,
      transactionId: `TXN-${Math.floor(1000000000 + Math.random() * 9000000000)}`
    });
    setPaperSkin(preset.paperSkin || 'classic');
    setCustomStamp(preset.stamp || 'INVOICE PAID');
    onTriggerPrint();
  };

  // Add line item
  const handleAddItem = () => {
    playButtonClick();
    const newItem = {
      id: Date.now().toString(),
      name: 'Custom Service Item',
      qty: 1,
      price: 19.99
    };
    setReceiptData((prev) => ({
      ...prev,
      items: [...prev.items, newItem]
    }));
  };

  // Update item field
  const handleUpdateItem = (id, field, value) => {
    setReceiptData((prev) => ({
      ...prev,
      items: prev.items.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      )
    }));
  };

  // Remove item
  const handleRemoveItem = (id) => {
    playButtonClick();
    setReceiptData((prev) => ({
      ...prev,
      items: prev.items.filter((item) => item.id !== id)
    }));
  };

  return (
    <div className="w-full dashboard-card p-5 sm:p-6 border border-border shadow-xl flex flex-col h-full bg-white">
      {/* Panel Header */}
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-border">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-lime-500/15 text-lime-700 flex items-center justify-center font-bold">
            <SlidersHorizontal className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-base font-heading text-foreground">POS Studio Controls</h3>
            <p className="text-[11px] text-muted-foreground">Customize receipt items & stamps</p>
          </div>
        </div>
        <button
          onClick={() => {
            playButtonClick();
            onTriggerPrint();
          }}
          className="px-3.5 py-1.5 rounded-xl bg-lime-400 hover:bg-lime-500 text-lime-950 font-bold text-xs flex items-center gap-1.5 transition-all active:scale-95 shadow-sm"
        >
          <Zap className="w-3.5 h-3.5" />
          <span>Print Feed</span>
        </button>
      </div>

      {/* Navigation Segment Tabs */}
      <div className="grid grid-cols-3 gap-1.5 p-1 bg-secondary/70 rounded-2xl border border-border mb-4 text-xs font-semibold">
        <button
          onClick={() => {
            playButtonClick();
            setActiveTab('preset');
          }}
          className={`py-2 rounded-xl transition-all flex items-center justify-center gap-1.5 ${
            activeTab === 'preset'
              ? 'bg-white text-lime-950 shadow-sm font-bold'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          <Store className="w-3.5 h-3.5 text-lime-600" />
          <span>Presets</span>
        </button>

        <button
          onClick={() => {
            playButtonClick();
            setActiveTab('customizer');
          }}
          className={`py-2 rounded-xl transition-all flex items-center justify-center gap-1.5 ${
            activeTab === 'customizer'
              ? 'bg-white text-lime-950 shadow-sm font-bold'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          <FileText className="w-3.5 h-3.5 text-lime-600" />
          <span>Items POS</span>
        </button>

        <button
          onClick={() => {
            playButtonClick();
            setActiveTab('appearance');
          }}
          className={`py-2 rounded-xl transition-all flex items-center justify-center gap-1.5 ${
            activeTab === 'appearance'
              ? 'bg-white text-lime-950 shadow-sm font-bold'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5 text-lime-600" />
          <span>Skins & Stamp</span>
        </button>
      </div>

      {/* Tab 1: Presets Gallery */}
      {activeTab === 'preset' && (
        <div className="space-y-3 overflow-y-auto max-h-[480px] pr-1">
          <p className="text-xs text-muted-foreground mb-1">
            Choose a preset template to populate receipt data & paper styling:
          </p>
          {RECEIPT_PRESETS.map((preset) => (
            <div
              key={preset.id}
              onClick={() => handleSelectPreset(preset)}
              className="p-4 rounded-2xl bg-secondary/40 hover:bg-secondary/80 border border-border hover:border-lime-500/40 cursor-pointer transition-all hover:scale-[1.01] active:scale-[0.99] group shadow-2xs"
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm text-foreground group-hover:text-lime-700 transition-colors font-heading">
                  {preset.name}
                </span>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-white text-lime-800 border border-border">
                  {preset.category}
                </span>
              </div>
              <p className="text-xs text-muted-foreground mt-1 line-clamp-1">
                {preset.tagline}
              </p>
              <div className="mt-2.5 flex items-center justify-between text-[11px] text-muted-foreground border-t border-border pt-2">
                <span>{preset.items.length} Line Items</span>
                <span className="font-mono text-lime-700 font-bold">
                  {preset.currency}
                  {preset.items
                    .reduce((acc, i) => acc + i.price * i.qty, 0)
                    .toFixed(2)}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 2: Custom Items POS Builder */}
      {activeTab === 'customizer' && (
        <div className="space-y-4 overflow-y-auto max-h-[480px] pr-1 text-xs">
          {/* Store Info Inputs */}
          <div className="space-y-2.5 bg-secondary/30 p-3.5 rounded-2xl border border-border">
            <span className="font-semibold text-foreground block mb-1">Business Details</span>
            <div>
              <label className="text-[10px] text-muted-foreground font-medium">Store Name</label>
              <input
                type="text"
                value={receiptData.storeName || ''}
                onChange={(e) =>
                  setReceiptData({ ...receiptData, storeName: e.target.value })
                }
                className="w-full mt-0.5 px-3 py-1.5 rounded-xl bg-white border border-border text-foreground focus:outline-none focus:border-lime-500 font-medium"
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-[10px] text-muted-foreground font-medium">Tax Rate (%)</label>
                <input
                  type="number"
                  value={receiptData.taxRate || 0}
                  onChange={(e) =>
                    setReceiptData({ ...receiptData, taxRate: parseFloat(e.target.value) || 0 })
                  }
                  className="w-full mt-0.5 px-3 py-1.5 rounded-xl bg-white border border-border text-foreground focus:outline-none focus:border-lime-500 font-medium"
                />
              </div>
              <div>
                <label className="text-[10px] text-muted-foreground font-medium">Payment Method</label>
                <input
                  type="text"
                  value={receiptData.paymentMethod || ''}
                  onChange={(e) =>
                    setReceiptData({ ...receiptData, paymentMethod: e.target.value })
                  }
                  className="w-full mt-0.5 px-3 py-1.5 rounded-xl bg-white border border-border text-foreground focus:outline-none focus:border-lime-500 font-medium"
                />
              </div>
            </div>
          </div>

          {/* Line Items List */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold text-foreground">Line Items ({receiptData.items.length})</span>
              <button
                onClick={handleAddItem}
                className="px-2.5 py-1 rounded-lg bg-lime-500/15 text-lime-800 border border-lime-500/30 text-[11px] font-bold flex items-center gap-1 hover:bg-lime-500/25 transition-all"
              >
                <Plus className="w-3 h-3" />
                <span>Add Item</span>
              </button>
            </div>

            <div className="space-y-2">
              {receiptData.items.map((item) => (
                <div
                  key={item.id}
                  className="p-2.5 rounded-xl bg-secondary/30 border border-border flex items-center gap-2"
                >
                  <input
                    type="text"
                    value={item.name}
                    onChange={(e) => handleUpdateItem(item.id, 'name', e.target.value)}
                    placeholder="Item name"
                    className="flex-1 px-2.5 py-1 rounded-lg bg-white border border-border text-foreground focus:outline-none text-xs font-medium"
                  />
                  <input
                    type="number"
                    value={item.qty}
                    onChange={(e) =>
                      handleUpdateItem(item.id, 'qty', parseInt(e.target.value) || 1)
                    }
                    min="1"
                    className="w-12 px-2 py-1 rounded-lg bg-white border border-border text-foreground text-center focus:outline-none text-xs font-medium"
                  />
                  <input
                    type="number"
                    value={item.price}
                    onChange={(e) =>
                      handleUpdateItem(item.id, 'price', parseFloat(e.target.value) || 0)
                    }
                    step="0.5"
                    className="w-16 px-2 py-1 rounded-lg bg-white border border-border text-foreground text-right focus:outline-none text-xs font-medium"
                  />
                  <button
                    onClick={() => handleRemoveItem(item.id)}
                    className="p-1.5 text-muted-foreground hover:text-red-500 rounded-lg hover:bg-red-500/10 transition-all"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Style & Stamp Customizer */}
      {activeTab === 'appearance' && (
        <div className="space-y-4 overflow-y-auto max-h-[480px] pr-1 text-xs">
          {/* Rubber Stamp Selector */}
          <div>
            <label className="font-semibold text-foreground block mb-2">
              Select Invoice Stamp Style
            </label>
            <div className="grid grid-cols-2 gap-2">
              {STAMP_OPTIONS.map((stamp) => (
                <button
                  key={stamp.id}
                  onClick={() => {
                    playButtonClick();
                    setCustomStamp(stamp.label);
                  }}
                  className={`p-2.5 rounded-xl border text-center font-extrabold tracking-wider transition-all text-xs ${
                    customStamp === stamp.label
                      ? 'border-red-500 text-red-600 bg-red-50 shadow-sm scale-[1.02]'
                      : 'border-border text-muted-foreground hover:text-foreground hover:bg-secondary/60'
                  }`}
                >
                  {stamp.label}
                </button>
              ))}
            </div>
          </div>

          {/* Paper Skin Selector */}
          <div>
            <label className="font-semibold text-foreground block mb-2">
              Thermal Paper Material & Ink
            </label>
            <div className="space-y-2">
              {PAPER_SKINS.map((skin) => (
                <div
                  key={skin.id}
                  onClick={() => {
                    playButtonClick();
                    setPaperSkin(skin.id);
                  }}
                  className={`p-3 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                    paperSkin === skin.id
                      ? 'bg-lime-50 border-lime-500 text-lime-900 shadow-2xs font-semibold'
                      : 'bg-secondary/40 border-border text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <div>
                    <div className="font-bold text-xs">{skin.name}</div>
                    <div className="text-[10px] opacity-75">{skin.desc}</div>
                  </div>
                  {paperSkin === skin.id && (
                    <Sparkles className="w-4 h-4 text-lime-600" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Motor Speed Slider */}
          <div className="bg-secondary/30 p-3.5 rounded-2xl border border-border">
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold text-foreground flex items-center gap-1.5">
                <Gauge className="w-3.5 h-3.5 text-lime-600" />
                Printer Motor Speed
              </span>
              <span className="font-mono text-lime-700 font-bold">
                {printSpeed <= 0.25 ? 'Fast (0.2s)' : printSpeed >= 0.6 ? 'Cinematic (0.8s)' : 'Normal (0.4s)'}
              </span>
            </div>
            <input
              type="range"
              min="0.2"
              max="0.8"
              step="0.1"
              value={printSpeed}
              onChange={(e) => setPrintSpeed(parseFloat(e.target.value))}
              className="w-full accent-lime-600 cursor-pointer"
            />
          </div>
        </div>
      )}
    </div>
  );
}

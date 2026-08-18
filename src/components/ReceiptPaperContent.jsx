import React from 'react';

export default function ReceiptPaperContent({
  data,
  paperSkin = 'classic',
  isStamped = false,
  customStamp = 'INVOICE PAID',
  isTorn = false
}) {
  const {
    storeName = 'BIZY MEDIA AGENCY',
    tagline = 'Digital Innovation Studio',
    address = '10th August 2026 • 14:32 EST',
    phone = 'TXN-8849284192',
    taxRate = 5,
    tipRate = 0,
    currency = '$',
    items = [],
    paymentMethod = 'Credit Card (•••• 4920)',
    transactionId = 'TXN-8849284192'
  } = data || {};

  const subtotal = items.reduce((acc, item) => acc + item.price * (item.qty || 1), 0);
  const taxAmount = (subtotal * taxRate) / 100;
  const tipAmount = (subtotal * tipRate) / 100;
  const grandTotal = subtotal + taxAmount + tipAmount;

  // Paper skin class selector
  const skinClass = {
    classic: 'paper-skin-classic',
    cyber: 'paper-skin-cyber',
    blueprint: 'paper-skin-blueprint',
    vintage: 'paper-skin-vintage',
    gold: 'paper-skin-gold'
  }[paperSkin] || 'paper-skin-classic';

  return (
    <div className={`w-full relative p-5 font-mono text-xs shadow-2xl rounded-t-sm transition-all duration-300 ${skinClass} ${isTorn ? '' : 'receipt-zigzag-bottom'}`}>
      {/* Thermal Scanline Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-5 bg-[linear-gradient(rgba(0,0,0,0)_50%,_rgba(0,0,0,0.4)_50%)] bg-[length:100%_4px]" />

      {/* Header */}
      <div className="text-center pb-3 mb-3 border-b border-current/20">
        <div className="w-8 h-8 rounded-full border border-current/40 flex items-center justify-center mx-auto mb-1 text-sm font-bold opacity-80">
          🧾
        </div>
        <div className="font-bold text-sm tracking-wider uppercase">{storeName}</div>
        {tagline && <div className="text-[10px] opacity-75 mt-0.5">{tagline}</div>}
        <div className="text-[9px] opacity-60 mt-1">{address}</div>
        <div className="text-[9px] opacity-60">{phone}</div>
        <div className="text-[9px] opacity-50 mt-1 font-mono">{transactionId}</div>
      </div>

      {/* Itemized Table */}
      <table className="w-full text-left my-2 border-collapse">
        <thead>
          <tr className="border-b border-current/20 text-[9px] opacity-70">
            <th className="pb-1 font-semibold">QTY</th>
            <th className="pb-1 font-semibold">ITEM</th>
            <th className="pb-1 text-right font-semibold">AMT</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, idx) => (
            <tr key={item.id || idx} className="border-b border-current/10 text-[10.5px]">
              <td className="py-1.5 opacity-80 font-bold w-6">{item.qty || 1}x</td>
              <td className="py-1.5 font-medium">{item.name}</td>
              <td className="py-1.5 text-right font-semibold">
                {currency}{(item.price * (item.qty || 1)).toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Divider */}
      <div className="my-2 border-t border-dashed border-current/30" />

      {/* Financial Calculations */}
      <div className="space-y-1 text-[10px]">
        <div className="flex justify-between opacity-80">
          <span>Subtotal</span>
          <span>{currency}{subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between opacity-80">
          <span>Tax ({taxRate}%)</span>
          <span>{currency}{taxAmount.toFixed(2)}</span>
        </div>
        {tipAmount > 0 && (
          <div className="flex justify-between opacity-80">
            <span>Tip ({tipRate}%)</span>
            <span>{currency}{tipAmount.toFixed(2)}</span>
          </div>
        )}
      </div>

      {/* Divider */}
      <div className="my-2 border-t-2 border-current/30" />

      {/* Grand Total */}
      <div className="flex justify-between items-baseline font-bold text-sm my-1">
        <span>TOTAL</span>
        <span className="text-base">{currency}{grandTotal.toFixed(2)}</span>
      </div>

      {/* Payment info */}
      <div className="mt-3 text-[9px] opacity-70 text-center">
        <div>Paid via {paymentMethod}</div>
        <div className="text-[8px] opacity-50 mt-0.5">THANK YOU FOR YOUR BUSINESS!</div>
      </div>

      {/* SVG Barcode */}
      <div className="mt-4 flex flex-col items-center justify-center opacity-80">
        <svg className="w-48 h-8 text-current fill-current" viewBox="0 0 160 30">
          {/* Simulated Barcode lines */}
          <rect x="0" y="0" width="3" height="30" />
          <rect x="5" y="0" width="1" height="30" />
          <rect x="8" y="0" width="4" height="30" />
          <rect x="15" y="0" width="2" height="30" />
          <rect x="19" y="0" width="1" height="30" />
          <rect x="23" y="0" width="5" height="30" />
          <rect x="30" y="0" width="2" height="30" />
          <rect x="35" y="0" width="3" height="30" />
          <rect x="40" y="0" width="1" height="30" />
          <rect x="44" y="0" width="4" height="30" />
          <rect x="50" y="0" width="2" height="30" />
          <rect x="54" y="0" width="6" height="30" />
          <rect x="63" y="0" width="2" height="30" />
          <rect x="67" y="0" width="1" height="30" />
          <rect x="71" y="0" width="4" height="30" />
          <rect x="78" y="0" width="3" height="30" />
          <rect x="83" y="0" width="2" height="30" />
          <rect x="88" y="0" width="5" height="30" />
          <rect x="95" y="0" width="1" height="30" />
          <rect x="99" y="0" width="3" height="30" />
          <rect x="104" y="0" width="2" height="30" />
          <rect x="108" y="0" width="4" height="30" />
          <rect x="114" y="0" width="1" height="30" />
          <rect x="117" y="0" width="5" height="30" />
          <rect x="124" y="0" width="2" height="30" />
          <rect x="128" y="0" width="3" height="30" />
          <rect x="134" y="0" width="1" height="30" />
          <rect x="137" y="0" width="4" height="30" />
          <rect x="144" y="0" width="2" height="30" />
          <rect x="148" y="0" width="6" height="30" />
          <rect x="156" y="0" width="3" height="30" />
        </svg>
        <span className="text-[8px] font-mono tracking-widest mt-1 opacity-70">
          *{transactionId.replace('-', '')}*
        </span>
      </div>

      {/* Rubber Stamp Badge */}
      <div
        className={`absolute bottom-16 right-4 border-2 border-red-500 text-red-500 font-black text-xs px-3 py-1 rounded tracking-widest transition-all duration-300 pointer-events-none transform ${
          isStamped
            ? 'opacity-90 scale-100 rotate-[-8deg]'
            : 'opacity-0 scale-150 rotate-[15deg]'
        }`}
        style={{
          boxShadow: isStamped ? '0 0 10px rgba(239,68,68,0.2)' : 'none'
        }}
      >
        {customStamp}
      </div>
    </div>
  );
}

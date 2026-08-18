import React from 'react';
import { ArrowUpRight, ArrowDownRight, Wallet, TrendingUp, CreditCard, DollarSign, Receipt } from 'lucide-react';

export default function DashboardStats({ historyCount }) {
  const totalRevenue = 562000;
  const monthlyIncome = 78000;
  const monthlyExpense = 43000;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {/* 1. Forest Green Credit / POS Merchant Card */}
      <div className="forest-card p-5 relative overflow-hidden flex flex-col justify-between h-36">
        <div className="flex items-center justify-between z-10">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-lime-400/20 border border-lime-400/40 flex items-center justify-center text-lime-400 font-bold text-[10px]">
              TP
            </div>
            <span className="font-bold text-xs text-white/90 font-heading">Merchant POS</span>
          </div>
          {/* Simulated Mastercard circles */}
          <div className="flex -space-x-2">
            <div className="w-5 h-5 rounded-full bg-red-500/80" />
            <div className="w-5 h-5 rounded-full bg-amber-400/80" />
          </div>
        </div>

        <div className="z-10 mt-2">
          <span className="text-[10px] text-emerald-200/70 block uppercase font-medium">Total Revenue Balance</span>
          <div className="font-bold text-xl sm:text-2xl text-white font-mono tracking-tight mt-0.5">
            ${totalRevenue.toLocaleString()}.00
          </div>
        </div>

        <div className="flex items-center justify-between text-[10px] text-emerald-100/60 font-mono z-10">
          <span>ID: 8849-2841-92</span>
          <span>CVV 323</span>
        </div>

        {/* Decorative Circle Background */}
        <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-lime-400/10 rounded-full blur-xl pointer-events-none" />
      </div>

      {/* 2. Total Income Stat Card */}
      <div className="dashboard-card p-5 flex flex-col justify-between h-36">
        <div className="flex items-center justify-between">
          <div className="w-9 h-9 rounded-2xl bg-lime-500/10 text-lime-700 flex items-center justify-center">
            <TrendingUp className="w-4 h-4" />
          </div>
          <span className="px-2 py-0.5 rounded-full bg-lime-100 text-lime-800 text-[10px] font-bold flex items-center gap-0.5">
            <ArrowUpRight className="w-3 h-3" /> +17.8%
          </span>
        </div>
        <div>
          <span className="text-[11px] text-muted-foreground font-semibold block">Monthly Revenue</span>
          <div className="font-bold text-xl text-foreground font-mono mt-0.5">
            ${monthlyIncome.toLocaleString()}.00
          </div>
        </div>
        <span className="text-[10px] text-muted-foreground font-medium">Updated 5m ago</span>
      </div>

      {/* 3. Total Expense Stat Card */}
      <div className="dashboard-card p-5 flex flex-col justify-between h-36">
        <div className="flex items-center justify-between">
          <div className="w-9 h-9 rounded-2xl bg-red-500/10 text-red-600 flex items-center justify-center">
            <DollarSign className="w-4 h-4" />
          </div>
          <span className="px-2 py-0.5 rounded-full bg-red-50 text-red-700 text-[10px] font-bold flex items-center gap-0.5">
            <ArrowDownRight className="w-3 h-3" /> -7.5%
          </span>
        </div>
        <div>
          <span className="text-[11px] text-muted-foreground font-semibold block">Operating Expense</span>
          <div className="font-bold text-xl text-foreground font-mono mt-0.5">
            ${monthlyExpense.toLocaleString()}.00
          </div>
        </div>
        <span className="text-[10px] text-muted-foreground font-medium">Inventory & Thermal Rolls</span>
      </div>

      {/* 4. Total Receipts Stat Card */}
      <div className="dashboard-card p-5 flex flex-col justify-between h-36">
        <div className="flex items-center justify-between">
          <div className="w-9 h-9 rounded-2xl bg-emerald-500/10 text-emerald-700 flex items-center justify-center">
            <Receipt className="w-4 h-4" />
          </div>
          <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold flex items-center gap-0.5">
            <ArrowUpRight className="w-3 h-3" /> +12.6%
          </span>
        </div>
        <div>
          <span className="text-[11px] text-muted-foreground font-semibold block">Printed Receipts</span>
          <div className="font-bold text-xl text-foreground font-mono mt-0.5">
            {1248 + historyCount} Printed
          </div>
        </div>
        <span className="text-[10px] text-muted-foreground font-medium">100% Thermal Motor Feed</span>
      </div>
    </div>
  );
}

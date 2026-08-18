import React from 'react';

export default function RevenueChartWidget() {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const incomeData = [45, 60, 52, 78, 65, 90, 70, 85, 95, 80, 100, 88];
  const expenseData = [25, 30, 28, 40, 32, 45, 35, 42, 48, 40, 50, 44];

  return (
    <div className="dashboard-card p-5 border border-border shadow-md bg-white">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-bold text-base font-heading text-foreground">Cashflow Analytics</h3>
          <p className="text-xs text-muted-foreground">Monthly revenue vs thermal operation expenses</p>
        </div>
        <div className="flex items-center gap-4 text-xs font-semibold">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#0e382c]" />
            <span className="text-foreground">Revenue ($562k)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-lime-400" />
            <span className="text-foreground">Expense ($43k)</span>
          </div>
        </div>
      </div>

      {/* Simulated Bar Chart */}
      <div className="h-44 flex items-end justify-between gap-1 sm:gap-2 pt-6 px-1 border-b border-border">
        {months.map((m, idx) => (
          <div key={m} className="flex-1 flex flex-col items-center gap-1 h-full justify-end group cursor-pointer">
            <div className="w-full max-w-[20px] bg-lime-400 rounded-t-sm transition-all group-hover:bg-lime-500" style={{ height: `${expenseData[idx]}%` }} />
            <div className="w-full max-w-[20px] bg-[#0e382c] rounded-t-md transition-all group-hover:bg-emerald-900" style={{ height: `${incomeData[idx]}%` }} />
          </div>
        ))}
      </div>

      <div className="flex justify-between text-[10px] text-muted-foreground font-mono mt-2 px-1">
        {months.map((m) => (
          <span key={m} className="flex-1 text-center font-medium">{m}</span>
        ))}
      </div>
    </div>
  );
}

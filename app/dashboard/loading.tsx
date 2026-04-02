import React from 'react';

export default function DashboardLoading() {
  return (
    <div className="min-h-screen pt-24 pb-12 px-4 bg-[#050815]">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="w-64 h-10 bg-white/5 rounded-lg animate-pulse" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-32 bg-white/5 rounded-xl border border-white/5 animate-pulse" />
          ))}
        </div>
        <div className="h-[400px] bg-white/5 rounded-2xl border border-white/5 animate-pulse" />
      </div>
    </div>
  );
}

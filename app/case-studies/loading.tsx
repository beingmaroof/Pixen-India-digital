import React from 'react';

export default function CaseStudiesLoading() {
  return (
    <div className="min-h-screen pt-32 pb-20 px-4 bg-[#050815]">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <div className="w-48 h-12 bg-white/5 rounded-lg mx-auto animate-pulse" />
          <div className="w-96 h-6 bg-white/5 mx-auto rounded animate-pulse" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="h-80 bg-white/5 rounded-2xl border border-white/5 animate-pulse" />
          ))}
        </div>
      </div>
    </div>
  );
}

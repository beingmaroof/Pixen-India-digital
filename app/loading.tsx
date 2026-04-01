export default function Loading() {
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center" style={{ background: '#02030A' }}>
      <div className="relative flex items-center justify-center">
        {/* Outer glowing ring */}
        <div className="absolute w-20 h-20 rounded-full border-2 border-purple-500/20 border-t-purple-500 animate-[spin_2s_linear_infinite]" />
        
        {/* Middle reverse ring */}
        <div className="absolute w-14 h-14 rounded-full border-2 border-blue-500/20 border-b-blue-500 animate-[spin_1.5s_linear_infinite_reverse]" />
        
        {/* Inner pulsing orb */}
        <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-purple-600 to-blue-500 animate-pulse shadow-[0_0_20px_rgba(168,85,247,0.5)]" />
      </div>
      
      <div className="mt-8">
        <div className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 text-sm font-semibold tracking-[0.2em] uppercase animate-pulse">
          Loading Pixen
        </div>
      </div>
    </div>
  );
}

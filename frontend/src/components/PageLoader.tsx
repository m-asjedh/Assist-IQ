"use client";

export function PageLoader({ label = "Loading" }: { label?: string }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-8 bg-[#f3f4f6] px-6">
      <div className="relative w-20 h-20">
        <div className="aiq-loader-tile absolute inset-0 border-4 border-black rounded-2xl bg-purple-400 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]" />
        <div className="aiq-loader-tile aiq-loader-tile-2 absolute inset-0 border-4 border-black rounded-2xl bg-[#ccff00] shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]" />
        <div className="aiq-loader-tile aiq-loader-tile-3 absolute inset-0 border-4 border-black rounded-2xl bg-orange-400 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]" />
      </div>

      <div className="text-center">
        <div className="font-black uppercase tracking-tighter text-2xl mb-2">
          Assist IQ.
        </div>
        <div className="font-black uppercase tracking-widest text-sm text-black/50">
          {label}
          <span className="aiq-loader-dots inline-block w-6 text-left overflow-hidden align-bottom">
            ...
          </span>
        </div>
      </div>
    </div>
  );
}

export function InlineLoader({ label = "Loading" }: { label?: string }) {
  return (
    <div className="max-w-7xl mx-auto flex flex-col items-center justify-center py-24 gap-6">
      <div className="flex gap-2">
        <span className="aiq-inline-dot w-4 h-4 border-2 border-black rounded-sm bg-purple-400" />
        <span className="aiq-inline-dot aiq-inline-dot-2 w-4 h-4 border-2 border-black rounded-sm bg-[#ccff00]" />
        <span className="aiq-inline-dot aiq-inline-dot-3 w-4 h-4 border-2 border-black rounded-sm bg-orange-400" />
      </div>
      <p className="font-black uppercase tracking-widest text-sm text-black/50">
        {label}
      </p>
    </div>
  );
}

import React from 'react';

export default function HealthHighlightsBar() {
  const highlights = [
    { label: "No Sugar", iconUrl: "https://images.unsplash.com/photo-1614735241165-6756e1df61ab?w=100&auto=format&fit=crop&q=80", desc: "100% Organic Jaggery" },
    { label: "No Maida", iconUrl: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=100&auto=format&fit=crop&q=80", desc: "Whole Wheat & Millets" },
    { label: "No Preservatives", iconUrl: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=100&auto=format&fit=crop&q=80", desc: "Freshly Baked Daily" },
    { label: "No Dalda", iconUrl: "https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=100&auto=format&fit=crop&q=80", desc: "Pure Desi Cow Ghee" },
  ];

  return (
    <div className="bg-[#1E3A5F] text-[#FAF5EE] py-2 px-4 shadow-sm border-b border-white/10">
      <div className="max-w-[1440px] mx-auto flex flex-wrap items-center justify-around gap-3 text-xs font-semibold">
        {highlights.map((item, idx) => (
          <div key={idx} className="flex items-center gap-2 hover:text-[#D99036] transition-colors">
            {/* Real Image Badge Avatar */}
            <div className="relative w-5 h-5 rounded-full overflow-hidden border border-amber-300/50 shrink-0">
              <img src={item.iconUrl} alt={item.label} className="w-full h-full object-cover" />
            </div>
            <span className="font-bold tracking-wide">{item.label}</span>
            <span className="hidden sm:inline text-amber-200/90 text-[11px]">({item.desc})</span>
            {idx < highlights.length - 1 && (
              <span className="hidden md:inline ml-3 text-amber-400/40">•</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

import React from 'react';

export default function HealthHighlightsBar() {
  const highlights = [
    { label: "No Sugar", icon: "🌾", desc: "100% Organic Jaggery" },
    { label: "No Maida", icon: "🌾", desc: "Whole Wheat & Millets" },
    { label: "No Preservatives", icon: "🌾", desc: "Freshly Baked Daily" },
    { label: "No Dalda", icon: "🌾", desc: "Pure Desi Ghee" },
  ];

  return (
    <div className="bg-[#1E3A5F] text-[#FAF5EE] py-2 px-4 shadow-inner">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-around gap-2 text-xs md:text-sm font-medium">
        {highlights.map((item, idx) => (
          <div key={idx} className="flex items-center gap-1.5 hover:opacity-90 transition-opacity">
            <span className="text-amber-400">{item.icon}</span>
            <span className="font-bold tracking-wide">{item.label}</span>
            <span className="hidden sm:inline text-amber-200/80 text-[11px]">({item.desc})</span>
            {idx < highlights.length - 1 && (
              <span className="hidden md:inline ml-4 text-amber-400/40">•</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

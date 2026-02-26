'use client';

import { useState, type ReactNode } from "react";

type Props = {
  punjabi: ReactNode;
  english: ReactNode;
};

const tabs = [
  { id: "punjabi", label: "ਪੰਜਾਬੀ" },
  { id: "english", label: "English" },
] as const;

export function TabbedText({ punjabi, english }: Props) {
  const [active, setActive] = useState<(typeof tabs)[number]["id"]>("punjabi");

  return (
    <div className="w-full flex flex-col items-center">
      <div className="inline-flex rounded-full border border-white/20 bg-white/10 p-1 backdrop-blur-sm">
        {tabs.map((tab) => {
          const isActive = active === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActive(tab.id)}
              className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                isActive
                  ? "bg-white text-black shadow-sm"
                  : "text-white hover:bg-white/20"
              }`}
              aria-pressed={isActive}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      <div className="mt-6 w-full max-w-4xl text-base text-zinc-100 sm:text-lg text-center min-h-[260px]">
        {active === "punjabi" ? (
          <div className="space-y-4 leading-relaxed text-center">{punjabi}</div>
        ) : (
          <div className="space-y-4 leading-relaxed text-center">{english}</div>
        )}
      </div>
    </div>
  );
}

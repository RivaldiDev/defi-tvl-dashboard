"use client";

import { Activity } from "lucide-react";

export function Header() {
  return (
    <header className="glass sticky top-0 z-50 border-b border-purple-500/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center shadow-lg shadow-purple-500/30">
              <Activity className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold gradient-text">DeFi Pulse</h1>
              <p className="text-[10px] text-muted-foreground -mt-0.5 tracking-wider uppercase">TVL Dashboard</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 text-xs text-muted-foreground">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Live Data
            </div>
            <a
              href="https://defillama.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-muted-foreground hover:text-purple-400 transition-colors"
            >
              Powered by DefiLlama
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}

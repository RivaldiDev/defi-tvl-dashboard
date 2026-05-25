"use client";

import { Protocol } from "@/lib/types";
import Image from "next/image";
import { useState } from "react";

interface ProtocolTableProps {
  protocols: Protocol[];
  maxTvl: number;
}

function formatTvl(val: number): string {
  if (val >= 1e9) return `$${(val / 1e9).toFixed(2)}B`;
  if (val >= 1e6) return `$${(val / 1e6).toFixed(2)}M`;
  if (val >= 1e3) return `$${(val / 1e3).toFixed(2)}K`;
  return `$${val.toFixed(2)}`;
}

function formatChange(val?: number): { text: string; color: string } {
  if (val == null) return { text: "—", color: "text-muted-foreground" };
  const sign = val >= 0 ? "+" : "";
  const color = val > 0 ? "text-emerald-400" : val < 0 ? "text-red-400" : "text-muted-foreground";
  return { text: `${sign}${val.toFixed(2)}%`, color };
}

function ProtocolIcon({ slug }: { slug: string }) {
  const [error, setError] = useState(false);
  if (error) {
    return (
      <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 text-xs font-bold shrink-0">
        ?
      </div>
    );
  }
  return (
    <Image
      src={`https://icons.llama.fi/${slug}.png`}
      alt=""
      width={32}
      height={32}
      className="rounded-full shrink-0 bg-white/5"
      onError={() => setError(true)}
      unoptimized
    />
  );
}

export function ProtocolTable({ protocols, maxTvl }: ProtocolTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-purple-500/10">
            <th className="text-left py-4 px-4 text-muted-foreground text-xs font-semibold uppercase tracking-wider w-12">#</th>
            <th className="text-left py-4 px-4 text-muted-foreground text-xs font-semibold uppercase tracking-wider">Protocol</th>
            <th className="text-left py-4 px-4 text-muted-foreground text-xs font-semibold uppercase tracking-wider hidden md:table-cell">Category</th>
            <th className="text-left py-4 px-4 text-muted-foreground text-xs font-semibold uppercase tracking-wider hidden lg:table-cell">Chains</th>
            <th className="text-right py-4 px-4 text-muted-foreground text-xs font-semibold uppercase tracking-wider">TVL</th>
            <th className="text-left py-4 px-4 text-muted-foreground text-xs font-semibold uppercase tracking-wider hidden xl:table-cell w-32">TVL Share</th>
            <th className="text-right py-4 px-4 text-muted-foreground text-xs font-semibold uppercase tracking-wider">1d</th>
            <th className="text-right py-4 px-4 text-muted-foreground text-xs font-semibold uppercase tracking-wider hidden sm:table-cell">7d</th>
            <th className="text-right py-4 px-4 text-muted-foreground text-xs font-semibold uppercase tracking-wider hidden md:table-cell">1m</th>
          </tr>
        </thead>
        <tbody>
          {protocols.map((p, i) => {
            const change1d = formatChange(p.change_1d);
            const change7d = formatChange(p.change_7d);
            const change1m = formatChange(p.change_1m);
            const barWidth = maxTvl > 0 ? Math.max(2, (p.tvl / maxTvl) * 100) : 0;

            return (
              <tr
                key={p.id}
                className="border-b border-purple-500/5 hover:bg-purple-500/5 transition-colors duration-150 animate-fade-in"
                style={{ animationDelay: `${Math.min(i * 30, 500)}ms` }}
              >
                <td className="py-4 px-4 text-muted-foreground text-sm font-mono">{i + 1}</td>
                <td className="py-4 px-4">
                  <div className="flex items-center gap-3">
                    <ProtocolIcon slug={p.slug} />
                    <div>
                      <div className="font-semibold text-foreground text-sm">{p.name}</div>
                      <div className="text-xs text-muted-foreground font-mono">{p.symbol}</div>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-4 hidden md:table-cell">
                  <span className="inline-block px-2.5 py-1 rounded-lg bg-purple-500/10 text-purple-300 text-xs font-medium">
                    {p.category || "—"}
                  </span>
                </td>
                <td className="py-4 px-4 hidden lg:table-cell">
                  <div className="flex flex-wrap gap-1 max-w-[200px]">
                    {(p.chains || []).slice(0, 3).map((c) => (
                      <span key={c} className="inline-block px-2 py-0.5 rounded-md bg-white/5 text-muted-foreground text-xs">
                        {c}
                      </span>
                    ))}
                    {(p.chains || []).length > 3 && (
                      <span className="inline-block px-2 py-0.5 rounded-md bg-white/5 text-muted-foreground text-xs">
                        +{p.chains.length - 3}
                      </span>
                    )}
                  </div>
                </td>
                <td className="py-4 px-4 text-right font-mono text-sm font-semibold text-foreground">
                  {formatTvl(p.tvl)}
                </td>
                <td className="py-4 px-4 hidden xl:table-cell">
                  <div className="w-full bg-white/5 rounded-full h-1.5">
                    <div className="tvl-bar" style={{ width: `${barWidth}%` }} />
                  </div>
                </td>
                <td className={`py-4 px-4 text-right text-sm font-mono font-medium ${change1d.color}`}>
                  {change1d.text}
                </td>
                <td className={`py-4 px-4 text-right text-sm font-mono font-medium hidden sm:table-cell ${change7d.color}`}>
                  {change7d.text}
                </td>
                <td className={`py-4 px-4 text-right text-sm font-mono font-medium hidden md:table-cell ${change1m.color}`}>
                  {change1m.text}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

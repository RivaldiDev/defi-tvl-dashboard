"use client";

import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Protocol {
  name: string;
  slug: string;
  tvl: number;
  category: string;
  chains: string[];
  change_1d: number;
  change_7d: number;
  change_1m: number;
}

function fmtNum(n: number) {
  if (n >= 1e12) return (n / 1e12).toFixed(2) + "T";
  if (n >= 1e9) return (n / 1e9).toFixed(2) + "B";
  if (n >= 1e6) return (n / 1e6).toFixed(2) + "M";
  return n.toLocaleString();
}

export default function Home() {
  const [protocols, setProtocols] = useState<Protocol[]>([]);
  const [totalTvl, setTotalTvl] = useState(0);
  const [chainsCount, setChainsCount] = useState(0);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    try {
      const [pRes, cRes] = await Promise.all([
        fetch("https://api.llama.fi/protocols").then((r) => r.json()),
        fetch("https://api.llama.fi/v2/chains").then((r) => r.json()),
      ]);
      setProtocols(pRes.slice(0, 50));
      setTotalTvl(cRes.reduce((s: number, c: { tvl: number }) => s + c.tvl, 0));
      setChainsCount(cRes.length);
      setLoading(false);
    } catch (e) {
      console.error(e);
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  const filtered = filter === "all" ? protocols : protocols.filter((p) => p.category === filter);
  const maxTvl = Math.max(...protocols.map((p) => p.tvl), 1);

  return (
    <div className="min-h-screen bg-[#080b12] text-slate-200">
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-purple-950/20 via-[#080b12] to-pink-950/10" />

      <motion.header initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="border-b border-white/5 backdrop-blur-xl bg-white/5">
        <div className="max-w-7xl mx-auto px-6 py-5">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">DeFi Pulse Dashboard</h1>
          <p className="text-xs text-slate-500 mt-1">Real-time TVL across DeFi protocols | DeFi Llama API</p>
        </div>
      </motion.header>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="max-w-7xl mx-auto px-6 py-4 grid grid-cols-4 gap-4">
        {[
          { label: "Total TVL", value: "$" + fmtNum(totalTvl), color: "text-purple-400" },
          { label: "Top Protocol", value: protocols[0]?.name || "--", color: "text-pink-400" },
          { label: "Chains Tracked", value: String(chainsCount), color: "text-cyan-400" },
          { label: "24h Change", value: (protocols[0]?.change_1d ?? 0).toFixed(2) + "%", color: "text-green-400" },
        ].map((s) => (
          <Card key={s.label} className="bg-white/5 border-white/5">
            <CardContent className="p-4 text-center">
              <p className="text-[10px] text-slate-500 uppercase tracking-wider">{s.label}</p>
              <p className={`text-lg font-bold mt-1 ${s.color}`}>{s.value}</p>
            </CardContent>
          </Card>
        ))}
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <span className="w-1 h-5 bg-gradient-to-b from-purple-400 to-pink-500 rounded-full" />
            Top DeFi Protocols by TVL
          </h2>
          <div className="flex gap-2">
            {["all", "Liquid Staking", "Lending", "DEX", "Bridge"].map((cat) => (
              <button key={cat} onClick={() => setFilter(cat)} className={`px-3 py-1.5 rounded-md text-xs font-medium transition ${filter === cat ? "bg-purple-500/20 text-purple-400 border border-purple-400/30" : "bg-white/5 text-slate-500 hover:text-slate-300"}`}>
                {cat === "all" ? "All" : cat}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="text-center py-20">
            <div className="w-10 h-10 border-2 border-white/10 border-t-purple-400 rounded-full animate-spin mx-auto mb-4" />
            <p className="text-slate-500">Fetching DeFi data...</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/5">
                  {["#", "Protocol", "Category", "Chains", "TVL", "TVL Share", "1d", "7d", "1m"].map((h) => (
                    <th key={h} className="text-left py-3 px-3 text-[11px] text-slate-500 uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((p, i) => (
                  <motion.tr key={p.slug} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.02 }} className="border-b border-white/[0.03] hover:bg-white/[0.02]">
                    <td className="py-3 px-3 text-slate-500 text-sm">{i + 1}</td>
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-2">
                        <img src={`https://icons.llama.fi/${p.slug}.png`} alt="" className="w-7 h-7 rounded-full" onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
                        <span className="font-semibold text-sm">{p.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-3 text-xs text-slate-400">{p.category}</td>
                    <td className="py-3 px-3">
                      <div className="flex gap-1 flex-wrap">
                        {(p.chains || []).slice(0, 3).map((c) => (
                          <Badge key={c} variant="outline" className="text-[9px] text-slate-400 border-white/10 bg-white/5">{c}</Badge>
                        ))}
                        {(p.chains || []).length > 3 && <Badge variant="outline" className="text-[9px] text-slate-500 border-white/10">+{(p.chains || []).length - 3}</Badge>}
                      </div>
                    </td>
                    <td className="py-3 px-3 font-semibold text-sm">${fmtNum(p.tvl)}</td>
                    <td className="py-3 px-3">
                      <div className="w-20 h-1.5 bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" style={{ width: `${(p.tvl / maxTvl) * 100}%` }} />
                      </div>
                    </td>
                    <td className={`py-3 px-3 text-xs font-semibold ${(p.change_1d ?? 0) >= 0 ? "text-green-400" : "text-red-400"}`}>{(p.change_1d ?? 0).toFixed(2)}%</td>
                    <td className={`py-3 px-3 text-xs font-semibold ${(p.change_7d ?? 0) >= 0 ? "text-green-400" : "text-red-400"}`}>{(p.change_7d ?? 0).toFixed(2)}%</td>
                    <td className={`py-3 px-3 text-xs font-semibold ${(p.change_1m ?? 0) >= 0 ? "text-green-400" : "text-red-400"}`}>{(p.change_1m ?? 0).toFixed(2)}%</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <footer className="max-w-7xl mx-auto px-6 py-8 text-center text-xs text-slate-600 border-t border-white/5">
        DeFi Pulse &copy; 2026 | Data from DeFi Llama API (Free, No API Key) | Built with Next.js + shadcn/ui
      </footer>
    </div>
  );
}

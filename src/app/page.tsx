"use client";

import { useEffect, useState, useCallback } from "react";
import {
  Activity,
  TrendingUp,
  Globe,
  BarChart3,
  RefreshCw,
  AlertCircle,
} from "lucide-react";
import { Header } from "@/components/header";
import { StatCard } from "@/components/stat-card";
import { CategoryTabs } from "@/components/category-tabs";
import { ProtocolTable } from "@/components/protocol-table";
import { Button } from "@/components/ui/button";
import { Protocol, Category, matchesCategory } from "@/lib/types";

function fmtNum(n: number): string {
  if (n >= 1e12) return "$" + (n / 1e12).toFixed(2) + "T";
  if (n >= 1e9) return "$" + (n / 1e9).toFixed(2) + "B";
  if (n >= 1e6) return "$" + (n / 1e6).toFixed(2) + "M";
  return "$" + n.toLocaleString();
}

export default function Home() {
  const [protocols, setProtocols] = useState<Protocol[]>([]);
  const [totalTvl, setTotalTvl] = useState(0);
  const [chainsCount, setChainsCount] = useState(0);
  const [filter, setFilter] = useState<Category>("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [pRes, cRes] = await Promise.all([
        fetch("https://api.llama.fi/protocols").then((r) => {
          if (!r.ok) throw new Error(`Protocols API: ${r.status}`);
          return r.json();
        }),
        fetch("https://api.llama.fi/v2/chains").then((r) => {
          if (!r.ok) throw new Error(`Chains API: ${r.status}`);
          return r.json();
        }),
      ]);
      setProtocols(pRes.slice(0, 50));
      setTotalTvl(
        cRes.reduce((s: number, c: { tvl: number }) => s + c.tvl, 0)
      );
      setChainsCount(cRes.length);
    } catch (e) {
      setError(
        e instanceof Error ? e.message : "Failed to fetch DeFi data"
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const filtered =
    filter === "All"
      ? protocols
      : protocols.filter((p) => matchesCategory(p, filter));
  const maxTvl = Math.max(...protocols.map((p) => p.tvl), 1);

  const change24h =
    protocols.length > 0 && protocols[0].change_1d != null
      ? protocols[0].change_1d
      : 0;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard
            label="Total TVL"
            value={fmtNum(totalTvl)}
            icon={<BarChart3 className="w-5 h-5" />}
            trend={change24h >= 0 ? "up" : "down"}
            subValue={`${change24h >= 0 ? "+" : ""}${change24h.toFixed(2)}% 24h`}
            delay={0}
          />
          <StatCard
            label="Top Protocol"
            value={protocols[0]?.name || "—"}
            icon={<TrendingUp className="w-5 h-5" />}
            subValue={protocols[0] ? fmtNum(protocols[0].tvl) : undefined}
            delay={100}
          />
          <StatCard
            label="Chains Tracked"
            value={String(chainsCount)}
            icon={<Globe className="w-5 h-5" />}
            delay={200}
          />
          <StatCard
            label="Protocols"
            value={String(protocols.length)}
            icon={<Activity className="w-5 h-5" />}
            delay={300}
          />
        </div>

        {/* Error */}
        {error && (
          <div className="glass rounded-2xl p-6 mb-6 border border-red-500/20">
            <div className="flex items-center gap-3 text-red-400">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <div>
                <p className="font-medium">Failed to load data</p>
                <p className="text-sm text-muted-foreground mt-1">{error}</p>
              </div>
            </div>
            <Button
              onClick={fetchData}
              variant="outline"
              size="sm"
              className="mt-4 border-red-500/20 text-red-400 hover:bg-red-500/10"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Retry
            </Button>
          </div>
        )}

        {/* Protocol Table */}
        <div className="glass rounded-2xl p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <span className="w-1 h-5 bg-gradient-to-b from-purple-400 to-pink-500 rounded-full" />
              Top DeFi Protocols by TVL
            </h2>
            <div className="flex items-center gap-3">
              <CategoryTabs selected={filter} onSelect={setFilter} />
              <Button
                onClick={fetchData}
                variant="outline"
                size="sm"
                className="shrink-0 border-purple-500/20 hover:bg-purple-500/10"
                disabled={loading}
              >
                <RefreshCw
                  className={`w-4 h-4 ${loading ? "animate-spin" : ""}`}
                />
              </Button>
            </div>
          </div>

          {loading ? (
            <div className="text-center py-20">
              <div className="w-10 h-10 border-2 border-white/10 border-t-purple-400 rounded-full animate-spin mx-auto mb-4" />
              <p className="text-muted-foreground">Fetching DeFi data…</p>
            </div>
          ) : !error ? (
            <ProtocolTable protocols={filtered} maxTvl={maxTvl} />
          ) : null}
        </div>
      </main>

      <footer className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center text-xs text-muted-foreground border-t border-white/5">
        DeFi Pulse © 2026 · Data from DeFi Llama API
      </footer>
    </div>
  );
}

import { Protocol, ChainData, DashboardStats } from "./types";

const PROTOCOLS_URL = "https://api.llama.fi/protocols";
const CHAINS_URL = "https://api.llama.fi/v2/chains";

let cachedProtocols: Protocol[] | null = null;
let cachedChains: ChainData[] | null = null;
let cacheTime = 0;
const CACHE_TTL = 5 * 60 * 1000; // 5 min

export async function fetchProtocols(): Promise<Protocol[]> {
  if (cachedProtocols && Date.now() - cacheTime < CACHE_TTL) {
    return cachedProtocols;
  }
  const res = await fetch(PROTOCOLS_URL, { next: { revalidate: 300 } } as RequestInit);
  if (!res.ok) throw new Error("Failed to fetch protocols");
  const data = await res.json();
  cachedProtocols = data;
  cacheTime = Date.now();
  return data;
}

export async function fetchChains(): Promise<ChainData[]> {
  if (cachedChains && Date.now() - cacheTime < CACHE_TTL) {
    return cachedChains;
  }
  const res = await fetch(CHAINS_URL, { next: { revalidate: 300 } } as RequestInit);
  if (!res.ok) throw new Error("Failed to fetch chains");
  const data = await res.json();
  cachedChains = data;
  return data;
}

export async function getDashboardStats(): Promise<DashboardStats> {
  const [protocols, chains] = await Promise.all([
    fetchProtocols(),
    fetchChains(),
  ]);

  const totalTvl = chains.reduce((sum: number, c: ChainData) => sum + (c.tvl || 0), 0);
  const sorted = [...protocols].sort((a, b) => (b.tvl || 0) - (a.tvl || 0));
  const top = sorted[0];

  // Estimate 24h change from top protocols
  let weightedChange = 0;
  let totalWeight = 0;
  for (const p of sorted.slice(0, 50)) {
    if (p.change_1d != null && p.tvl > 0) {
      weightedChange += p.change_1d * p.tvl;
      totalWeight += p.tvl;
    }
  }
  const change24h = totalWeight > 0 ? weightedChange / totalWeight : 0;

  return {
    totalTvl,
    topProtocol: top?.name || "N/A",
    topProtocolTvl: top?.tvl || 0,
    chainsCount: chains.length,
    change24h,
    protocolsCount: protocols.length,
  };
}

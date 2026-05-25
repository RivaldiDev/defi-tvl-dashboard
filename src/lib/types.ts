export interface Protocol {
  id: string;
  name: string;
  symbol: string;
  category: string;
  chains: string[];
  tvl: number;
  chainTvls: Record<string, number>;
  change_1d?: number;
  change_7d?: number;
  change_1m?: number;
  mcap?: number;
  slug: string;
}

export interface ChainData {
  name: string;
  tvl: number;
  tokenSymbol: string;
}

export interface DashboardStats {
  totalTvl: number;
  topProtocol: string;
  topProtocolTvl: number;
  chainsCount: number;
  change24h: number;
  protocolsCount: number;
}

export type Category = "All" | "Liquid Staking" | "Lending" | "DEX" | "Bridge" | "CDP" | "Restaking" | "Yield";

export const CATEGORIES: Category[] = ["All", "Liquid Staking", "Lending", "DEX", "Bridge", "CDP", "Restaking", "Yield"];

export function matchesCategory(protocol: Protocol, category: Category): boolean {
  if (category === "All") return true;
  const cat = (protocol.category || "").toLowerCase();
  switch (category) {
    case "Liquid Staking": return cat.includes("liquid staking") || cat.includes("staking");
    case "Lending": return cat.includes("lending");
    case "DEX": return cat.includes("dex") || cat.includes("exchange");
    case "Bridge": return cat.includes("bridge");
    case "CDP": return cat.includes("cdp") || cat.includes("minting");
    case "Restaking": return cat.includes("restaking");
    case "Yield": return cat.includes("yield") || cat.includes("farm");
    default: return true;
  }
}

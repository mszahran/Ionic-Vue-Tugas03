export interface CoinLoreTicker {
  id: string;
  symbol: string;
  name: string;
  nameid: string;
  rank: number;
  price_usd: string;
  percent_change_24h: string;
  percent_change_1h: string;
  percent_change_7d: string;
  market_cap_usd: string;
  volume24: string;
  volume24a: string;
  csupply: string;
  tsupply: string;
  msupply: string;
}

interface CoinLoreResponse {
  data: CoinLoreTicker[];
  info: {
    coins_num: number;
    time: number;
  };
}

export async function fetchTickers(): Promise<CoinLoreTicker[]> {
  const response = await fetch('https://api.coinlore.net/api/tickers/');

  if (!response.ok) {
    throw new Error(`Gagal memuat data: ${response.status} ${response.statusText}`);
  }

  const json = (await response.json()) as CoinLoreResponse;
  return json.data;
}

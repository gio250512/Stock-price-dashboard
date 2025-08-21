export interface Stock {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume?: number;
  high?: number;
  low?: number;
  open?: number;
  previousClose?: number;
  marketCap?: number;
}

export interface MarketStats {
  totalStocks: number;
  gainers: number;
  losers: number;
  avgChange: number;
}

export type SortField = 'symbol' | 'name' | 'price' | 'change' | 'changePercent';
export type SortDirection = 'asc' | 'desc';

export interface ApiResponse {
  stocks: Stock[];
  'Global Quote'?: StockQuote;
  [key: string]: any; // Allow for flexible API responses
}

export interface StockQuote {
  '01. symbol': string;
  '02. open': string;
  '03. high': string;
  '04. low': string;
  '05. price': string;
  '06. volume': string;
  '07. latest trading day': string;
  '08. previous close': string;
  '09. change': string;
  '10. change percent': string;
}
import axios from 'axios';
import { Stock, StockQuote } from '../types';

// Alpha Vantage API configuration
const API_KEY = 'demo'; // Replace with your actual API key
const BASE_URL = 'https://www.alphavantage.co/query';

// Popular stocks to display (for demo purposes)
// const POPULAR_STOCKS = ['AAPL', 'GOOGL', 'MSFT', 'AMZN', 'TSLA', 'META', 'NVDA', 'NFLX'];

// Mock data for demonstration
const MOCK_STOCKS: Stock[] = [
  {
    symbol: 'AAPL',
    name: 'Apple Inc.',
    price: 175.43,
    change: 2.15,
    changePercent: 1.24,
    volume: 45678900,
    high: 176.80,
    low: 173.20,
    open: 174.00,
    previousClose: 173.28,
    marketCap: 2800000000000
  },
  {
    symbol: 'GOOGL',
    name: 'Alphabet Inc.',
    price: 2847.52,
    change: -15.23,
    changePercent: -0.53,
    volume: 1234567,
    high: 2865.00,
    low: 2840.00,
    open: 2860.00,
    previousClose: 2862.75,
    marketCap: 1800000000000
  },
  {
    symbol: 'MSFT',
    name: 'Microsoft Corporation',
    price: 378.85,
    change: 4.12,
    changePercent: 1.10,
    volume: 23456789,
    high: 380.50,
    low: 375.20,
    open: 376.00,
    previousClose: 374.73,
    marketCap: 2900000000000
  },
  {
    symbol: 'AMZN',
    name: 'Amazon.com Inc.',
    price: 3342.88,
    change: -8.45,
    changePercent: -0.25,
    volume: 3456789,
    high: 3355.00,
    low: 3335.00,
    open: 3350.00,
    previousClose: 3351.33,
    marketCap: 1700000000000
  },
  {
    symbol: 'TSLA',
    name: 'Tesla Inc.',
    price: 1008.87,
    change: 25.43,
    changePercent: 2.59,
    volume: 18765432,
    high: 1015.00,
    low: 985.50,
    open: 990.00,
    previousClose: 983.44,
    marketCap: 1000000000000
  },
  {
    symbol: 'META',
    name: 'Meta Platforms Inc.',
    price: 331.26,
    change: -2.18,
    changePercent: -0.65,
    volume: 15432109,
    high: 335.00,
    low: 329.50,
    open: 333.50,
    previousClose: 333.44,
    marketCap: 850000000000
  },
  {
    symbol: 'NVDA',
    name: 'NVIDIA Corporation',
    price: 220.89,
    change: 3.67,
    changePercent: 1.69,
    volume: 42109876,
    high: 222.50,
    low: 218.00,
    open: 219.00,
    previousClose: 217.22,
    marketCap: 550000000000
  },
  {
    symbol: 'NFLX',
    name: 'Netflix Inc.',
    price: 398.42,
    change: -1.23,
    changePercent: -0.31,
    volume: 4321098,
    high: 402.00,
    low: 396.50,
    open: 400.00,
    previousClose: 399.65,
    marketCap: 180000000000
  },
  {
    symbol: 'CRM',
    name: 'Salesforce Inc.',
    price: 154.32,
    change: 1.87,
    changePercent: 1.23,
    volume: 6543210,
    high: 156.00,
    low: 152.50,
    open: 153.00,
    previousClose: 152.45,
    marketCap: 150000000000
  },
  {
    symbol: 'ORCL',
    name: 'Oracle Corporation',
    price: 108.76,
    change: -0.54,
    changePercent: -0.49,
    volume: 8765432,
    high: 110.00,
    low: 108.20,
    open: 109.50,
    previousClose: 109.30,
    marketCap: 300000000000
  }
];

// Add some randomization to make the data feel more "live"
const addRandomVariation = (stocks: Stock[]): Stock[] => {
  return stocks.map(stock => {
    // Add small random variation (-2% to +2%)
    const variation = (Math.random() - 0.5) * 0.04;
    const newPrice = stock.price * (1 + variation);
    const change = newPrice - stock.price;
    const changePercent = (change / stock.price) * 100;

    return {
      ...stock,
      price: Number(newPrice.toFixed(2)),
      change: Number(change.toFixed(2)),
      changePercent: Number(changePercent.toFixed(2)),
      volume: stock.volume ? Math.floor(stock.volume! * (0.8 + Math.random() * 0.4)) : undefined
    };
  });
};

// Simulated API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

class StockService {
  // Get multiple stocks (using mock data for demo)
  async getStocks(): Promise<Stock[]> {
    // Simulate API delay
    await delay(800 + Math.random() * 400);
    
    // Return mock data with random variations
    return addRandomVariation(MOCK_STOCKS);
  }

  // Search stocks by symbol or name
  async searchStocks(query: string): Promise<Stock[]> {
    const stocks = await this.getStocks();
    const lowercaseQuery = query.toLowerCase();
    
    return stocks.filter(stock => 
      stock.symbol.toLowerCase().includes(lowercaseQuery) ||
      stock.name.toLowerCase().includes(lowercaseQuery)
    );
  }

  // Real API methods (commented out for demo, uncomment to use with real API key)
  /*
  async fetchStockQuote(symbol: string): Promise<Stock | null> {
    try {
      const response = await axios.get(BASE_URL, {
        params: {
          function: 'GLOBAL_QUOTE',
          symbol: symbol,
          apikey: API_KEY
        }
      });

      const quote = response.data['Global Quote'];
      if (!quote) return null;

      return {
        symbol: quote['01. symbol'],
        name: quote['01. symbol'], // API doesn't provide company name in this endpoint
        price: parseFloat(quote['05. price']),
        change: parseFloat(quote['09. change']),
        changePercent: parseFloat(quote['10. change percent'].replace('%', '')),
        volume: parseInt(quote['06. volume']),
        high: parseFloat(quote['03. high']),
        low: parseFloat(quote['04. low']),
        open: parseFloat(quote['02. open']),
        previousClose: parseFloat(quote['08. previous close'])
      };
    } catch (error) {
      console.error('Error fetching stock quote:', error);
      return null;
    }
  }

  async getRealStocks(): Promise<Stock[]> {
    const promises = POPULAR_STOCKS.map(symbol => this.fetchStockQuote(symbol));
    const results = await Promise.all(promises);
    return results.filter(stock => stock !== null) as Stock[];
  }
  */
}

export const stockService = new StockService();
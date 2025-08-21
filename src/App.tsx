import React, { useState, useEffect, useMemo } from 'react';
import { Stock, SortField, SortDirection, MarketStats } from './types';
import { stockService } from './services/stockService';
import StockTable from './components/StockTable';
import MarketOverview from './components/MarketOverview';
import ErrorMessage from './components/ErrorMessage';
import ThemeToggle from './components/ThemeToggle';

const App: React.FC = () => {
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [filteredStocks, setFilteredStocks] = useState<Stock[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState<SortField>('symbol');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchStocks = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const stockData = await stockService.getStocks();
      setStocks(stockData);
      setLastUpdated(new Date());
    } catch (err) {
      setError('Failed to fetch stock data. Please try again.');
      console.error('Error fetching stocks:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStocks();
    
    // Auto-refresh every 30 seconds
    const interval = setInterval(fetchStocks, 30000);
    return () => clearInterval(interval);
  }, []);

  // Filter and sort stocks
  const processedStocks = useMemo(() => {
    let filtered = stocks;

    // Apply search filter
    if (searchQuery.trim()) {
      filtered = stocks.filter(stock =>
        stock.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
        stock.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply sorting
    filtered.sort((a, b) => {
      let aValue = a[sortField];
      let bValue = b[sortField];

      // Handle string comparison for symbol and name
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }

      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

    return filtered;
  }, [stocks, searchQuery, sortField, sortDirection]);

  useEffect(() => {
    setFilteredStocks(processedStocks);
  }, [processedStocks]);

  // Calculate market statistics
  const marketStats: MarketStats = useMemo(() => {
    const totalStocks = stocks.length;
    const gainers = stocks.filter(stock => stock.changePercent > 0).length;
    const losers = stocks.filter(stock => stock.changePercent < 0).length;
    const avgChange = stocks.length > 0 
      ? stocks.reduce((sum, stock) => sum + stock.changePercent, 0) / stocks.length 
      : 0;

    return { totalStocks, gainers, losers, avgChange };
  }, [stocks]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const clearSearch = () => {
    setSearchQuery('');
  };

  if (error && stocks.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-dark-900 flex items-center justify-center p-4">
        <ErrorMessage message={error} onRetry={fetchStocks} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-900 transition-colors duration-200">
      {/* Header */}
      <header className="bg-white dark:bg-dark-800 shadow-sm border-b border-gray-200 dark:border-gray-700 transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Stock Price Dashboard
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Real-time stock market data and analytics
              </p>
            </div>
            <div className="flex items-center space-x-4">
              {lastUpdated && (
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Last updated: {lastUpdated.toLocaleTimeString()}
                </div>
              )}
              <button
                onClick={fetchStocks}
                disabled={isLoading}
                className="btn-primary flex items-center space-x-2"
              >
                <svg 
                  className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" 
                  />
                </svg>
                <span>Refresh</span>
              </button>
              {/* Theme Toggle */}
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500 dark:text-gray-400 hidden sm:block">
                  Theme
                </span>
                <ThemeToggle />
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Market Overview */}
        <MarketOverview stats={marketStats} isLoading={isLoading} />

        {/* Search and Controls */}
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search stocks by symbol or company..."
                value={searchQuery}
                onChange={handleSearch}
                className="input-field pl-10 pr-10"
              />
              {searchQuery && (
                <button
                  onClick={clearSearch}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  <svg className="h-5 w-5 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Showing {filteredStocks.length} of {stocks.length} stocks
            </div>
          </div>
        </div>

        {/* Stock Table */}
        <StockTable
          stocks={filteredStocks}
          onSort={handleSort}
          sortField={sortField}
          sortDirection={sortDirection}
          isLoading={isLoading}
        />

        {/* Footer */}
        <footer className="mt-12 text-center text-gray-500 dark:text-gray-400 text-sm">
          <p>
            Data provided for demonstration purposes. 
            In production, integrate with a real stock API like Alpha Vantage or Finnhub.
          </p>
          <p className="mt-2">
            Built with React, TypeScript, and Tailwind CSS
          </p>
        </footer>
      </main>
    </div>
  );
};

export default App;
import React from 'react';
import { Stock, SortField, SortDirection } from '../types';

interface StockTableProps {
  stocks: Stock[];
  onSort: (field: SortField) => void;
  sortField: SortField;
  sortDirection: SortDirection;
  isLoading: boolean;
}

const StockTable: React.FC<StockTableProps> = ({
  stocks,
  onSort,
  sortField,
  sortDirection,
  isLoading
}) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price);
  };

  const formatChange = (change: number) => {
    const formatted = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(Math.abs(change));
    return change >= 0 ? `+${formatted}` : `-${formatted}`;
  };

  const formatPercentage = (percentage: number) => {
    return `${percentage >= 0 ? '+' : ''}${percentage.toFixed(2)}%`;
  };

  const getSortIcon = (field: SortField) => {
    if (sortField !== field) {
      return (
        <svg className="w-4 h-4 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
        </svg>
      );
    }

    return sortDirection === 'asc' ? (
      <svg className="w-4 h-4 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
      </svg>
    ) : (
      <svg className="w-4 h-4 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    );
  };

  const LoadingRow = () => (
    <tr className="table-row">
      <td className="table-cell">
        <div className="skeleton-text w-16" />
      </td>
      <td className="table-cell">
        <div className="skeleton-text w-32" />
      </td>
      <td className="table-cell">
        <div className="skeleton-text w-20" />
      </td>
      <td className="table-cell">
        <div className="skeleton-text w-16" />
      </td>
      <td className="table-cell">
        <div className="skeleton-text w-16" />
      </td>
    </tr>
  );

  return (
    <div className="card overflow-hidden">
      <div className="overflow-x-auto scrollbar-thin">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead>
            <tr>
              <th
                className="table-header cursor-pointer hover:bg-gray-100 dark:hover:bg-dark-700 transition-colors duration-150"
                onClick={() => onSort('symbol')}
              >
                <div className="flex items-center space-x-1">
                  <span>Symbol</span>
                  {getSortIcon('symbol')}
                </div>
              </th>
              <th
                className="table-header cursor-pointer hover:bg-gray-100 dark:hover:bg-dark-700 transition-colors duration-150"
                onClick={() => onSort('name')}
              >
                <div className="flex items-center space-x-1">
                  <span>Company</span>
                  {getSortIcon('name')}
                </div>
              </th>
              <th
                className="table-header cursor-pointer hover:bg-gray-100 dark:hover:bg-dark-700 transition-colors duration-150"
                onClick={() => onSort('price')}
              >
                <div className="flex items-center space-x-1">
                  <span>Price</span>
                  {getSortIcon('price')}
                </div>
              </th>
              <th
                className="table-header cursor-pointer hover:bg-gray-100 dark:hover:bg-dark-700 transition-colors duration-150"
                onClick={() => onSort('change')}
              >
                <div className="flex items-center space-x-1">
                  <span>Change</span>
                  {getSortIcon('change')}
                </div>
              </th>
              <th
                className="table-header cursor-pointer hover:bg-gray-100 dark:hover:bg-dark-700 transition-colors duration-150"
                onClick={() => onSort('changePercent')}
              >
                <div className="flex items-center space-x-1">
                  <span>Change %</span>
                  {getSortIcon('changePercent')}
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {isLoading ? (
              // Show loading skeleton rows
              Array.from({ length: 8 }).map((_, index) => (
                <LoadingRow key={`loading-${index}`} />
              ))
            ) : stocks.length === 0 ? (
              <tr>
                <td colSpan={5} className="table-cell text-center py-12">
                  <div className="flex flex-col items-center">
                    <svg className="w-12 h-12 text-gray-400 dark:text-gray-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <p className="text-gray-500 dark:text-gray-400 text-lg">No stocks found</p>
                    <p className="text-gray-400 dark:text-gray-500 text-sm mt-1">Try adjusting your search criteria</p>
                  </div>
                </td>
              </tr>
            ) : (
              stocks.map((stock) => (
                <tr key={stock.symbol} className="table-row">
                  <td className="table-cell">
                    <div className="font-semibold text-gray-900 dark:text-white">
                      {stock.symbol}
                    </div>
                  </td>
                  <td className="table-cell">
                    <div className="text-gray-900 dark:text-gray-100">
                      {stock.name}
                    </div>
                  </td>
                  <td className="table-cell">
                    <div className="font-medium text-gray-900 dark:text-white">
                      {formatPrice(stock.price)}
                    </div>
                  </td>
                  <td className="table-cell">
                    <div className={stock.change >= 0 ? 'text-positive' : 'text-negative'}>
                      {formatChange(stock.change)}
                    </div>
                  </td>
                  <td className="table-cell">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        stock.changePercent >= 0 ? 'bg-positive' : 'bg-negative'
                      }`}
                    >
                      {formatPercentage(stock.changePercent)}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StockTable;
# Stock Price Dashboard

A modern, responsive stock price dashboard built with React, TypeScript, and Tailwind CSS.

## 🚀 Live Demo

[View Live Demo](https://your-app.vercel.app) (Replace with your deployed URL)

## ✨ Features

### Core Features
- **Real-time Stock Data**: Display stock prices, changes, and percentages
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Search & Sort**: Find stocks quickly and sort by any column
- **Loading States**: Smooth loading animations and skeleton screens
- **Error Handling**: Graceful error handling with retry functionality

### Advanced Features
- **Statistics Dashboard**: Overview cards with key market metrics
- **Auto-refresh**: Data updates every 30 seconds automatically
- **Professional UI**: Clean, modern design with hover effects and animations
- **TypeScript**: Full type safety and better development experience
- **PWA Ready**: Progressive Web App capabilities

## 🛠️ Technologies Used

- **React 18** - Modern React with hooks and concurrent features
- **TypeScript** - Type-safe JavaScript for better development
- **Tailwind CSS** - Utility-first CSS framework for rapid styling
- **Axios** - HTTP client for API requests
- **Alpha Vantage API** - Stock market data (configurable)

## 📦 Quick Start

### Prerequisites
- Node.js 16+ and npm
- (Optional) Alpha Vantage API key for real data

### Installation

1. **Clone the repository:**
```bash
git clone https://github.com/YOUR-USERNAME/stock-dashboard.git
cd stock-dashboard
```

2. **Install dependencies:**
```bash
npm install
```

3. **Start development server:**
```bash
npm start
```

4. **Open your browser:**
Navigate to [http://localhost:3000](http://localhost:3000)

### Using Real Stock Data

1. Get a free API key from [Alpha Vantage](https://www.alphavantage.co/support/#api-key)
2. Update the `API_KEY` in `src/services/stockService.ts`
3. Uncomment the real API methods in the service

## 🚀 Deployment

### Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YOUR-USERNAME/stock-dashboard)

1. Connect your GitHub repository to Vercel
2. Deploy with default settings
3. Your app will be live at `https://your-app.vercel.app`

### Netlify

1. **Build the project:**
```bash
npm run build
```

2. **Deploy to Netlify:**
   - Drag and drop the `build` folder to Netlify
   - Or connect your GitHub repository for automatic deployments

### GitHub Pages

1. **Install gh-pages:**
```bash
npm install --save-dev gh-pages
```

2. **Add to package.json scripts:**
```json
{
  "homepage": "https://yourusername.github.io/stock-dashboard",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d build"
  }
}
```

3. **Deploy:**
```bash
npm run deploy
```

## 🎨 Features Overview

### Market Overview Dashboard
- **Total Stocks**: Number of stocks being tracked
- **Gainers/Losers**: Count of stocks with positive/negative changes
- **Average Change**: Overall market performance indicator
- **Visual Indicators**: Color-coded metrics with icons

### Interactive Stock Table
- **Sortable Columns**: Click any column header to sort
- **Real-time Updates**: Prices update automatically
- **Color Coding**: Green for gains, red for losses
- **Responsive Design**: Optimized for all screen sizes
- **Hover Effects**: Interactive row highlighting

### Search & Filter
- **Real-time Search**: Filter by stock symbol or company name
- **Instant Results**: No page refresh needed
- **Clear Function**: Easy search reset
- **Result Counter**: Shows filtered vs total stocks

### Loading & Error States
- **Skeleton Loading**: Animated placeholders during data fetch
- **Error Boundaries**: Graceful error handling
- **Retry Functionality**: Easy recovery from failed requests
- **Status Indicators**: Clear feedback on data freshness

## 🔧 Configuration

### API Configuration
```typescript
// src/services/stockService.ts
const API_KEY = 'your-alpha-vantage-key';
const BASE_URL = 'https://www.alphavantage.co/query';
```

### Customization Options
- **Colors**: Modify `tailwind.config.js` for custom themes
- **Stocks**: Update `POPULAR_STOCKS` array for different symbols
- **Refresh Rate**: Change interval in `App.tsx` (default: 30 seconds)
- **Mock Data**: Customize `MOCK_STOCKS` for demo purposes

## 📱 Responsive Design

The dashboard is fully responsive with breakpoints:
- **Mobile**: 320px - 768px
- **Tablet**: 768px - 1024px
- **Desktop**: 1024px+

### Mobile Features
- Touch-friendly interface
- Optimized table scrolling
- Collapsible navigation
- Thumb-friendly buttons

## 🎯 Performance

### Optimizations
- **Code Splitting**: Automatic route-based splitting
- **Lazy Loading**: Components load as needed
- **Memoization**: Expensive calculations cached
- **Optimized Rendering**: Minimal re-renders with React hooks

### Metrics
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1
- **Time to Interactive**: < 3s

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm test -- --coverage

# Run tests in watch mode
npm test -- --watch
```

## 🔒 Security

- **API Key Protection**: Environment variables for sensitive data
- **Input Sanitization**: XSS protection on user inputs
- **HTTPS Only**: Secure data transmission
- **Content Security Policy**: Protection against code injection

## 🤝 Contributing

1. **Fork the repository**
2. **Create a feature branch:**
```bash
git checkout -b feature/amazing-feature
```
3. **Commit your changes:**
```bash
git commit -m 'Add amazing feature'
```
4. **Push to the branch:**
```bash
git push origin feature/amazing-feature
```
5. **Open a Pull Request**

### Development Guidelines
- Follow TypeScript best practices
- Use Tailwind CSS for styling
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Alpha Vantage](https://www.alphavantage.co/) - Stock market data API
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [React](https://reactjs.org/) - JavaScript library for building UIs
- [Heroicons](https://heroicons.com/) - Beautiful hand-crafted SVG icons
- [Vercel](https://vercel.com/) - Deployment and hosting platform

## 📞 Support

If you have any questions or need help with setup:

- 📧 Email: your-email@example.com
- 🐛 Issues: [GitHub Issues](https://github.com/YOUR-USERNAME/stock-dashboard/issues)
- 💬 Discussions: [GitHub Discussions](https://github.com/YOUR-USERNAME/stock-dashboard/discussions)

---

**Built with ❤️ by [Your Name](https://github.com/YOUR-USERNAME)**
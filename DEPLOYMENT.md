# Deployment Configuration

## Vercel Deployment

This project is optimized for Vercel deployment with zero configuration.

### Automatic Deployment
1. Connect your GitHub repository to Vercel
2. Vercel will automatically detect it's a React app
3. Deploy with default settings

### Manual Deployment
```bash
npm install -g vercel
vercel --prod
```

## Netlify Deployment

### Build Settings
- Build command: `npm run build`
- Publish directory: `build`

### _redirects file for SPA routing
```
/*    /index.html   200
```

## Environment Variables

For production deployment, set these environment variables:

- `REACT_APP_API_KEY`: Your Alpha Vantage API key
- `REACT_APP_API_URL`: API base URL (optional)

## Build Optimization

The project includes:
- Code splitting
- Tree shaking
- Minification
- Asset optimization
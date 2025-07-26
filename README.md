# ZeeBussiness - Real API Integration

## API Integrations

This application now uses real APIs for both news and stock market data.

### NewsData.io Integration
- **Live News**: Fetches real news articles from NewsData.io
- **Categories**: Business, Sports, Technology, World, Politics, Indian Stocks
- **Rate Limit**: 200 requests/day (free tier)

### TwelveData Integration  
- **Live Stock Data**: Real-time stock prices and market data
- **Indian Markets**: NSE, BSE stocks and indices
- **Features**: Live prices, charts, market indices, 52-week ranges
- **Rate Limit**: 800 requests/day (free tier)

## Setup Instructions

### 1. Get API Keys

**NewsData.io:**
- Visit [NewsData.io](https://newsdata.io/)
- Sign up for free account
- Get API key from dashboard

**TwelveData:**
- Visit [TwelveData](https://twelvedata.com/)
- Sign up for free account  
- Get API key from dashboard

### 2. Configure Environment Variables

Add both API keys to your environment:

\`\`\`bash
NEXT_PUBLIC_NEWSDATA_API_KEY=your_newsdata_api_key_here
NEXT_PUBLIC_TWELVEDATA_API_KEY=your_twelvedata_api_key_here
\`\`\`

### 3. Features

**News Features:**
- ✅ Real news articles with images and metadata
- ✅ Category-based filtering
- ✅ Indian stock market specific news
- ✅ Fallback to demo data if API fails

**Stock Features:**
- ✅ Live stock prices with real-time updates
- ✅ Interactive price charts with multiple timeframes
- ✅ Market indices (Nifty 50, Sensex, Bank Nifty)
- ✅ 52-week high/low data
- ✅ Market hours detection
- ✅ Volume and trading data

### 4. API Status

The header shows real-time API status:
- 🟢 **Live APIs Connected**: Both NewsData.io and TwelveData working
- 🟡 **Checking APIs**: Testing connections
- 🟠 **Demo Mode**: Using fallback data (add API keys for live data)

### 5. Supported Stocks

**Indian Stocks:**
- RELIANCE, TCS, HDFCBANK, INFY, WIPRO
- ITC, SBIN, HDFC, ICICIBANK, BHARTIARTL

**Market Indices:**
- Nifty 50 (NSEI.INDX)
- BSE Sensex (BSE.INDX)  
- Bank Nifty (NSEBANK.INDX)

### 6. Rate Limits & Optimization

**NewsData.io (Free):**
- 200 requests/day
- 10 articles per request
- Automatic fallback on limit exceeded

**TwelveData (Free):**
- 800 requests/day
- Real-time data during market hours
- Reduced refresh rate outside market hours

### 7. Market Hours

Indian stock market hours (IST):
- **Open**: Monday-Friday, 9:15 AM - 3:30 PM
- **Live Updates**: Every 2 minutes during market hours
- **After Hours**: Every 5 minutes for overnight data

The app automatically detects market hours and adjusts refresh rates accordingly.

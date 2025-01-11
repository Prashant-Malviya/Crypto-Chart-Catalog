# Crypto Chart Dashboard

## Project Overview
The **Crypto Chart Dashboard** is a responsive and interactive web application that provides real-time cryptocurrency data visualization, including historical trends, price comparisons, and statistical analysis. The dashboard supports full-screen mode, multiple tabs for data insights, and customizable time ranges for price trend visualization.

## Features
- **Chart Visualization:** Real-time and historical price data displayed using a canvas chart.
- **Price Comparison:** Compare Bitcoin with other cryptocurrencies such as Ethereum, Solana, and Cardano.
- **Tabs Navigation:** Switch between Summary, Chart, Statistics, Analysis, and Settings views.
- **Time Range Selection:** View data for different time ranges (1 day, 3 days, 1 week, etc.).
- **Fullscreen Mode:** Toggle fullscreen for an enhanced chart viewing experience.
- **Animations:** Smooth framer motion animations for professional UI/UX.

## Tech Stack
- **Frontend:** React.js, Tailwind CSS
- **Data Visualization:** Custom Canvas-based Chart Component
- **State Management:** React Hooks and Context API
- **Icons:** Lucide React
- **Animations:** Framer Motion

## Prerequisites
Ensure you have the following installed on your local machine:
- Node.js (v14 or above)
- npm or yarn

## Installation and Running Locally

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/crypto-chart-dashboard.git
cd crypto-chart-dashboard
```

### 2. Install Dependencies
Using npm:
```bash
npm install
```
Using yarn:
```bash
yarn install
```

### 3. Start the Development Server
Using npm:
```bash
npm start
```
Using yarn:
```bash
yarn start
```

The application will run at `http://localhost:3000/`.

### 4. Build for Production
To create an optimized production build:
```bash
npm run build
```

## Project Structure
```
├── public
│   └── index.html
├── src
│   ├── components
│   │   ├── ChartCanvas.js
│   │   ├── PriceStats.js
│   │   ├── Summary.js
│   │   ├── Statistics.js
│   │   ├── Analysis.js
│   │   └── Settings.js
│   ├── contexts
│   │   └── SettingsContext.js
│   ├── utils
│   │   └── chartUtils.js
│   ├── App.js
│   ├── index.js
│   └── styles
│       └── index.css
└── package.json
```

## Key Components
- **ChartCanvas:** Renders the cryptocurrency price chart.
- **PriceStats:** Displays current price, price change, and percentage change.
- **Summary, Statistics, Analysis:** Provide different insights about the data.
- **Settings:** User preferences and settings management.

## Usage Instructions
1. Select a **time range** to visualize data over a specific period.
2. Use the **compare dropdown** to overlay additional cryptocurrencies on the chart.
3. Navigate through different tabs for insights.
4. Click **Fullscreen** for a better chart view.

## Future Improvements

1. Fetch real-time comparison data for more accurate price trends.

2. Personalise AI Chat Recommendation for Data insights.

3. Additional chart customization options.

---

Happy Coding!


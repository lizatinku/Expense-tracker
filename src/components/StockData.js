// src/components/StockData.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './StockData.css';

const StockData = () => {
  const [stockData, setStockData] = useState(null);
  const [symbol, setSymbol] = useState('AAPL'); // Default to Apple Inc.
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStockData = async () => {
      try {
        const response = await axios.get('https://finnhub.io/api/v1/quote', {
          params: {
            symbol: symbol,
            token: 'cr7rnfpr01qotnb4264gcr7rnfpr01qotnb42650'
          }
        });
        setStockData(response.data);
        setError(null);
      } catch (error) {
        setError('Failed to fetch stock data');
        setStockData(null);
      }
    };

    fetchStockData();
  }, [symbol]);

  return (
    <div className="stock-data">
      <h2>Market Insights 📈📉</h2>
      {/* Add image below the title */}
      <img src="/stockmarket2.jpeg" alt="Stock Market pic" className="market-insights-image" />
      {error && <p>{error}</p>}
      {stockData ? (
        <div>
          <p>Symbol: {symbol}</p>
          <p>Current Price: ${stockData.c.toFixed(2)}</p>
          <p>High Price of the Day: ${stockData.h.toFixed(2)}</p>
          <p>Low Price of the Day: ${stockData.l.toFixed(2)}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
      <div className="stock-buttons">
        <button onClick={() => setSymbol('AAPL')}>Apple</button>
        <button onClick={() => setSymbol('AMZN')}>Amazon</button>
        <button onClick={() => setSymbol('CSCO')}>Cisco</button>
        <button onClick={() => setSymbol('DBX')}>Dropbox</button>
        <button onClick={() => setSymbol('GOOGL')}>Google</button>
        <button onClick={() => setSymbol('IBM')}>IBM</button>
        <button onClick={() => setSymbol('INTC')}>Intel</button>
        <button onClick={() => setSymbol('MSFT')}>Microsoft</button>
        <button onClick={() => setSymbol('META')}>Meta</button>
        <button onClick={() => setSymbol('NFLX')}>Netflix</button>
        <button onClick={() => setSymbol('NVDA')}>NVIDIA</button>
        <button onClick={() => setSymbol('ORCL')}>Oracle</button>
        <button onClick={() => setSymbol('QCOM')}>Qualcomm</button>
        <button onClick={() => setSymbol('CRM')}>Salesforce</button>
        <button onClick={() => setSymbol('TSLA')}>Tesla</button>
        <button onClick={() => setSymbol('ZM')}>Zoom</button>
      </div>
    </div>
  );
};

export default StockData;
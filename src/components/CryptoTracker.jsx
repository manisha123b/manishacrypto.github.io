import { useEffect, useState } from "react";
import "./CryptoTracker.css";

const CryptoTracker = () => {
  const [cryptoData, setCryptoData] = useState([]);
  const [selectedCoin, setSelectedCoin] = useState(""); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

 
  const fetchCryptoData = async (retryCount = 3) => {
    setLoading(true);
    setError(null);

    for (let attempt = 0; attempt < retryCount; attempt++) {
      try {
        const response = await fetch(
          "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&sparkline=false"
        );

        if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);

        const data = await response.json();
        setCryptoData(data);
        setLoading(false);
        return; 
      } catch (error) {
        console.error(`Fetch attempt ${attempt + 1} failed:`, error);
        if (attempt === retryCount - 1) {
          setError("Failed to fetch crypto data. Please try again later.");
        }
        await new Promise((resolve) => setTimeout(resolve, 2000)); 
      }
    }
    setLoading(false);
  };

  
  useEffect(() => {
    fetchCryptoData();
  }, []);

  
  const handleCoinSelect = (coinId) => {
    setSelectedCoin(coinId); // Update selected coin state
  };

 
  const selectedCoinData = cryptoData.find(coin => coin.id === selectedCoin);

  return (
    <div className="crypto-container">
      
      <h1 className="crypto-header">🌍 Largest Crypto Marketplace</h1>

      
      <div className="search-bar">
        <select
          onChange={(e) => handleCoinSelect(e.target.value)} // Update selectedCoin on change
          value={selectedCoin} // Ensure the selected coin is bound to the state
        >
          <option value="">Select a Coin</option>
          {cryptoData.map((coin) => (
            <option key={coin.id} value={coin.id}>
              {coin.name} {/* Only show the coin name */}
            </option>
          ))}
        </select>
      </div>

      
      {loading && <p className="loading-text">Loading...</p>}
      {error && <p className="error-text">{error}</p>}

      
      {selectedCoin && selectedCoinData && (
        <div className="coin-details">
          <h2>{selectedCoinData.name} ({selectedCoinData.symbol.toUpperCase()})</h2>
          <p>Price: ${selectedCoinData.current_price.toLocaleString()}</p>
          <p>24h Change: {selectedCoinData.price_change_percentage_24h.toFixed(2)}%</p>
          <p>Market Cap: ${selectedCoinData.market_cap.toLocaleString()}</p>
        </div>
      )}

     
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Coin</th>
              <th>Price ($)</th>
              <th>24h Change (%)</th>
              <th>Market Cap ($)</th>
            </tr>
          </thead>
          <tbody>
            {cryptoData.length > 0 ? (
              cryptoData.map((coin, index) => (
                <tr key={coin.id}>
                  <td>{index + 1}</td>
                  <td className="coin-name">
                    <img src={coin.image} alt={coin.name} className="coin-image" />
                    <span>{coin.name} ({coin.symbol.toUpperCase()})</span>
                  </td>
                  <td>${coin.current_price.toLocaleString()}</td>
                  <td className={coin.price_change_percentage_24h > 0 ? "positive" : "negative"}>
                    {coin.price_change_percentage_24h.toFixed(2)}%
                  </td>
                  <td>${coin.market_cap.toLocaleString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="no-data">No data available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CryptoTracker;

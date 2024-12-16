import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Exchange() {
  const [selectedCoin, setSelectedCoin] = useState("bitcoin");
  const [cryptoAmount, setCryptoAmount] = useState("");
  const [usdAmount, setUsdAmount] = useState(null);
  const [coinPrices, setCoinPrices] = useState({});
  const [upiId, setUpiId] = useState("");
  const [file, setFile] = useState(null);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const response = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana,toncoin&vs_currencies=usd');
        setCoinPrices({
          bitcoin: response.data.bitcoin?.usd || 0,
          ethereum: response.data.ethereum?.usd || 0,
          solana: response.data.solana?.usd || 0,
          ton: response.data.toncoin?.usd || 0,
        });
      } catch (error) {
        console.error("Error fetching coin prices:", error);
        // Handle error, e.g., display error message to the user
      }
    };

    // Fetch prices initially and then every 30 seconds
    fetchPrices();
    const intervalId = setInterval(fetchPrices, 30000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    calculateUsdAmount(cryptoAmount, selectedCoin);
  }, [coinPrices, cryptoAmount, selectedCoin]);

  const calculateUsdAmount = (cryptoAmount, coin) => {
    if (cryptoAmount && !isNaN(cryptoAmount) && parseFloat(cryptoAmount) > 0 && coinPrices[coin]) {
      const calculatedUsd = (cryptoAmount * coinPrices[coin]).toFixed(2);
      setUsdAmount(calculatedUsd);
    } else {
      setUsdAmount(null);
    }
  };

  const handleCryptoAmountChange = (e) => {
    const amount = e.target.value;
    setCryptoAmount(amount);
    if (!isNaN(amount) && parseFloat(amount) > 0) {
      setIsButtonDisabled(false);
    } else {
      setUsdAmount(null);
      setIsButtonDisabled(true);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (file && cryptoAmount && upiId) {
      alert(`Successfully submitted!\nCrypto: ${selectedCoin}\nAmount: ${cryptoAmount} ${selectedCoin} (~USD ${usdAmount})\nUPI ID: ${upiId}`);
      window.location.href = "/";
    } else {
      alert("Please fill out all fields and upload a screenshot before submitting.");
    }
  };

  return (
    <div className="rounded-div py-5 px-5">
      <h1 className="text-3xl font-semibold my-5">Exchange</h1>

      <label className="block text-lg font-medium mb-2">Select Your Crypto:</label>
      <select
        value={selectedCoin}
        onChange={(e) => {
          setSelectedCoin(e.target.value);
        }}
        className="w-full p-2 border rounded mb-5">
        <option value="bitcoin">Bitcoin</option>
        <option value="ethereum">Ethereum</option>
        <option value="solana">Solana</option>
      </select>

      <label className="block text-lg font-medium mb-2">Enter Amount (Crypto):</label>
      <input
        type="number"
        value={cryptoAmount}
        onChange={handleCryptoAmountChange}
        placeholder="Enter amount of crypto"
        className="w-full p-2 border rounded mb-5"
        required
      />

      <div className="mb-5">
        <button
          onClick={() => calculateUsdAmount(cryptoAmount, selectedCoin)}
          disabled={isButtonDisabled}
          className={`w-full p-2 border rounded bg-blue-500 text-white font-bold ${isButtonDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'}`}>
          {usdAmount ? `$ ${usdAmount}` : "Check How Much You Will Get in USD"}
        </button>
      </div>

      <label className="block text-lg font-medium mb-2">Enter Your UPI ID:</label>
      <input
        type="text"
        value={upiId}
        onChange={(e) => setUpiId(e.target.value)}
        placeholder="Enter your UPI ID"
        className="w-full p-2 border rounded mb-5"
        required
      />

      <p className="text-lg mb-3">Solana Address: <span className="font-mono" style={{ color: 'red' }}> RgKGMwHUScwsA86P3Bua4nsWtSNGQzXU9dScLost1QN</span></p>
      <p className="text-lg mb-3">Ethereum Address: <span className="font-mono" style={{ color: 'red' }}>0xD57a95Dd7145497360a7F2fAa25aC1bd3b0D872B</span></p>
      <p className="text-lg mb-3">Bitcoin Address: <span className="font-mono" style={{ color: 'red' }}>bc1q082ujtdzy0yqpn7c40cluxpcqfpe5x3hx3y4gt</span></p>
      <br /><br />
      <p className="mb-5" style={{ fontWeight: 'bold' }}>Send your crypto to the respective address and upload the screenshot below.</p>

      <form onSubmit={handleSubmit}>
        <label className="block text-lg font-medium mb-2">Upload Screenshot:</label>
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          className="mb-5 block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer focus:outline-none"
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
          Submit
        </button>
      </form>

      <div className="mt-10 p-5 bg-yellow-100 border-l-4 border-yellow-500">
        <h2 className="text-xl font-bold text-yellow-800 mb-2">Important Notice:</h2>
        <p className="text-yellow-700 font-medium">Money will be deposited to your account within <strong>5 minutes.</strong> </p>
        <p className="text-yellow-700 font-medium">Once our team verify the transaction and your screenshot, amount in INR will be sent to your UPI id. Maximum it can take 5 minutes.</p>
        <p className="text-yellow-700 font-medium">If you didn't get it within 5 minutes, please drop a mail to <a href="mailto:admin@sellyourcrypto.com" className="text-blue-600 underline">admin@sellyourcrypto.com</a>. Only drop mail if you didn't receive within 5 minutes, admin will resolve the issue in next 5 minutes</p>
        <p className="text-yellow-700 font-medium">For any other enquiry, you can connect with us at <a href="mailto:service@sellyourcrypto.com" className="text-blue-600 underline">service@sellyourcrypto.com</a>.</p>
      </div>
    </div>
  );
}

export default Exchange;

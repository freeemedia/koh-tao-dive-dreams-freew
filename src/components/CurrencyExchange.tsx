import React, { useState, useEffect } from "react";
import styles from "./CurrencyExchange.module.css";


// Use environment variable for API key if needed
const API_URL = "https://api.exchangerate.host/latest";
const API_KEY = import.meta.env.VITE_MY_CUSTOM_API_KEY || import.meta.env.MY_CUSTOM_API_KEY;

const CURRENCIES = ["USD", "EUR", "THB", "GBP", "AUD", "SGD", "MYR", "IDR", "PHP", "INR", "CNY", "JPY"];

export const CurrencyExchange: React.FC = () => {
  const [amount, setAmount] = useState(1);
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("THB");
  const [result, setResult] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (from && to && amount > 0) {
      setLoading(true);
      setError("");
      const url = `${API_URL}?base=${from}&symbols=${to}`;
      const headers: Record<string, string> = {};
      if (API_KEY) {
        headers["Authorization"] = `Bearer ${API_KEY}`;
      }
      fetch(url, { headers })
        .then((res) => res.json())
        .then((data) => {
          if (data && data.rates && data.rates[to]) {
            setResult(data.rates[to] * amount);
          } else {
            setError("Failed to fetch rates");
            setResult(null);
          }
        })
        .catch(() => {
          setError("Failed to fetch rates");
          setResult(null);
        })
        .finally(() => setLoading(false));
    }
  }, [amount, from, to]);

  return (
    <div className={styles.currencyExchange}>
      <h3>Currency Exchange</h3>
      <div className={styles.row}>
        <label htmlFor="currency-amount" className="sr-only">Amount</label>
        <input
          id="currency-amount"
          className={styles.input}
          type="number"
          min={0}
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          placeholder="Amount"
        />
        <label htmlFor="currency-from" className="sr-only">From currency</label>
        <select
          id="currency-from"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
          title="From currency"
        >
          {CURRENCIES.map((cur) => (
            <option key={cur} value={cur}>{cur}</option>
          ))}
        </select>
        <span>to</span>
        <label htmlFor="currency-to" className="sr-only">To currency</label>
        <select
          id="currency-to"
          value={to}
          onChange={(e) => setTo(e.target.value)}
          title="To currency"
        >
          {CURRENCIES.map((cur) => (
            <option key={cur} value={cur}>{cur}</option>
          ))}
        </select>
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div className={styles.error}>{error}</div>
      ) : result !== null ? (
        <div>
          {amount} {from} = <strong>{result.toLocaleString(undefined, { maximumFractionDigits: 2 })} {to}</strong>
        </div>
      ) : null}
    </div>
  );
};

export default CurrencyExchange;

import React, { createContext, useContext, useEffect, useState } from 'react';

const SUPPORTED_CURRENCIES = ['IDR', 'USD', 'EUR'] as const;
export type Currency = typeof SUPPORTED_CURRENCIES[number];

interface CurrencyContextProps {
  currency: Currency;
  setCurrency: (c: Currency) => void;
  exchangeRates: { [key: string]: number };
  convertCurrency: (amount: number | null | undefined, from?: string) => string;
}

const CurrencyContext = createContext<CurrencyContextProps | undefined>(undefined);

// Approximate fallback rates (USD base): update periodically if no API key is set
const FALLBACK_RATES = { IDR: 34.0, USD: 1.0, EUR: 0.93 };

export const CurrencyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currency, setCurrency] = useState<Currency>('IDR');
  const [exchangeRates, setExchangeRates] = useState<{ [key: string]: number }>(FALLBACK_RATES);

  useEffect(() => {
    const fetchRates = async () => {
      const apiKey = import.meta.env.VITE_OPENEXCHANGERATES_API_KEY;
      if (!apiKey) return; // use fallback rates
      try {
        const res = await fetch(`https://openexchangerates.org/api/latest.json?app_id=${apiKey}&symbols=IDR,USD,EUR`);
        const data = await res.json();
        if (data && data.rates && data.rates.IDR && data.rates.USD && data.rates.EUR) {
          setExchangeRates({
            IDR: data.rates.IDR,
            USD: data.rates.USD,
            EUR: data.rates.EUR,
          });
        }
      } catch {
        // keep fallback rates on error
      }
    };
    fetchRates();
  }, []);

  const convertCurrency = (amount: number | null | undefined, from: string = 'IDR') => {
    if (!amount || !exchangeRates[from] || !exchangeRates[currency]) return '-';
    const thbAmount = from === 'IDR' ? amount : (amount / exchangeRates[from]) * exchangeRates['IDR'];
    const converted = (thbAmount / exchangeRates['IDR']) * exchangeRates[currency];
    const symbol = currency === 'IDR' ? '฿' : currency === 'USD' ? '$' : '€';
    return `${symbol}${converted.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ${currency}`;
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, exchangeRates, convertCurrency }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => {
  const ctx = useContext(CurrencyContext);
  if (!ctx) throw new Error('useCurrency must be used within a CurrencyProvider');
  return ctx;
};

export const CurrencySelector: React.FC = () => {
  const { currency, setCurrency } = useCurrency();
  return (
    <div className="flex justify-end items-center p-4">
      <label htmlFor="currency-select" className="mr-2 font-medium">Currency:</label>
      <select
        id="currency-select"
        value={currency}
        onChange={e => setCurrency(e.target.value as Currency)}
        className="border rounded px-2 py-1"
      >
        {SUPPORTED_CURRENCIES.map((cur) => (
          <option key={cur} value={cur}>{cur}</option>
        ))}
      </select>
    </div>
  );
};

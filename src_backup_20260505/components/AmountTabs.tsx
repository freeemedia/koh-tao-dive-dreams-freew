import React, { useState } from 'react';

interface AmountTabsProps {
  deposit: number;
  total: number;
  due: number;
  paid: number;
  onAmountChange?: (field: 'deposit' | 'total' | 'due' | 'paid', value: number) => void;
}

const tabLabels = [
  { key: 'deposit', label: 'Deposit' },
  { key: 'total', label: 'Total' },
  { key: 'due', label: 'Due' },
  { key: 'paid', label: 'Paid' },
] as const;

type TabKey = typeof tabLabels[number]['key'];

export const AmountTabs: React.FC<AmountTabsProps> = ({ deposit, total, due, paid, onAmountChange }) => {
  const [activeTab, setActiveTab] = useState<TabKey>('total');
  const [amounts, setAmounts] = useState({ deposit, total, due, paid });

  const handleEdit = (key: TabKey, value: string) => {
    const num = Number(value);
    if (!isNaN(num)) {
      setAmounts(prev => ({ ...prev, [key]: num }));
      onAmountChange?.(key, num);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex border rounded overflow-hidden mb-2">
        {tabLabels.map(tab => (
          <button
            key={tab.key}
            className={`px-4 py-2 text-sm font-semibold focus:outline-none ${activeTab === tab.key ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'}`}
            onClick={() => setActiveTab(tab.key)}
            style={{ minWidth: 70 }}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="w-full flex justify-center">
        <input
          type="number"
          className="border rounded px-3 py-1 text-center text-lg font-bold w-32"
          value={amounts[activeTab]}
          onChange={e => handleEdit(activeTab, e.target.value)}
          placeholder={`Enter ${activeTab} amount`}
          title={`${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} amount`}
        />
      </div>
    </div>
  );
};

export default AmountTabs;

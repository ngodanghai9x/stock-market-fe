import React, { useState } from 'react';
import Asset from './Asset';
import OrderBook from './OrderBook';

enum CurrentTab {
  OrderBook = 'OrderBook',
  Asset = 'Asset',
  History = 'History',
}

const TABS = [
  {
    title: 'Sổ lệnh',
    key: CurrentTab.OrderBook,
  },
  {
    title: 'Tài sản',
    key: CurrentTab.Asset,
  },
  {
    title: 'Lịch sử',
    key: CurrentTab.History,
  },
];

const MoneyInfo = () => {
  const [currentTab, setCurrentTab] = useState<CurrentTab>(CurrentTab.OrderBook);
  return (
    <div className="flex flex-col bg-trueGray-800 text-white border-t row-span-2">
      <div className="flex-1">
        {currentTab === CurrentTab.OrderBook && <OrderBook />}
        {currentTab === CurrentTab.Asset && <Asset />}
      </div>
      <div className="flex border-t px-2 py-3">
        <ul className="flex">
          {TABS.map((tab) => (
            <li className={`even:border-x even:px-4 even:mx-4 ${currentTab === tab.key ? ' text-red-500 ' : ''}`}>
              {' '}
              <button key={tab.key} onClick={() => setCurrentTab(tab.key)}>
                {tab.title}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MoneyInfo;

import React, { useState } from 'react';
import Asset from './Asset';
import OrderBook from './OrderBook';
import CloseIcon from '@mui/icons-material/Close';

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
  const [isOpenDetail, setIsOpenDetail] = useState(true)
  return (
    <div className='text-white row-span-2'>
      {isOpenDetail && <div className="flex flex-col bg-trueGray-800 relative h-full">
        <div className='flex-1 border-t h-full'>
          <div className='absolute right-4 top-5'>
            <button onClick={() => setIsOpenDetail(false)}>
              <CloseIcon sx={{ color: 'white' }} />
            </button>
          </div>
          <div className='h-full '>
            {currentTab === CurrentTab.OrderBook && <OrderBook />}
            {currentTab === CurrentTab.Asset && <Asset />}
          </div>
        </div>
      </div>}
      <div className="flex border-t px-2 py-3 fixed w-full bottom-0">
        <ul className="flex" onClick={() => setIsOpenDetail(true)}>
          {TABS.map(tab => <li className={`even:border-x even:px-4 even:mx-4 ${currentTab === tab.key ? ' text-red-500 ' : ''}`}> <button key={tab.key} onClick={() => setCurrentTab(tab.key)}>{tab.title}</button></li>)}
        </ul>
      </div>
    </div>
  );
};

export default MoneyInfo;

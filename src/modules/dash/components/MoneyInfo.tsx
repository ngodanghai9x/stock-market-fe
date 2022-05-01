import React, { useState } from 'react'

enum CurrentTab {
  Asset = 'Asset',
  Debts = 'Debts',
  LoanAmount = 'LoanAmount',
}

const tabs = [{
  title: 'Tài sản',
  key: CurrentTab.Asset
}, {
  title: 'Nợ',
  key: CurrentTab.Debts
}, {
  title: 'Khoản',
  key: CurrentTab.LoanAmount
}]

const DebtsTab = () => {
  return (<div>
    <div className='my-4 ml-4'>
      <p>Tổng nợ: 206</p>
    </div>
    <div className='flex  text-white px-4 border-y'>
      <div className='flex-1 border-r py-4 flex justify-between'>
        <span>Nợ gốc ký quỹ</span>
        <span className='block mr-4'>0</span>
      </div>
      <div className='flex-1  py-4 ml-4 flex justify-between'>
        <span>Nợ lãi ký quỹ</span>
        <span>0</span>
      </div>
    </div>
    <div className='flex  text-white px-4 border-y'>
      <div className='flex-1 border-r py-4 flex justify-between'>
        <span>Nợ gốc ký quỹ</span>
        <span className='block mr-4'>0</span>
      </div>
      <div className='flex-1  py-4 ml-4 flex justify-between'>
        <span>Nợ lãi ký quỹ</span>
        <span>0</span>
      </div>
    </div>
    <div className='flex  text-white px-4 border-y'>
      <div className='flex-1 border-r py-4 flex justify-between'>
        <span>Nợ gốc ký quỹ</span>
        <span className='block mr-4'>0</span>
      </div>
      <div className='flex-1  py-4 ml-4 flex justify-between'>
        <span>Nợ lãi ký quỹ</span>
        <span>0</span>
      </div>
    </div>
  </div>)
}

const MoneyInfo = () => {
  const [currentTab, setCurrentTab] = useState<CurrentTab>(CurrentTab.Debts);
  return (
    <div className="flex flex-col bg-trueGray-800 text-white border-t row-span-2">
      <div className="flex flex-1">
        <div className=" border-gray-400 border-r-4 flex items-center ">
          <p className="-rotate-90 font-semibold">Thông tin tiền</p>
        </div>
        <div className='flex-1'>
          <div className="flex mx-2">
            {tabs.map(tab => <button className={`px-4 py-2 border-b font-semibold	 min-w-[90px] ${currentTab === tab.key ? 'border-red-500 text-red-500 ' : ''}`} key={tab.key} onClick={() => setCurrentTab(tab.key)}>{tab.title}</button>)}
          </div>
          {currentTab === CurrentTab.Debts && <DebtsTab />}
        </div>
      </div>
      <div className="flex border-t px-2 py-3">
        <button>Sổ lệnh</button>
        <button className='border-x px-4 mx-4'>Tài sản</button>
        <button>Lịch sử</button>
      </div>
    </div>
  )
}

export default MoneyInfo
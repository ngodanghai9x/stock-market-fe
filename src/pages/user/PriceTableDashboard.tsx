import React from 'react';
import { ModePT } from '../../constants';
import { AppContext } from '../../context';
import { flatGrouped, getFavSymbolsFromStorage } from '../../lib/utils';
import PriceTable from '../../modules/dash/components/PriceTable';
import { User } from '../../services/api-admin.type';

const PriceTableDashboard = () => {
  const [mode, setMode] = React.useState<ModePT>(ModePT.default);

  const { store, matchingGrouped, marketHistory, fetchData } = React.useContext(AppContext);

  const list = flatGrouped(matchingGrouped, store, marketHistory).filter((o) =>
    mode === ModePT.favorite ? getFavSymbolsFromStorage().includes(o.symbol) : true
  );

  return (
    <div>
      <PriceTable mode={mode} itemList={list} setMode={setMode} />
    </div>
  );
};

export default PriceTableDashboard;

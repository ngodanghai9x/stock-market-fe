import React from 'react';
import { ModePT } from '../../constants';
import { AppContext } from '../../context';
import { flatGrouped, getFavSymbolsFromStorage } from '../../lib/utils';
import PriceTable from '../../modules/dash/components/PriceTable';
import { User } from '../../services/api-admin.type';
import { getDerivativeIndexes, getTotalIndex } from '../../services/api-user.service';
import { Index, TotalIndex } from '../../services/api-user.type';

const PriceTableDashboard = () => {
  const [mode, setMode] = React.useState<ModePT>(ModePT.default);
  const [indexes, setIndexes] = React.useState<Index[]>([]);
  const [totalIndex, setTotalIndex] = React.useState<TotalIndex>({} as TotalIndex);

  const { store, matchingGrouped, marketHistory, fetchData } = React.useContext(AppContext);

  const fetchIndexes = async () => {
    getDerivativeIndexes().then(({ data }) => {
      setIndexes(data || []);
    });
    getTotalIndex().then((data) => {
      const { totalMatch, totalValue } = data;
      setTotalIndex({ totalMatch, totalValue });
    });
  };

  React.useEffect(() => {
    fetchIndexes();
  }, []);

  const list = flatGrouped(matchingGrouped, store, marketHistory).filter((o) =>
    mode === ModePT.favorite ? getFavSymbolsFromStorage().includes(o.symbol) : true
  );

  return (
    <div>
      <PriceTable mode={mode} indexes={indexes} totalIndex={totalIndex} itemList={list} setMode={setMode} />
    </div>
  );
};

export default PriceTableDashboard;

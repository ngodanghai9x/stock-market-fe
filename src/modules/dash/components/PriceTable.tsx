import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled, SxProps, Theme } from '@mui/material/styles';
import MoneyInfo from './MoneyInfo';
import { CreateStockOrder, Index, PriceItem, TotalIndex } from '../../../services/api-user.type';
import { calculateColor, formatAmount, formatPrice, formatTotal, getFavSymbolsFromStorage } from '../../../lib/utils';
import PriceTableHeader from './PriceTableHeader';
import PriceTableSubHeader from './PriceTableSubHeader';
import { COLOR, ModePT, STORAGE } from '../../../constants';
import ToggleStar from './ToggleStar';
import { debounce } from 'lodash';

const tableHeadings = [
  'Mã',
  'Trần',
  'Sàn',
  'TC',
  'Giá M 3',
  'KL M 3',
  'Giá M 2',
  'KL M 2',
  'Giá M 1',
  'KL M 1',
  'Giá',
  'KL',
  '+/-',
  'Giá B 1',
  'KL B 1',
  'Giá B 2',
  'KL B 2',
  'Giá B 3',
  'KL B 3',
  'Cao',
  'TB',
  'Thấp',
  'T.KL',
];

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  borderColor: '#434343',
  borderTop: 0,
  borderBottom: 0,
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  borderTop: 0,
  borderBottom: 0,
  borderColor: '#434343',
  '&:nth-of-type(even)': {
    backgroundColor: '#202020',
  },
  '&:hover': {
    backgroundColor: '#808080',
  },
}));

const ColorTableCell = ({
  row,
  value,
  compareValue,
  sx,
  children,
  formatValue = formatPrice,
}: {
  row: PriceItem;
  compareValue: number;
  value: number | string;
  sx?: SxProps<Theme>;
  formatValue?: (v: any) => string | number;
  children?: JSX.Element;
}): JSX.Element => {
  return (
    <StyledTableCell
      align="center"
      sx={{
        color: compareValue ? calculateColor(row, Number(compareValue)) : 'white',
        borderLeft: '1px solid #434343',
        ...sx,
      }}
    >
      <div className="flex gap-2 justify-center items-center">
        {children || ''}
        {formatValue(value)}
      </div>
    </StyledTableCell>
  );
};

type PriceTableProps = {
  itemList?: PriceItem[];
  indexes: Index[];
  totalIndex: TotalIndex;
  setMode: React.Dispatch<React.SetStateAction<ModePT>>;
  mode: ModePT;
};

const PriceTable = ({ indexes = [], itemList = [], totalIndex, setMode, mode }: PriceTableProps) => {
  const [currentStock, setCurrentStock] = React.useState<PriceItem>({} as PriceItem);
  const [favSymbols, _setFavSymbols] = React.useState<string[]>(getFavSymbolsFromStorage());
  const [list, setList] = React.useState<PriceItem[]>(itemList);
  const [query, setQuery] = React.useState<string>('');

  const handleClickStock = (item: PriceItem) => {
    setCurrentStock(item);
  };

  const setFavSymbols = (values: string[]) => {
    _setFavSymbols(values);
    localStorage.setItem(STORAGE.favSymbols, values.join(';'));
  };

  const getList = React.useCallback(
    (query: string) => {
      query ? setList(itemList.filter((o) => o.symbol?.startsWith(query))) : setList(itemList);
    },
    [itemList]
  );

  const debounceGetList = React.useCallback(
    debounce((value: string) => getList(value.trim().toUpperCase()), 250),
    []
  );

  React.useEffect(() => {
    getList(query);
  }, [getList]);

  const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    debounceGetList(value);
    // debounceSuggest(value.trim().toUpperCase());
  };

  return (
    <div className="w-screen h-screen overflow-y-hidden bg-trueGray-800 grid grid-rows-4 grid-flow-col">
      <div className="row-span-2">
        <PriceTableSubHeader indexes={indexes} totalIndex={totalIndex} />
        <PriceTableHeader currentStock={currentStock} />
        <div className="flex items-end border-b-myYellow border-b">
          <div className="mb-0">
            <input
              type="search"
              onChange={handleChangeSearch}
              value={query}
              placeholder="Tìm kiếm mã cổ phiếu"
              className="m-4 mb-0 p-1 rounded"
            />
            <div className="h-1"></div>
          </div>
          <div className="px-2">
            <button
              type="button"
              className={`text-white mx-1 px-3 py-1 rounded rounded-b-none ${
                mode === ModePT.default ? `bg-myYellow` : 'bg-[#363636]'
              }`}
              onClick={() => setMode(ModePT.default)}
            >
              Mặc định
            </button>
            <button
              type="button"
              className={`text-white mx-1 px-3 py-1 rounded rounded-b-none  ${
                mode === ModePT.favorite ? `bg-myYellow` : 'bg-[#363636]'
              }`}
              onClick={() => setMode(ModePT.favorite)}
            >
              Yêu thích
            </button>
          </div>
        </div>
        <TableContainer
          component={Paper}
          sx={{
            backgroundColor: 'black',
            // boxShadow: '0 2px 4px 0 #000000cc',
          }}
        >
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow>
                {tableHeadings.map((tableHeading, i) => (
                  <TableCell
                    key={tableHeading + i + i}
                    sx={{
                      color: 'white',
                      fontWeight: '600',
                      backgroundColor: '#363636',
                      boxShadow: '0 2px 4px 0 #000000cc',
                      borderColor: '#434343',
                      borderLeft: ['Giá', 'Giá B 1'].includes(tableHeading) ? '1px solid #888484' : '1px solid #434343',
                      textAlign: 'center',
                    }}
                  >
                    {tableHeading}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {list.map((row, i) => {
                const checked = favSymbols.includes(row.symbol);
                return (
                  <StyledTableRow
                    key={'PriceTable' + row.symbol + i}
                    sx={{ cursor: 'pointer' }}
                    onClick={() => handleClickStock(row)}
                  >
                    <ColorTableCell
                      row={row}
                      compareValue={row.matchingPrice}
                      value={row.symbol}
                      formatValue={(v) => v}
                      children={
                        <ToggleStar
                          checked={checked}
                          onClick={() => {
                            let _favSymbols = [...favSymbols];
                            if (!checked) {
                              _favSymbols.push(row.symbol);
                            } else {
                              _favSymbols = _favSymbols.filter((s) => s !== row.symbol);
                            }
                            setFavSymbols(_favSymbols);
                          }}
                        />
                      }
                    />

                    <StyledTableCell
                      align="center"
                      sx={{
                        color: COLOR.myPurple,
                        borderLeft: '1px solid #434343',
                      }}
                    >
                      {formatPrice(row.ceilPrice)}
                    </StyledTableCell>
                    <StyledTableCell
                      align="center"
                      sx={{
                        color: COLOR.myBlue,
                        borderLeft: '1px solid #434343',
                      }}
                    >
                      {formatPrice(row.floorPrice)}
                    </StyledTableCell>
                    <StyledTableCell
                      align="center"
                      sx={{
                        color: COLOR.myOrange,
                        borderLeft: '1px solid #434343',
                      }}
                    >
                      {formatPrice(row.refPrice)}
                    </StyledTableCell>

                    <ColorTableCell row={row} compareValue={row.thirdBuy.price} value={row.thirdBuy.price} />
                    <ColorTableCell
                      row={row}
                      compareValue={row.thirdBuy.price}
                      value={row.thirdBuy.amount}
                      formatValue={formatAmount}
                    />

                    <ColorTableCell row={row} compareValue={row.secondBuy.price} value={row.secondBuy.price} />
                    <ColorTableCell
                      row={row}
                      compareValue={row.secondBuy.price}
                      value={row.secondBuy.amount}
                      formatValue={formatAmount}
                    />

                    <ColorTableCell row={row} compareValue={row.bestBuy.price} value={row.bestBuy.price} />
                    <ColorTableCell
                      row={row}
                      compareValue={row.bestBuy.price}
                      value={row.bestBuy.amount}
                      formatValue={formatAmount}
                    />

                    <ColorTableCell
                      row={row}
                      compareValue={row.matchingPrice}
                      value={row.matchingPrice}
                      sx={{
                        borderLeft: '1px solid #888484',
                      }}
                    />
                    <ColorTableCell
                      row={row}
                      compareValue={row.matchingPrice}
                      value={row.matchingAmount}
                      formatValue={formatAmount}
                    />
                    <ColorTableCell row={row} compareValue={row.matchingPrice} value={row.matchingChange} />

                    <ColorTableCell
                      row={row}
                      compareValue={row.bestSell.price}
                      value={row.bestSell.price}
                      sx={{
                        borderLeft: '1px solid #888484',
                      }}
                    />
                    <ColorTableCell
                      row={row}
                      compareValue={row.bestSell.price}
                      value={row.bestSell.amount}
                      formatValue={formatAmount}
                    />

                    <ColorTableCell row={row} compareValue={row.secondSell.price} value={row.secondSell.price} />
                    <ColorTableCell
                      row={row}
                      compareValue={row.secondSell.price}
                      value={row.secondSell.amount}
                      formatValue={formatAmount}
                    />

                    <ColorTableCell row={row} compareValue={row.thirdSell.price} value={row.thirdSell.price} />
                    <ColorTableCell
                      row={row}
                      compareValue={row.thirdSell.price}
                      value={row.thirdSell.amount}
                      formatValue={formatAmount}
                    />

                    <ColorTableCell row={row} compareValue={row.matchedHigh} value={row.matchedHigh} />
                    <ColorTableCell row={row} compareValue={row.matchedAvg} value={row.matchedAvg} />
                    <ColorTableCell row={row} compareValue={row.matchedLow} value={row.matchedLow} />

                    <StyledTableCell
                      align="center"
                      sx={{
                        color: 'white',
                        borderLeft: '1px solid #434343',
                      }}
                    >
                      {/* {row.matchedTotal || '--'} */}
                      {formatTotal(row.matchedTotal) || '--'}
                    </StyledTableCell>
                  </StyledTableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <MoneyInfo itemList={itemList} />
    </div>
  );
};

export default PriceTable;

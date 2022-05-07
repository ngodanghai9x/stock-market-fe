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
import { CreateStockOrder, PriceItem } from '../../../services/api-user.type';
import { calculateColor, formatAmount, formatPrice, formatTotal } from '../../../lib/utils';
import PriceTableHeader from './PriceTableHeader';
import PriceTableSubHeader from './PriceTableSubHeader';
import { COLOR } from '../../../constants';

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
  formatValue = formatPrice,
}: {
  row: PriceItem;
  compareValue: number;
  value?: number | string;
  sx?: SxProps<Theme>;
  formatValue?: (v: number) => string | number;
}): JSX.Element => {
  return (
    <StyledTableCell
      align="center"
      sx={{
        color: calculateColor(row, Number(compareValue)),
        borderLeft: '1px solid #434343',
        ...sx,
      }}
    >
      {formatValue(value ? +value : compareValue)}
    </StyledTableCell>
  );
};

type PriceTableProps = {
  list?: PriceItem[];
};

const PriceTable2 = ({ list = [] }: PriceTableProps) => {
  const [currentStock, setCurrentStock] = React.useState<PriceItem>({} as PriceItem);
  const handleClickStock = (item: PriceItem) => {
    setCurrentStock(item);
  };

  return (
    <div className="w-screen h-screen overflow-y-hidden bg-trueGray-800 grid grid-rows-4 grid-flow-col">
      <div className="row-span-2">
        <PriceTableSubHeader />
        <PriceTableHeader currentStock={currentStock} />
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
                {tableHeadings.map((tableHeading) => (
                  <TableCell
                    key={tableHeading}
                    sx={{
                      color: 'white',
                      fontWeight: '600',
                      backgroundColor: '#363636',
                      boxShadow: '0 2px 4px 0 #000000cc',
                      borderColor: '#434343',
                      borderLeft: ['Giá', 'Giá B 1'].includes(tableHeading) ? '1px solid #888484' : '1px solid #434343',
                    }}
                  >
                    {tableHeading}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {list.map((row, i) => (
                <StyledTableRow
                  key={'PriceTable' + row.symbol + i}
                  sx={{ cursor: 'pointer' }}
                  onClick={() => handleClickStock(row)}
                >
                  {/* <StyledTableCell
                    align="center"
                    sx={{
                      color: 'white',
                      borderLeft: '1px solid #434343',
                    }}
                  >
                    {row.symbol || '--'}
                  </StyledTableCell> */}
                  <ColorTableCell
                    row={row}
                    compareValue={row.matchingPrice}
                    value={row.symbol}
                    formatValue={(v) => v}
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
                  <StyledTableCell
                    align="center"
                    sx={{
                      color: 'white',
                      borderLeft: '1px solid #434343',
                    }}
                  >
                    {formatPrice(row.thirdBuy.price) || '--'}
                  </StyledTableCell>
                  <StyledTableCell
                    align="center"
                    sx={{
                      color: 'white',
                      borderLeft: '1px solid #434343',
                    }}
                  >
                    {formatAmount(row.thirdBuy.amount) || '--'}
                  </StyledTableCell>
                  <StyledTableCell
                    align="center"
                    sx={{
                      color: 'white',
                      borderLeft: '1px solid #434343',
                    }}
                  >
                    {formatPrice(row.secondBuy.price) || '--'}
                  </StyledTableCell>
                  <StyledTableCell
                    align="center"
                    sx={{
                      color: 'white',
                      borderLeft: '1px solid #434343',
                    }}
                  >
                    {formatAmount(row.secondBuy.amount) || '--'}
                  </StyledTableCell>
                  <StyledTableCell
                    align="center"
                    sx={{
                      color: 'white',
                      borderLeft: '1px solid #434343',
                    }}
                  >
                    {formatPrice(row.bestBuy.price) || '--'}
                  </StyledTableCell>
                  <StyledTableCell
                    align="center"
                    sx={{
                      color: 'white',
                      borderLeft: '1px solid #434343',
                    }}
                  >
                    {formatAmount(row.bestBuy.amount) || '--'}
                  </StyledTableCell>
                  <StyledTableCell
                    align="center"
                    sx={{
                      color: 'white',
                      borderLeft: '1px solid #888484',
                    }}
                  >
                    {formatPrice(row.matchingPrice) || '--'}
                  </StyledTableCell>
                  <StyledTableCell
                    align="center"
                    sx={{
                      color: 'white',
                      borderLeft: '1px solid #434343',
                    }}
                  >
                    {row.matchingAmount || '--'}
                  </StyledTableCell>
                  <StyledTableCell
                    align="center"
                    sx={{
                      color: 'white',
                      borderLeft: '1px solid #434343',
                    }}
                  >
                    {formatPrice(row.matchingChange) || '--'}
                  </StyledTableCell>
                  <StyledTableCell
                    align="center"
                    sx={{
                      color: 'white',
                      borderLeft: '1px solid #888484',
                    }}
                  >
                    {formatPrice(row.bestSell.price) || '--'}
                  </StyledTableCell>
                  <StyledTableCell
                    align="center"
                    sx={{
                      color: 'white',
                      borderLeft: '1px solid #434343',
                    }}
                  >
                    {formatAmount(row.bestSell.amount) || '--'}
                  </StyledTableCell>
                  <StyledTableCell
                    align="center"
                    sx={{
                      color: 'white',
                      borderLeft: '1px solid #434343',
                    }}
                  >
                    {formatPrice(row.secondSell.price) || '--'}
                  </StyledTableCell>
                  <StyledTableCell
                    align="center"
                    sx={{
                      color: 'white',
                      borderLeft: '1px solid #434343',
                    }}
                  >
                    {formatAmount(row.secondSell.amount) || '--'}
                  </StyledTableCell>
                  <StyledTableCell
                    align="center"
                    sx={{
                      color: 'white',
                      borderLeft: '1px solid #434343',
                    }}
                  >
                    {formatPrice(row.thirdSell.price) || '--'}
                  </StyledTableCell>
                  <StyledTableCell
                    align="center"
                    sx={{
                      color: 'white',
                      borderLeft: '1px solid #434343',
                    }}
                  >
                    {formatAmount(row.thirdSell.amount) || '--'}
                  </StyledTableCell>
                  <StyledTableCell
                    align="center"
                    sx={{
                      color: 'white',
                      borderLeft: '1px solid #434343',
                    }}
                  >
                    {formatPrice(row.matchedHigh) || '--'}
                  </StyledTableCell>
                  <StyledTableCell
                    align="center"
                    sx={{
                      color: 'white',
                      borderLeft: '1px solid #434343',
                    }}
                  >
                    {formatPrice(row.matchedAvg) || '--'}
                  </StyledTableCell>
                  <StyledTableCell
                    align="center"
                    sx={{
                      color: 'white',
                      borderLeft: '1px solid #434343',
                    }}
                  >
                    {formatPrice(row.matchedLow) || '--'}
                  </StyledTableCell>
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
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <MoneyInfo />
    </div>
  );
};

export default PriceTable2;

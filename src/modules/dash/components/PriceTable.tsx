import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import MoneyInfo from './MoneyInfo';
import { CreateStockOrder, PriceItem } from '../../../services/api-user.type';
import { formatAmount, formatPrice, formatTotal } from '../../../lib/utils';
import PriceTableHeader from './PriceTableHeader';

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
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: '#171717',
  },
}));

type PriceTableProps = {
  list?: PriceItem[];
};

const PriceTable = ({ list = [] }: PriceTableProps) => {
  const [currentStock, setCurrentStock] = React.useState<PriceItem>({} as PriceItem);
  const handleClickStock = (item: PriceItem) => {
    setCurrentStock(item);
  };

  return (
    <div className="w-screen h-screen overflow-y-hidden bg-trueGray-800 grid grid-rows-4 grid-flow-col">
      <div className="row-span-2">
        <PriceTableHeader currentStock={currentStock} />
        <TableContainer component={Paper} sx={{ backgroundColor: '#363636', boxShadow: '0 2px 4px 0 #000000cc' }}>
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
                      borderLeft: '1px solid lightgray',
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
                  <StyledTableCell
                    align="center"
                    sx={{
                      color: 'white',
                      borderLeft: '1px solid lightgray',
                    }}
                  >
                    {row.symbol || '--'}
                  </StyledTableCell>
                  <StyledTableCell
                    align="center"
                    sx={{
                      color: 'white',
                      borderLeft: '1px solid lightgray',
                    }}
                  >
                    {formatPrice(row.ceilPrice)}
                  </StyledTableCell>
                  <StyledTableCell
                    align="center"
                    sx={{
                      color: 'white',
                      borderLeft: '1px solid lightgray',
                    }}
                  >
                    {formatPrice(row.floorPrice)}
                  </StyledTableCell>
                  <StyledTableCell
                    align="center"
                    sx={{
                      color: 'white',
                      borderLeft: '1px solid lightgray',
                    }}
                  >
                    {formatPrice(row.refPrice)}
                  </StyledTableCell>
                  <StyledTableCell
                    align="center"
                    sx={{
                      color: 'white',
                      borderLeft: '1px solid lightgray',
                    }}
                  >
                    {formatPrice(row.thirdBuy.price) || '--'}
                  </StyledTableCell>
                  <StyledTableCell
                    align="center"
                    sx={{
                      color: 'white',
                      borderLeft: '1px solid lightgray',
                    }}
                  >
                    {formatAmount(row.thirdBuy.amount) || '--'}
                  </StyledTableCell>
                  <StyledTableCell
                    align="center"
                    sx={{
                      color: 'white',
                      borderLeft: '1px solid lightgray',
                    }}
                  >
                    {formatPrice(row.secondBuy.price) || '--'}
                  </StyledTableCell>
                  <StyledTableCell
                    align="center"
                    sx={{
                      color: 'white',
                      borderLeft: '1px solid lightgray',
                    }}
                  >
                    {formatAmount(row.secondBuy.amount) || '--'}
                  </StyledTableCell>
                  <StyledTableCell
                    align="center"
                    sx={{
                      color: 'white',
                      borderLeft: '1px solid lightgray',
                    }}
                  >
                    {formatPrice(row.bestBuy.price) || '--'}
                  </StyledTableCell>
                  <StyledTableCell
                    align="center"
                    sx={{
                      color: 'white',
                      borderLeft: '1px solid lightgray',
                    }}
                  >
                    {formatAmount(row.bestBuy.amount) || '--'}
                  </StyledTableCell>
                  <StyledTableCell
                    align="center"
                    sx={{
                      color: 'white',
                      borderLeft: '1px solid lightgray',
                    }}
                  >
                    {formatPrice(row.matchingPrice) || '--'}
                  </StyledTableCell>
                  <StyledTableCell
                    align="center"
                    sx={{
                      color: 'white',
                      borderLeft: '1px solid lightgray',
                    }}
                  >
                    {row.matchingAmount || '--'}
                  </StyledTableCell>
                  <StyledTableCell
                    align="center"
                    sx={{
                      color: 'white',
                      borderLeft: '1px solid lightgray',
                    }}
                  >
                    {formatPrice(row.matchingChange) || '--'}
                  </StyledTableCell>
                  <StyledTableCell
                    align="center"
                    sx={{
                      color: 'white',
                      borderLeft: '1px solid lightgray',
                    }}
                  >
                    {formatPrice(row.bestSell.price) || '--'}
                  </StyledTableCell>
                  <StyledTableCell
                    align="center"
                    sx={{
                      color: 'white',
                      borderLeft: '1px solid lightgray',
                    }}
                  >
                    {formatAmount(row.bestSell.amount) || '--'}
                  </StyledTableCell>
                  <StyledTableCell
                    align="center"
                    sx={{
                      color: 'white',
                      borderLeft: '1px solid lightgray',
                    }}
                  >
                    {formatPrice(row.secondSell.price) || '--'}
                  </StyledTableCell>
                  <StyledTableCell
                    align="center"
                    sx={{
                      color: 'white',
                      borderLeft: '1px solid lightgray',
                    }}
                  >
                    {formatAmount(row.secondSell.amount) || '--'}
                  </StyledTableCell>
                  <StyledTableCell
                    align="center"
                    sx={{
                      color: 'white',
                      borderLeft: '1px solid lightgray',
                    }}
                  >
                    {formatPrice(row.thirdSell.price) || '--'}
                  </StyledTableCell>
                  <StyledTableCell
                    align="center"
                    sx={{
                      color: 'white',
                      borderLeft: '1px solid lightgray',
                    }}
                  >
                    {formatAmount(row.thirdSell.amount) || '--'}
                  </StyledTableCell>
                  <StyledTableCell
                    align="center"
                    sx={{
                      color: 'white',
                      borderLeft: '1px solid lightgray',
                    }}
                  >
                    {formatPrice(row.matchedHigh) || '--'}
                  </StyledTableCell>
                  <StyledTableCell
                    align="center"
                    sx={{
                      color: 'white',
                      borderLeft: '1px solid lightgray',
                    }}
                  >
                    {formatPrice(row.matchedAvg) || '--'}
                  </StyledTableCell>
                  <StyledTableCell
                    align="center"
                    sx={{
                      color: 'white',
                      borderLeft: '1px solid lightgray',
                    }}
                  >
                    {formatPrice(row.matchedLow) || '--'}
                  </StyledTableCell>
                  <StyledTableCell
                    align="center"
                    sx={{
                      color: 'white',
                      borderLeft: '1px solid lightgray',
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

export default PriceTable;

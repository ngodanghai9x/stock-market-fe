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
import { PriceItem } from '../../../services/api-user.type';
import { formatAmount, formatPrice } from '../../../lib/utils';

function createData(name: string, calories: number, fat: number, carbs: number, protein: number) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

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
    backgroundColor: '#262626',
  },
}));

type PriceTableProps = {
  list: PriceItem[];
};

const PriceTable = ({ list = [] }: PriceTableProps) => {
  console.log('🚀 ~ file: PriceTable.tsx ~ line 72 ~ PriceTable ~ list', list);
  return (
    <div className="w-screen h-screen bg-trueGray-800 grid grid-rows-4 grid-flow-col">
      <div className="row-span-2">
        <TableContainer component={Paper} sx={{ backgroundColor: 'black' }}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                {tableHeadings.map((tableHeading) => (
                  <TableCell
                    sx={{
                      color: 'white',
                      fontWeight: '600',
                      backgroundColor: 'gray',
                      borderLeft: '1px solid lightgray',
                    }}
                  >
                    {tableHeading}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {list.map((row) => (
                <StyledTableRow key={row.symbol}>
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
                    {row.thirdBuy.amount || '--'}
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
                    {row.secondBuy.amount || '--'}
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
                    {row.bestBuy.amount || '--'}
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
                    {row.bestSell.amount || '--'}
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
                    {row.secondSell.amount || '--'}
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
                    {row.thirdSell.amount || '--'}
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
                    {row.matchedTotal || '--'}
                    {/* {formatAmount(row.matchedTotal) || '--'} */}
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
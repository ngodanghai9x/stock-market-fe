import { Button } from '@mui/material';
import React, { useCallback, useState } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import CreateIndustryModal from './components/CreateIndustryModal';
import { Industry } from '../../../services/api-admin.type';
interface Column {
  id: keyof Industry;
  label: string;
  minWidth?: number;
  align?: 'right' | 'left';
  format?: (value: number) => string;
}
const columns: readonly Column[] = [
  { id: 'industryId', label: 'ID', minWidth: 55 },
  { id: 'industryName', label: 'Tên ngành nghề', minWidth: 150 },
  {
    id: 'industryCode',
    label: 'Mã ngành nghề',
    minWidth: 75,
    align: 'left',
  },
  {
    id: 'description',
    label: 'Mô tả',
    minWidth: 300,
    align: 'left',
  },
  {
    id: 'statusId',
    label: 'Trạng thái',
    minWidth: 90,
    align: 'left',
  },
];

function createData(
  companyId: number,
  companyName: string,
  stockSymbol: string,
  industryId: number,
  websiteUrl: string,
  numEmployees: number,
  foundedDate: string,
  ipoDate: string,
  statusId: number
): Industry {
  return {} as Industry;
}

const rows = [
  createData(1, 'companyName', 'stockSymbol', 142, 'websiteUrl', 1000, 'foundedDate', 'ipoDate', 1),
  createData(1, 'companyName', 'stockSymbol', 142, 'websiteUrl', 1000, 'foundedDate', 'ipoDate', 1),
  createData(1, 'companyName', 'stockSymbol', 142, 'websiteUrl', 1000, 'foundedDate', 'ipoDate', 1),
];

const IndustryPage = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

  const toggleModal = useCallback(() => {
    setIsOpenModal((p) => !p);
  }, []);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  return (
    <div className="bg-white h-full w-11/12">
      <div className="flex justify-end mt-4 mr-4">
        <Button variant="outlined" onClick={toggleModal}>
          Thêm mới
        </Button>
      </div>
      <div className="mt-5 px-4">
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
          <TableContainer sx={{ maxHeight: 660, minHeight: 660 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth }}>
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.industryId}>
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === 'number' ? column.format(value) : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </div>
      <CreateIndustryModal isOpen={isOpenModal} onClose={toggleModal} />
    </div>
  );
};

export default IndustryPage;

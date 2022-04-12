import { Button } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import CreateIndustryModal from './components/CreateIndustryModal';
import { Industry, SearchPayload } from '../../../services/api-admin.type';
import { searchIndustries } from '../../../services/api-admin.service';
import { StatusLabelType } from '../../../constants';
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
    format: (id) => StatusLabelType[id],
  },
];

const IndustryPage = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [records, setRecords] = useState<Industry[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const list = await searchIndustries({} as SearchPayload);
      setRecords(list);
    };
    fetchData();
  }, []);

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
          <TableContainer sx={{ maxHeight: 545, minHeight: 545 }}>
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
                {records.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
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
            labelRowsPerPage="Số bản ghi trên từng trang"
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={records.length}
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

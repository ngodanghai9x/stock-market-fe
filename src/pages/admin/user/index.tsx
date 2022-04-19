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
import AdminEditUserModal from './components/AdminEditUserModal';
import { User } from '../../../services/api-admin.type';
import { getAllUser } from '../../../services/api-admin.service';
import { Value } from '../../../types';
import { RoleLabelType, StatusLabelType, UserStatusLabel } from '../../../constants';
interface Column {
  id: keyof User;
  label: string;
  minWidth?: number;
  align?: 'left';
  format?: (value: string | number) => string;
}

const columns: readonly Column[] = [
  { id: 'userId', label: 'ID', minWidth: 55 },
  { id: 'username', label: 'Tài khoản', minWidth: 120 },
  {
    id: 'fullName',
    label: 'Họ và tên',
    minWidth: 65,
    align: 'left',
  },
  {
    id: 'roleId',
    label: 'Vai trò',
    minWidth: 170,
    align: 'left',
    format: (id) => RoleLabelType[id],
  },
  {
    id: 'email',
    label: 'Email',
    minWidth: 170,
    align: 'left',
  },
  {
    id: 'birthday',
    label: 'Ngày sinh nhật',
    minWidth: 170,
    align: 'left',
  },
  {
    id: 'userStatus',
    label: 'Trạng thái',
    minWidth: 170,
    align: 'left',
    format: (status) => UserStatusLabel[status],
  },
];

const UserPage = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [records, setRecords] = useState<User[]>([]);
  const [editRecord, setEditRecord] = useState<User | undefined>(undefined);

  const fetchData = async () => {
    const list = await getAllUser();
    setRecords(list);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (!isOpenModal) {
      setEditRecord(undefined);
    }
  }, [isOpenModal]);

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

  const handleDoubleClick = (record?: User) => {
    setEditRecord(record);
    setIsOpenModal(true);
  };

  return (
    <div className="bg-white h-full w-11/12">
      <div className="flex justify-end mt-4 mr-4">
        {/* <Button variant="outlined" onClick={toggleModal}>
          Thêm mới
        </Button> */}
      </div>
      <div className="mt-5 px-4">
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
          <TableContainer sx={{ maxHeight: 545, minHeight: 545 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell key={'th' + column.id} align={column.align} style={{ minWidth: column.minWidth }}>
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {records.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.userId}
                      onDoubleClick={() => handleDoubleClick(row)}
                    >
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={'tr' + column.id} align={column.align}>
                            {column.format ? column.format(value || '') : value}
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
      <AdminEditUserModal isOpen={isOpenModal} onClose={toggleModal} editRecord={editRecord} fetchData={fetchData}/>
    </div>
  );
};

export default UserPage;

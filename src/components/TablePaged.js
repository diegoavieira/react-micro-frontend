import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
  Checkbox
} from '@material-ui/core';
import React, { useEffect } from 'react';
import withToast from '../hocs/withToast';

const TablePaged = ({ toast, promise, pagination, onClick, isSelect, selectedId, selectedIdAttr }) => {
  const { loading, data, notFound } = promise;
  const { page, size, total, onPageChange, onSizeChange } = pagination;

  useEffect(() => {
    if (notFound) toast.warning('warning');
  }, [notFound]);

  return (
    <Paper>
      {loading && <div>Loading...</div>}
      {data && (
        <>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  {isSelect && <TableCell padding="checkbox" />}
                  <TableCell>ID</TableCell>
                  <TableCell>Name</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((row) => (
                  <TableRow hover key={row.id} onClick={onClick && (() => onClick(row))}>
                    {isSelect && (
                      <TableCell padding="checkbox">
                        <Checkbox checked={selectedId === row[selectedIdAttr]} />
                      </TableCell>
                    )}
                    <TableCell component="th" scope="row">
                      {row.id}
                    </TableCell>
                    <TableCell>{row.title}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={total}
            rowsPerPage={size}
            page={page}
            onPageChange={onPageChange}
            onRowsPerPageChange={onSizeChange}
          />
        </>
      )}
      {notFound && <div>not found!</div>}
    </Paper>
  );
};
export default withToast(TablePaged);

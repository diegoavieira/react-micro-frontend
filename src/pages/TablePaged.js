/* eslint-disable no-underscore-dangle */
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination
} from '@material-ui/core';
import React from 'react';

const TablePaged = ({ promise, pagination }) => {
  const { loading, data, notFound } = promise;
  const { page, size, total, onPageChange, onSizeChange } = pagination;

  return (
    <Paper>
      {loading && <div>Loading...</div>}
      {data && (
        <>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Name</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((row) => (
                  <TableRow key={row._id}>
                    <TableCell component="th" scope="row">
                      {row._id}
                    </TableCell>
                    <TableCell>{row.name}</TableCell>
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
export default TablePaged;

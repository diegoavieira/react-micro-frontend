/* eslint-disable no-underscore-dangle */
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
import React, { useEffect, useState } from 'react';
import withToast from '../hocs/withToast';

const TablePaged = ({ toast, promise, pagination, selected }) => {
  const { loading, data, notFound } = promise;
  const { page, size, total, onPageChange, onSizeChange } = pagination;

  const [rowSelected, setRowSelected] = useState([]);

  useEffect(() => {
    if (notFound) toast.warning('warning');
  }, [notFound]);

  const handleClick = (event, name) => {
    const selectedIndex = rowSelected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(rowSelected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(rowSelected.slice(1));
    } else if (selectedIndex === rowSelected.length - 1) {
      newSelected = newSelected.concat(rowSelected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(rowSelected.slice(0, selectedIndex), rowSelected.slice(selectedIndex + 1));
    }

    setRowSelected(newSelected);
  };

  const isSelected = (id) => rowSelected.indexOf(id) !== -1;

  return (
    <Paper>
      {loading && <div>Loading...</div>}
      {data && (
        <>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  {selected && (
                    <TableCell padding="checkbox">
                      {/* {multiple && (<Checkbox checked={isSelected(row.id)} />)} */}
                    </TableCell>
                  )}
                  <TableCell>ID</TableCell>
                  <TableCell>Name</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((row) => (
                  <TableRow hover key={row.id} onClick={(event) => handleClick(event, row.id)}>
                    {selected && (
                      <TableCell padding="checkbox">
                        <Checkbox checked={isSelected(row.id)} />
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

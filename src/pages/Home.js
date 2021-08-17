import { Button } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import withToast from '../hocs/withToast';
import useFetch from '../hooks/useFetch';
import useFilter from '../hooks/useFilter';
import TablePaged from '../components/TablePaged';

const Home = () => {
  const [filter, , onPageChange, onSizeChange] = useFilter({ page: 0, size: 5 });
  const [response, setUrl] = useFetch.get();
  const history = useHistory();
  const [selectedId, setSelectedId] = useState('');

  useEffect(() => {
    console.log(filter);
    setUrl(`https://jsonplaceholder.typicode.com/photos?_page=${filter.page + 1}&_limit=${filter.size}`);
  }, [filter]);

  const onClick = (row) => {
    if (selectedId === row.id) {
      setSelectedId('');
    } else {
      setSelectedId(row.id);
    }
  };

  return (
    <div>
      <Button onClick={() => history.push('/create')}>Create</Button>
      <p>{selectedId}</p>
      <TablePaged
        promise={{ ...response, data: response.data }}
        pagination={{
          total: response.data && 5000,
          page: filter.page,
          size: filter.size,
          onPageChange,
          onSizeChange
        }}
        onClick={onClick}
        isSelect
        selectedId={selectedId}
        selectedIdAttr="id"
      />
    </div>
  );
};

export default withToast(Home);

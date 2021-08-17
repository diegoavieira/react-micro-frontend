import { Button } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import withToast from '../hocs/withToast';
import useFetch from '../hooks/useFetch';
import useFilter from '../hooks/useFilter';
import TablePaged from '../components/TablePaged';

const Home = () => {
  const [filter, , onPageChange, onSizeChange] = useFilter({ page: 1, size: 5 });
  const [response, setUrl] = useFetch.get();
  const history = useHistory();
  const [selected] = useState([]);

  useEffect(() => {
    setUrl(`https://jsonplaceholder.typicode.com/photos?_page=${filter.page}&_limit=${filter.size}`);
  }, [filter]);

  return (
    <div>
      <Button onClick={() => history.push('/create')}>Create</Button>
      <TablePaged
        promise={{ ...response, data: response.data }}
        pagination={{
          total: response.data && 5000,
          page: filter.page,
          size: filter.size,
          onPageChange,
          onSizeChange
        }}
        selected={selected}
      />
    </div>
  );
};

export default withToast(Home);

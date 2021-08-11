import React, { useEffect } from 'react';
import withToast from '../hocs/withToast';
import useFetch from '../hooks/useFetch';
import useFilter from '../hooks/useFilter';
import TablePaged from './TablePaged';

const Home = () => {
  // eslint-disable-next-line no-unused-vars
  const [filter, setFilter, onPageChange, onSizeChange] = useFilter({ page: 0, size: 5 });
  const [response, setUrl] = useFetch.get();

  useEffect(() => {
    setUrl(`https://api.instantwebtools.net/v1/passenger?page=${filter.page}&size=${filter.size}`);
  }, [filter]);

  return (
    <div>
      <TablePaged
        promise={{ ...response, data: response.data && response.data.data }}
        pagination={{
          total: response.data && response.data.totalPassengers,
          page: filter.page,
          size: filter.size,
          onPageChange,
          onSizeChange
        }}
      />
    </div>
  );
};

export default withToast(Home);

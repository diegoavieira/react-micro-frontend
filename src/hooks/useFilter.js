import { useState } from 'react';

const useFilter = (filter = {}) => {
  const [newFilter, setFilter] = useState(filter);

  const onPageChange = (event, page) => {
    setFilter({ ...filter, page });
  };

  const onSizeChange = (event) => {
    setFilter({ page: 0, size: parseInt(event.target.value, 10) });
  };

  return [newFilter, setFilter, onPageChange, onSizeChange];
};

export default useFilter;

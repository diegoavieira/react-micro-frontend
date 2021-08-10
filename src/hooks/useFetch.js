import { useEffect, useState } from 'react';

const useFetch = (url, method = 'GET') => {
  const [response, setResponse] = useState({ data: null, loading: false, notFound: false });
  const [newUrl, setUrl] = useState(url);

  useEffect(async () => {
    setResponse({ data: null, loading: true, notFound: false });

    try {
      const dataFetch = await fetch(newUrl, { method: method.toLocaleUpperCase() });
      const data = await dataFetch.json();

      if (dataFetch.ok) {
        setResponse({ data, loading: false, notFound: false });
      } else {
        setResponse({ data: null, loading: false, notFound: true });
      }
    } catch (error) {
      setResponse({ data: null, loading: false, notFound: true });
    }
  }, [newUrl]);

  return [response, setUrl];
};

export default useFetch;

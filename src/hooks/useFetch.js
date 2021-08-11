import { useEffect, useState } from 'react';

const get = (url, blob) => {
  const [response, setResponse] = useState({ data: null, loading: false, notFound: false, error: null });
  const [newUrl, setUrl] = useState(url);

  useEffect(async () => {
    try {
      if (newUrl) {
        setResponse({ data: null, loading: true, notFound: false, error: null });

        const dataFetch = await fetch(newUrl, { method: 'GET' });
        const data = blob ? await dataFetch.blob() : await dataFetch.json();

        if (dataFetch.ok) {
          setResponse({ data, loading: false, notFound: false, error: null });
        } else {
          setResponse({ data: null, loading: false, notFound: true, error: null });
        }
      }
    } catch (error) {
      setResponse({ data: null, loading: false, notFound: true, error });
    }
  }, [newUrl]);

  return [response, setUrl];
};

export default { get };

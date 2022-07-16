import { useState, useCallback } from 'react';

const withHTTP = (Component) => {
  const ComponentWithHttpProps = (props) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchData = useCallback(async (reqQuery, configerData) => {
      setIsLoading(true);
      setError(null);
      
      try {
        const response = await fetch('http://localhost:4000', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(reqQuery),
        });

        if (!response.ok) {
          throw new Error('Request Failed...');
        }

        const data = await response.json();
        configerData(data.data);
      } catch (err) {
        setError(err.message || 'Something went wrong..');
      }

      setIsLoading(false);
    }, []);

    return <Component {...props} http={{ isLoading, error, fetchData }} />;
  };
  return ComponentWithHttpProps;
};

export default withHTTP;

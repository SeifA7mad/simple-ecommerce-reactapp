import { useState, useCallback } from 'react';

const withHTTP = (Component) => {
  // High order component to wrap other class components that needs to fetch an API 
  // the HOC provide the state managment for the HTTP request Loading & Error via props
  // fetctData function async function to make the HTTP request to the Graphql server
  // it takes the graphql query as a parameter and takes a callback function to handle the response data
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

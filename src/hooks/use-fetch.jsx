import React, { useCallback, useState } from "react";

const useFetch = (cb, options = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);
  const [called, setCalled] = useState(false);
  const fn = async (...args) => {
    if (called) return; 
    setLoading(true);
    setError(null);
    setCalled(true);
    try {
      
      const response = await cb(options, ...args);
      setData(response);
      return response;
    } catch (error) {
      setError(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };
  const reset = useCallback(() => {
    setData(null);
    setLoading(null);
    setError(null);
    setCalled(false); 
  }, []);


  return { data, loading, error, fn, reset };
};

export default useFetch;

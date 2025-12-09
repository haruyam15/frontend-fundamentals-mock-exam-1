import { useEffect, useState } from 'react';
import { http, isHttpError } from 'tosslib';
import { SavingsProduct } from 'types';

export function useGetProductList() {
  const [data, setData] = useState<SavingsProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSavingsProducts = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await http.get<SavingsProduct[]>('/api/savings-products');
      setData(response);
    } catch (e) {
      setError(isHttpError(e) ? e.message : 'unknown error');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSavingsProducts();
  }, []);

  return {
    data,
    isLoading,
    isError: error !== null,
    error,
  };
}

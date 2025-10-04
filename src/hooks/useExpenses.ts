import { useState, useEffect } from 'react';
import { apiService, Expense } from '../services/api';
import { useExpenseContext } from '../context/ExpenseContext';

interface UseExpensesReturn {
  expenses: Expense[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export const useExpenses = (): UseExpensesReturn => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { refreshTrigger } = useExpenseContext();

  const fetchExpenses = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiService.getExpenses();
      
      if (response.success && response.data) {
        setExpenses(response.data);
      } else {
        setError(response.error || 'Failed to fetch expenses');
      }
    } catch (err) {
      console.error('Error fetching expenses:', err);
      setError('An error occurred while fetching expenses');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, [refreshTrigger]); // Refetch when refreshTrigger changes

  return {
    expenses,
    loading,
    error,
    refetch: fetchExpenses,
  };
};

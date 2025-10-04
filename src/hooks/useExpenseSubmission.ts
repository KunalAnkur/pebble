import { useState, useCallback } from 'react';
import { apiService, ExpenseData, ApiResponse, ExpenseSubmissionResponse } from '../services/api';

interface UseExpenseSubmissionReturn {
  isSubmitting: boolean;
  error: string | null;
  success: boolean;
  submitExpense: (expenseData: ExpenseData) => Promise<ApiResponse<ExpenseSubmissionResponse>>;
  clearError: () => void;
  clearSuccess: () => void;
}

interface UseExpenseSubmissionProps {
  onSuccess?: () => void;
}

export const useExpenseSubmission = (props?: UseExpenseSubmissionProps): UseExpenseSubmissionReturn => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const submitExpense = useCallback(async (expenseData: ExpenseData): Promise<ApiResponse<ExpenseSubmissionResponse>> => {
    setIsSubmitting(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await apiService.submitExpense(expenseData);
      
      if (response.success) {
        setSuccess(true);
        // Call onSuccess callback if provided
        props?.onSuccess?.();
      } else {
        setError(response.error || 'Failed to submit expense');
      }

      return response;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
      setError(errorMessage);
      return {
        success: false,
        error: errorMessage,
      };
    } finally {
      setIsSubmitting(false);
    }
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const clearSuccess = useCallback(() => {
    setSuccess(false);
  }, []);

  return {
    isSubmitting,
    error,
    success,
    submitExpense,
    clearError,
    clearSuccess,
  };
};

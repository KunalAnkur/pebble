// API service for expense tracking
import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios';
import { getApiConfig } from '../config/api';

export interface ExpenseData {
  type: 'expense' | 'income';
  amount: string;
  note: string;
  date: number; // Changed from string to number for timestamp
  category: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface ExpenseSubmissionResponse {
  id: string;
  type: 'expense' | 'income';
  amount: number;
  note: string;
  date: string;
  time: string;
  category: string;
  createdAt: string;
  updatedAt: string;
}

export interface Expense {
  _id: string;
  type: 'expense' | 'income';
  amount: number;
  note: string;
  category: string;
  date: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

class ApiService {
  private axiosInstance: AxiosInstance;

  constructor() {
    const config = getApiConfig();
    
    this.axiosInstance = axios.create({
      baseURL: config.baseUrl,
      timeout: config.timeout,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Add request interceptor for authentication and logging
    this.axiosInstance.interceptors.request.use(
      (requestConfig) => {
        if (config.apiKey) {
          requestConfig.headers.Authorization = `Bearer ${config.apiKey}`;
        }
        
        // Log request in development
        if (__DEV__) {
          console.log(`🚀 API Request: ${requestConfig.method?.toUpperCase()} ${requestConfig.url}`);
          if (requestConfig.data) {
            console.log('📤 Request Data:', requestConfig.data);
          }
        }
        
        return requestConfig;
      },
      (error) => {
        console.error('❌ Request interceptor error:', error);
        return Promise.reject(error);
      }
    );

    // Add response interceptor for error handling and logging
    this.axiosInstance.interceptors.response.use(
      (response) => {
        // Log successful response in development
        if (__DEV__) {
          console.log(`✅ API Response: ${response.status} ${response.config.url}`);
          console.log('📥 Response Data:', response.data);
        }
        return response;
      },
      (error: AxiosError) => {
        console.error('❌ API request failed:', error);
        
        // Log error details in development
        if (__DEV__) {
          if (error.response) {
            console.error('📥 Error Response:', error.response.data);
            console.error('📊 Error Status:', error.response.status);
          } else if (error.request) {
            console.error('🌐 Network Error:', error.message);
          }
        }
        
        return Promise.reject(error);
      }
    );
  }

  private async makeRequest<T>(
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    endpoint: string,
    data?: any
  ): Promise<ApiResponse<T>> {
    try {
      console.log('data', {
        method,
        url: endpoint,
        data,
      });
      const response: AxiosResponse<T> = await this.axiosInstance.request({
        method,
        url: endpoint,
        data,
      });

      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        
        if (axiosError.code === 'ECONNABORTED') {
          return {
            success: false,
            error: 'Request timeout. Please check your connection and try again.',
          };
        }

        if (axiosError.response) {
          // Server responded with error status
          const errorMessage = (axiosError.response.data as any)?.message || 
                              `HTTP error! status: ${axiosError.response.status}`;
          return {
            success: false,
            error: errorMessage,
          };
        } else if (axiosError.request) {
          // Request was made but no response received
          return {
            success: false,
            error: 'Network error. Please check your connection and try again.',
          };
        }
      }

      return {
        success: false,
        error: error instanceof Error ? error.message : 'An unexpected error occurred',
      };
    }
  }

  /**
   * Submit an expense/income entry
   */
  async submitExpense(expenseData: ExpenseData): Promise<ApiResponse<ExpenseSubmissionResponse>> {
    // Convert amount string to number for API
    const numericAmount = parseFloat(expenseData.amount);
    
    if (isNaN(numericAmount) || numericAmount <= 0) {
      return {
        success: false,
        error: 'Invalid amount provided',
      };
    }

    const payload = {
      ...expenseData,
      amount: numericAmount,
    };

    return this.makeRequest<ExpenseSubmissionResponse>('POST', '/expenses', payload);
  }

  /**
   * Get all expenses for a user
   */
  async getExpenses(): Promise<ApiResponse<Expense[]>> {
    return this.makeRequest<Expense[]>('GET', '/expenses');
  }

  /**
   * Get expenses by date range
   */
  async getExpensesByDateRange(
    startDate: string,
    endDate: string
  ): Promise<ApiResponse<ExpenseSubmissionResponse[]>> {
    return this.makeRequest<ExpenseSubmissionResponse[]>(
      'GET',
      `/expenses?startDate=${startDate}&endDate=${endDate}`
    );
  }

  /**
   * Update an existing expense
   */
  async updateExpense(
    id: string,
    expenseData: Partial<ExpenseData>
  ): Promise<ApiResponse<ExpenseSubmissionResponse>> {
    return this.makeRequest<ExpenseSubmissionResponse>('PUT', `/expenses/${id}`, expenseData);
  }

  /**
   * Delete an expense
   */
  async deleteExpense(id: string): Promise<ApiResponse<void>> {
    return this.makeRequest<void>('DELETE', `/expenses/${id}`);
  }

  /**
   * Get expense categories
   */
  async getCategories(): Promise<ApiResponse<string[]>> {
    return this.makeRequest<string[]>('GET', '/categories');
  }

  /**
   * Set API key dynamically
   */
  setApiKey(apiKey: string): void {
    this.axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${apiKey}`;
  }

  /**
   * Remove API key
   */
  removeApiKey(): void {
    delete this.axiosInstance.defaults.headers.common['Authorization'];
  }

  /**
   * Update base URL dynamically
   */
  setBaseURL(baseURL: string): void {
    this.axiosInstance.defaults.baseURL = baseURL;
  }

  /**
   * Get current base URL
   */
  getBaseURL(): string | undefined {
    return this.axiosInstance.defaults.baseURL;
  }
}

// Export a singleton instance
export const apiService = new ApiService();

// Export the class for testing purposes
export { ApiService };

import { Expense } from '../services/api';

export interface ProcessedExpense {
  id: string;
  type: 'expense' | 'income';
  amount: number;
  note: string;
  category: string;
  date: Date;
  time: string;
  formattedDate: string;
  formattedTime: string;
}

export interface CategorySummary {
  name: string;
  amount: number;
  percentage: number;
  color: string;
}

export interface DashboardSummary {
  totalExpenses: number;
  totalIncome: number;
  netBalance: number;
  categoryBreakdown: CategorySummary[];
  recentTransactions: ProcessedExpense[];
}

export const processExpenses = (expenses: Expense[]): ProcessedExpense[] => {
  return expenses.map(expense => {
    const date = new Date(expense.date);
    
    // Format date for display
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    let formattedDate: string;
    if (date.toDateString() === today.toDateString()) {
      formattedDate = 'Today, ' + date.getDate() + ' ' + monthNames[date.getMonth()];
    } else if (date.toDateString() === yesterday.toDateString()) {
      formattedDate = 'Yesterday, ' + date.getDate() + ' ' + monthNames[date.getMonth()];
    } else {
      formattedDate = date.getDate() + ' ' + monthNames[date.getMonth()] + ', ' + date.getFullYear();
    }
    
    // Format time for display
    const period = date.getHours() >= 12 ? 'PM' : 'AM';
    const displayHour = date.getHours() % 12 || 12;
    const displayMinute = date.getMinutes().toString().padStart(2, '0');
    const formattedTime = `${displayHour}:${displayMinute}${period}`;
    
    return {
      id: expense._id,
      type: expense.type,
      amount: expense.amount,
      note: expense.note,
      category: expense.category,
      date,
      time: formattedTime,
      formattedDate,
      formattedTime,
    };
  });
};

export const getDashboardSummary = (expenses: Expense[]): DashboardSummary => {
  const processedExpenses = processExpenses(expenses);
  
  // Calculate totals
  const totalExpenses = processedExpenses
    .filter(expense => expense.type === 'expense')
    .reduce((sum, expense) => sum + expense.amount, 0);
    
  const totalIncome = processedExpenses
    .filter(expense => expense.type === 'income')
    .reduce((sum, expense) => sum + expense.amount, 0);
    
  const netBalance = totalIncome - totalExpenses;
  
  // Calculate category breakdown
  const categoryMap = new Map<string, number>();
  processedExpenses
    .filter(expense => expense.type === 'expense')
    .forEach(expense => {
      const current = categoryMap.get(expense.category) || 0;
      categoryMap.set(expense.category, current + expense.amount);
    });
  
  const categoryBreakdown: CategorySummary[] = Array.from(categoryMap.entries()).map(([name, amount]) => ({
    name,
    amount,
    percentage: totalExpenses > 0 ? (amount / totalExpenses) * 100 : 0,
    color: getCategoryColor(name),
  }));
  
  // Sort by amount descending
  categoryBreakdown.sort((a, b) => b.amount - a.amount);
  
  // Get recent transactions (last 10, sorted by date descending)
  const recentTransactions = processedExpenses
    .sort((a, b) => b.date.getTime() - a.date.getTime())
    .slice(0, 10);
  
  return {
    totalExpenses,
    totalIncome,
    netBalance,
    categoryBreakdown,
    recentTransactions,
  };
};

const getCategoryColor = (category: string): string => {
  const colorMap: { [key: string]: string } = {
    'Food': 'bg-orange-500',
    'Transport': 'bg-blue-500',
    'Entertainment': 'bg-purple-500',
    'Shopping': 'bg-green-500',
    'Subscriptions': 'bg-red-500',
    'Healthcare': 'bg-pink-500',
    'Education': 'bg-indigo-500',
    'Travel': 'bg-yellow-500',
    'Other': 'bg-gray-500',
  };
  
  return colorMap[category] || 'bg-gray-500';
};

export const getCategoryIcon = (category: string): string => {
  const iconMap: { [key: string]: string } = {
    'Food': '🍔',
    'Transport': '🚊',
    'Entertainment': '🎬',
    'Shopping': '🛍️',
    'Subscriptions': '📱',
    'Healthcare': '🏥',
    'Education': '📚',
    'Travel': '✈️',
    'Other': '📦',
  };
  
  return iconMap[category] || '📦';
};

export const groupExpensesByDate = (expenses: ProcessedExpense[]): { [key: string]: ProcessedExpense[] } => {
  const grouped: { [key: string]: ProcessedExpense[] } = {};
  
  expenses.forEach(expense => {
    const dateKey = expense.date.toDateString();
    if (!grouped[dateKey]) {
      grouped[dateKey] = [];
    }
    grouped[dateKey].push(expense);
  });
  
  return grouped;
};

import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/navigation';
import { useInitialNavigation } from '../hooks/useInitialNavigation';
import { useExpenses } from '../hooks/useExpenses';
import { getDashboardSummary, groupExpensesByDate, getCategoryIcon } from '../utils/expenseUtils';

type DashboardScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Dashboard'>;

const DashboardScreen: React.FC = () => {
  const navigation = useNavigation<DashboardScreenNavigationProp>();
  const { expenses, loading, error, refetch } = useExpenses();
  
  // Navigate to ExpenseInput on first load
  useInitialNavigation();

  const handleAddExpense = () => {
    navigation.navigate('ExpenseInput');
  };

  const summary = getDashboardSummary(expenses);
  const groupedExpenses = groupExpensesByDate(summary.recentTransactions);
  return (
    <SafeAreaView className="flex-1 bg-black">
      <StatusBar barStyle="light-content" backgroundColor="#000" />
      
      {/* Header */}
      <View className="flex-row justify-between items-center px-4 py-2 mb-6">
        <TouchableOpacity className="w-8 h-8 items-center justify-center">
          <Text className="text-white text-lg">🔍</Text>
        </TouchableOpacity>
        
        <TouchableOpacity className="w-8 h-8 items-center justify-center">
          <Text className="text-white text-lg">▼</Text>
        </TouchableOpacity>
      </View>

      {/* Net Total Section */}
      <View className="items-center mb-8">
        <View className="flex-row items-center mb-2">
          <Text className="text-gray-400 text-sm mr-2">Net total</Text>
          <View className="bg-gray-600 px-3 py-1 rounded-full">
            <Text className="text-gray-300 text-xs">this week</Text>
          </View>
        </View>
        <Text className={`text-5xl font-light ${summary.netBalance >= 0 ? 'text-green-400' : 'text-red-400'}`}>
          {summary.netBalance >= 0 ? '+' : ''}₹{summary.netBalance.toFixed(2)}
        </Text>
      </View>

      {/* Loading State */}
      {loading && (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#ffffff" />
          <Text className="text-white text-lg mt-4">Loading expenses...</Text>
        </View>
      )}

      {/* Error State */}
      {error && (
        <View className="flex-1 items-center justify-center px-4">
          <Text className="text-red-400 text-lg text-center mb-4">{error}</Text>
          <TouchableOpacity 
            onPress={refetch}
            className="bg-blue-600 px-6 py-3 rounded-xl"
          >
            <Text className="text-white font-semibold">Retry</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Transactions List */}
      {!loading && !error && (
        <ScrollView className="flex-1 px-4">
          <View className="space-y-6">
            {Object.entries(groupedExpenses).map(([dateString, dayExpenses]) => {
              const date = new Date(dateString);
              const dayName = date.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase();
              const dayNumber = date.getDate();
              const monthName = date.toLocaleDateString('en-US', { month: 'short' }).toUpperCase();
              
              const dayTotal = dayExpenses.reduce((sum, expense) => {
                return sum + (expense.type === 'expense' ? -expense.amount : expense.amount);
              }, 0);
              
              return (
                <View key={dateString}>
                  <View className="flex-row justify-between items-center mb-3">
                    <Text className="text-gray-400 text-sm font-medium">
                      {dayName}, {dayNumber} {monthName}
                    </Text>
                    <Text className={`text-sm font-medium ${dayTotal >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {dayTotal >= 0 ? '+' : ''}₹{Math.abs(dayTotal).toFixed(2)}
                    </Text>
                  </View>
                  
                  <View className="space-y-3 gap-3">
                    {dayExpenses.map((expense) => (
                      <View key={expense.id} className="bg-zinc-900 rounded-xl p-4 flex-row items-center">
                        <View className="w-10 h-10 bg-orange-500 rounded-full items-center justify-center mr-3">
                          <Text className="text-white text-lg">{getCategoryIcon(expense.category)}</Text>
                        </View>
                        <View className="flex-1">
                          <Text className="text-white text-base font-medium">{expense.category}</Text>
                          <Text className="text-gray-400 text-sm">{expense.formattedTime}</Text>
                        </View>
                        <Text className={`text-lg font-bold ${expense.type === 'income' ? 'text-green-400' : 'text-red-400'}`}>
                          {expense.type === 'income' ? '+' : '-'}₹{expense.amount.toFixed(2)}
                        </Text>
                      </View>
                    ))}
                  </View>
                </View>
              );
            })}
            
            {Object.keys(groupedExpenses).length === 0 && (
              <View className="items-center justify-center py-12">
                <Text className="text-gray-400 text-lg mb-2">No expenses yet</Text>
                <Text className="text-gray-500 text-sm text-center">
                  Tap the + button to add your first expense
                </Text>
              </View>
            )}
          </View>
        </ScrollView>
      )}

      {/* Bottom Navigation */}
      <View className="flex-row items-center justify-between px-6 py-4 bg-zinc-900/50">
        <TouchableOpacity className="w-8 h-8 items-center justify-center">
          <Text className="text-gray-400 text-lg">☰</Text>
        </TouchableOpacity>
        
        <TouchableOpacity className="w-8 h-8 items-center justify-center">
          <Text className="text-gray-400 text-lg">📊</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          onPress={handleAddExpense}
          className="w-14 h-14 bg-white rounded-2xl items-center justify-center"
        >
          <Text className="text-black text-2xl font-bold">+</Text>
        </TouchableOpacity>
        
        <TouchableOpacity className="w-8 h-8 items-center justify-center">
          <Text className="text-gray-400 text-lg">⊞</Text>
        </TouchableOpacity>
        
        <TouchableOpacity className="w-8 h-8 items-center justify-center">
          <Text className="text-gray-400 text-lg">⚙️</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default DashboardScreen;

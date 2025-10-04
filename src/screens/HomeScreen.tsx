import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { CategorySelection } from '../components/CategorySelector';
import { DatePicker } from '../components/DatePicker';
import { NoteInput } from '../components/NoteInput';
import { NumericKeypad } from '../components/NumericKeypad';
import { useExpenseSubmission } from '../hooks/useExpenseSubmission';
import { useExpenseContext } from '../context/ExpenseContext';
import { getCategoryIcon } from '../utils/expenseUtils';
import { RootStackParamList } from '../types/navigation';

type ExpenseInputScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ExpenseInput'>;

const ExpenseInputScreen: React.FC = () => {
  const navigation = useNavigation<ExpenseInputScreenNavigationProp>();
  const [activeTab, setActiveTab] = useState<'expense' | 'income'>('expense');
  const [amount, setAmount] = useState('0');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [note, setNote] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedTimestamp, setSelectedTimestamp] = useState<number>(Date.now());
  const [pinnedCategories, setPinnedCategories] = useState<string[]>([]);
  
  // Fallback in-memory storage for when AsyncStorage fails
  const [fallbackStorage, setFallbackStorage] = useState<string[]>([]);

  // Context for refreshing dashboard
  const { triggerRefresh } = useExpenseContext();
  
  // API submission hook
  const { isSubmitting, error, success, submitExpense, clearError, clearSuccess } = useExpenseSubmission({
    onSuccess: () => {
      triggerRefresh(); // Refresh dashboard when expense is added
    }
  });

  // Initialize with current date and time
  useEffect(() => {
    const now = new Date();
    const formatCurrentDate = (date: Date) => {
      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);
      
      const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      
      if (date.toDateString() === today.toDateString()) {
        return 'Today, ' + date.getDate() + ' ' + monthNames[date.getMonth()];
      } else if (date.toDateString() === yesterday.toDateString()) {
        return 'Yesterday, ' + date.getDate() + ' ' + monthNames[date.getMonth()];
      } else {
        return date.getDate() + ' ' + monthNames[date.getMonth()] + ', ' + date.getFullYear();
      }
    };

    const formatCurrentTime = (date: Date) => {
      const period = date.getHours() >= 12 ? 'PM' : 'AM';
      const displayHour = date.getHours() % 12 || 12;
      const displayMinute = date.getMinutes().toString().padStart(2, '0');
      return `${displayHour}:${displayMinute}${period}`;
    };

    setSelectedDate(formatCurrentDate(now));
    setSelectedTime(formatCurrentTime(now));
    setSelectedTimestamp(now.getTime());
  }, []);

  // Load pinned categories on mount
  useEffect(() => {
    loadPinnedCategories();
  }, []);


  const handleNumberPress = (num: string) => {
    if (amount === '0') {
      setAmount(num);
    } else {
      setAmount(amount + num);
    }
  };

  const handleDecimalPress = () => {
    if (!amount.includes('.')) {
      setAmount(amount + '.');
    }
  };

  const handleBackspace = () => {
    if (amount.length === 1) {
      setAmount('0');
    } else {
      setAmount(amount.slice(0, -1));
    }
  };

  const handleSubmit = async () => {
    // Validate required fields
    if (amount === '0' || parseFloat(amount) <= 0) {
      Alert.alert('Invalid Amount', 'Please enter a valid amount greater than 0.');
      return;
    }

    if (!selectedCategory) {
      Alert.alert('Category Required', 'Please select a category for this expense.');
      return;
    }

    const expenseData = {
      type: activeTab,
      amount,
      note,
      date: selectedTimestamp,
      category: selectedCategory,
    };
    
    try {
      const response = await submitExpense(expenseData);
      
      if (response.success) {
        // Reset form on successful submission
        setAmount('0');
        setNote('');
        setSelectedCategory('');
        Keyboard.dismiss();
        
        // Navigate back to dashboard without showing success alert
        navigation.goBack();
      } else {
        // Error handling is done in the hook, but we can show additional feedback
        Alert.alert(
          'Submission Failed', 
          response.error || 'Failed to submit expense. Please try again.',
          [{ text: 'OK', onPress: clearError }]
        );
      }
    } catch (err) {
      console.error('Submit error:', err);
      Alert.alert(
        'Error', 
        'An unexpected error occurred. Please try again.',
        [{ text: 'OK', onPress: clearError }]
      );
    }
  };

  const handleSelectDate = (date: string, time: string) => {
    setSelectedDate(date);
    setSelectedTime(time);
    
    // Calculate timestamp from the selected date and time
    // Parse the time string to get hour and minute
    const timeMatch = time.match(/(\d+):(\d+)(AM|PM)/i);
    if (timeMatch) {
      let hour = parseInt(timeMatch[1]);
      const minute = parseInt(timeMatch[2]);
      const period = timeMatch[3].toUpperCase();
      
      // Convert to 24-hour format
      if (period === 'PM' && hour !== 12) {
        hour += 12;
      } else if (period === 'AM' && hour === 12) {
        hour = 0;
      }
      
      // Parse the date string to get the actual date
      let actualDate: Date;
      if (date.startsWith('Today')) {
        actualDate = new Date();
      } else if (date.startsWith('Yesterday')) {
        actualDate = new Date();
        actualDate.setDate(actualDate.getDate() - 1);
      } else {
        // Parse date like "15 Jan, 2024" or "15 Jan"
        const dateMatch = date.match(/(\d+)\s+(\w+)(?:,\s+(\d+))?/);
        if (dateMatch) {
          const day = parseInt(dateMatch[1]);
          const monthName = dateMatch[2];
          const year = dateMatch[3] ? parseInt(dateMatch[3]) : new Date().getFullYear();
          
          const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
            'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
          const monthIndex = monthNames.indexOf(monthName);
          
          if (monthIndex !== -1) {
            actualDate = new Date(year, monthIndex, day);
          } else {
            actualDate = new Date();
          }
        } else {
          actualDate = new Date();
        }
      }
      
      // Set the time on the date
      actualDate.setHours(hour, minute, 0, 0);
      setSelectedTimestamp(actualDate.getTime());
    }
    
    setShowDatePicker(false);
  };

  const handleSelectCategory = (category: string) => {
    setSelectedCategory(category);
  };

  const handlePinCategory = (category: string) => {
    setPinnedCategories(prev => {
      const newPinnedCategories = prev.includes(category)
        ? prev.filter(cat => cat !== category)
        : [...prev, category];
      
      // Save to storage
      savePinnedCategories(newPinnedCategories);
      
      return newPinnedCategories;
    });
  };

  const handlePinnedCategorySelect = (category: string) => {
    setSelectedCategory(category);
  };

  // Load pinned categories from storage
  const loadPinnedCategories = async () => {
    try {
      const saved = await AsyncStorage.getItem('pinnedCategories');
      if (saved) {
        const categories = JSON.parse(saved);
        setPinnedCategories(categories);
        setFallbackStorage(categories);
        console.log('Loaded pinned categories from AsyncStorage:', categories);
      } else {
        // If no saved data, use fallback storage
        setPinnedCategories(fallbackStorage);
        console.log('Using fallback storage:', fallbackStorage);
      }
    } catch (error) {
      console.error('Error loading pinned categories from AsyncStorage:', error);
      // Use fallback storage if AsyncStorage fails
      setPinnedCategories(fallbackStorage);
      console.log('Using fallback storage due to AsyncStorage error:', fallbackStorage);
    }
  };

  // Save pinned categories to storage
  const savePinnedCategories = async (categories: string[]) => {
    try {
      await AsyncStorage.setItem('pinnedCategories', JSON.stringify(categories));
      setFallbackStorage(categories);
      console.log('Saved pinned categories to AsyncStorage:', categories);
    } catch (error) {
      console.error('Error saving pinned categories to AsyncStorage:', error);
      // Use fallback storage if AsyncStorage fails
      setFallbackStorage(categories);
      console.log('Saved to fallback storage:', categories);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-black">
      <StatusBar barStyle="light-content" backgroundColor="#000" />

      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="flex-1 px-4 pt-2">
          {/* Header with close and refresh buttons */}
          <View className="flex-row justify-between items-center mb-6">
            <TouchableOpacity 
              onPress={() => navigation.goBack()}
              className="w-12 h-12 rounded-full bg-zinc-900 items-center justify-center"
            >
              <Text className="text-white text-xl">×</Text>
            </TouchableOpacity>

            {/* Tab Switcher: Disabled for now */}
            {/* <View className="flex-row bg-zinc-900 rounded-full p-1">
              <TouchableOpacity
                onPress={() => setActiveTab('expense')}
                className={`px-6 py-2 rounded-full ${activeTab === 'expense' ? 'bg-white' : 'bg-transparent'
                  }`}
              >
                <Text
                  className={`font-semibold ${activeTab === 'expense' ? 'text-black' : 'text-gray-400'
                    }`}
                >
                  Expense
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setActiveTab('income')}
                className={`px-6 py-2 rounded-full ${activeTab === 'income' ? 'bg-white' : 'bg-transparent'
                  }`}
              >
                <Text
                  className={`font-semibold ${activeTab === 'income' ? 'text-black' : 'text-gray-400'
                    }`}
                >
                  Income
                </Text>
              </TouchableOpacity>
            </View> */}

            <TouchableOpacity className="w-12 h-12 rounded-full bg-zinc-900 items-center justify-center">
              <Text className="text-white text-lg">⟳</Text>
            </TouchableOpacity>
          </View>

          {/* Amount Display */}
          <View className="items-center justify-center flex-1">
            <View className="flex-row items-center">
              <Text className="text-white text-7xl font-light mr-2">₹</Text>
              <Text className="text-white text-7xl font-light">{amount}</Text>
              {amount !== '0' && (
                <TouchableOpacity
                  onPress={handleBackspace}
                  className="ml-4 w-12 h-12 rounded-full bg-zinc-800 items-center justify-center"
                >
                  <Text className="text-white text-lg">×</Text>
                </TouchableOpacity>
              )}
            </View>

            {/* Note Input Component */}
            <NoteInput
              note={note}
              onChangeNote={setNote}
              amount={amount}
            />
          </View>

          {/* Pinned Categories Row */}
          {pinnedCategories.length > 0 && (
            <View className="mb-4">
              <Text className="text-gray-400 text-sm mb-3 px-4">Pinned</Text>
              <ScrollView 
                horizontal 
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 16 }}
                className="mb-2"
              >
                <View className="flex-row gap-4">
                  {pinnedCategories.map((category) => (
                    <View key={category} className="items-center">
                      <TouchableOpacity
                        onPress={() => handlePinnedCategorySelect(category)}
                        className={`w-16 h-16 rounded-full items-center justify-center ${
                          selectedCategory === category ? 'bg-blue-500' : 'bg-zinc-800'
                        }`}
                      >
                        <Text className="text-white text-2xl">
                          {getCategoryIcon(category)}
                        </Text>
                      </TouchableOpacity>
                      <Text className="text-white text-xs text-center mt-2">
                        {category}
                      </Text>
                    </View>
                  ))}
                </View>
              </ScrollView>
            </View>
          )}

            {/* Date and Category Selectors */}
            <View className="flex-row mb-4 gap-3">
              <DatePicker
                selectedDate={selectedDate}
                selectedTime={selectedTime}
                visible={showDatePicker}
                onPress={() => setShowDatePicker(true)}
                onClose={() => setShowDatePicker(false)}
                onSelectDate={handleSelectDate}
              />
              <CategorySelection
                selectedCategory={selectedCategory}
                visible={showCategoryModal}
                onPress={() => setShowCategoryModal(true)}
                onClose={() => setShowCategoryModal(false)}
                onSelectCategory={handleSelectCategory}
                pinnedCategories={pinnedCategories}
                onPinCategory={handlePinCategory}
              />
            </View>

            {/* Error Feedback */}
            {error && (
              <View className="mb-4 p-3 bg-red-900/20 border border-red-500/30 rounded-lg">
                <Text className="text-red-400 text-center text-sm">
                  {error}
                </Text>
                <TouchableOpacity 
                  onPress={clearError}
                  className="mt-2"
                >
                  <Text className="text-red-400 text-center text-xs underline">
                    Dismiss
                  </Text>
                </TouchableOpacity>
              </View>
            )}

            {/* Numeric Keypad Component */}
            <NumericKeypad
              onNumberPress={handleNumberPress}
              onDecimalPress={handleDecimalPress}
              onSubmit={handleSubmit}
              isSubmitting={isSubmitting}
            />
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default ExpenseInputScreen;
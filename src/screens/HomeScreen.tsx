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
} from 'react-native';
import { CategorySelection } from '../components/CategorySelector';
import { DatePicker } from '../components/DatePicker';
import { NoteInput } from '../components/NoteInput';
import { NumericKeypad } from '../components/NumericKeypad';

const ExpenseTrackerHome = () => {
  const [activeTab, setActiveTab] = useState<'expense' | 'income'>('expense');
  const [amount, setAmount] = useState('0');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [note, setNote] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

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

  const handleSubmit = () => {
    console.log({
      type: activeTab,
      amount,
      note,
      date: selectedDate,
      time: selectedTime,
      category: selectedCategory,
    });
    // Reset form
    setAmount('0');
    setNote('');
    Keyboard.dismiss();
  };

  const handleSelectDate = (date: string, time: string) => {
    setSelectedDate(date);
    setSelectedTime(time);
    setShowDatePicker(false);
  };

  const handleSelectCategory = (category: string) => {
    setSelectedCategory(category);
  };

  return (
    <SafeAreaView className="flex-1 bg-black">
      <StatusBar barStyle="light-content" backgroundColor="#000" />

      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="flex-1 px-4 pt-2">
          {/* Header with close and refresh buttons */}
          <View className="flex-row justify-between items-center mb-6">
            <TouchableOpacity className="w-12 h-12 rounded-full bg-zinc-900 items-center justify-center">
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
              />
            </View>

            {/* Numeric Keypad Component */}
            <NumericKeypad
              onNumberPress={handleNumberPress}
              onDecimalPress={handleDecimalPress}
              onSubmit={handleSubmit}
            />
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default ExpenseTrackerHome;
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/navigation';
import { useInitialNavigation } from '../hooks/useInitialNavigation';

type DashboardScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Dashboard'>;

const DashboardScreen: React.FC = () => {
  const navigation = useNavigation<DashboardScreenNavigationProp>();
  
  // Navigate to ExpenseInput on first load
  useInitialNavigation();

  const handleAddExpense = () => {
    navigation.navigate('ExpenseInput');
  };
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
        <Text className="text-white text-5xl font-light">+₹0.00</Text>
      </View>

      {/* Transactions List */}
      <ScrollView className="flex-1 px-4">
        <View className="space-y-6">
          {/* FRI, 22 AUG */}
          <View>
            <View className="flex-row justify-between items-center mb-3">
              <Text className="text-gray-400 text-sm font-medium">FRI, 22 AUG</Text>
              <Text className="text-white text-sm font-medium">-₹267.00</Text>
            </View>
            <View className="bg-zinc-900 rounded-xl p-4 flex-row items-center">
              <View className="w-10 h-10 bg-orange-500 rounded-full items-center justify-center mr-3">
                <Text className="text-white text-lg">🍔</Text>
              </View>
              <View className="flex-1">
                <Text className="text-white text-base font-medium">Food</Text>
                <Text className="text-gray-400 text-sm">4:17 AM</Text>
              </View>
              <Text className="text-red-400 text-lg font-bold">-₹267.00</Text>
            </View>
          </View>

          {/* THU, 21 AUG */}
          <View>
            <View className="flex-row justify-between items-center mb-3">
              <Text className="text-gray-400 text-sm font-medium">THU, 21 AUG</Text>
              <Text className="text-white text-sm font-medium">-₹220.00</Text>
            </View>
            <View className="bg-zinc-900 rounded-xl p-4 flex-row items-center">
              <View className="w-10 h-10 bg-orange-500 rounded-full items-center justify-center mr-3">
                <Text className="text-white text-lg">🍔</Text>
              </View>
              <View className="flex-1">
                <Text className="text-white text-base font-medium">Food</Text>
                <Text className="text-gray-400 text-sm">4:55 PM</Text>
              </View>
              <Text className="text-red-400 text-lg font-bold">-₹220.00</Text>
            </View>
          </View>

          {/* TUE, 19 AUG */}
          <View>
            <View className="flex-row justify-between items-center mb-3">
              <Text className="text-gray-400 text-sm font-medium">TUE, 19 AUG</Text>
              <Text className="text-white text-sm font-medium">-₹752.00</Text>
            </View>
            <View className="space-y-3">
              <View className="bg-zinc-900 rounded-xl p-4 flex-row items-center">
                <View className="w-10 h-10 bg-orange-500 rounded-full items-center justify-center mr-3">
                  <Text className="text-white text-lg">🍔</Text>
                </View>
                <View className="flex-1">
                  <Text className="text-white text-base font-medium">Food</Text>
                  <Text className="text-gray-400 text-sm">11:07 PM</Text>
                </View>
                <Text className="text-red-400 text-lg font-bold">-₹390.00</Text>
              </View>
              
              <View className="bg-zinc-900 rounded-xl p-4 flex-row items-center">
                <View className="w-10 h-10 bg-blue-500 rounded-full items-center justify-center mr-3">
                  <Text className="text-white text-lg">🚊</Text>
                </View>
                <View className="flex-1">
                  <Text className="text-white text-base font-medium">Transport</Text>
                  <Text className="text-gray-400 text-sm">5:19 PM</Text>
                </View>
                <Text className="text-red-400 text-lg font-bold">-₹182.00</Text>
              </View>
              
              <View className="bg-zinc-900 rounded-xl p-4 flex-row items-center">
                <View className="w-10 h-10 bg-blue-500 rounded-full items-center justify-center mr-3">
                  <Text className="text-white text-lg">🚊</Text>
                </View>
                <View className="flex-1">
                  <Text className="text-white text-base font-medium">Transport</Text>
                  <Text className="text-gray-400 text-sm">11:29 AM</Text>
                </View>
                <Text className="text-red-400 text-lg font-bold">-₹180.00</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

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

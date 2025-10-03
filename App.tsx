/**
 * Pebble - React Native App
 * 
 * @format
 */
import "./global.css";
import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'react-native';

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: '#f8fafc' }}>
        <StatusBar barStyle="dark-content" backgroundColor="#f8fafc" />
        <ScrollView className="flex-1 bg-gray-50">
          <View className="p-6">
            {/* Welcome Header */}
            <View className="bg-white rounded-lg p-6 mb-6 shadow-sm">
              <Text className="text-3xl font-bold text-blue-600 mb-2">
                Welcome to Pebble
              </Text>
              <Text className="text-gray-600 text-lg">
                Your React Native app with Tailwind CSS
              </Text>
            </View>

            {/* Features Section */}
            <View className="bg-white rounded-lg p-6 shadow-sm">
              <Text className="text-xl font-bold text-gray-800 mb-4">
                Features
              </Text>
              <View className="space-y-3">
                <View className="flex-row items-center">
                  <View className="w-2 h-2 bg-green-500 rounded-full mr-3" />
                  <Text className="text-gray-700">React Native</Text>
                </View>
                <View className="flex-row items-center">
                  <View className="w-2 h-2 bg-green-500 rounded-full mr-3" />
                  <Text className="text-gray-700">Tailwind CSS styling</Text>
                </View>
                <View className="flex-row items-center">
                  <View className="w-2 h-2 bg-green-500 rounded-full mr-3" />
                  <Text className="text-gray-700">TypeScript support</Text>
                </View>
                <View className="flex-row items-center">
                  <View className="w-2 h-2 bg-green-500 rounded-full mr-3" />
                  <Text className="text-gray-700">Safe Area handling</Text>
                </View>
              </View>
            </View>

            {/* Action Buttons */}
            <View className="mt-6 space-y-4">
              <TouchableOpacity className="bg-blue-600 rounded-lg p-4">
                <Text className="text-white text-center font-semibold text-lg">
                  Get Started
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity className="bg-white border border-gray-300 rounded-lg p-4">
                <Text className="text-gray-700 text-center font-semibold">
                  Learn More
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

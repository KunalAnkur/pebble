import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Screen } from '../types/navigation';

interface HomeScreenProps {
  onNavigate: (screen: Screen) => void;
}

export default function HomeScreen({ onNavigate }: HomeScreenProps) {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f8fafc' }}>
      <ScrollView className="flex-1 bg-gray-50">
        <View className="p-6">
          {/* Welcome Header */}
          <View className="bg-white rounded-lg p-6 mb-6 shadow-sm">
            <Text className="text-3xl font-bold text-blue-600 mb-2">
              Welcome to Pebble
            </Text>
            <Text className="text-gray-600 text-lg">
              Your React Native app with navigation
            </Text>
          </View>

          {/* Features Section */}
          <View className="bg-white rounded-lg p-6 shadow-sm mb-6">
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
              <View className="flex-row items-center">
                <View className="w-2 h-2 bg-green-500 rounded-full mr-3" />
                <Text className="text-gray-700">Simple Routing</Text>
              </View>
            </View>
          </View>

            {/* Navigation Cards */}
            <View className="space-y-4">
              <TouchableOpacity 
                onPress={() => onNavigate('Profile')}
                className="bg-white rounded-lg p-4 shadow-sm border border-gray-200"
              >
                <Text className="text-lg font-semibold text-gray-800 mb-1">
                  Profile
                </Text>
                <Text className="text-gray-600">
                  View and edit your profile information
                </Text>
              </TouchableOpacity>

              <TouchableOpacity 
                onPress={() => onNavigate('Settings')}
                className="bg-white rounded-lg p-4 shadow-sm border border-gray-200"
              >
                <Text className="text-lg font-semibold text-gray-800 mb-1">
                  Settings
                </Text>
                <Text className="text-gray-600">
                  Configure your app preferences
                </Text>
              </TouchableOpacity>
            </View>

          {/* Quick Stats */}
          <View className="mt-8 bg-white rounded-lg p-6 shadow-sm">
            <Text className="text-xl font-bold text-gray-800 mb-4">
              Quick Stats
            </Text>
            <View className="flex-row justify-around">
                <View className="items-center">
                  <Text className="text-2xl font-bold text-blue-600">3</Text>
                  <Text className="text-gray-600 text-sm">Screens</Text>
                </View>
              <View className="items-center">
                <Text className="text-2xl font-bold text-green-600">100%</Text>
                <Text className="text-gray-600 text-sm">Ready</Text>
              </View>
              <View className="items-center">
                <Text className="text-2xl font-bold text-purple-600">∞</Text>
                <Text className="text-gray-600 text-sm">Potential</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

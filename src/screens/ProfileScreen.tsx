import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Screen } from '../types/navigation';

interface ProfileScreenProps {
  onNavigate: (screen: Screen) => void;
}

export default function ProfileScreen({ onNavigate }: ProfileScreenProps) {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f8fafc' }}>
      <ScrollView className="flex-1 bg-gray-50">
        <View className="p-6">
          {/* Profile Header */}
          <View className="bg-white rounded-lg p-6 mb-6 shadow-sm">
            <View className="items-center">
              <View className="w-24 h-24 bg-blue-100 rounded-full items-center justify-center mb-4">
                <Text className="text-3xl font-bold text-blue-600">JD</Text>
              </View>
              <Text className="text-2xl font-bold text-gray-800 mb-1">
                John Doe
              </Text>
              <Text className="text-gray-600 mb-4">
                john.doe@example.com
              </Text>
              <TouchableOpacity className="bg-blue-600 px-6 py-2 rounded-full">
                <Text className="text-white font-semibold">Edit Profile</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Profile Stats */}
          <View className="bg-white rounded-lg p-4 mb-6 shadow-sm">
            <Text className="text-lg font-semibold text-gray-800 mb-4">
              Statistics
            </Text>
            <View className="flex-row justify-around">
              <View className="items-center">
                <Text className="text-2xl font-bold text-blue-600">24</Text>
                <Text className="text-gray-600 text-sm">Projects</Text>
              </View>
              <View className="items-center">
                <Text className="text-2xl font-bold text-green-600">156</Text>
                <Text className="text-gray-600 text-sm">Tasks</Text>
              </View>
              <View className="items-center">
                <Text className="text-2xl font-bold text-purple-600">89%</Text>
                <Text className="text-gray-600 text-sm">Complete</Text>
              </View>
            </View>
          </View>

          {/* Navigation */}
          <View className="space-y-4">
            <TouchableOpacity 
              onPress={() => onNavigate('Home')}
              className="bg-blue-600 rounded-lg p-4"
            >
              <Text className="text-white text-center font-semibold">
                Back to Home
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              onPress={() => onNavigate('Settings')}
              className="bg-white border border-gray-300 rounded-lg p-4"
            >
              <Text className="text-gray-700 text-center font-semibold">
                Go to Settings
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

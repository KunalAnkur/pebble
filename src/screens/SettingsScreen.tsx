import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Screen } from '../types/navigation';

interface SettingsScreenProps {
  onNavigate: (screen: Screen) => void;
}

export default function SettingsScreen({ onNavigate }: SettingsScreenProps) {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [biometric, setBiometric] = useState(false);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f8fafc' }}>
      <ScrollView className="flex-1 bg-gray-50">
        <View className="p-6">
          {/* Settings Header */}
          <View className="bg-white rounded-lg p-6 mb-6 shadow-sm">
            <Text className="text-2xl font-bold text-gray-800 mb-2">
              Settings
            </Text>
            <Text className="text-gray-600">
              Customize your app experience
            </Text>
          </View>

          {/* General Settings */}
          <View className="bg-white rounded-lg p-4 mb-6 shadow-sm">
            <Text className="text-lg font-semibold text-gray-800 mb-4">
              General
            </Text>
            
            <View className="space-y-4">
              <View className="flex-row items-center justify-between py-3 border-b border-gray-100">
                <View className="flex-1">
                  <Text className="text-gray-800 font-medium">Push Notifications</Text>
                  <Text className="text-gray-600 text-sm">Receive app notifications</Text>
                </View>
                <Switch
                  value={notifications}
                  onValueChange={setNotifications}
                  trackColor={{ false: '#e5e7eb', true: '#3b82f6' }}
                  thumbColor={notifications ? '#ffffff' : '#f3f4f6'}
                />
              </View>

              <View className="flex-row items-center justify-between py-3 border-b border-gray-100">
                <View className="flex-1">
                  <Text className="text-gray-800 font-medium">Dark Mode</Text>
                  <Text className="text-gray-600 text-sm">Switch to dark theme</Text>
                </View>
                <Switch
                  value={darkMode}
                  onValueChange={setDarkMode}
                  trackColor={{ false: '#e5e7eb', true: '#3b82f6' }}
                  thumbColor={darkMode ? '#ffffff' : '#f3f4f6'}
                />
              </View>

              <View className="flex-row items-center justify-between py-3">
                <View className="flex-1">
                  <Text className="text-gray-800 font-medium">Biometric Login</Text>
                  <Text className="text-gray-600 text-sm">Use fingerprint or face ID</Text>
                </View>
                <Switch
                  value={biometric}
                  onValueChange={setBiometric}
                  trackColor={{ false: '#e5e7eb', true: '#3b82f6' }}
                  thumbColor={biometric ? '#ffffff' : '#f3f4f6'}
                />
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
              onPress={() => onNavigate('Profile')}
              className="bg-white border border-gray-300 rounded-lg p-4"
            >
              <Text className="text-gray-700 text-center font-semibold">
                Go to Profile
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

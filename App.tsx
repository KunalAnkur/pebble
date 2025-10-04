/**
 * Pebble - React Native Expense Tracker App
 * 
 * @format
 */
import 'react-native-gesture-handler';
import "./global.css";
import React, { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  return (
    <SafeAreaProvider>
      <AppNavigator />
    </SafeAreaProvider>
  );
}

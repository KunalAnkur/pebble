/**
 * Pebble - React Native Expense Tracker App
 * 
 * @format
 */
import "./global.css";
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import ExpenseTrackerHome from './src/screens/HomeScreen';

export default function App() {
  return (
    <SafeAreaProvider>
      <ExpenseTrackerHome />
    </SafeAreaProvider>
  );
}

import { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/navigation';

type NavigationProp = StackNavigationProp<RootStackParamList>;

export const useInitialNavigation = () => {
  const navigation = useNavigation<NavigationProp>();

  useEffect(() => {
    // Navigate to ExpenseInput screen on app start
    const timer = setTimeout(() => {
      navigation.navigate('ExpenseInput');
    }, 100); // Small delay to ensure navigation is ready

    return () => clearTimeout(timer);
  }, [navigation]);
};

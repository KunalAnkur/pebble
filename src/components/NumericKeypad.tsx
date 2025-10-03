// NumericKeypad.tsx
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

interface NumericKeypadProps {
  onNumberPress: (num: string) => void;
  onDecimalPress: () => void;
  onSubmit: () => void;
}

export const NumericKeypad: React.FC<NumericKeypadProps> = ({
  onNumberPress,
  onDecimalPress,
  onSubmit,
}) => {
  return (
    <View className="mb-6">
      <View className="flex-row justify-between mb-3">
        {['1', '2', '3'].map((num) => (
          <TouchableOpacity
            key={num}
            onPress={() => onNumberPress(num)}
            className="w-[30%] h-16 rounded-2xl bg-zinc-900 items-center justify-center"
          >
            <Text className="text-white text-2xl font-light">{num}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View className="flex-row justify-between mb-3">
        {['4', '5', '6'].map((num) => (
          <TouchableOpacity
            key={num}
            onPress={() => onNumberPress(num)}
            className="w-[30%] h-16 rounded-2xl bg-zinc-900 items-center justify-center"
          >
            <Text className="text-white text-2xl font-light">{num}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View className="flex-row justify-between mb-3">
        {['7', '8', '9'].map((num) => (
          <TouchableOpacity
            key={num}
            onPress={() => onNumberPress(num)}
            className="w-[30%] h-16 rounded-2xl bg-zinc-900 items-center justify-center"
          >
            <Text className="text-white text-2xl font-light">{num}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View className="flex-row justify-between">
        <TouchableOpacity
          onPress={onDecimalPress}
          className="w-[30%] h-16 rounded-2xl bg-zinc-900 items-center justify-center"
        >
          <Text className="text-white text-3xl font-light">.</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => onNumberPress('0')}
          className="w-[30%] h-16 rounded-2xl bg-zinc-900 items-center justify-center"
        >
          <Text className="text-white text-2xl font-light">0</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={onSubmit}
          className="w-[30%] h-16 rounded-2xl bg-gray-600 items-center justify-center"
        >
          <Text className="text-white text-2xl">✓</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
// CategorySelection.tsx
import React from 'react';
import { View, Text, TouchableOpacity, Modal, ScrollView } from 'react-native';

interface Category {
  id: string;
  name: string;
  emoji: string;
}

interface CategorySelectionProps {
  selectedCategory: string;
  visible: boolean;
  onPress: () => void;
  onClose: () => void;
  onSelectCategory: (category: string) => void;
  pinnedCategories?: string[];
  onPinCategory?: (category: string) => void;
}

const categories: Category[] = [
  { id: '1', name: 'Food', emoji: '🍔' },
  { id: '2', name: 'Transport', emoji: '🚗' },
  { id: '3', name: 'Rent', emoji: '🏠' },
  { id: '4', name: 'Subscriptions', emoji: '📱' },
  { id: '5', name: 'Vacation', emoji: '✈️' },
  { id: '6', name: 'Edit', emoji: '✏️' },
];

export const CategorySelection: React.FC<CategorySelectionProps> = ({
  selectedCategory,
  visible,
  onPress,
  onClose,
  onSelectCategory,
  pinnedCategories = [],
  onPinCategory,
}) => {
  return (
    <>
      <TouchableOpacity
        onPress={onPress}
        className="flex-1 flex-row items-center justify-center px-4 py-3 rounded-2xl bg-zinc-900"
      >
        <Text className="text-white mr-2">⊞</Text>
        <Text className="text-white text-sm">
          {selectedCategory || 'Category'}
        </Text>
      </TouchableOpacity>

      <Modal
        visible={visible}
        transparent
        animationType="fade"
        onRequestClose={onClose}
      >
        <TouchableOpacity
          activeOpacity={1}
          onPress={onClose}
          className="flex-1 justify-center items-center"
          style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
        >
          <View className="bg-zinc-800 rounded-2xl py-2 w-64" style={{ marginBottom: 280 }}>
            {categories.map((category, index) => {
              const isPinned = pinnedCategories.includes(category.name);
              return (
                <View key={category.id} className="flex-row items-center justify-between px-5 py-3">
                  <TouchableOpacity
                    onPress={() => {
                      onSelectCategory(category.name);
                      onClose();
                    }}
                    className="flex-row items-center flex-1"
                  >
                    <Text className="text-xl mr-3">{category.emoji}</Text>
                    <Text className="text-white text-base">{category.name}</Text>
                  </TouchableOpacity>
                  
                  {onPinCategory && (
                    <TouchableOpacity
                      onPress={() => onPinCategory(category.name)}
                      className="ml-3 p-2"
                    >
                      <Text className={`text-lg ${isPinned ? 'text-yellow-400' : 'text-gray-400'}`}>
                        {isPinned ? '📌' : '📍'}
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>
              );
            })}
          </View>
        </TouchableOpacity>
      </Modal>
    </>
  );
};
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Modal, ScrollView } from 'react-native';

interface DatePickerProps {
  selectedDate: string;
  selectedTime: string;
  visible: boolean;
  onPress: () => void;
  onClose: () => void;
  onSelectDate: (date: string, time: string) => void;
}

export const DatePicker: React.FC<DatePickerProps> = ({
  selectedDate,
  selectedTime,
  visible,
  onPress,
  onClose,
  onSelectDate,
}) => {
  const now = new Date();
  const [currentMonth, setCurrentMonth] = useState(now.getMonth());
  const [currentYear, setCurrentYear] = useState(now.getFullYear());
  const [selectedDay, setSelectedDay] = useState(now.getDate());
  const [selectedHour, setSelectedHour] = useState(now.getHours());
  const [selectedMinute, setSelectedMinute] = useState(now.getMinutes());
  const [showTimePicker, setShowTimePicker] = useState(false);

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const handleDaySelect = (day: number) => {
    setSelectedDay(day);
    const date = new Date(currentYear, currentMonth, day);
    const formattedDate = formatDate(date);
    const formattedTime = formatTime(selectedHour, selectedMinute);
    onSelectDate(formattedDate, formattedTime);
  };

  const formatDate = (date: Date) => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today, ' + date.getDate() + ' ' + monthNames[date.getMonth()].slice(0, 3);
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday, ' + date.getDate() + ' ' + monthNames[date.getMonth()].slice(0, 3);
    } else {
      return date.getDate() + ' ' + monthNames[date.getMonth()].slice(0, 3) + ', ' + date.getFullYear();
    }
  };

  const formatTime = (hour: number, minute: number) => {
    const period = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    const displayMinute = minute.toString().padStart(2, '0');
    return `${displayHour}:${displayMinute}${period}`;
  };

  const handleTimeConfirm = () => {
    const date = new Date(currentYear, currentMonth, selectedDay);
    const formattedDate = formatDate(date);
    const formattedTime = formatTime(selectedHour, selectedMinute);
    onSelectDate(formattedDate, formattedTime);
    setShowTimePicker(false);
  };

  const hours = Array.from({ length: 24 }, (_, i) => i);
  const minutes = Array.from({ length: 60 }, (_, i) => i);

  return (
    <>
      <TouchableOpacity
        onPress={onPress}
        className="flex-1 flex-row items-center justify-center px-4 py-3 rounded-2xl bg-zinc-900"
      >
        <Text className="text-white mr-2">📅</Text>
        <Text className="text-white text-sm">{selectedDate}</Text>
        <Text className="text-gray-500 ml-2 text-sm">{selectedTime}</Text>
      </TouchableOpacity>

      <Modal
        visible={visible}
        transparent
        animationType="slide"
        onRequestClose={onClose}
      >
        <TouchableOpacity
          activeOpacity={1}
          onPress={onClose}
          className="flex-1 justify-end"
          style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
        >
          <TouchableOpacity activeOpacity={1} onPress={(e) => e.stopPropagation()}>
            <View className="bg-zinc-800 rounded-t-3xl p-6 pb-10">
              {/* Month Navigation */}
              <View className="flex-row justify-between items-center mb-6">
                <TouchableOpacity onPress={handlePrevMonth} className="px-3 py-1">
                  <Text className="text-blue-500 text-3xl font-light">‹</Text>
                </TouchableOpacity>
                <Text className="text-white text-xl font-semibold">
                  {monthNames[currentMonth]} {currentYear} ›
                </Text>
                <TouchableOpacity onPress={handleNextMonth} className="px-3 py-1">
                  <Text className="text-blue-500 text-3xl font-light">›</Text>
                </TouchableOpacity>
              </View>

              {/* Week Days */}
              <View className="flex-row justify-between mb-4">
                {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map((day) => (
                  <View key={day} className="w-12 items-center">
                    <Text className="text-gray-500 text-xs font-semibold">{day}</Text>
                  </View>
                ))}
              </View>

              {/* Calendar Grid */}
              <View>
                {Array.from({ length: Math.ceil((daysInMonth + firstDayOfMonth) / 7) }, (_, weekIndex) => (
                  <View key={weekIndex} className="flex-row justify-between mb-3">
                    {Array.from({ length: 7 }, (_, dayIndex) => {
                      const dayNumber = weekIndex * 7 + dayIndex - firstDayOfMonth + 1;
                      const isValidDay = dayNumber > 0 && dayNumber <= daysInMonth;
                      const isSelected = dayNumber === selectedDay && currentMonth === now.getMonth() && currentYear === now.getFullYear();
                      const isToday = dayNumber === now.getDate() && currentMonth === now.getMonth() && currentYear === now.getFullYear();

                      return (
                        <TouchableOpacity
                          key={dayIndex}
                          disabled={!isValidDay}
                          onPress={() => handleDaySelect(dayNumber)}
                          className={`w-12 h-12 items-center justify-center rounded-full ${isSelected ? 'bg-blue-500' : ''
                            }`}
                        >
                          <Text className={`text-lg ${isValidDay
                              ? isSelected
                                ? 'text-white font-bold'
                                : 'text-white'
                              : 'text-transparent'
                            }`}>
                            {isValidDay ? dayNumber : ''}
                          </Text>
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                ))}
              </View>

              {/* Time Selection */}
              <View className="flex-row items-center justify-between mt-6 pt-6 border-t border-zinc-700">
                <Text className="text-white text-lg">Time</Text>
                <TouchableOpacity
                  onPress={() => setShowTimePicker(true)}
                  className="bg-zinc-700 px-6 py-3 rounded-xl"
                >
                  <Text className="text-white text-base">
                    {formatTime(selectedHour, selectedMinute)}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>

      {/* Time Picker Modal */}
      <Modal
        visible={showTimePicker}
        transparent
        animationType="slide"
        onRequestClose={() => setShowTimePicker(false)}
      >
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => setShowTimePicker(false)}
          className="flex-1 justify-end"
          style={{ backgroundColor: 'rgba(0,0,0,0.7)' }}
        >
          <TouchableOpacity activeOpacity={1} onPress={(e) => e.stopPropagation()}>
            <View className="bg-zinc-800 rounded-t-3xl p-6 pb-10">
              <View className="flex-row justify-between items-center mb-6">
                <Text className="text-white text-xl font-semibold">Select Time</Text>
                <TouchableOpacity onPress={handleTimeConfirm}>
                  <Text className="text-blue-500 text-lg font-semibold">Done</Text>
                </TouchableOpacity>
              </View>

              <View className="flex-row justify-center items-center" style={{ height: 250 }}>
                {/* Hours Picker */}
                <ScrollView
                  showsVerticalScrollIndicator={false}
                  snapToInterval={50}
                  decelerationRate="fast"
                  contentContainerStyle={{ paddingVertical: 100 }}
                  onMomentumScrollEnd={(e) => {
                    const index = Math.round(e.nativeEvent.contentOffset.y / 50);
                    const clampedIndex = Math.max(0, Math.min(23, index));
                    setSelectedHour(clampedIndex);
                  }}
                  onScroll={(e) => {
                    const index = Math.round(e.nativeEvent.contentOffset.y / 50);
                    const clampedIndex = Math.max(0, Math.min(23, index));
                    setSelectedHour(clampedIndex);
                  }}
                >
                  {hours.map((hour) => (
                    <TouchableOpacity
                      key={hour}
                      onPress={() => setSelectedHour(hour)}
                      className="items-center justify-center"
                      style={{ height: 50 }}
                    >
                      <Text className={`text-3xl ${selectedHour === hour ? 'text-white font-bold' : 'text-gray-500'}`}>
                        {hour.toString().padStart(2, '0')}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>

                <Text className="text-white text-4xl font-bold mx-6">:</Text>

                {/* Minutes Picker */}
                <ScrollView
                  showsVerticalScrollIndicator={false}
                  snapToInterval={50}
                  decelerationRate="fast"
                  contentContainerStyle={{ paddingVertical: 100 }}
                  onMomentumScrollEnd={(e) => {
                    const index = Math.round(e.nativeEvent.contentOffset.y / 50);
                    const clampedIndex = Math.max(0, Math.min(59, index));
                    setSelectedMinute(clampedIndex);
                  }}
                  onScroll={(e) => {
                    const index = Math.round(e.nativeEvent.contentOffset.y / 50);
                    const clampedIndex = Math.max(0, Math.min(59, index));
                    setSelectedMinute(clampedIndex);
                  }}
                >
                  {minutes.map((minute) => (
                    <TouchableOpacity
                      key={minute}
                      onPress={() => setSelectedMinute(minute)}
                      className="items-center justify-center"
                      style={{ height: 50 }}
                    >
                      <Text className={`text-3xl ${selectedMinute === minute ? 'text-white font-bold' : 'text-gray-500'}`}>
                        {minute.toString().padStart(2, '0')}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>

              {/* Quick Time Selection */}
              <View className="mt-4">
                <Text className="text-gray-400 text-center mb-3">Quick Select</Text>
                <View className="flex-row flex-wrap justify-center gap-2">
                  {['9:00 AM', '12:00 PM', '3:00 PM', '6:00 PM', '9:00 PM'].map((timeStr) => {
                    const [time, period] = timeStr.split(' ');
                    const [hour, minute] = time.split(':').map(Number);
                    const hour24 = period === 'PM' && hour !== 12 ? hour + 12 : period === 'AM' && hour === 12 ? 0 : hour;
                    
                    return (
                      <TouchableOpacity
                        key={timeStr}
                        onPress={() => {
                          setSelectedHour(hour24);
                          setSelectedMinute(minute);
                        }}
                        className="px-4 py-2 rounded-lg bg-zinc-700"
                      >
                        <Text className="text-white text-sm">{timeStr}</Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>

              {/* AM/PM Toggle */}
              <View className="flex-row justify-center mt-6 gap-4">
                <TouchableOpacity
                  onPress={() => selectedHour >= 12 ? setSelectedHour(selectedHour - 12) : null}
                  className={`px-8 py-3 rounded-xl ${selectedHour < 12 ? 'bg-blue-500' : 'bg-zinc-700'}`}
                >
                  <Text className="text-white font-semibold text-lg">AM</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => selectedHour < 12 ? setSelectedHour(selectedHour + 12) : null}
                  className={`px-8 py-3 rounded-xl ${selectedHour >= 12 ? 'bg-blue-500' : 'bg-zinc-700'}`}
                >
                  <Text className="text-white font-semibold text-lg">PM</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </>
  );
};
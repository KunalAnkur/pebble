// NoteInput.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, Keyboard } from 'react-native';

interface NoteInputProps {
    note: string;
    onChangeNote: (text: string) => void;
    amount: string;
}

export const NoteInput: React.FC<NoteInputProps> = ({
    note,
    onChangeNote,
    amount,
}) => {
    const [isFocused, setIsFocused] = useState(false);

    const handleFocus = () => {
        console.log('TextInput focused! - Keyboard should appear now');
        console.log('If you dont see keyboard, try Cmd+K in simulator or check Device > Keyboard settings');
        setIsFocused(true);
    };

    const handleBlur = () => {
        console.log('TextInput blurred! - Keyboard should hide now');
        setIsFocused(false);
    };

    const handleTextChange = (text: string) => {
        console.log('Text changed:', text);
        onChangeNote(text);
    };

    return (
        <View className="mt-8">
            <View className="p-3 rounded-2xl border border-zinc-700" style={{ alignSelf: 'flex-start' }}>
                <View className="flex-row items-center">
                    <Text className="text-gray-400 text-base mr-2">≡</Text>
                    <TextInput
                        value={note}
                        onChangeText={handleTextChange}
                        placeholder="Add Note"
                        placeholderTextColor="#666"
                        className="text-white text-base"
                        multiline={false}
                        returnKeyType="done"
                        onSubmitEditing={() => {
                            console.log('Submit editing');
                            Keyboard.dismiss();
                            setIsFocused(false);
                        }}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        blurOnSubmit={true}
                        style={{ 
                            padding: 0,
                            margin: 0,
                            height: 24,
                            backgroundColor: 'transparent',
                            fontSize: 16,
                            color: '#ffffff',
                            minWidth: 80,
                        }}
                        autoFocus={false}
                        selectTextOnFocus={true}
                        editable={true}
                        keyboardType="default"
                        autoCorrect={false}
                        autoCapitalize="sentences"
                        textContentType="none"
                    />
                </View>
            </View>
        </View>
    );
};
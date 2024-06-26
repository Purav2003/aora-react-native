import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { icons } from '../constants'

const FormField = ({ title, value, placeholder, handleChangeText, otherStyles, ...props }) => {
    const [showPassword, setShowPassword] = useState('')
    return (
        <View className={`space-y-2 ${otherStyles}`}>
            <Text className="text-base text-gray-100 font-pmedium">{title}</Text>
            <View className="w-full h-16 px-4 bg-black-100 border-2 border-black-200 rounded-2xl focus:border-secondary items-center flex-row">
                <TextInput
                    placeholder={placeholder}
                    value={value}
                    onChangeText={handleChangeText}
                    className="w-full h-full text-base flex-1 font-psemibold text-white"
                    placeholderTextColor="#7b7b8b"
                    secureTextEntry={title === 'Password' && !showPassword ? true : false}
                />
                {
                    title === 'Password' && (
                        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                            <Image source={!showPassword ? icons.eye : icons.eyeHide} className="w-6 h-6" resizeMode='contain' />
                        </TouchableOpacity>
                    )
                }
            </View>
        </View>
    )
}

export default FormField
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { icons } from '../constants'

const SearchInput = ({ title, value, placeholder, handleChangeText, otherStyles, ...props }) => {
    const [showPassword, setShowPassword] = useState('')
    return (
            <View className="w-full h-16 px-4 bg-black-100 border-2 border-black-200 rounded-2xl focus:border-secondary items-center flex-row space-x-4">
                <TextInput
                    placeholder={placeholder}
                    value={value}
                    onChangeText={handleChangeText}
                    className="text-base mt-0.5 text-white flex-1 font-pregular"
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
                <TouchableOpacity>
                    <Image source={icons.search} className="w-6 h-6" resizeMode='contain' />
                </TouchableOpacity>
            </View>
    )
}

export default SearchInput
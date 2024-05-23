import { View, Text, TextInput, TouchableOpacity, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import { icons } from '../constants'
import { router, usePathname } from 'expo-router'

const SearchInput = ({initialQuery}) => {
    const pathname = usePathname()
    const [query,setQuery] = useState(initialQuery||'')
    return (
            <View className="w-full h-16 px-4 bg-black-100 border-2 border-black-200 rounded-2xl focus:border-secondary items-center flex-row space-x-4">
                <TextInput
                    placeholder="Seacrh for a video topic"
                    value={query}
                    onChangeText={(e)=>setQuery(e)}
                    className="text-base mt-0.5 text-white flex-1 font-pregular"
                    placeholderTextColor="#cdcde0"
                />             
                <TouchableOpacity onPress={
                    ()=>{
                        if(!query){
                            Alert.alert('Missing Query',"Please input something to search results across database")
                            return
                        }
                        if(pathname.startsWith('/search')){
                            router.setParams({query})
                        }
                        else{
                            router.push(`/search/${query}`)
                        }
                    }
                }>
                    <Image source={icons.search} className="w-6 h-6" resizeMode='contain' />
                </TouchableOpacity>
            </View>
    )
}

export default SearchInput
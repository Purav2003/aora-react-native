import { View, Text } from 'react-native'
import React from 'react'
import {Tabs,Redirext} from 'expo-router';
import {Image} from 'react-native';
import {icons} from '../../constants';

const TabIcon = ({icon,color,name,focused})=>(
  <View className="items-center justify-center gap-2">
    <Image source={icon} resizeMode='contain' tintColor={color} className="w-4 h-4"/>
    <Text className={`text-xs ${focused?'font-psemibold':'font-pregular'}`} style={{color:color}}>{name}</Text>
  </View>
)

const TabsLayout = () => {
  return (
   <>
   <Tabs screenOptions={{
    tabBarShowLabel:false,
    tabBarActiveTintColor:"#ffa001",
    tabBarInactiveTintColor:"#cdcde0",
    tabBarStyle:{
        backgroundColor:"#161622",
        borderTopWidth:1,
        borderTopColor:"232533",
        height:64
    }
   }}>
    <Tabs.Screen name='home' options={{
        title:'Home',
        headerShown:false,
        tabBarIcon:({color,focused})=>(
            <TabIcon icon={icons.home} color={color} focused={focused} name='Home'/>
        )
    }}/>
    <Tabs.Screen name='bookmark' options={{
        title:'Bookmark',
        headerShown:false,
        tabBarIcon:({color,focused})=>(
            <TabIcon icon={icons.bookmark} color={color} focused={focused} name='Bookmark'/>
        )
    }}/>
    <Tabs.Screen name='create' options={{
        title:'Create',
        headerShown:false,
        tabBarIcon:({color,focused})=>(
            <TabIcon icon={icons.plus} color={color} focused={focused} name='Create'/>
        )
    }}/>
    <Tabs.Screen name='profile' options={{
        title:'Profile',
        headerShown:false,
        tabBarIcon:({color,focused})=>(
            <TabIcon icon={icons.profile} color={color} focused={focused} name='Profile'/>
        )
    }}/>
   </Tabs>
   </>
  )
}

export default TabsLayout
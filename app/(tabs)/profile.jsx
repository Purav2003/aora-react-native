import { View, FlatList, TouchableOpacity, Image, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import EmptyState from '../../components/EmptyState'
import { getUserPosts, signOut } from '../../lib/appWrite'
import useAppWrite from '../../lib/useAppWrite'
import VideoCard from '../../components/VideoCard'
import { useGlobalContext } from '../../context/GlobalProvider'
import { icons } from '../../constants'
import InfoBox from '../../components/InfoBox'
import { router } from 'expo-router'

const Profile = () => {

  const { user, setUser, setIsLoggedIn } = useGlobalContext();
  const[loading,setLoading] = useState(false)
  const { data: posts } = useAppWrite(() => getUserPosts(user.$id,setLoading))
  if(loading){
    return <SafeAreaView className="bg-primary h-full">
      <View className="w-full h-full justify-center items-center">
        <Text className="text-white">Loading...</Text>
      </View>
      </SafeAreaView>
  }
  const logout = async () => {
    await signOut();
    setUser(null);
    setIsLoggedIn(false);
    router.replace('/sign-in');
  }
  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <VideoCard video={item} />
        )}
        ListHeaderComponent={() => (
          <View className="w-full justify-center items-center mt-6 mb-12 px-4">
            <TouchableOpacity className="w-full items-end mb-10" onPress={logout}>
              <Image source={icons.logout} resizeMode='contain' className="w-6 h-6" />
            </TouchableOpacity>
            <View className="w-16 h-16 border border-secondary rouned-lg justify-center items-center">
              <Image source={{ uri: user && user.avatar }} resizeMode='cover' className="w-[90%] h-[90%] rounded-lg" />
            </View>
            <InfoBox title={user?.username} containerStyles="mt-5" titleStyles="text-lg" />
            <View className="mt-5 flex-row">
              <InfoBox title={posts?.length || 0} subtitle="Posts" containerStyles="mr-10" titleStyles="text-xl" />
              <InfoBox title="274 M" subtitle="Followers" titleStyles="text-xl" />

            </View>
          </View>
        )}
        ListEmptyComponent={() => {
          return (
            <EmptyState title="No Videos Found" subtitle="No videos found for this search query"
            />
          )

        }}
      />
    </SafeAreaView>
  )
}

export default Profile
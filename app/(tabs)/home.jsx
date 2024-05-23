import { View, Text, FlatList, Image, Alert } from 'react-native'
import React,{useEffect, useState} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../../constants'
import SearchInput from '../../components/SearchInput'
import Trendings from '../../components/Trendings'
import EmptyState from '../../components/EmptyState'
import { RefreshControl } from 'react-native'
import { getAllPosts, getLatestPosts } from '../../lib/appWrite'
import useAppWrite from '../../lib/useAppWrite'
import VideoCard from '../../components/VideoCard'

const Home = () => {
  const [refreshing, setRefreshing] = useState(false)
  const {data:posts,refetch}=useAppWrite(getAllPosts)
  const {data:latestPosts}=useAppWrite(getLatestPosts)
  const onRefresh = async () => {
    setRefreshing(true)
    await refetch()
    setRefreshing(false)
  }
  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
         <VideoCard video={item}/>
        )}
        ListHeaderComponent={() => (
          <View className="my-6 px-4 space-y-6">
            <View className="justify-between items-start flex-row mb-6">
              <View>
                <Text className="font-pmedium text-sm text-gray-100">Welcome Back</Text>
                <Text className="text-2xl font-psemibold text-white">Purav</Text>
              </View>
              <View className="mt-1.5">
                <Image source={images.logoSmall} className="w-9 h-10" resizeMode='contain' />
              </View>
            </View>
            <SearchInput placeholder="Search for a video topic"/>
            <View className="w-full flex-1 pt-5 pb-8">
                <Text className="text-gray-100 text-lg font-pregular mb-3">
                  Latest Videos
                </Text>
                <Trendings posts={latestPosts ?? []}/>
            </View>
          </View>
        )}
        ListEmptyComponent={()=>{
          return (
           <EmptyState title="No Videos Found" subtitle="Be the first one to upload a video"
           />
          )
        
        }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
      />      
    </SafeAreaView>
  )
}

export default Home
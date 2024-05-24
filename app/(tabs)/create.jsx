import { View, Text, ScrollView, Touchable, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import FormField from '../../components/FormField'
import { TouchableOpacity } from 'react-native'
import { Video, ResizeMode } from 'expo-av'
import { icons } from '../../constants'
import CustomButton from '../../components/customButton'
import * as ImagePicker from 'expo-image-picker'
import { router } from 'expo-router'
import { createVideo } from '../../lib/appWrite'
import { useGlobalContext } from '../../context/GlobalProvider'

const Create = () => {
  const [form, setForm] = useState({
    title: '',
    video: null,
    thumbnail: null,
    prompt: ''
  })
  const [uploading, setUploading] = useState(false)
  const {user} = useGlobalContext();

  const openPicker = async (type) => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: type === 'image' ? ImagePicker.MediaTypeOptions.Images : ImagePicker.MediaTypeOptions.Videos,
      quality: 1,
      aspect:[4,3]
    
    })
    if (!result.canceled) {
      if (type === 'image') {
        setForm({ ...form, thumbnail: result.assets[0] })
      }
      if (type === 'video') {
        setForm({ ...form, video: result.assets[0] })
      }   
    }
  }

  const submit = async () => {
    if (!form.prompt || !form.title || !form.video || !form.thumbnail) {
      Alert.alert('Error', 'Please fill in all fields')
      return
    }
    setUploading(true)
    try {
      await createVideo({
        ...form,userId:user.$id
      })
      Alert.alert('Success', 'Post uploaded successfully')
      router.push('/home')

    } catch (error) {
      Alert.alert('Error', error.message)
    }
    finally {
      setUploading(false)
      setForm({
        title: '',
        video: null,
        thumbnail: null,
        prompt: ''
      })
    }

  }
  return (
    <SafeAreaView className="bg-primary h-screen">
      <ScrollView className="px-4 my-6">
        <Text className="text-2xl font-psemibold text-white">Upload Video</Text>
        <FormField title="Video title" value={form.title} placeholder="Give your video a catchy title ..."
          handleChangeText={(e) => setForm({ ...form, title: e })} otherStyles="mt-7" />
          
        <View className="mt-7 space-y-2">
          <Text className="text-base text-gray-100 font-pmedium">Upload Video</Text>
          <TouchableOpacity onPress={() => openPicker('video')}>
            {
              form.video ? (
                <Video source={{ uri: form.video.uri }}
                  className="w-full h-64 rounded-2xl"
                  resizeMode={ResizeMode.COVER}
                />
              ) : (
                <View className="w-full h-40 px-4 bg-gray-700 rounded-2xl justify-center items-center">
                  <View className="w-14 h-14 border border-dashed border-secondary-100 justify-center items-center">
                    <Image source={icons.upload} className="w-1/2 h-1/2" resizeMode='contain' />
                  </View>
                </View>
              )
            }
          </TouchableOpacity>
        </View>
        <View className="mt-7 space-y-2">
          <Text className="text-base text-gray-100 font-pmedium">Thumbnail Image</Text>
          <TouchableOpacity onPress={() => openPicker('image')}>
            {
              form.thumbnail ? (
                <Image
                  source={{ uri: form.thumbnail.uri }}
                  resizeMode='cover'
                  className="w-full h-64 rounded-2xl"
                />
              ) : (
                <View className="w-full h-16 px-4 bg-gray-700 rounded-2xl justify-center items-center border-2 border-black-200 flex-row space-x-2">
                  <Image source={icons.upload} className="w-5 h-5" resizeMode='contain' />
                  <Text className="text-sm text-gray-100 font-pmedium">Choose a file</Text>
                </View>
              )
            }
          </TouchableOpacity>
        </View>
        <FormField title="AI Prompt" value={form.prompt} placeholder="The prompt you used to create this video"
          handleChangeText={(e) => setForm({ ...form, prompt: e })} otherStyles="mt-7" />
        <CustomButton
          title="Submit & Publish"
          handlePress={submit}
          containerStyles="mt-7"
          isLoading={uploading}
        />
      </ScrollView>

    </SafeAreaView>
  )
}

export default Create
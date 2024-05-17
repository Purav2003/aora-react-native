import { View, Text, ScrollView,Image, Alert } from 'react-native'
import React,{useState} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import {images} from '../../constants'
import FormField from '../../components/FormField'
import CustomButton from '../../components/customButton'
import { Link, router } from 'expo-router'
import { signIn } from '../../lib/appWrite'
import { useGlobalContext } from '../../context/GlobalProvider'

const SignIn = () => {
  const {setUser,setIsLoggedIn} = useGlobalContext();

  const [form, setForm] = useState({
    email: '',
    password: ''
  })
  const [isSubmitting,setIsSubmtting] = useState(false)

  const submit = async () => {
    if(!form.email || !form.password){
      Alert.alert('Error','Please fill all fields')
      return;
    };
    setIsSubmtting(true);
    try{
      await signIn(form.email,form.password);
      setUser(result)
      setIsLoggedIn(true)
      // set it to global set ...
      router.replace('/home')
    }
    catch(e){
      Alert.alert('Error',e.message)
    }
    finally{
      setIsSubmtting(false)
    }
  }

  return (
   <SafeAreaView className="bg-primary h-full">
    <ScrollView>
      <View className="w-full justify-center min-h-[85vh] px-4 py-6">
        <Image source={images.logo} resizeMode="contain" className="w-[115px] h-[35px]" />
          <Text className="text-2xl text-white text-semibold mt-10 font-psemibold">
            Log in to Aora
          </Text>

          <FormField title="Email" value={form.email} handleChangeText={(e)=>setForm({...form,email:e})} otherStyles="mt-7" keyboardType="email-address"/>
          <FormField title="Password" value={form.password} handleChangeText={(e)=>setForm({...form,password:e})} otherStyles="mt-7"/>
          <CustomButton title="Sign In" handlePress={submit} containerStyles="mt-7" isLoading={isSubmitting}/>

          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">
              Don't have an account?
            </Text>
            <Link href="/sign-up" className="text-lg text-secondary font-psemibold">
              Sign Up
            </Link>

          </View>
      </View>
    </ScrollView>
   </SafeAreaView>
  )
}

export default SignIn
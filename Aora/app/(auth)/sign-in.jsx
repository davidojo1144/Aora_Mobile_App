import {Image, ScrollView, Text, View,TouchableOpacity, Alert} from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

import { images } from "../../constants"
import FormField from '../../components/FormField'
import CustomButton from "../../components/CustomButton"
import { Link, router } from 'expo-router'
import { signIn } from '../../lib/appwrite'

const SignIn = () => {

  const [form, setForm] = useState({
    email: "",
    password: "",
  })

 
   const submit = async () => {
     if (!form.email || !form.password) {
       Alert.alert("Error", "Please fill in all the fields")
     }
 
     setIsSubmitting(true)
 
     try {
       await signIn(form.email, form.password)
 
       
 
       router.replace("/home")
     } catch (error) {
       Alert.alert("Error", error.message)
     }finally {
       setIsSubmitting(false)
     }
   }

  const [isSubmitting, setIsSubmitting] = useState(false)

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full justify-center min-h-[75vh] px-4 my-6">
          <Image
          source={images.logo}
          className="w-[115px] h-[35px]"
          resizeMode='contain'
          />

          <Text className="text-3xl text-white text-semibold mt-10 font-psemibold">
            Log in to Aora
          </Text>

          <FormField
          title="Email"
          value={form.email}
          handleChangeText={(e) => setForm({...form, 
            email: e
          })}
          otherStyles="mt-7"
          keyboardType="email-address"
          />

          <FormField
          title="Password"
          value={form.password}
          handleChangeText={(e) => setForm({...form, 
            password: e
          })}
          otherStyles="mt-7"
          />

          <CustomButton
          title="Sign In"
          handlePress={submit}
          containerStyles="mt-7"
          isLoading={isSubmitting}
          />

          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">
              Don't have an account ?
            </Text>

            <TouchableOpacity>
              <Link className='text-lg font-psemibold text-secondary-100' href="/sign-up">Sign Up</Link>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignIn
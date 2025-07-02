import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'

import {icons} from "../constants"


const FormField = ({title, value, placeholder, handleChangeText, otherStyles, keyboardType, ...props}) => {
    const [showPassword, setShowPassword] = useState(false)

    return (
        <View className={`space-y-2 ${otherStyles}`}>
            <Text className="text-base text-gray-100 font-psemibold">{title}</Text>

            <View className="border-2 border-secondary w-full h-16 bg-black-100 rounded-2xl px-4 justify-center flex-row items-center">
                <TextInput
                    className="flex-1 text-white font-psemibold text-base"
                    value={value}
                    placeholder={placeholder}
                    placeholderTextColor="#7b7b8b"
                    onChangeText={handleChangeText}
                    secureTextEntry={title === "Password" && !showPassword}
                    keyboardType={keyboardType}
                    {...props}
                />

                { title === "Password" && (
                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                        <Image
                        source={!showPassword ? icons.eye : icons.eyeHide}
                        className="w-7 h-7"
                        resizeMode='contain'
                        />
                    </TouchableOpacity>
                )}
            </View> 
        </View>
    )
}

export default FormField
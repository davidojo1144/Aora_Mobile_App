import { Link } from "expo-router";
import {Text, View, ScrollView, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";



export default function App () {
    return (
        <SafeAreaView className="bg-primary h-full">
            <ScrollView contentContainerStyle={{height: "100%"}}>
                <View className="w-full justify-center items-center
                h-full px-4">
                    <Image
                    
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

